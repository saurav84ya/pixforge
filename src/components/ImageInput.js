'use client'

import React, { useState } from 'react'

export default function ImageInpute() {
  const [selectedFile, setSelectedFile] = useState(null)

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
    }
  }

  const handleChange = (e) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div className="flex flex-col items-center justify-center  px-4">

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="w-full max-w-md border-2 border-dashed border-gray-400 p-6 rounded-lg text-center cursor-pointer hover:border-blue-500 transition"
      >
        <label htmlFor="fileInput" className="block cursor-pointer">
          {selectedFile ? (
            <p className="text-green-600 font-medium">{selectedFile.name}</p>
          ) : (
            <div className='flex justify-center flex-col items-center' >

                <p className='p-6 bg-blue-500 w-[160px] rounded-md font-bold text-white ' >Select Image</p>

                <p className='opacity-70 text-sm' >or Drage & Drop here</p>

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

        
    </div>
  )
}
