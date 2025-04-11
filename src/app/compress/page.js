'use client'
import React, { useState } from 'react'
import ImageInput from '@/components/ImageInput'
import toast from 'react-hot-toast'

export default function ImageCompressorPage() {
  const [file, setFile] = useState(null)
  const [compression, setCompression] = useState(70)
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    if (!file) return toast.error("Select an image first 😅")

    const formData = new FormData()
    formData.append('image', file)
    formData.append('quality', compression)

    try {
      setLoading(true)
      const res = await fetch('/api/compress', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        setDownloadUrl(url)
        toast.success("Image compressed successfully! 🎉")
      } else {
        toast.error("Compression failed 💔")
      }
    } catch (err) {
      toast.error("Something went wrong 😵‍💫")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className=" flex flex-col  text-gray-800">
      <main className="flex-grow px-4 py-10 flex flex-col min-h-screen justify-center items-center gap-6">
        <h2 className="text-3xl font-bold text-center">Image Compressor Tool</h2>
        <ImageInput file={file} setFile={setFile} />

        <div className='w-full max-w-md'>
          <label className='block mb-2'>Compression: {compression}%</label>
          <input
            type="range"
            min="10"
            max="100"
            value={compression}
            onChange={(e) => setCompression(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <button
          className='bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50'
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? 'Compressing...' : 'Compress & Upload'}
        </button>

        {downloadUrl && (
          <a
            href={downloadUrl}
            download="compressed.jpg"
            className='mt-4 bg-blue-600 text-white px-4 py-2 rounded'
          >
            Download Compressed Image
          </a>
        )}
      </main>
    </div>
  )
}
