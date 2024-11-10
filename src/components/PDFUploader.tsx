import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { usePDFStore } from '../store/pdfStore';

export default function PDFUploader() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addSheet } = usePDFStore();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      // In a real application, you would upload to a server
      // For demo purposes, we'll create an object URL
      const url = URL.createObjectURL(file);
      addSheet(file.name, url);
      setIsOpen(false);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        <Upload size={20} />
        Upload PDF
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Upload PDF Sheet</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500"
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF (up to 50MB)</p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            {uploading && (
              <div className="mt-4">
                <div className="animate-pulse bg-indigo-100 h-2 rounded-full" />
                <p className="text-sm text-gray-500 mt-2">Uploading...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}