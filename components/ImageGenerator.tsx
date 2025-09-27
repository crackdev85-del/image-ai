import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';
import ImageDisplay from './ImageDisplay';
import Spinner from './Spinner';
import PromptInput from './PromptInput';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!prompt) {
      setError('Please provide a prompt to generate an image.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const resultBase64 = await generateImage(prompt);
      setGeneratedImage(`data:image/png;base64,${resultBase64}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-xl space-y-6">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-2">
          Image Prompt
        </label>
        <PromptInput
          id="prompt"
          value={prompt}
          onValueChange={setPrompt}
          placeholder="A photorealistic image of a cat wearing sunglasses, studio lighting..."
          disabled={isLoading}
          rows={4}
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={isLoading || !prompt}
        className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
      >
        {isLoading && <Spinner />}
        {isLoading ? 'Generating...' : 'Generate Image'}
      </button>

      {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-md">{error}</div>}

      {isLoading && !generatedImage && (
        <div className="flex flex-col items-center justify-center bg-slate-700 rounded-lg p-8 min-h-[400px]">
            <Spinner large={true} />
            <p className="mt-4 text-slate-300">Generating your image, this might take a moment...</p>
        </div>
      )}
      
      {generatedImage && <ImageDisplay src={generatedImage} alt="Generated Image" />}
    </div>
  );
};

export default ImageGenerator;