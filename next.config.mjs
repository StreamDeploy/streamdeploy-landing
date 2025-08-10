/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
}

// Apply optional basePath/assetPrefix (e.g., for GitHub Pages project URLs)
if (process.env.NEXT_BASE_PATH) {
  nextConfig.basePath = process.env.NEXT_BASE_PATH
  nextConfig.assetPrefix = `${process.env.NEXT_BASE_PATH}/`
}

// Alternatively, set a generic asset prefix (e.g., '.' for relative paths)
if (process.env.NEXT_ASSET_PREFIX) {
  nextConfig.assetPrefix = process.env.NEXT_ASSET_PREFIX
}

export default nextConfig
