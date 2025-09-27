
import React from 'react';
import { AppView } from '../types';

interface TabsProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeView, setActiveView }) => {
  const commonClasses = "w-full text-center px-4 py-3 font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500";
  const activeClasses = "bg-sky-600 text-white shadow-md";
  const inactiveClasses = "bg-slate-700 text-slate-300 hover:bg-slate-600";

  return (
    <div className="grid grid-cols-2 gap-4 p-1 bg-slate-800 rounded-xl">
      <button
        onClick={() => setActiveView(AppView.EDITOR)}
        className={`${commonClasses} ${activeView === AppView.EDITOR ? activeClasses : inactiveClasses}`}
      >
        Photo Editor
      </button>
      <button
        onClick={() => setActiveView(AppView.GENERATOR)}
        className={`${commonClasses} ${activeView === AppView.GENERATOR ? activeClasses : inactiveClasses}`}
      >
        Photo Generator
      </button>
    </div>
  );
};

export default Tabs;
