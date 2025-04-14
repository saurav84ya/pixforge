'use client'

import React, { useState } from 'react'
import ImageInput from './ImageInput'
import toast from 'react-hot-toast'

export default function ImageConverter() {
  const [file, setFile] = useState(null)
  const [format, setFormat] = useState('jpeg')
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleConvert = async () => {
    if (!file) return toast.error("Please upload an image 😅")

    const formData = new FormData()
    formData.append('image', file)
    formData.append('convertTo', format)

    try {
      setLoading(true)
      const res = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        setDownloadUrl(url)
        toast.success("Image converted! 🎉")
      } else {
        toast.error("Conversion failed 💔")
      }
    } catch (err) {
      toast.error("Something went wrong 😵")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
     <ImageInput key={file ? 'has-file' : 'no-file'} file={file} setFile={setFile} />


      <div className='w-full max-w-md'>
        <label className='block mb-1 font-medium'>Choose Output Format:</label>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className='w-full border px-2 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400'
        >
          <option value="jpeg">JPEG</option>
          <option value="png">PNG</option>
          <option value="webp">WEBP</option>
          <option value="avif">AVIF</option>
          <option value="tiff">TIFF</option>
        </select>
      </div>

      <div className='bg-yellow-100 text-yellow-800 p-4 rounded max-w-md text-sm shadow-inner'>
        💡 <strong>Tip:</strong> For best results, try converting PNG to WebP or AVIF to reduce file size while keeping good quality!
      </div>

      <button
        onClick={handleConvert}
        disabled={loading}
        className='bg-purple-600 text-white px-5 py-2 rounded shadow-md hover:bg-purple-700 transition disabled:opacity-50'
      >
        {loading ? 'Converting...' : 'Convert Format'}
      </button>

      {downloadUrl && (
        <a
          href={downloadUrl}
          download={`converted.${format}`}
          className='mt-4 bg-green-600 text-white px-5 py-2 rounded shadow-md hover:bg-green-700 transition'
        >
          Download Converted Image
        </a>
      )}
    </>
  )
}
