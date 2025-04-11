'use client'
import React, { useState, useEffect } from 'react'

export default function ImageInput({ file, setFile }) {
  const [previewUrl, setPreviewUrl] = useState(null)

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
    } else {
      setPreviewUrl(null)
    }
  }, [file])

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile)
    }
  }

  const handleChange = (e) => {
    const selected = e.target.files?.[0]
    if (selected && selected.type.startsWith('image/')) {
      setFile(selected)
    }
  }

  const handleDragOver = (e) => e.preventDefault()

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="w-full max-w-md border-2 border-dashed border-gray-400 p-6 rounded-lg text-center cursor-pointer hover:border-blue-500 transition"
      >
        <label htmlFor="fileInput" className="block cursor-pointer">
          {file ? (
            <p className="text-green-600 font-medium">{file.name}</p>
          ) : (
            <div className='flex justify-center flex-col items-center'>
              <p className='p-6 bg-blue-500 w-[160px] rounded-md font-bold text-white'>Select Image</p>
              <p className='opacity-70 text-sm'>or Drag & Drop here</p>
            </div>
          )}
        </label>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {previewUrl && (
        <div className='w-full max-w-md'>
          <img
            src={previewUrl}
            alt="Preview"
            className='mt-4 rounded-md border shadow-md max-h-64 object-contain mx-auto'
          />
        </div>
      )}
    </div>
  )
}
