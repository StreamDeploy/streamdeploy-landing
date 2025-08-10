export default function SocialProof() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-2xl font-bold">Trusted by the growing Jetson ecosystem</h3>
          <p className="mt-3 text-gray-700 dark:text-gray-300">
            1M+ developers and 6,000+ companies build on Jetson. Existing OTA solutions are fragmented, costly, or not
            GPU‑aware — StreamDeploy bridges that gap with a driver‑safe, robotics‑first platform.
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-gray-600 dark:text-gray-400">Jetson community</dt>
              <dd className="text-2xl font-bold">1M+ devs</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600 dark:text-gray-400">Companies building</dt>
              <dd className="text-2xl font-bold">6,000+</dd>
            </div>
          </dl>
        </div>
        <div className="grid grid-cols-2 items-center gap-6 sm:grid-cols-3">
          <img src="/placeholder.svg?height=60&width=140" alt="Partner logo" className="h-10 w-auto opacity-80" />
          <img src="/placeholder.svg?height=60&width=140" alt="Partner logo" className="h-10 w-auto opacity-80" />
          <img src="/placeholder.svg?height=60&width=140" alt="Partner logo" className="h-10 w-auto opacity-80" />
          <img src="/placeholder.svg?height=60&width=140" alt="Partner logo" className="h-10 w-auto opacity-80" />
          <img src="/placeholder.svg?height=60&width=140" alt="Partner logo" className="h-10 w-auto opacity-80" />
          <img src="/placeholder.svg?height=60&width=140" alt="Partner logo" className="h-10 w-auto opacity-80" />
        </div>
      </div>
    </div>
  )
}
