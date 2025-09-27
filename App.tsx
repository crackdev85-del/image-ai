
import React, { useState } from 'react';
import { AppView } from './types';
import Header from './components/Header';
import Tabs from './components/Tabs';
import ImageEditor from './components/ImageEditor';
import ImageGenerator from './components/ImageGenerator';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.EDITOR);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <Tabs activeView={activeView} setActiveView={setActiveView} />
        <main className="mt-6">
          {activeView === AppView.EDITOR && <ImageEditor />}
          {activeView === AppView.GENERATOR && <ImageGenerator />}
        </main>
      </div>
    </div>
  );
};

export default App;
