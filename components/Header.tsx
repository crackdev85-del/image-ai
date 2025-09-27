
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-sky-400">
        AI Photo Studio
      </h1>
      <p className="mt-2 text-lg text-slate-400">Edit and Generate Images with Gemini</p>
    </header>
  );
};

export default Header;
