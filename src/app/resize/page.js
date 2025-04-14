// app/resize/page.tsx (Server component)
import ImageResizer from '@/components/ImageResizer'



export default function ImageResizerPage() {
  return (
    <div className="flex flex-col text-gray-800">
      <main className="flex-grow min-h-screen px-4 py-10 flex flex-col mt-5 md:mt-10 items-center gap-6">
        <h2 className="text-3xl font-bold text-center">🖼️ Image Resizer Tool</h2>
        <p className="text-center max-w-2xl text-gray-600">
          Easily resize your images by specifying the width, height, and quality.
          This tool helps you optimize images for faster loading without compromising visual quality.✨
        </p>

        {/* Client Component */}
        <ImageResizer />
      </main>
    </div>
  )
}



export const metadata = {
  title: "Resize Image – PixForge",
  description: "Resize your images by setting custom width and height, or keep aspect ratio with PixForge.",
  keywords: ["resize image", "image resizer", "resize photo", "resize jpg", "PixForge"],
  openGraph: {
    title: "Resize Image – PixForge",
    description: "Resize and scale images easily online with PixForge – free and simple.",
    url: "https://pixforge-five.vercel.app/resize",
    siteName: "PixForge",
    images: [
      {
        url: "/heroImage.png",
        width: 1200,
        height: 630,
        alt: "Resize Image Preview",
      },
    ],
    type: "website",
  },
}
