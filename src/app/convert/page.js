// 'use client'
// import React, { useState } from 'react'
// import ImageInput from '@/components/ImageInput'
// import toast from 'react-hot-toast'

// export default function ImageConverterPage() {
//   const [file, setFile] = useState(null)
//   const [format, setFormat] = useState('jpeg')
//   const [downloadUrl, setDownloadUrl] = useState(null)
//   const [loading, setLoading] = useState(false)

//   const handleConvert = async () => {
//     if (!file) return toast.error("Please upload an image 😅")

//     const formData = new FormData()
//     formData.append('image', file)
//     formData.append('convertTo', format)

//     try {
//       setLoading(true)
//       const res = await fetch('/api/convert', {
//         method: 'POST',
//         body: formData,
//       })

//       if (res.ok) {
//         const blob = await res.blob()
//         const url = URL.createObjectURL(blob)
//         setDownloadUrl(url)
//         toast.success("Image converted! 🎉")
//       } else {
//         toast.error("Conversion failed 💔")
//       }
//     } catch (err) {
//       toast.error("Something went wrong 😵")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="flex flex-col text-gray-800">
//       <main className="flex-grow px-4 py-10 flex flex-col min-h-screen mt-5 md:mt-10 items-center gap-6">
//         <h2 className="text-3xl font-bold text-center">🛠️ Image Format Converter</h2>
//         <p className="text-center text-gray-600 max-w-xl">
//           Easily convert your images to different formats like JPEG, PNG, WEBP, AVIF, or TIFF. Just upload, select a format, and click convert!
//         </p>

//         <ImageInput file={file} setFile={setFile} />

//         <div className='w-full max-w-md'>
//           <label className='block mb-1 font-medium'>Choose Output Format:</label>
//           <select
//             value={format}
//             onChange={(e) => setFormat(e.target.value)}
//             className='w-full border px-2 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400'
//           >
//             <option value="jpeg">JPEG</option>
//             <option value="png">PNG</option>
//             <option value="webp">WEBP</option>
//             <option value="avif">AVIF</option>
//             <option value="tiff">TIFF</option>
//           </select>
//         </div>

//         <div className='bg-yellow-100 text-yellow-800 p-4 rounded max-w-md text-sm shadow-inner'>
//           💡 <strong>Tip:</strong> For best results, try converting PNG to WebP or AVIF to reduce file size while keeping good quality!
//         </div>

//         <button
//           onClick={handleConvert}
//           disabled={loading}
//           className='bg-purple-600 text-white px-5 py-2 rounded shadow-md hover:bg-purple-700 transition disabled:opacity-50'
//         >
//           {loading ? 'Converting...' : 'Convert Format'}
//         </button>

//         {downloadUrl && (
//           <a
//             href={downloadUrl}
//             download={`converted.${format}`}
//             className='mt-4 bg-green-600 text-white px-5 py-2 rounded shadow-md hover:bg-green-700 transition'
//           >
//             Download Converted Image
//           </a>
//         )}
//       </main>
//     </div>
//   )
// }





import ImageConverter from '@/components/ImageConverter'


export default function ConvertPage() {
  return (
    <div className="flex flex-col text-gray-800">
      <main className="flex-grow px-4 py-10 flex flex-col min-h-screen mt-5 md:mt-10 items-center gap-6">
        <h2 className="text-3xl font-bold text-center">🛠️ Image Format Converter</h2>
        <p className="text-center text-gray-600 max-w-xl">
          Easily convert your images to different formats like JPEG, PNG, WEBP, AVIF, or TIFF. Just upload, select a format, and click convert!
        </p>

        <ImageConverter /> 
      </main>
    </div>
  )
}


export const metadata = {
  title: "Convert Image – PixForge",
  description: "Convert your images between formats like JPG, PNG, and WEBP with PixForge. Fast, free, and secure!",
  keywords: ["convert image", "jpg to png", "png to webp", "image format converter", "PixForge"],
  openGraph: {
    title: "Convert Image – PixForge",
    description: "Convert image formats easily and quickly using PixForge",
    url: "https://pixforge-five.vercel.app/convert",
    siteName: "PixForge",
    images: [
      {
        url: "/heroImage.png",
        width: 1200,
        height: 630,
        alt: "Convert Image Preview",
      },
    ],
    type: "website",
  },
}
