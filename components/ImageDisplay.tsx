
import React from 'react';
import DownloadIcon from './icons/DownloadIcon';

interface ImageDisplayProps {
  src: string;
  alt: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ src, alt }) => {
  return (
    <div className="relative group bg-slate-700 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4 text-slate-200">Result</h3>
      <div className="aspect-square w-full bg-slate-900 rounded-md overflow-hidden flex items-center justify-center">
        <img src={src} alt={alt} className="max-h-full max-w-full object-contain" />
      </div>
      <a
        href={src}
        download={`${alt.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.png`}
        className="absolute top-4 right-4 bg-sky-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
        aria-label="Download image"
      >
        <DownloadIcon className="w-6 h-6" />
      </a>
    </div>
  );
};

export default ImageDisplay;
