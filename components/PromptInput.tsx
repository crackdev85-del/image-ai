import React, { useState } from 'react';
import { generatePrompt } from '../services/geminiService';
import SparklesIcon from './icons/SparklesIcon';
import Spinner from './Spinner';

interface PromptInputProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  rows?: number;
  id?: string;
  containerClassName?: string;
}

const PromptInput: React.FC<PromptInputProps> = ({
  value,
  onValueChange,
  placeholder,
  disabled = false,
  rows = 4,
  id,
  containerClassName = ''
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePrompt = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const newPrompt = await generatePrompt();
      onValueChange(newPrompt);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate prompt.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`relative ${containerClassName}`}>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-full p-3 pr-12 bg-slate-700 text-slate-100 rounded-md placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition disabled:bg-slate-600 disabled:cursor-not-allowed"
        rows={rows}
        disabled={disabled || isGenerating}
      />
      <button
        onClick={handleGeneratePrompt}
        disabled={disabled || isGenerating}
        className="absolute top-3 right-3 text-slate-400 hover:text-sky-400 disabled:text-slate-600 disabled:cursor-not-allowed p-1 rounded-full hover:bg-slate-600 transition-colors"
        aria-label="Generate random prompt"
        title="Generate random prompt"
      >
        {isGenerating ? <Spinner /> : <SparklesIcon className="w-5 h-5" />}
      </button>
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
};

export default PromptInput;
