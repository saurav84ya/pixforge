'use client'
import React, { useState } from 'react'
import ImageInput from '@/components/ImageInput'
import toast from 'react-hot-toast'

export default function ImageConverterPage() {
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
    <div className=" flex flex-col bg-gray-50 text-gray-800">
      <main className="flex-grow px-4 py-10 flex flex-col min-h-screen justify-center items-center gap-6">
        <h2 className="text-3xl font-bold text-center">Image Format Converter</h2>
        <ImageInput file={file} setFile={setFile} />

        <div className='w-full max-w-md'>
          <label className='block mb-1'>Convert to:</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className='w-full border px-2 py-1 rounded'
          >
            <option value="jpeg">JPEG</option>
            <option value="png">PNG</option>
            <option value="webp">WEBP</option>
            <option value="avif">AVIF</option>
            <option value="tiff">TIFF</option>
          </select>
        </div>

        <button
          onClick={handleConvert}
          disabled={loading}
          className='bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50'
        >
          {loading ? 'Converting...' : 'Convert Format'}
        </button>

        {downloadUrl && (
          <a
            href={downloadUrl}
            download={`converted.${format}`}
            className='mt-4 bg-green-600 text-white px-4 py-2 rounded'
          >
            Download Converted Image
          </a>
        )}
      </main>
    </div>
  )
}
