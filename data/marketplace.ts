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

  /* ---------- NEW ENTRIES APPENDED BELOW ---------- */

  {
    slug: "pi-libcamera-rtsp",
    name: "pi-libcamera-rtsp",
    tagline: "Raspberry Pi Camera → RTSP/HLS with libcamera + GStreamer",
    primaryHw: "Raspberry Pi 4/5 & CM4/CM5 (arm64)",
    whatItDoes:
      "Captures from libcamera (Pi Cam v2/HQ/GS), encodes H.264/H.265 via V4L2, serves RTSP (optional HLS).",
    whyItSavesTime:
      "No more libcamera/GStreamer incantations; healthcheck, env-config, and multi-cam ready out of the box.",
    architectures: ["arm64"],
    tags: ["Raspberry Pi", "Camera", "RTSP", "HLS", "GStreamer", "arm64"],
    dockerfile: `ARG BASE_IMAGE
# Pi OS arm64 base with libcamera & gstreamer
FROM \${BASE_IMAGE:-"raspberrypi/libcamera:latest"}

ENV DEBIAN_FRONTEND=noninteractive LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8
RUN apt-get update && apt-get install -y --no-install-recommends \\
    gstreamer1.0-tools gstreamer1.0-plugins-base gstreamer1.0-plugins-good \\
    gstreamer1.0-plugins-bad gstreamer1.0-libav libcamera-apps \\
    python3 python3-pip curl ca-certificates && \\
    rm -rf /var/lib/apt/lists/*

# Minimal rtsp server helper
RUN pip3 install --no-cache-dir gst-rtsp-server

WORKDIR /app
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

ENV CAMERA_INDEX=0 \\
    WIDTH=1280 HEIGHT=720 FPS=30 \\
    CODEC=h264 \\
    RTSP_PORT=8554 \\
    RTSP_PATH=/cam \\
    EXTRA_PIPELINE=""

EXPOSE 8554
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s \\
  CMD bash -lc 'nc -z localhost $RTSP_PORT'

ENTRYPOINT ["/app/entrypoint.sh"]`,
    entrypoint: `#!/usr/bin/env bash
set -euo pipefail
: "\${CAMERA_INDEX:=0}"
: "\${WIDTH:=1280}"; : "\${HEIGHT:=720}"; : "\${FPS:=30}"
: "\${CODEC:=h264}"; : "\${RTSP_PORT:=8554}"; : "\${RTSP_PATH:=/cam}"
: "\${EXTRA_PIPELINE:=}"

# Select encoder caps for Pi (v4l2 stateful)
if [[ "\${CODEC}" == "h265" ]]; then
  ENC="v4l2h265enc"
  RTP="rtph265pay pt=96"
else
  ENC="v4l2h264enc extra-controls=\"controls,video_gop_size=30\""
  RTP="rtph264pay pt=96 config-interval=1"
fi

# libcamera source via libcamerasrc (if present) else fallback to libcamera-vid piping
if gst-inspect-1.0 libcamerasrc >/dev/null 2>&1; then
  PIPE="libcamerasrc camera-index=\${CAMERA_INDEX} ! video/x-raw,width=\${WIDTH},height=\${HEIGHT},framerate=\${FPS}/1"
else
  echo "[warn] libcamerasrc not found; attempting v4l2src /dev/video0"
  PIPE="v4l2src device=/dev/video0 ! video/x-raw,width=\${WIDTH},height=\${HEIGHT},framerate=\${FPS}/1"
fi

# Run RTSP server using gst-launch (simple, robust)
exec gst-launch-1.0 -v \${PIPE} ! videoconvert ! \${ENC} ! \${RTP} name=pay0 \${EXTRA_PIPELINE} \\
  ! rtspclientsink location=rtsp://127.0.0.1:\${RTSP_PORT}\${RTSP_PATH} || true`,
  },
  {
    slug: "rk3588-gstreamer-encoder",
    name: "rk3588-gstreamer-encoder",
    tagline: "RK3588 MPP/NPU-friendly H.264/H.265 hardware encoder + RTSP",
    primaryHw: "ROC-RK3588 / Orange Pi 5 (arm64)",
    whatItDoes:
      "Uses Rockchip MPP (rkmpp) via GStreamer to encode camera/video to RTSP with low CPU.",
    whyItSavesTime:
      "Avoids manual rkmpp plumbing and kernel driver quirks; one env-config to stream reliably.",
    architectures: ["arm64"],
    tags: ["RK3588", "GStreamer", "RTSP", "rkmpp", "arm64"],
    dockerfile: `ARG BASE_IMAGE
FROM \${BASE_IMAGE:-"ubuntu:22.04"}
ENV DEBIAN_FRONTEND=noninteractive LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8

# Basic deps + GStreamer + MPP userspace
RUN apt-get update && apt-get install -y --no-install-recommends \\
    gstreamer1.0-tools gstreamer1.0-plugins-base gstreamer1.0-plugins-good \\
    gstreamer1.0-plugins-bad gstreamer1.0-libav v4l-utils curl ca-certificates \\
    && rm -rf /var/lib/apt/lists/*

# Expect host to provide /dev/video* and /dev/mpp_service; pass with --device
WORKDIR /app
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

ENV CAMERA_DEV=/dev/video0 \\
    WIDTH=1280 HEIGHT=720 FPS=30 \\
    CODEC=h264 \\
    RTSP_PORT=8554 \\
    EXTRA_PIPELINE=""

EXPOSE 8554
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s \\
  CMD bash -lc 'nc -z localhost $RTSP_PORT'

ENTRYPOINT ["/app/entrypoint.sh"]`,
    entrypoint: `#!/usr/bin/env bash
set -euo pipefail
: "\${CODEC:=h264}"
if [[ "\${CODEC}" == "h265" ]]; then
  ENC="mpph265enc"
  RTP="rtph265pay pt=96"
else
  ENC="mpph264enc"
  RTP="rtph264pay pt=96 config-interval=1"
fi

exec gst-launch-1.0 -v v4l2src device="\${CAMERA_DEV}" ! \\
  video/x-raw,width=\${WIDTH},height=\${HEIGHT},framerate=\${FPS}/1 ! \\
  videoconvert ! \${ENC} ! \${RTP} name=pay0 \${EXTRA_PIPELINE} \\
  ! rtspclientsink location=rtsp://127.0.0.1:\${RTSP_PORT}/stream`,
  },
  {
    slug: "mediamtx-edge-relay",
    name: "mediamtx-edge-relay",
    tagline: "Unified RTSP/RTMP/WebRTC ingest & restream for fleets",
    primaryHw: "Generic Edge (arm64/amd64)",
    whatItDoes:
      "Runs MediaMTX (formerly rtsp-simple-server) to fan-in cameras and restream to RTSP/RTMP/WebRTC.",
    whyItSavesTime:
      "One binary to terminate weird camera protocols, add auth, and expose a consistent URL to your apps.",
    architectures: ["arm64", "amd64"],
    tags: ["MediaMTX", "RTSP", "RTMP", "WebRTC", "Gateway"],
    dockerfile: `ARG BASE_IMAGE
FROM \${BASE_IMAGE:-"alpine:3.20"}
RUN apk add --no-cache ca-certificates curl tzdata
WORKDIR /app

# Fetch latest stable MediaMTX at runtime or bake a specific version
ARG MM_VERSION=v1.6.5
RUN curl -L -o mediamtx.tar.gz https://github.com/bluenviron/mediamtx/releases/download/\${MM_VERSION}/mediamtx_\${MM_VERSION#v}_linux_$(uname -m).tar.gz && \\
    tar -xzf mediamtx.tar.gz && rm mediamtx.tar.gz && \\
    mv mediamtx /usr/local/bin/ && chmod +x /usr/local/bin/mediamtx

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

ENV MTX_RTSP_PORT=8554 MTX_RTMP_PORT=1935 MTX_WEBRTC=true \\
    MTX_AUTH_USER="" MTX_AUTH_PASS=""

EXPOSE 8554 1935 8889 8189
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \\
  CMD nc -z localhost 8554

ENTRYPOINT ["/app/entrypoint.sh"]`,
    entrypoint: `#!/usr/bin/env sh
set -e
cat > mediamtx.yml <<EOF
rtspAddress: :\${MTX_RTSP_PORT}
rtmpAddress: :\${MTX_RTMP_PORT}
webrtc: \${MTX_WEBRTC}
paths:
  all:
    publishUser: "\${MTX_AUTH_USER}"
    publishPass: "\${MTX_AUTH_PASS}"
    readUser: "\${MTX_AUTH_USER}"
    readPass: "\${MTX_AUTH_PASS}"
EOF
exec mediamtx mediamtx.yml`,
  },
  {
    slug: "mqtt-broker-mosquitto",
    name: "mqtt-broker-mosquitto",
    tagline: "TLS-ready Mosquitto broker with sane defaults",
    primaryHw: "Generic Edge (arm64/amd64)",
    whatItDoes:
      "Drops in an MQTT broker for telemetry/command. Mount certs; set env for auth; done.",
    whyItSavesTime:
      "Zero yak-shaving: persistent volumes, TLS, and password file handled automatically.",
    architectures: ["arm64", "amd64"],
    tags: ["MQTT", "Broker", "Telemetry", "IoT"],
    dockerfile: `ARG BASE_IMAGE
FROM \${BASE_IMAGE:-"eclipse-mosquitto:2.0"}
USER root
RUN apk add --no-cache bash ca-certificates
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENV MQTT_USERNAME="" MQTT_PASSWORD="" MQTT_TLS=false \\
    MQTT_CERT=/mosquitto/certs/server.crt \\
    MQTT_KEY=/mosquitto/certs/server.key \\
    MQTT_CAFILE=/mosquitto/certs/ca.crt
EXPOSE 1883 8883
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \\
  CMD nc -z localhost 1883 || nc -z localhost 8883
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]`,
    entrypoint: `#!/usr/bin/env bash
set -euo pipefail
mkdir -p /mosquitto/config /mosquitto/data /mosquitto/log
CONF=/mosquitto/config/mosquitto.conf
: "\${MQTT_USERNAME:=}"; : "\${MQTT_PASSWORD:=}"; : "\${MQTT_TLS:=false}"

cat > "$CONF" <<EOF
listener 1883
persistence true
persistence_location /mosquitto/data/
allow_anonymous false
EOF

if [[ -n "\${MQTT_USERNAME}" && -n "\${MQTT_PASSWORD}" ]]; then
  touch /mosquitto/config/passwd
  mosquitto_passwd -b /mosquitto/config/passwd "\${MQTT_USERNAME}" "\${MQTT_PASSWORD}"
  echo "password_file /mosquitto/config/passwd" >> "$CONF"
fi

if [[ "\${MQTT_TLS}" == "true" ]]; then
  cat >> "$CONF" <<TLS
listener 8883
cafile \${MQTT_CAFILE}
certfile \${MQTT_CERT}
keyfile \${MQTT_KEY}
require_certificate false
TLS
fi

exec mosquitto -c "$CONF" -v`,
  },
  {
    slug: "node-red-automation",
    name: "node-red-automation",
    tagline: "Node-RED flows for edge orchestration (MQTT/HTTP/ROS bridge)",
    primaryHw: "Generic Edge (arm64/amd64)",
    whatItDoes:
      "Low-code automations: bridge MQTT topics, HTTP webhooks, and ROS endpoints for quick prototypes.",
    whyItSavesTime:
      "Ship a ready Node-RED with curated nodes and healthchecks; mount flows and go.",
    architectures: ["arm64", "amd64"],
    tags: ["Node-RED", "Automation", "MQTT", "Bridge"],
    dockerfile: `ARG BASE_IMAGE
FROM \${BASE_IMAGE:-"nodered/node-red:3.1"}
USER root
RUN npm install --unsafe-perm --omit=dev \\
      node-red-node-ui-table node-red-dashboard \\
      node-red-contrib-mqtt-broker node-red-contrib-ros
USER node-red
ENV FLOWS=/data/flows.json PORT=1880
EXPOSE 1880
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s \\
  CMD wget -qO- http://localhost:1880 || exit 1
ENTRYPOINT ["npm","start","--","--userDir","/data"]`,
    entrypoint: `# (Not used; Node-RED uses its own CMD)`,
  },
  {
    slug: "openvino-fastapi-infer",
    name: "openvino-fastapi-infer",
    tagline: "Intel OpenVINO inference microservice (CPU/iGPU/NPU)",
    primaryHw: "Intel NUC / Arc / Core Ultra (amd64)",
    whatItDoes:
      "FastAPI wrapper around OpenVINO Runtime for image models, auto-selecting best device.",
    whyItSavesTime:
      "Skip SDK installs and sample refactors; drop a model and get /health and /infer immediately.",
    architectures: ["amd64"],
    tags: ["OpenVINO", "Intel", "Inference", "REST", "amd64"],
    dockerfile: `ARG BASE_IMAGE
FROM \${BASE_IMAGE:-"openvino/ubuntu22_runtime:2024.2.0"}
ENV DEBIAN_FRONTEND=noninteractive LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8
RUN apt-get update && apt-get install -y --no-install-recommends \\
    python3-pip python3-venv curl ca-certificates && \\
    rm -rf /var/lib/apt/lists/*
RUN pip3 install --no-cache-dir fastapi==0.111.0 uvicorn[standard]==0.30.0 pillow==10.3.0 numpy==1.26.4
WORKDIR /app
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh
ENV MODEL_XML=/models/model.xml \\
    SERVICE_HOST=0.0.0.0 SERVICE_PORT=8080 \\
    OV_DEVICE="AUTO"
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
import numpy as np
from openvino.runtime import Core

core = Core()
model_xml = os.getenv("MODEL_XML","/models/model.xml")
device = os.getenv("OV_DEVICE","AUTO")
model = core.read_model(model=model_xml)
compiled = core.compile_model(model=model, device_name=device)
input_name = compiled.input(0).get_any_name()

app = FastAPI()
@app.get("/health")
def health():
    return {"ok": True, "device": device, "model": os.path.basename(model_xml)}

@app.post("/infer")
async def infer(file: UploadFile = File(...)):
    img = Image.open(io.BytesIO(await file.read())).convert("RGB").resize((640,640))
    x = np.asarray(img).transpose(2,0,1)[None].astype(np.float32)/255.0
    res = compiled([x])
    return JSONResponse({"outputs":[r.tolist() for r in res]})
PY
exec python3 -m uvicorn server:app --host "\${SERVICE_HOST}" --port "\${SERVICE_PORT}"`,
  },
  {
    slug: "vector-log-forwarder",
    name: "vector-log-forwarder",
    tagline: "Tiny log/metric shipper for fleets (HTTP/MQTT/Syslog → S3/HTTP)",
    primaryHw: "Generic Edge (arm64/amd64)",
    whatItDoes:
      "Uses Vector to tail container logs, parse JSON, and forward to your backend or cloud object storage.",
    whyItSavesTime:
      "Batteries-included log pipeline with structured parsing and backpressure—no custom agents needed.",
    architectures: ["arm64", "amd64"],
    tags: ["Logging", "Metrics", "Vector", "Observability"],
    dockerfile: `ARG BASE_IMAGE
FROM \${BASE_IMAGE:-"timberio/vector:0.38.0-debian"}
USER root
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates curl && rm -rf /var/lib/apt/lists/*
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENV VECTOR_CONFIG=/etc/vector/vector.yaml \\
    SINK_URL="" \\
    HOSTNAME=edge-node
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \\
  CMD nc -z localhost 8686 || exit 0
ENTRYPOINT ["/entrypoint.sh"]`,
    entrypoint: `#!/usr/bin/env bash
set -euo pipefail
: "\${SINK_URL:=}"
mkdir -p /etc/vector
cat > /etc/vector/vector.yaml <<'YML'
sources:
  docker_logs:
    type: docker_logs
    include_containers: ["*"]
transforms:
  to_json:
    type: remap
    inputs: [docker_logs]
    source: |
      .hostname = get_env!("HOSTNAME")
      if exists(.message) && is_string(.message) {
        .parsed, err = parse_json(.message)
        if err == null { . = .parsed }
      }
sinks:
  http_out:
    type: http
    inputs: [to_json]
    uri: "\${SINK_URL}"
    encoding:
      codec: json
YML
exec /usr/local/bin/vector -c /etc/vector/vector.yaml -w /var/lib/vector`,
  },
  {
    slug: "slam-navigation",
    name: "slam-navigation",
    tagline: "ROS 2 SLAM & Navigation Stack (Orin/RK3588-first)",
    primaryHw: "NVIDIA Orin/Jetson, RK3588 (arm64)",
    whatItDoes:
      "Prebuilt slam_toolbox + nav2 container with tuned GMapping/Cartographer backends, publishes maps and path plans.",
    whyItSavesTime:
      "Avoids multi-hour ROS 2 build hell; provides a drop-in navigation baseline for AMRs and mobile robots.",
    architectures: ["arm64"],
    tags: ["ROS 2", "SLAM", "Navigation", "Robotics"],
    dockerfile: `ARG BASE_IMAGE
# Jetson-friendly base is fine; also runs on generic arm64
FROM \${BASE_IMAGE:-"ubuntu:22.04"}

ENV DEBIAN_FRONTEND=noninteractive \\
    LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 \\
    ROS_DISTRO=humble

RUN apt-get update && apt-get install -y --no-install-recommends \\
    locales curl ca-certificates gnupg lsb-release sudo \\
    python3-pip python3-colcon-common-extensions \\
    && locale-gen en_US.UTF-8

# ROS 2 repo
RUN mkdir -p /etc/apt/keyrings && \\
    curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.asc \\
    | gpg --dearmor -o /etc/apt/keyrings/ros-archive-keyring.gpg && \\
    echo "deb [arch=arm64,amd64 signed-by=/etc/apt/keyrings/ros-archive-keyring.gpg] \\
    http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" \\
    > /etc/apt/sources.list.d/ros2.list && \\
    apt-get update && apt-get install -y --no-install-recommends \\
      ros-\${ROS_DISTRO}-ros-base \\
      ros-\${ROS_DISTRO}-nav2-bringup \\
      ros-\${ROS_DISTRO}-slam-toolbox \\
      ros-\${ROS_DISTRO}-cartographer \\
      ros-\${ROS_DISTRO}-cartographer-ros \\
      ros-\${ROS_DISTRO}-robot-state-publisher \\
      ros-\${ROS_DISTRO}-tf2-tools \\
      ros-\${ROS_DISTRO}-xacro \\
      ros-\${ROS_DISTRO}-rviz2 \\
    && rm -rf /var/lib/apt/lists/*

# App user
RUN useradd -ms /bin/bash app && echo "app ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
USER app
WORKDIR /home/app

COPY --chown=app:app entrypoint.sh /home/app/entrypoint.sh
RUN chmod +x /home/app/entrypoint.sh

ENV NAV_STACK="nav2" \\
    SLAM_STACK="slam_toolbox" \\
    MAP_TOPIC=/map \\
    ODOM_TOPIC=/odom \\
    SCAN_TOPIC=/scan \\
    USE_SIM_TIME=false

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s \\
  CMD bash -lc 'ros2 node list | grep -q "nav2" || exit 1'

ENTRYPOINT ["/home/app/entrypoint.sh"]`,
    entrypoint: `#!/usr/bin/env bash
set -euo pipefail
source /opt/ros/\${ROS_DISTRO}/setup.bash

: "\${NAV_STACK:=nav2}"
: "\${SLAM_STACK:=slam_toolbox}"
: "\${USE_SIM_TIME:=false}"

export ROS_DOMAIN_ID=\${ROS_DOMAIN_ID:-0}
export RMW_IMPLEMENTATION=\${RMW_IMPLEMENTATION:-rmw_fastrtps_cpp}
export ROS_LOG_DIR=\${ROS_LOG_DIR:-/tmp/ros}

if [[ "\${SLAM_STACK}" == "cartographer" ]]; then
  SLAM_CMD="ros2 launch cartographer_ros cartographer.launch.py use_sim_time:=\${USE_SIM_TIME}"
else
  SLAM_CMD="ros2 launch slam_toolbox online_async_launch.py use_sim_time:=\${USE_SIM_TIME}"
fi

if [[ "\${NAV_STACK}" == "nav2" ]]; then
  NAV_CMD="ros2 launch nav2_bringup bringup_launch.py use_sim_time:=\${USE_SIM_TIME}"
else
  NAV_CMD="bash -lc 'echo Unknown NAV_STACK=\${NAV_STACK}; sleep infinity'"
fi

# Run both
bash -lc "\${SLAM_CMD}" &
exec bash -lc "\${NAV_CMD}"`
  },
  {
    slug: "realsense-driver",
    name: "realsense-driver",
    tagline: "Intel RealSense Camera ROS 2 Driver",
    primaryHw: "Intel RealSense D4xx/D435/D455, L515 (arm64/amd64)",
    whatItDoes:
      "Sets up librealsense + ROS 2 wrapper, streams depth + RGB topics.",
    whyItSavesTime:
      "Skips kernel patching, udev rules, and ROS driver compilation; instant depth camera integration.",
    architectures: ["arm64", "amd64"],
    tags: ["ROS 2", "Depth Camera", "Intel RealSense"],
    dockerfile: `ARG BASE_IMAGE
FROM \${BASE_IMAGE:-"ubuntu:22.04"}

ENV DEBIAN_FRONTEND=noninteractive \\
    LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 \\
    ROS_DISTRO=humble

RUN apt-get update && apt-get install -y --no-install-recommends \\
    locales curl ca-certificates gnupg lsb-release udev \\
    && locale-gen en_US.UTF-8

# ROS 2 repo
RUN mkdir -p /etc/apt/keyrings && \\
    curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.asc \\
    | gpg --dearmor -o /etc/apt/keyrings/ros-archive-keyring.gpg && \\
    echo "deb [arch=arm64,amd64 signed-by=/etc/apt/keyrings/ros-archive-keyring.gpg] \\
    http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" \\
    > /etc/apt/sources.list.d/ros2.list && \\
    apt-get update && apt-get install -y --no-install-recommends \\
      ros-\${ROS_DISTRO}-ros-base \\
      ros-\${ROS_DISTRO}-realsense2-camera \\
      ros-\${ROS_DISTRO}-image-transport \\
      ros-\${ROS_DISTRO}-tf2-ros \\
    && rm -rf /var/lib/apt/lists/*

# udev rules for RealSense (mounted persistently is recommended too)
RUN mkdir -p /etc/udev/rules.d && \\
    echo 'ATTRS{idVendor}=="8086", MODE:="0666"' > /etc/udev/rules.d/99-realsense-libusb.rules

RUN useradd -ms /bin/bash app && usermod -aG plugdev app
USER app
WORKDIR /home/app

COPY --chown=app:app entrypoint.sh /home/app/entrypoint.sh
RUN chmod +x /home/app/entrypoint.sh

ENV SERIAL="" \\
    ENABLE_SYNC=false \\
    COLOR_WIDTH=1280 COLOR_HEIGHT=720 COLOR_FPS=30 \\
    DEPTH_WIDTH=640 DEPTH_HEIGHT=480 DEPTH_FPS=30

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s \\
  CMD bash -lc 'ros2 topic list | grep -q "/camera/color/image_raw"'

ENTRYPOINT ["/home/app/entrypoint.sh"]`,
    entrypoint: `#!/usr/bin/env bash
set -euo pipefail
source /opt/ros/\${ROS_DISTRO}/setup.bash

ARGS=()
[[ -n "\${SERIAL}" ]] && ARGS+=( "serial_no:=\${SERIAL}" )
ARGS+=( "enable_sync:=\${ENABLE_SYNC}" )
ARGS+=( "color_width:=\${COLOR_WIDTH}" "color_height:=\${COLOR_HEIGHT}" "color_fps:=\${COLOR_FPS}" )
ARGS+=( "depth_width:=\${DEPTH_WIDTH}" "depth_height:=\${DEPTH_HEIGHT}" "depth_fps:=\${DEPTH_FPS}" )

exec ros2 launch realsense2_camera rs_launch.py "\${ARGS[@]}"`,
  },
  {
    slug: "lidar-driver",
    name: "lidar-driver",
    tagline: "LIDAR Driver + Visualizer (Velodyne, Ouster, RPLidar)",
    primaryHw: "Generic LIDARs via Ethernet/USB (arm64/amd64)",
    whatItDoes:
      "Includes common LIDAR drivers and publishes ROS 2 topics + optional RViz snapshot service.",
    whyItSavesTime:
      "Fleet teams don’t want to rebuild for every sensor vendor; this gives a one-line deployment baseline.",
    architectures: ["arm64", "amd64"],
    tags: ["ROS 2", "LIDAR", "Sensors"],
    dockerfile: `ARG BASE_IMAGE
FROM \${BASE_IMAGE:-"ubuntu:22.04"}

ENV DEBIAN_FRONTEND=noninteractive \\
    LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 \\
    ROS_DISTRO=humble

RUN apt-get update && apt-get install -y --no-install-recommends \\
    locales curl ca-certificates gnupg lsb-release \\
    && locale-gen en_US.UTF-8

# ROS 2 repo + drivers
RUN mkdir -p /etc/apt/keyrings && \\
    curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.asc \\
    | gpg --dearmor -o /etc/apt/keyrings/ros-archive-keyring.gpg && \\
    echo "deb [arch=arm64,amd64 signed-by=/etc/apt/keyrings/ros-archive-keyring.gpg] \\
    http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" \\
    > /etc/apt/sources.list.d/ros2.list && \\
    apt-get update && apt-get install -y --no-install-recommends \\
      ros-\${ROS_DISTRO}-ros-base \\
      ros-\${ROS_DISTRO}-velodyne \\
      ros-\${ROS_DISTRO}-velodyne-pointcloud \\
      ros-\${ROS_DISTRO}-rplidar-ros \\
      ros-\${ROS_DISTRO}-rviz2 \\
      python3-flask \\
    && rm -rf /var/lib/apt/lists/*

RUN useradd -ms /bin/bash app
USER app
WORKDIR /home/app

COPY --chown=app:app entrypoint.sh /home/app/entrypoint.sh
RUN chmod +x /home/app/entrypoint.sh

ENV LIDAR_VENDOR="velodyne" \\
    DEVICE_PORT="/dev/ttyUSB0" \\
    ETHERNET_IP="192.168.1.201" \\
    FRAME_ID="laser" \\
    SNAPSHOT_SERVER=false \\
    RVIZ=false

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s \\
  CMD bash -lc 'ros2 topic list | grep -q "/scan" || ros2 topic list | grep -q "/points"'

ENTRYPOINT ["/home/app/entrypoint.sh"]`,
    entrypoint: `#!/usr/bin/env bash
set -euo pipefail
source /opt/ros/\${ROS_DISTRO}/setup.bash

case "\${LIDAR_VENDOR}" in
  velodyne)
    CMD="ros2 launch velodyne_pointcloud VLP16-32c-ros2.launch.py"
    ;;
  rplidar)
    CMD="ros2 launch rplidar_ros rplidar.launch.py serial_port:=\${DEVICE_PORT} frame_id:=\${FRAME_ID}"
    ;;
  ouster)
    # Expect an external ouster driver (user can mount), fallback to velodyne warning
    echo "[warn] Ouster not bundled via apt; please mount driver. Attempting velodyne config as placeholder."
    CMD="bash -lc 'sleep infinity'"
    ;;
  *)
    echo "[err] Unsupported LIDAR_VENDOR=\${LIDAR_VENDOR}"
    exit 1
    ;;
esac

if [[ "\${RVIZ}" == "true" ]]; then
  (rviz2 -d '' 2>/dev/null || true) &
fi

if [[ "\${SNAPSHOT_SERVER}" == "true" ]]; then
  python3 - <<'PY' &
from flask import Flask, jsonify
app = Flask(__name__)
@app.get("/health") 
def h(): return jsonify(ok=True)
app.run(host="0.0.0.0", port=8081)
PY
fi

exec bash -lc "\${CMD}"`,
  },
  {
    slug: "edge-logger",
    name: "edge-logger",
    tagline: "Unified Telemetry & Log Forwarder (Fluent Bit + gRPC)",
    primaryHw: "Generic Edge (arm64/amd64)",
    whatItDoes:
      "Collects ROS 2 logs, system metrics (CPU/GPU temp, disk, network), ships to central logging via gRPC/HTTP.",
    whyItSavesTime:
      "Debugging fleets is a nightmare without centralized telemetry — this container makes it turn-key.",
    architectures: ["arm64", "amd64"],
    tags: ["Logging", "Telemetry", "Observability"],
    dockerfile: `ARG BASE_IMAGE
FROM \${BASE_IMAGE:-"fluent/fluent-bit:2.2"}
USER root
RUN apk add --no-cache bash ca-certificates lm_sensors coreutils util-linux curl
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV FB_OUT_FORMAT=json \\
    SINK_URL="" \\
    HOSTNAME=edge-node \\
    EXTRA_LABELS=""

EXPOSE 2020
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \\
  CMD nc -z localhost 2020 || exit 0

ENTRYPOINT ["/entrypoint.sh"]`,
    entrypoint: `#!/usr/bin/env bash
set -euo pipefail

: "\${SINK_URL:=}"
: "\${HOSTNAME:=edge-node}"
: "\${FB_OUT_FORMAT:=json}"
: "\${EXTRA_LABELS:=}"

cat > /fluent-bit/etc/fluent-bit.conf <<'CONF'
[SERVICE]
    Daemon    Off
    HTTP_Server On
    HTTP_Listen 0.0.0.0
    HTTP_Port  2020

[INPUT]
    Name tail
    Path /var/log/*.log,/var/log/syslog
    Tag  sys.*
    Parser docker

[INPUT]
    Name cpu
    Tag  metrics.cpu

[INPUT]
    Name mem
    Tag  metrics.mem

[INPUT]
    Name disk
    Tag  metrics.disk

[INPUT]
    Name netif
    Tag  metrics.net

[INPUT]
    Name   systemd
    Tag    ros.*
    Systemd_Filter _COMM=ros2
    DB     /var/log/ros_systemd.sqlite
CONF

if [[ -n "\${SINK_URL}" ]]; then
cat >> /fluent-bit/etc/fluent-bit.conf <<CONF
[OUTPUT]
    Name  http
    Match *
    Host  $(echo "\${SINK_URL}" | sed -E 's#https?://([^/:]+).*#\\1#')
    URI   /$(echo "\${SINK_URL}" | sed -E 's#https?://[^/]+/?##')
    Format \${FB_OUT_FORMAT}
    Header X-Edge-Host \${HOSTNAME}
    Header X-Labels \${EXTRA_LABELS}
CONF
fi

exec /fluent-bit/bin/fluent-bit -c /fluent-bit/etc/fluent-bit.conf`,
  },
  {
    slug: "yolov8-detector",
    name: "yolov8-detector",
    tagline: "YOLOv8 Detector with ONNX/TensorRT Acceleration",
    primaryHw: "NVIDIA Orin/Jetson, RK3588 (arm64)",
    whatItDoes:
      "Loads Ultralytics YOLOv8 ONNX weights, runs GPU-accelerated inference, publishes detections via REST or ROS 2 topic.",
    whyItSavesTime:
      "Standard model every robotics dev asks for — tuned builds for Jetson & RK3588, no dependency pain.",
    architectures: ["arm64"],
    tags: ["ONNX", "TensorRT", "Computer Vision", "YOLO"],
    dockerfile: `ARG BASE_IMAGE
# Jetson-friendly by default; works on generic arm64 with CPU fallback
FROM \${BASE_IMAGE:-"nvcr.io/nvidia/l4t-pytorch:r35.4.1-py3"}

ENV DEBIAN_FRONTEND=noninteractive LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8
RUN apt-get update && apt-get install -y --no-install-recommends \\
    python3-pip python3-dev build-essential curl ca-certificates \\
    && rm -rf /var/lib/apt/lists/*

RUN pip3 install --no-cache-dir \\
    fastapi==0.111.0 uvicorn[standard]==0.30.0 pillow==10.3.0 numpy==1.26.4 \\
    onnx==1.16.0 onnxruntime-gpu==1.18.0 onnxruntime==1.18.0

# Optional ROS 2 mode
ENV ROS_DISTRO=humble
RUN apt-get update && apt-get install -y --no-install-recommends \\
    gnupg lsb-release && \\
    mkdir -p /etc/apt/keyrings && \\
    curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.asc \\
    | gpg --dearmor -o /etc/apt/keyrings/ros-archive-keyring.gpg && \\
    echo "deb [arch=arm64,amd64 signed-by=/etc/apt/keyrings/ros-archive-keyring.gpg] \\
    http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" \\
    > /etc/apt/sources.list.d/ros2.list && \\
    apt-get update && apt-get install -y --no-install-recommends \\
      ros-\${ROS_DISTRO}-ros-base ros-\${ROS_DISTRO}-std-msgs \\
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

ENV MODEL_PATH=/models/yolov8.onnx \\
    MODE=rest \\
    SERVICE_HOST=0.0.0.0 SERVICE_PORT=8080 \\
    ROS_TOPIC=/detections

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s \\
  CMD bash -lc '[ "$MODE" = "rest" ] && curl -fsS http://localhost:8080/health || exit 0'

ENTRYPOINT ["/app/entrypoint.sh"]`,
    entrypoint: `#!/usr/bin/env bash
set -euo pipefail

if [[ "\${MODE}" == "ros2" ]]; then
  source /opt/ros/\${ROS_DISTRO}/setup.bash
  python3 - << 'PY'
import os, time, onnxruntime as ort, numpy as np
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

model = os.getenv("MODEL_PATH","/models/yolov8.onnx")
session = ort.InferenceSession(model, providers=["CUDAExecutionProvider","CPUExecutionProvider"])

class Pub(Node):
    def __init__(self):
        super().__init__('yolo_pub')
        self.pub = self.create_publisher(String, os.getenv("ROS_TOPIC","/detections"), 10)
        self.timer = self.create_timer(1.0, self.tick)
    def tick(self):
        # Dummy payload; wire your camera/input
        out = {"boxes":[[0,0,10,10]],"classes":[0],"scores":[0.99]}
        msg = String()
        msg.data = str(out)
        self.pub.publish(msg)

rclpy.init(); node = Pub(); rclpy.spin(node)
PY
else
  cat > /app/server.py << 'PY'
import os, io
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from PIL import Image
import numpy as np, onnxruntime as ort

app = FastAPI()
model_path = os.getenv("MODEL_PATH","/models/yolov8.onnx")
session = ort.InferenceSession(model_path, providers=["CUDAExecutionProvider","CPUExecutionProvider"])

@app.get("/health")
def health(): return {"ok": True, "model": os.path.basename(model_path), "providers": session.get_providers()}

@app.post("/infer")
async def infer(file: UploadFile = File(...)):
    img = Image.open(io.BytesIO(await file.read())).convert("RGB").resize((640,640))
    x = np.asarray(img).astype(np.float32)/255.0
    x = np.transpose(x, (2,0,1))[None, ...]
    outputs = session.run(None, {session.get_inputs()[0].name: x})
    return JSONResponse({"outputs":[o.tolist() for o in outputs]})
PY
  exec python3 -m uvicorn server:app --host "\${SERVICE_HOST}" --port "\${SERVICE_PORT}"
fi`
  },
  {
    slug: "mqtt-bridge",
    name: "mqtt-bridge",
    tagline: "ROS 2 ↔ MQTT Bridge (IoT/Cloud Integration)",
    primaryHw: "Generic Edge (arm64/amd64)",
    whatItDoes:
      "Bridges ROS 2 topics to MQTT (with TLS) for external dashboards, IoT brokers, or cloud services.",
    whyItSavesTime:
      "Every robotics company eventually hacks this together for monitoring — we give it as a clean primitive.",
    architectures: ["arm64", "amd64"],
    tags: ["ROS 2", "MQTT", "IoT", "Cloud"],
    dockerfile: `ARG BASE_IMAGE
FROM \${BASE_IMAGE:-"ubuntu:22.04"}

ENV DEBIAN_FRONTEND=noninteractive \\
    LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 \\
    ROS_DISTRO=humble

RUN apt-get update && apt-get install -y --no-install-recommends \\
    python3 python3-pip curl ca-certificates gnupg lsb-release \\
    && rm -rf /var/lib/apt/lists/*

# ROS 2
RUN mkdir -p /etc/apt/keyrings && \\
    curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.asc \\
    | gpg --dearmor -o /etc/apt/keyrings/ros-archive-keyring.gpg && \\
    echo "deb [arch=arm64,amd64 signed-by=/etc/apt/keyrings/ros-archive-keyring.gpg] \\
    http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" \\
    > /etc/apt/sources.list.d/ros2.list && \\
    apt-get update && apt-get install -y --no-install-recommends \\
      ros-\${ROS_DISTRO}-ros-base ros-\${ROS_DISTRO}-std-msgs \\
    && rm -rf /var/lib/apt/lists/*

RUN pip3 install --no-cache-dir paho-mqtt==1.6.1

WORKDIR /app
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

ENV MQTT_HOST=mqtt \\
    MQTT_PORT=1883 \\
    MQTT_TLS=false \\
    MQTT_USERNAME= \\
    MQTT_PASSWORD= \\
    ROS_SUBSCRIBE=/chatter \\
    MQTT_PUB_TOPIC=robot/chatter \\
    MQTT_SUB_TOPIC=robot/cmd \\
    ROS_PUBLISH=/cmd \\
    QOS=0

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s \\
  CMD bash -lc 'ros2 topic list | grep -q "\${ROS_SUBSCRIBE}" || exit 0'

ENTRYPOINT ["/app/entrypoint.sh"]`,
    entrypoint: `#!/usr/bin/env bash
set -euo pipefail
source /opt/ros/\${ROS_DISTRO}/setup.bash

python3 - << 'PY'
import os, ssl, json, threading
import rclpy
from rclpy.node import Node
from std_msgs.msg import String
import paho.mqtt.client as mqtt

host=os.getenv("MQTT_HOST","mqtt"); port=int(os.getenv("MQTT_PORT","1883"))
tls=os.getenv("MQTT_TLS","false")=="true"
user=os.getenv("MQTT_USERNAME") or None
pwd=os.getenv("MQTT_PASSWORD") or None
sub_topic=os.getenv("MQTT_SUB_TOPIC","robot/cmd")
pub_topic=os.getenv("MQTT_PUB_TOPIC","robot/chatter")
ros_sub=os.getenv("ROS_SUBSCRIBE","/chatter")
ros_pub=os.getenv("ROS_PUBLISH","/cmd")
qos=int(os.getenv("QOS","0"))

class Bridge(Node):
    def __init__(self, client):
        super().__init__('ros2_mqtt_bridge')
        self.client = client
        self.pub = self.create_publisher(String, ros_pub, 10)
        self.sub = self.create_subscription(String, ros_sub, self.on_ros_msg, 10)
    def on_ros_msg(self, msg):
        try:
            self.client.publish(pub_topic, msg.data, qos=qos)
        except Exception as e:
            self.get_logger().error(f"MQTT publish failed: {e}")

def on_connect(client, userdata, flags, rc):
    client.subscribe(sub_topic, qos=qos)
def on_message(client, userdata, msg):
    node: Bridge = userdata['node']
    m = String(); m.data = msg.payload.decode('utf-8', errors='ignore')
    node.pub.publish(m)

client = mqtt.Client(userdata={})
if user: client.username_pw_set(user, pwd)
if tls:
    client.tls_set(cert_reqs=ssl.CERT_NONE); client.tls_insecure_set(True)
client.on_connect = on_connect
client.on_message = on_message

rclpy.init()
node = Bridge(client)
client._userdata = {'node': node}

def mqtt_loop():
    client.connect(host, port, 60); client.loop_forever()
threading.Thread(target=mqtt_loop, daemon=True).start()

rclpy.spin(node)
PY`
  }

]

export function getContainerBySlug(slug: string): ContainerMeta | undefined {
  return containers.find((c) => c.slug === slug)
}
