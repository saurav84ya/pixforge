'use client'
import React, { useState } from 'react'
import ImageInput from '@/components/ImageInput'
import toast from 'react-hot-toast'

export default function ImageResizerPage() {
  const [file, setFile] = useState(null)
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [quality, setQuality] = useState(80)
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleResize = async () => {
    if (!file) return toast.error("Select an image first 😅")

    const formData = new FormData()
    formData.append('image', file)
    formData.append('width', width)
    formData.append('height', height)
    formData.append('quality', quality)

    try {
      setLoading(true)
      const res = await fetch('/api/resize', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        setDownloadUrl(url)
        toast.success("Image resized successfully! 🎉")
      } else {
        toast.error("Resize failed 💔")
      }
    } catch (err) {
      toast.error("Something went wrong 😵‍💫")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className=" flex flex-col text-gray-800">
      <main className="flex-grow min-h-screen px-4 py-10 flex flex-col justify-center items-center gap-6">
        <h2 className="text-3xl font-bold text-center">Image Resizer Tool</h2>
        <ImageInput file={file} setFile={setFile} />

        <div className='w-full max-w-md grid grid-cols-2 gap-4'>
          <div>
            <label className='block mb-1'>Width (px)</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder='Optional'
              className="w-full border px-2 py-1 rounded"
            />
          </div>
          <div>
            <label className='block mb-1'>Height (px)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder='Optional'
              className="w-full border px-2 py-1 rounded"
            />
          </div>
        </div>

        <div className='w-full max-w-md'>
          <label className='block mb-2'>Quality: {quality}%</label>
          <input
            type="range"
            min="10"
            max="100"
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <button
          className='bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50'
          onClick={handleResize}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Resize & Upload'}
        </button>

        {downloadUrl && (
          <a
            href={downloadUrl}
            download="resized.jpg"
            className='mt-4 bg-green-600 text-white px-4 py-2 rounded'
          >
            Download Resized Image
          </a>
        )}
      </main>
    </div>
  )
}
