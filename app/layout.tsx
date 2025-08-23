import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  metadataBase: new URL("https://streamdeploy.com"),
  title:
    "StreamDeploy – Container OTA for Robotics & Edge AI Fleets | Jetson, Coral, ROC-RK3588, ROS2",
  description:
    "StreamDeploy is the robotics deployment platform for edge AI. Deploy containerized apps to NVIDIA Jetson Orin, Google Coral TPU, ROC-RK3588, and ROS2-based fleets with safe OTA, canary rollouts, offline-first reliability, and instant rollback.",
  keywords: [
    "robotics deployment platform",
    "container OTA",
    "robotic fleet management",
    "NVIDIA Jetson Orin",
    "Google Coral TPU",
    "ROC-RK3588",
    "ROS2",
    "edge AI deployment",
    "robot OTA updates",
    "offline-first OTA",
  ],
  alternates: {
    canonical: "https://streamdeploy.com/",
  },
  openGraph: {
    type: "website",
    url: "https://streamdeploy.com/",
    siteName: "StreamDeploy",
    title:
      "StreamDeploy – OTA & Deployment for Robotics Fleets | Jetson, Coral, ROC-RK3588, ROS2",
    description:
      "Fleet-scale container OTA for robotics and edge AI devices. Safe rollouts with canaries, driver compatibility checks, analytics, and one-command rollback. Works across Jetson, Coral, ROC-RK3588, and ROS2 robots.",
    images: [
      {
        url: "https://streamdeploy.com/og/streamdeploy-og.png",
        width: 1200,
        height: 630,
        alt: "StreamDeploy – GitOps for Robotic Fleets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@streamdeploy",
    title:
      "StreamDeploy – Container OTA for Robotics & Edge AI Fleets | Multi-platform",
    description:
      "Deploy containers to Jetson, Coral, ROC-RK3588, and ROS2 robots with safe OTA, canary rollouts, offline-first reliability, and instant rollback.",
    images: ["https://streamdeploy.com/og/streamdeploy-og.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
