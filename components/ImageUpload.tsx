
import React, { useRef } from 'react';
import UploadIcon from './icons/UploadIcon';

interface ImageUploadProps {
  onFileChange: (file: File) => void;
  previewUrl: string | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onFileChange, previewUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileChange(file);
    }
  };

  return (
    <div
      className="relative w-full h-64 md:h-full bg-slate-700 rounded-lg border-2 border-dashed border-slate-500 flex items-center justify-center text-center p-4 cursor-pointer hover:border-sky-500 transition-colors"
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
      />
      {previewUrl ? (
        <img src={previewUrl} alt="Preview" className="max-h-full max-w-full object-contain rounded-md" />
      ) : (
        <div className="text-slate-400">
          <UploadIcon className="w-12 h-12 mx-auto mb-2" />
          <p className="font-semibold">Click to upload an image</p>
          <p className="text-sm">PNG, JPG, or WEBP</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
