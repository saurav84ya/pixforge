import Image from 'next/image'
import Link from 'next/link'
import heroImage from '../../public/heroImage.png' // Replace with your own image

export default function Home() {
  return (
    <main className="flex flex-col justify-between px-6 py-10 text-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center gap-10 max-w-6xl mx-auto">
        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-green-800">
            🛠️ Convert, Resize & Optimize Images Online
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto md:mx-0">
            All-in-one image tool for converting formats, resizing resolution, compressing file size, and more – no login required!
          </p>
          <Link href="#tools">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition">
              🚀 Get Started
            </button>
          </Link>
        </div>

        {/* Image */}
        <div className="flex-1">
          <Image
            src={heroImage}
            alt="Image Tools Preview"
            className="w-full rounded-2xl max-w-md mx-auto"
            priority
          />
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="mt-20 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">✨ Our Tools</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 text-center">
          <Link href="/resize">
            <div className="border rounded-xl p-6 shadow-sm hover:shadow-lg transition bg-white hover:bg-blue-50">
              <h3 className="font-semibold text-lg text-blue-700 mb-2">🔍 Image Resizer</h3>
              <p className="text-sm text-gray-500">Resize image by width, height, or maintain aspect ratio</p>
            </div>
          </Link>
          <Link href="/compress">
            <div className="border rounded-xl p-6 shadow-sm hover:shadow-lg transition bg-white hover:bg-green-50">
              <h3 className="font-semibold text-lg text-green-700 mb-2">🗜️ Compressor</h3>
              <p className="text-sm text-gray-500">Shrink image file size with minimal quality loss</p>
            </div>
          </Link>
          <Link href="/convert">
            <div className="border rounded-xl p-6 shadow-sm hover:shadow-lg transition bg-white hover:bg-yellow-50">
              <h3 className="font-semibold text-lg text-yellow-700 mb-2">🔄 Format Converter</h3>
              <p className="text-sm text-gray-500">Switch between JPG, PNG, WebP and more formats</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Optional Footer Placeholder */}
      {/* <footer className="mt-20 text-center text-gray-500 text-sm">
        © 2025 YourToolName. All rights reserved.
      </footer> */}
    </main>
  )
}


export const metadata = {
  title: "PixForge",
  description: "All-in-one online image tool to convert, resize, and compress images easily. No login required. Fast and free!",
  keywords: ["image converter", "image resizer", "compress image", "online image tool", "jpg to png", "resize photo" , "PixForge"],
  authors: [{ name: "Saurav chaurasia " }],
  openGraph: {
    title: "PixForge",
    description: "Fast, free image optimization tools online",
    url: "https://pixforge-five.vercel.app/",
    siteName: "PixForge",
    images: [
      {
        url: "/heroImage.png", // og:image for social sharing
        width: 1200,
        height: 630,
        alt: "Image Toolbox Preview",
      },
    ],
    type: "website",
  },
}
