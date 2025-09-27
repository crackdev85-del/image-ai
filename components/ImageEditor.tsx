import React, { useState } from 'react';
import { editImage } from '../services/geminiService';
import ImageUpload from './ImageUpload';
import ImageDisplay from './ImageDisplay';
import Spinner from './Spinner';
import PromptInput from './PromptInput';

const ImageEditor: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (file: File) => {
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setEditedImage(null);
  };
  
  const handleSubmit = async () => {
    if (!imageFile || !prompt) {
      setError('Please upload an image and provide an editing prompt.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const resultBase64 = await editImage(imageFile, prompt);
      setEditedImage(`data:image/png;base64,${resultBase64}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-xl space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ImageUpload onFileChange={handleFileChange} previewUrl={previewUrl} />
        <div className="flex flex-col space-y-4">
            <PromptInput
              value={prompt}
              onValueChange={setPrompt}
              placeholder="Describe your edit, e.g., 'add a birthday hat on the dog'"
              disabled={isLoading}
              rows={5}
              containerClassName="h-full flex-grow"
            />
            <button
                onClick={handleSubmit}
                disabled={isLoading || !imageFile || !prompt}
                className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
            >
                {isLoading && <Spinner />}
                {isLoading ? 'Editing...' : 'Edit Image'}
            </button>
        </div>
      </div>
      
      {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-md">{error}</div>}
      
      {isLoading && !editedImage &&
        <div className="flex flex-col items-center justify-center bg-slate-700 rounded-lg p-8 min-h-[300px]">
            <Spinner large={true} />
            <p className="mt-4 text-slate-300">Editing your image, this may take a moment...</p>
        </div>
      }

      {editedImage && <ImageDisplay src={editedImage} alt="Edited Image" />}
    </div>
  );
};

export default ImageEditor;