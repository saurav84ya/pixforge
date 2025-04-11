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

  const handleReset = () => {
    setFile(null)
    setCompression(70)
    setDownloadUrl(null)
  }

  return (
    <div className="flex flex-col min-h-screen    text-gray-800">
      <main className="flex-grow px-4 py-10 flex flex-col mt-5 md:mt-10  items-center gap-6">
        <h2 className="text-3xl font-bold text-center text-green-700">Image Compressor Tool</h2>
        <p className="text-center text-sm text-gray-600 max-w-md">
          Upload any image and compress it to reduce file size without losing much quality. 🖼️✨
        </p>

        <ImageInput file={file} setFile={setFile} />

        {file && (
          <div className="text-sm text-gray-700 bg-white p-2 rounded shadow max-w-md w-full">
            <strong>Selected:</strong> {file.name} ({(file.size / 1024).toFixed(2)} KB)
          </div>
        )}

        <div className='w-full max-w-md'>
          <label className='block mb-1 text-sm font-medium'>Compression: <span className="font-bold">{compression}%</span></label>
          <input
            type="range"
            min="10"
            max="100"
            value={compression}
            onChange={(e) => setCompression(Number(e.target.value))}
            className="w-full accent-green-600"
          />
          <p className="text-xs mt-1 text-gray-500">Higher % = better quality, lower % = more compression</p>
        </div>

        <div className="flex gap-4">
          <button
            className='bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50'
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? 'Compressing...' : 'Compress & Download'}
          </button>
          <button
            onClick={handleReset}
            className='bg-gray-300 text-gray-800 px-4 py-2 rounded'
          >
            Reset
          </button>
        </div>

        {downloadUrl && (
          <a
            href={downloadUrl}
            download="compressed.jpg"
            className='mt-4 bg-blue-600 text-white px-4 py-2 rounded shadow'
          >
            Download Compressed Image
          </a>
        )}
      </main>
    </div>
  )
}
