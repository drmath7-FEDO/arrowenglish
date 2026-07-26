import React, { useEffect, useState } from 'react';
import { downloadMarkdown, exportToPDF } from '../services/exportService';
import { ArrowRight, BookOpen, Key, Sparkles, Sun, Moon, HelpCircle, FileText, Printer, FolderOpen, HardDrive } from 'lucide-react';
import { getVaultItems, subscribeToVaultChanges, selectLocalDirectory, disconnectLocalDirectory, getDirectoryStatus } from '../services/vaultService';

export function Navbar({ activeTab, setActiveTab, onOpenSettings, onOpenGuide, theme, toggleTheme, currentResult }) {
  const [vaultCount, setVaultCount] = useState(() => getVaultItems().length);
  const [dirStatus, setDirStatus] = useState(() => getDirectoryStatus());

  useEffect(() => {
    setVaultCount(getVaultItems().length);
    setDirStatus(getDirectoryStatus());

    return subscribeToVaultChanges((snapshot) => {
      setVaultCount(snapshot.items.length);
      setDirStatus(getDirectoryStatus());
    });
  }, []);

  const handleSelectDirectory = async () => {
    if (dirStatus.isConnected) {
      const confirmChange = window.confirm(`현재 PC 폴더 [${dirStatus.folderName}]와 연동되어 있습니다.\n\n다른 폴더로 변경하거나 연동을 해제하시겠습니까?\n'확인': 새 폴더 선택 / '취소': 연동 해제`);
      if (confirmChange) {
        try {
          await selectLocalDirectory();
          const newStatus = getDirectoryStatus();
          setDirStatus(newStatus);
          alert(`✨ 새 PC 폴더 [${newStatus.folderName}]와 연결되었습니다!`);
        } catch (err) {
          if (err.name !== 'AbortError') {
            alert(err.message || '폴더 선택 중 오류가 발생했습니다.');
          }
        }
      } else {
        await disconnectLocalDirectory();
        setDirStatus(getDirectoryStatus());
        alert('PC 폴더 연동이 해제되었습니다. (브라우저 기본 저장소로 전환)');
      }
    } else {
      try {
        const snapshot = await selectLocalDirectory();
        const newStatus = getDirectoryStatus();
        setDirStatus(newStatus);
        alert(`✨ PC 폴더 [${newStatus.folderName}]와 성공적으로 연결되었습니다!\n이제 저장하는 모든 단어가 내 PC 폴더에 .json 파일로 저장됩니다.`);
      } catch (err) {
        if (err.name !== 'AbortError') {
          alert(err.message || '폴더 선택 중 오류가 발생했습니다.');
        }
      }
    }
  };

  return (
    <header className="glass-panel sticky top-4 z-40 mx-4 my-4 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('translator')}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-sky-400 to-emerald-400 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-sky-400 animate-pulse" />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight gradient-text">
            Arrow English AI
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            영어를 들으면서 바로 이해하는 뇌 구조 혁신
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex items-center gap-2 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800">
        <button
          onClick={() => setActiveTab('translator')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'translator'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>어순 변환 & AI 해설</span>
        </button>

        <button
          onClick={() => setActiveTab('practice')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'practice'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>어순 연습실</span>
        </button>

        <button
          onClick={() => setActiveTab('dictionary')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'dictionary'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>전치사 지도</span>
        </button>

        <button
          onClick={() => setActiveTab('vault')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all relative ${
            activeTab === 'vault'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <FolderOpen className="w-4 h-4 text-amber-400" />
          <span>📚 학습자료실</span>
          {vaultCount > 0 && (
            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 ml-0.5">
              {vaultCount}
            </span>
          )}
        </button>
      </nav>

      {/* Right Controls: PC Directory + Export Buttons + Settings & Theme */}
      <div className="flex items-center gap-2.5">
        {/* PC Local Folder Connect Button */}
        {dirStatus.isConnected ? (
          <button
            onClick={handleSelectDirectory}
            className="btn-secondary text-xs bg-emerald-500/10 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20 flex items-center gap-1.5 shadow-sm"
            title={`PC 폴더 [${dirStatus.folderName}] 연동 중 (클릭하여 변경 또는 해제)`}
          >
            <HardDrive className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">PC 폴더: [{dirStatus.folderName}]</span>
            <span className="sm:hidden">[{dirStatus.folderName}]</span>
          </button>
        ) : (
          <button
            onClick={handleSelectDirectory}
            className="btn-secondary text-xs bg-slate-800/90 border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-700/80 flex items-center gap-1.5"
            title="웹 접속 시에도 내 PC 폴더에 직접 저장되도록 폴더 연동"
          >
            <HardDrive className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">PC 폴더 연동</span>
          </button>
        )}

        {/* Top Line Export Buttons */}
        {currentResult && activeTab === 'translator' && (
          <div className="flex items-center gap-2 mr-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 shadow-inner">
            <button
              onClick={() => downloadMarkdown(currentResult)}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-sm"
              title="디자인 없는 텍스트 마크다운(.md) 저장"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>MD 저장</span>
            </button>

            <button
              onClick={() => exportToPDF(currentResult)}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/30"
              title="디자인 적용 PDF 리포트 저장"
            >
              <Printer className="w-3.5 h-3.5 text-amber-300" />
              <span>PDF 저장</span>
            </button>
          </div>
        )}

        <button
          onClick={onOpenGuide}
          className="btn-secondary text-xs bg-sky-500/10 border-sky-500/30 text-sky-300 hover:bg-sky-500/20"
          title="이용 가이드 & 필독 안내"
        >
          <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline">이용 가이드</span>
        </button>

        <button
          onClick={onOpenSettings}
          className="btn-secondary text-xs"
          title="Gemini API 키 설정"
        >
          <Key className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">AI 키 설정</span>
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
          title="테마 전환"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-indigo-300" />}
        </button>
      </div>
    </header>
  );
}

