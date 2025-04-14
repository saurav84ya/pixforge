// components/ImageResizer.tsx (Client component)
'use client'
import React, { useState } from 'react'
import ImageInput from '@/components/ImageInput'
import toast from 'react-hot-toast'

export default function ImageResizer() {
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

  const handleReset = () => {
    setFile(null)
    setWidth('')
    setHeight('')
    setQuality(80)
    setDownloadUrl(null)
  }

  return (
    <div>
      <ImageInput key={file ? 'has-file' : 'no-file'} file={file} setFile={setFile} />

      <div className="text-sm text-gray-500">
        Supported formats: JPG, PNG, JPEG
      </div>

      <div className="w-full max-w-md grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Width (px)</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="Optional"
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Height (px)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Optional"
            className="w-full border px-2 py-1 rounded"
          />
        </div>
      </div>

      <div className="w-full max-w-md">
        <label className="block mb-2">Quality: {quality}%</label>
        <input
          type="range"
          min="10"
          max="100"
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="w-full max-w-md my-5 text-sm text-yellow-600 bg-yellow-50 p-3 rounded border border-yellow-300">
        ℹ️ <strong>Tip:</strong> Leaving width and height empty will keep the original aspect ratio. Lower quality means smaller file size.
      </div>

      <div className="flex gap-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={handleResize}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Resize & Upload'}
        </button>

        <button
          className="bg-gray-400 text-white px-4 py-2 rounded"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      {downloadUrl && (
        <div className='mt-4' >
        <a
          href={downloadUrl}
          download="resized.jpg"
          className=" bg-green-600 text-white px-4 py-2 rounded"
        >
          Download Resized Image
        </a></div>
      )}
    </div>
  )
}
