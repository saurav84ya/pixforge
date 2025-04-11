'use client'
import React, { useState } from 'react'

export default function Page() {
  const [file, setFile] = useState(null)
  const [downloadUrl, setDownloadUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    if (!file) return alert("Please select an image")

    setLoading(true)
    setDownloadUrl('')

    const formData = new FormData()
    formData.append('image', file)

    const res = await fetch('http://localhost:3000/api/compress', {
      method: 'POST',
      body: formData
    })

    setLoading(false)

    if (res.ok) {
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      setDownloadUrl(url)
    } else {
      alert("Failed to process image")
    }
  }

  return (
    <div className='p-5'>
      <h1 className='text-2xl mb-4'>🖼️ Image Upload & Convert</h1>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button
        className='bg-blue-600 text-white px-4 py-2 mt-4 rounded'
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Upload & Process'}
      </button>

      {downloadUrl && (
        <a
          href={downloadUrl}
          download="processed.jpg"
          className='bg-green-600 text-white px-4 py-2 mt-4 rounded inline-block ml-4'
        >
          ⬇️ Download Image
        </a>
      )}
    </div>
  )
}
