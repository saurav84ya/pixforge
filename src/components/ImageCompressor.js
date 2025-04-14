// components/ImageCompressor.tsx (Client component)
'use client'
import React, { useState } from 'react'
import ImageInput from '@/components/ImageInput'
import toast from 'react-hot-toast'

export default function ImageCompressor() {
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
    <div>
     <ImageInput key={file ? 'has-file' : 'no-file'} file={file} setFile={setFile} />


      {file && (
        <div className="text-sm text-gray-700 bg-white p-2 rounded shadow max-w-md w-full">
          <strong>Selected:</strong> {file.name} ({(file.size / 1024).toFixed(2)} KB)
        </div>
      )}

      <div className='w-full max-w-md'>
        <label className='block mb-1 text-sm font-medium'>
          Compression Quality: <span className="font-bold text-green-700">{compression}%</span>
        </label>
        <input
          type="range"
          min="10"
          max="100"
          value={compression}
          onChange={(e) => setCompression(Number(e.target.value))}
          className="w-full accent-green-600"
        />
        <p className="text-xs mt-1 text-gray-500">
          Higher % = better quality, lower % = more compression (smaller size)
        </p>
      </div>

      <div className="bg-yellow-100 text-yellow-800 text-sm p-3 my-5 rounded shadow max-w-md w-full">
        💡 <strong>Tip:</strong> For web use, 50–70% gives great balance between quality and size!
      </div>

      <div className="flex gap-4">
        <button
          className='bg-green-600 text-white px-5 py-2 rounded shadow hover:bg-green-700 transition disabled:opacity-50'
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? 'Compressing...' : 'Compress & Download'}
        </button>
        <button
          onClick={handleReset}
          className='bg-gray-300 text-gray-800 px-5 py-2 rounded shadow hover:bg-gray-400 transition'
        >
          Reset
        </button>
      </div>

      {downloadUrl && (
       <div className='mt-6' >
         <a
          href={downloadUrl}
          download="compressed.jpg"
          className=' bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-700 transition'
        >
          Download Compressed Image
        </a>
       </div>
      )}
    </div>
  )
}
