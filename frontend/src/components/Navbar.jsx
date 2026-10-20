import React from 'react';
import { Sprout, Globe, Layers, Bug, ShieldCheck } from 'lucide-react';
import { translations } from '../data/translations';

export default function Navbar({ activeTab, setActiveTab, lang, setLang, isTransmitting }) {
  const t = translations[lang];

  const navItems = [
    { id: 'overview', label: t.navOverview, icon: Sprout },
    { id: 'advisory', label: t.navAdvisory, icon: ShieldCheck },
    { id: 'leafAi', label: t.navLeafAi, icon: Bug },
    { id: 'pipeline', label: t.navPipeline, icon: Layers }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#f8fbf9]/95 backdrop-blur-md border-b-2 border-[#cfe3d6] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between min-h-[5.5rem] py-3 gap-4">
          
          {/* Brand Identity - Spacious, Never Sticking to Border */}
          <div 
            className="flex items-center space-x-4 cursor-pointer group shrink-0" 
            onClick={() => setActiveTab('overview')}
          >
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-700 via-green-800 to-emerald-900 flex items-center justify-center text-white shadow-md shadow-emerald-950/20 ring-4 ring-emerald-100 group-hover:scale-105 transition-transform shrink-0">
              <Sprout className="w-7 h-7" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#0a2316] font-sans">
                  {lang === 'te' ? 'ఆగ్రోసెన్స్' : 'AgroSense'}
                  <span className="text-emerald-700 ml-1.5 font-black">AI</span>
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                  {t.platformBadge}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-emerald-900/80 mt-0.5">
                {t.brandTagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation - Clean Green Spectrum Pills */}
          <nav className="hidden lg:flex items-center space-x-2 bg-[#e8f2ec] p-1.5 rounded-2xl border border-[#cfe3d6]">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-xl text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-800 to-green-800 text-white shadow-md shadow-emerald-950/20'
                      : 'text-emerald-950 hover:text-emerald-900 hover:bg-emerald-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-200' : 'text-emerald-700'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: Language Switch & Status */}
          <div className="flex items-center space-x-3 shrink-0">
            {/* Live Indicator */}
            <div className="hidden sm:flex items-center space-x-2 px-3.5 py-2 bg-emerald-100/80 border border-emerald-300 rounded-full">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isTransmitting ? 'bg-emerald-400' : 'bg-emerald-500'}`}></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-700"></span>
              </span>
              <span className="text-xs font-extrabold text-emerald-950 tracking-wide font-mono">
                {isTransmitting ? t.transmitting : t.simulationBadge}
              </span>
            </div>

            {/* Language Switcher Button */}
            <button
              onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
              className="flex items-center space-x-2 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-emerald-800 to-green-900 hover:from-emerald-900 hover:to-green-950 text-white rounded-xl text-sm font-extrabold shadow-md shadow-emerald-950/25 active:scale-95 transition-all cursor-pointer border border-emerald-700"
              title="Toggle English / తెలుగు"
            >
              <Globe className="w-4 h-4 text-emerald-200" />
              <span>{t.languageSwitch}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="lg:hidden flex overflow-x-auto py-3 space-x-2 border-t border-[#cfe3d6] no-scrollbar">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-800 to-green-800 text-white shadow-xs'
                    : 'bg-[#e8f2ec] text-emerald-950 border border-[#cfe3d6] hover:bg-emerald-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-200' : 'text-emerald-700'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
