// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ArrowTranslator } from './components/ArrowTranslator';
import { ArrowPractice } from './components/ArrowPractice';
import { PrepositionGuide } from './components/PrepositionGuide';
import { StudyVault } from './components/StudyVault';
import { ApiSettingsModal } from './components/ApiSettingsModal';
import { getStoredApiKey } from './services/apiKeyStorage';
import { initVaultStorage } from './services/vaultService';

export default function App() {
  const [activeTab, setActiveTab] = useState('translator');
  const [theme, setTheme] = useState('dark');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState(() => getStoredApiKey());

  const [currentResult, setCurrentResult] = useState(null);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    initVaultStorage();
  }, []);

  return (
    <div className="min-h-screen pb-12 transition-colors duration-300">
      {/* Header Navbar */}
      <Navbar
        key={currentResult?.id || currentResult?.english || 'nav-default'}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
        currentResult={currentResult}
      />

      {/* Main Content Area */}
      <main className="container mx-auto">
        {activeTab === 'translator' && (
          <ArrowTranslator apiKey={apiKey} onResultChange={setCurrentResult} />
        )}
        {activeTab === 'practice' && <ArrowPractice />}
        {activeTab === 'dictionary' && <PrepositionGuide />}
        {activeTab === 'vault' && (
          <StudyVault onNavigateToTranslator={() => setActiveTab('translator')} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 text-center text-xs text-slate-500 py-6 border-t border-slate-800/60">
        <p>© 2026 Arrow English AI Studio - 뇌 구조에 맞춘 직관 영어 학습 파트너</p>
      </footer>

      {/* API Settings Modal */}
      <ApiSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={apiKey}
        setApiKey={setApiKey}
      />
    </div>
  );
}
