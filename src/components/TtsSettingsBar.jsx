// src/components/TtsSettingsBar.jsx
import React, { useEffect, useState } from 'react';
import { Volume2, User, RotateCw, Gauge } from 'lucide-react';
import { getTtsSettings, saveTtsSettings } from '../services/speechService';

export function TtsSettingsBar({ className = '' }) {
  const [settings, setSettings] = useState(() => getTtsSettings());

  useEffect(() => {
    const handleSettingsChange = () => {
      setSettings(getTtsSettings());
    };
    window.addEventListener('arrow_tts_settings_changed', handleSettingsChange);
    return () => {
      window.removeEventListener('arrow_tts_settings_changed', handleSettingsChange);
    };
  }, []);

  const handleChange = (key, value) => {
    const nextSettings = { ...settings, [key]: value };
    saveTtsSettings(nextSettings);
  };

  return (
    <div className={`flex flex-wrap items-center gap-4 bg-slate-900/80 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-800 text-xs text-slate-300 shadow-lg ${className}`}>
      {/* Title/Header icon */}
      <div className="flex items-center gap-2 pr-2 border-r border-slate-800/80 shrink-0">
        <Volume2 className="w-4 h-4 text-indigo-400" />
        <span className="font-bold text-slate-200">🔊 발음 설정</span>
      </div>

      {/* 1. 성별 선택 */}
      <div className="flex items-center gap-1.5 shrink-0">
        <User className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-400">목소리:</span>
        <select
          value={settings.gender}
          onChange={(e) => handleChange('gender', e.target.value)}
          className="bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer transition-all hover:bg-slate-900"
        >
          <option value="female">여성 (Female) 👩</option>
          <option value="male">남성 (Male) 👨</option>
        </select>
      </div>

      {/* 2. 반복 재생 */}
      <div className="flex items-center gap-1.5 shrink-0">
        <RotateCw className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-400">연속 반복:</span>
        <select
          value={settings.repetitions}
          onChange={(e) => handleChange('repetitions', parseInt(e.target.value, 10))}
          className="bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer transition-all hover:bg-slate-900"
        >
          <option value={1}>1회 듣기</option>
          <option value={2}>2회 연속</option>
          <option value={3}>3회 연속</option>
          <option value={4}>4회 연속</option>
          <option value={5}>5회 연속</option>
        </select>
      </div>

      {/* 3. 재생 속도 */}
      <div className="flex items-center gap-1.5 shrink-0">
        <Gauge className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-400">속도:</span>
        <select
          value={settings.speed}
          onChange={(e) => handleChange('speed', parseFloat(e.target.value))}
          className="bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer transition-all hover:bg-slate-900"
        >
          <option value={0.6}>0.6x (시니어/어린이) 🐌</option>
          <option value={0.8}>0.8x 조금 느리게</option>
          <option value={1.0}>1.0x 보통 속도 ⚡</option>
          <option value={1.2}>1.2x 빠르게</option>
        </select>
      </div>

      <div className="text-[10px] text-slate-500 ml-auto hidden md:block">
        * 브라우저 로컬 디스크에 영구 보관됩니다.
      </div>
    </div>
  );
}
