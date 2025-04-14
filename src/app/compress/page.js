// app/convert/page.tsx (Server component)
import ImageCompressor from '@/components/ImageCompressor'



export default function ImageCompressorPage() {
  return (
    <div className="flex flex-col min-h-screen text-gray-800">
      <main className="flex-grow px-4 py-10 flex flex-col mt-5 md:mt-10 items-center gap-6">
        <h2 className="text-3xl font-bold text-center text-green-700">🗜️ Image Compressor Tool</h2>
        <p className="text-center text-sm text-gray-600 max-w-md">
          Upload any image and compress it to reduce file size without losing much quality. Just slide and compress! 🔧✨
        </p>

        {/* Client Component */}
        <ImageCompressor />
      </main>
    </div>
  )
}


export const metadata = {
  title: "Compress Image – PixForge",
  description: "Reduce image file size while keeping quality intact using PixForge's powerful online image compressor.",
  keywords: ["compress image", "image compressor", "reduce image size", "image optimization", "PixForge"],
  openGraph: {
    title: "Compress Image – PixForge",
    description: "Compress and optimize images online for web and sharing – fast and easy!",
    url: "https://pixforge-five.vercel.app/compress",
    siteName: "PixForge",
    images: [
      {
        url: "/heroImage.png",
        width: 1200,
        height: 630,
        alt: "Compress Image Preview",
      },
    ],
    type: "website",
  },
}

