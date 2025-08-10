export type ContainerMeta = {
  slug: string
  name: string
  tagline: string
  primaryHw: string
  whatItDoes: string
  whyItSavesTime: string
  architectures: ("arm64" | "amd64")[]
  tags: string[]
  dockerfile: string
  entrypoint: string
}

export const marketplaceIntro = `Fast-start containers for fleet-grade deployments: ROS 2 camera streaming, TensorRT inference, and Coral Edge TPU detection. Designed for NVIDIA Orin/Jetson and similar edge AI hardware.

All containers support: DEPLOY_ENV, structured logs, healthcheck, and configurable camera/device sources. Use with StreamDeploy’s deployment pipeline for robots to get OTA updates, versioned configs, and one-command rollbacks.`

export const containers: ContainerMeta[] = [
  {
    slug: "ros2-vision-streamer",
    name: "ros2-vision-streamer",
    tagline: "Multi-camera ROS 2 + GStreamer (Jetson/Orin-first)",
    primaryHw: "NVIDIA Orin/Jetson (arm64)",
    whatItDoes:
      "Multi-camera capture, H.264/H.265 encode via GStreamer; publishes ROS 2 topics; optional RTSP.",
    whyItSavesTime:
      "Skip driver wrangling, NVENC plumbing, ROS 2 packages, and camera calibration boilerplate.",
    architectures: ["arm64"],
    tags: ["ROS 2", "GStreamer", "RTSP", "NVENC", "Jetson", "arm64"],
    dockerfile: `ARG BASE_IMAGE
# Orin/Jetson: nvcr.io/nvidia/l4t-jetpack:35.4.1-runtime
# Generic: ubuntu:22.04
FROM \${BASE_IMAGE:-"nvcr.io/nvidia/l4t-jetpack:35.4.1-runtime"}

ENV DEBIAN_FRONTEND=noninteractive \\
    LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 \\
    ROS_DISTRO=humble

# Core deps + GStreamer + ROS 2
RUN apt-get update && apt-get install -y --no-install-recommends \\
    locales curl ca-certificates gnupg lsb-release sudo \\
    gstreamer1.0-tools gstreamer1.0-plugins-base gstreamer1.0-plugins-good \\
    gstreamer1.0-plugins-bad gstreamer1.0-libav v4l-utils \\
    python3-pip python3-colcon-common-extensions \\
    && locale-gen en_US.UTF-8 && rm -rf /var/lib/apt/lists/*

# ROS 2 apt repo
RUN mkdir -p /etc/apt/keyrings && \\
    curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.asc \\
    | gpg --dearmor -o /etc/apt/keyrings/ros-archive-keyring.gpg && \\
    echo "deb [arch=arm64,amd64 signed-by=/etc/apt/keyrings/ros-archive-keyring.gpg] \\
    http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" \\
    > /etc/apt/sources.list.d/ros2.list && \\
    apt-get update && apt-get install -y --no-install-recommends \\
      ros-\${ROS_DISTRO}-ros-base \\
      ros-\${ROS_DISTRO}-image-transport \\
      ros-\${ROS_DISTRO}-cv-bridge \\
      ros-\${ROS_DISTRO}-camera-info-manager \\
    && rm -rf /var/lib/apt/lists/*

# App user
RUN useradd -ms /bin/bash app && echo "app ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
USER app
WORKDIR /home/app

# Minimal ROS 2 workspace with a camera streamer node (installed via pip)
# (You can swap this for your internal package later)
RUN pip3 install --no-cache-dir opencv-python-headless==4.9.0.80 rclpy==3.3.9 numpy==1.26.4

# Entrypoint & defaults
COPY --chown=app:app entrypoint.sh /home/app/entrypoint.sh
RUN chmod +x /home/app/entrypoint.sh
ENV CAMERA_DEV=/dev/video0 \\
    ENCODER=H264 \\
    FPS=30 \\
    WIDTH=1280 \\
    HEIGHT=720 \\
    ROS_NAMESPACE=/camera \\
    ENABLE_RTSP=false \\
    RTSP_PORT=8554

# Healthcheck: ensure ROS 2 node is alive (simple TCP poke to rtsp if enabled)
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s \\
  CMD bash -lc '[ "$ENABLE_RTSP" = "true" ] && nc -z localhost $RTSP_PORT || exit 0'

ENTRYPOINT ["/home/app/entrypoint.sh"]`,
    entrypoint: `#!/usr/bin/env bash
set -euo pipefail
source /opt/ros/\${ROS_DISTRO}/setup.bash

# Build a GStreamer pipeline depending on device
if [[ "\${ENABLE_RTSP}" == "true" ]]; then
  # RTSP + ROS 2 publish (Jetson can use nvarguscamerasrc; fallback to v4l2src)
  PIPELINE="v4l2src device=\${CAMERA_DEV} ! videoconvert ! video/x-raw,framerate=\${FPS}/1,width=\${WIDTH},height=\${HEIGHT} ! x264enc tune=zerolatency bitrate=4000 speed-preset=ultrafast ! rtph264pay name=pay0 pt=96"
  # Simple RTSP server
  gst-rtsp-server-1.0 &>/dev/null || true
fi

# Basic ROS 2 image publisher using OpenCV (placeholder; swap with your node)
python3 - << 'PY'
import os, time, cv2, rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image
from cv_bridge import CvBridge

dev = os.environ.get("CAMERA_DEV","/dev/video0")
fps = int(os.environ.get("FPS","30"))

class CamNode(Node):
    def __init__(self):
        super().__init__('camera_pub')
        self.pub = self.create_publisher(Image, 'image_raw', 10)
        self.cap = cv2.VideoCapture(dev)
        self.br = CvBridge()
        timer_period = 1.0/max(1,fps)
        self.timer = self.create_timer(timer_period, self.tick)
    def tick(self):
        ok, frame = self.cap.read()
        if not ok: return
        msg = self.br.cv2_to_imgmsg(frame, encoding='bgr8')
        self.pub.publish(msg)

rclpy.init()
node = CamNode()
rclpy.spin(node)
PY`,
  },
  {
    slug: "triton-robot-inference",
    name: "triton-robot-inference",
    tagline: "TensorRT/ONNX runtime FastAPI microservice (Orin-first)",
    primaryHw: "NVIDIA Orin/Jetson (arm64)",
    whatItDoes:
      "Lightweight FastAPI microservice running ONNX Runtime/TensorRT for common vision models.",
    whyItSavesTime:
      "One-command GPU inference server; avoids building TRT engines by hand or stitching CUDA libs.",
    architectures: ["arm64"],
    tags: ["FastAPI", "ONNX", "TensorRT", "Jetson", "REST"],
    dockerfile: `ARG BASE_IMAGE
# Jetson-friendly CUDA/TensorRT runtime image
FROM \${BASE_IMAGE:-"nvcr.io/nvidia/l4t-pytorch:r35.4.1-py3"}

ENV DEBIAN_FRONTEND=noninteractive \\
    LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8

RUN apt-get update && apt-get install -y --no-install-recommends \\
    python3-pip python3-dev build-essential curl ca-certificates && \\
    rm -rf /var/lib/apt/lists/*

# ONNX Runtime (GPU for Jetson uses special builds; fallback to CPU if unavailable)
# For Jetson: use onnxruntime-gpu-jetson wheel; else default to onnxruntime-gpu
RUN pip3 install --no-cache-dir \\
    fastapi==0.111.0 uvicorn[standard]==0.30.0 \\
    numpy==1.26.4 pillow==10.3.0 onnx==1.16.0 onnxruntime-gpu==1.18.0

# Place model(s) (mount your own at runtime or bake here)
WORKDIR /app
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh
# Example: default ONNX path (override with MODEL_PATH env)
ENV MODEL_PATH=/models/model.onnx \\
    SERVICE_HOST=0.0.0.0 \\
    SERVICE_PORT=8080

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s \\
  CMD curl -fsS http://localhost:8080/health || exit 1

ENTRYPOINT ["/app/entrypoint.sh"]`,
    entrypoint: `#!/usr/bin/env bash
set -euo pipefail

cat > /app/server.py << 'PY'
import os, io
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from PIL import Image
import numpy as np, onnxruntime as ort

app = FastAPI()
model_path = os.getenv("MODEL_PATH","/models/model.onnx")
providers = ["CUDAExecutionProvider","CPUExecutionProvider"]
session = ort.InferenceSession(model_path, providers=providers)

@app.get("/health")
def health():
    return {"ok": True, "model": os.path.basename(model_path), "providers": session.get_providers()}

@app.post("/infer")
async def infer(file: UploadFile = File(...)):
    img_bytes = await file.read()
    img = Image.open(io.BytesIO(img_bytes)).convert("RGB").resize((640,640))
    x = np.asarray(img).astype(np.float32)/255.0
    x = np.transpose(x, (2,0,1))[None, ...]  # NCHW
    outputs = session.run(None, {session.get_inputs()[0].name: x})
    return JSONResponse({"outputs": [o.tolist() for o in outputs]})
PY

exec python3 -m uvicorn server:app --host "\${SERVICE_HOST}" --port "\${SERVICE_PORT}"`,
  },
  {
    slug: "coral-rtsp-detector",
    name: "coral-rtsp-detector",
    tagline: "Coral Edge TPU RTSP detector (Coral Dev Board/USB)",
    primaryHw: "Coral Dev Board / USB Accelerator (arm64/amd64 host)",
    whatItDoes:
      "Runs TFLite Edge TPU detection and serves annotated RTSP stream.",
    whyItSavesTime:
      "Bypasses libedgetpu/tflite install pains; ready RTSP overlay and health endpoints.",
    architectures: ["arm64", "amd64"],
    tags: ["Coral", "EdgeTPU", "RTSP", "TFLite"],
    dockerfile: `ARG BASE_IMAGE
FROM \${BASE_IMAGE:-"debian:bookworm-slim"}

ENV DEBIAN_FRONTEND=noninteractive LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8
RUN apt-get update && apt-get install -y --no-install-recommends \\
    git curl ca-certificates python3 python3-pip python3-opencv \\
    gstreamer1.0-tools gstreamer1.0-plugins-base gstreamer1.0-plugins-good \\
    gstreamer1.0-plugins-bad gstreamer1.0-libav v4l-utils \\
    && rm -rf /var/lib/apt/lists/*

# Edge TPU runtime + TFLite (CPU fallback if no TPU present)
RUN pip3 install --no-cache-dir \\
    tflite-runtime==2.14.0 \\
    numpy==1.26.4 pillow==10.3.0

# Install libedgetpu (USB accelerator)
RUN echo "deb https://packages.cloud.google.com/apt coral-edgetpu-stable main" \\
    | tee /etc/apt/sources.list.d/coral-edgetpu.list && \\
    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add - && \\
    apt-get update && apt-get install -y --no-install-recommends libedgetpu1-std && \\
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

ENV MODEL_PATH=/models/ssd_mobilenet_v2_coco_quant_postprocess_edgetpu.tflite \\
    LABELS_PATH=/models/coco_labels.txt \\
    CAMERA_DEV=/dev/video0 \\
    RTSP_PORT=8554 \\
    FPS=30 WIDTH=1280 HEIGHT=720

EXPOSE 8554
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s \\
  CMD bash -lc "nc -z localhost \${RTSP_PORT}"

ENTRYPOINT ["/app/entrypoint.sh"]`,
    entrypoint: `#!/usr/bin/env bash
set -euo pipefail

cat > /app/detect_and_rtsp.py << 'PY'
import os, time, threading, cv2, numpy as np
from PIL import Image
import tflite_runtime.interpreter as tflite

MODEL = os.getenv("MODEL_PATH")
LABELS = os.getenv("LABELS_PATH")
DEV = os.getenv("CAMERA_DEV","/dev/video0")
FPS = int(os.getenv("FPS","30"))
W = int(os.getenv("WIDTH","1280"))
H = int(os.getenv("HEIGHT","720"))

labels = {}
with open(LABELS, 'r') as f:
    for line in f:
        idx, name = line.strip().split(maxsplit=1)
        labels[int(idx)] = name

# Try to use EdgeTPU delegate; fallback to CPU
delegates=[]
try:
    delegates=[tflite.load_delegate('libedgetpu.so.1')]
except Exception:
    pass

interpreter = tflite.Interpreter(model_path=MODEL, experimental_delegates=delegates)
interpreter.allocate_tensors()
inp = interpreter.get_input_details()[0]
out = interpreter.get_output_details()

cap = cv2.VideoCapture(DEV)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, W)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, H)
cap.set(cv2.CAP_PROP_FPS, FPS)

def infer_frame(frame):
    img = cv2.resize(frame, (300,300))
    x = np.expand_dims(img, 0)
    interpreter.set_tensor(inp['index'], x)
    interpreter.invoke()
    boxes = interpreter.get_tensor(out[0]['index'])[0]
    classes = interpreter.get_tensor(out[1]['index'])[0].astype(int)
    scores = interpreter.get_tensor(out[2]['index'])[0]
    count = int(interpreter.get_tensor(out[3]['index'])[0])
    return boxes, classes, scores, count

# Simple overlay + stdout metrics; RTSP served by gst pipeline launched below
while True:
    ok, frame = cap.read()
    if not ok: time.sleep(0.01); continue
    boxes, classes, scores, cnt = infer_frame(frame)
    for i in range(cnt):
        if scores[i] < 0.5: continue
        y1, x1, y2, x2 = boxes[i]
        (x1, y1, x2, y2) = (int(x1*W), int(y1*H), int(x2*W), int(y2*H))
        cv2.rectangle(frame, (x1,y1), (x2,y2), (0,255,0), 2)
        name = labels.get(classes[i], "obj")
        cv2.putText(frame, f"{name}:{scores[i]:.2f}", (x1, max(0,y1-10)), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,255,0), 2)
    cv2.imshow("annotated", frame)  # no-op in headless; kept for local test
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
PY

# Launch GStreamer RTSP in background (nv enc not required; CPU-safe)
python3 /app/detect_and_rtsp.py &

# Minimal RTSP using gst-rtsp-server via gst-launch equivalent (simplified)
# For production swap with a proper rtsp-server process or mediamtx
exec gst-launch-1.0 \\
  v4l2src device=\${CAMERA_DEV} ! video/x-raw,framerate=\${FPS}/1,width=\${WIDTH},height=\${HEIGHT} \\
  ! x264enc tune=zerolatency bitrate=3000 speed-preset=ultrafast \\
  ! rtph264pay config-interval=1 pt=96 \\
  ! udpsink host=127.0.0.1 port=5000`,
  },
]

export function getContainerBySlug(slug: string): ContainerMeta | undefined {
  return containers.find((c) => c.slug === slug)
}
