'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

interface ImageUploadProps {
  onUpload: (files: File[]) => Promise<string[]>
  existingImages?: string[]
  multiple?: boolean
  label?: string
}

export default function ImageUpload({ 
  onUpload, 
  existingImages = [], 
  multiple = false,
  label = 'Upload Image'
}: ImageUploadProps) {
  const [uploadedImages, setUploadedImages] = useState<string[]>(existingImages)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return

    setUploading(true)
    setError(null)

    try {
      const urls = await onUpload(acceptedFiles)
      if (multiple) {
        setUploadedImages(prev => [...prev, ...urls])
      } else {
        setUploadedImages(urls)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }, [onUpload, multiple])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple,
    disabled: uploading
  })

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {multiple && '(Multiple)'}
      </label>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-navigatepinawa-blue bg-blue-50'
            : 'border-gray-300 hover:border-gray-400 bg-gray-50'
        } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navigatepinawa-blue mb-2"></div>
            <p className="text-sm text-gray-600">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <svg
              className="w-12 h-12 text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-sm text-gray-600">
              {isDragActive
                ? 'Drop the images here...'
                : 'Drag & drop images here, or click to select'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG, WEBP up to 10MB
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Preview Images */}
      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {uploadedImages.map((url, index) => (
            <div key={index} className="relative group">
              <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={url}
                  alt={`Upload ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  type="button"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hidden input to store image URLs for form submission */}
      {multiple ? (
        uploadedImages.map((url, index) => (
          <input key={index} type="hidden" name={`gallery[${index}]`} value={url} />
        ))
      ) : (
        uploadedImages.length > 0 && (
          <input type="hidden" name="mainImage" value={uploadedImages[0]} />
        )
      )}
    </div>
  )
}

