'use client';

import { useState } from 'react';

export default function ImageUploader() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url');

  const handleUrlUpload = () => {
    if (!imageUrl) {
      alert('Please enter an image URL');
      return;
    }

    // In production, you might want to validate the URL or proxy it
    navigator.clipboard.writeText(imageUrl);
    alert('Image URL copied to clipboard! Paste it into your content.');
    setImageUrl('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    // In production, you would upload to your storage service (S3, Cloudinary, etc.)
    // For demo, we'll create a local URL
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;

      // Store in localStorage as demo
      const images = JSON.parse(localStorage.getItem('uploaded-images') || '[]');
      const newImage = {
        id: Date.now().toString(),
        name: file.name,
        url: dataUrl,
        timestamp: Date.now(),
      };
      images.push(newImage);
      localStorage.setItem('uploaded-images', JSON.stringify(images));

      setUploading(false);
      alert('Image uploaded! URL copied to clipboard.');
      navigator.clipboard.writeText(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Upload Images</h2>

        {/* Method Toggle */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setUploadMethod('url')}
            className={`px-4 py-2 rounded-lg font-medium ${
              uploadMethod === 'url'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            From URL
          </button>
          <button
            onClick={() => setUploadMethod('file')}
            className={`px-4 py-2 rounded-lg font-medium ${
              uploadMethod === 'file'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Upload File
          </button>
        </div>

        {/* URL Method */}
        {uploadMethod === 'url' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <button onClick={handleUrlUpload} className="btn-primary">
              Copy URL
            </button>

            {imageUrl && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="max-w-md rounded-lg border"
                  onError={() => alert('Invalid image URL')}
                />
              </div>
            )}
          </div>
        )}

        {/* File Upload Method */}
        {uploadMethod === 'file' && (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <svg
                  className="w-12 h-12 text-gray-400 mb-4"
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
                <span className="text-gray-600">
                  {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                </span>
                <span className="text-sm text-gray-500 mt-1">
                  PNG, JPG, GIF up to 10MB
                </span>
              </label>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="text-sm text-blue-800">
                <strong>Production Setup:</strong> Integrate with cloud storage like:
              </p>
              <ul className="list-disc list-inside text-sm text-blue-700 mt-2">
                <li>Cloudinary (recommended for optimization)</li>
                <li>AWS S3</li>
                <li>Google Cloud Storage</li>
                <li>Vercel Blob Storage</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Image Library */}
      <ImageLibrary />
    </div>
  );
}

function ImageLibrary() {
  const [images, setImages] = useState<any[]>([]);

  useState(() => {
    const stored = localStorage.getItem('uploaded-images');
    if (stored) {
      setImages(JSON.parse(stored));
    }
  });

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('Image URL copied!');
  };

  const deleteImage = (id: string) => {
    if (confirm('Delete this image?')) {
      const updated = images.filter(img => img.id !== id);
      setImages(updated);
      localStorage.setItem('uploaded-images', JSON.stringify(updated));
    }
  };

  if (images.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">Image Library</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.id} className="group relative">
            <img
              src={image.url}
              alt={image.name}
              className="w-full h-32 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
              <button
                onClick={() => copyUrl(image.url)}
                className="px-3 py-1 bg-white text-gray-900 rounded text-sm"
              >
                Copy
              </button>
              <button
                onClick={() => deleteImage(image.id)}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
