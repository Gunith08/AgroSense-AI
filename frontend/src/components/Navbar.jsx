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
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-green-500 via-emerald-600 to-green-600 flex items-center justify-center text-white shadow-md shadow-green-900/10 ring-4 ring-green-100 group-hover:scale-105 transition-transform shrink-0">
              <Sprout className="w-7 h-7" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#0e4225] font-sans">
                  {lang === 'te' ? 'ఆగ్రోసెన్స్' : 'AgroSense'}
                  <span className="text-green-600 ml-1.5 font-black">AI</span>
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-900 border border-green-300">
                  {t.platformBadge}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-green-900/80 mt-0.5">
                {t.brandTagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation - Clean Green Spectrum Pills */}
          <nav className="hidden lg:flex items-center space-x-2 bg-[#e8f5ed] p-1.5 rounded-2xl border border-green-200">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-xl text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 text-white shadow-md shadow-green-800/20'
                      : 'text-green-950 hover:text-green-900 hover:bg-green-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-green-100' : 'text-green-700'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: Language Switch & Status */}
          <div className="flex items-center space-x-3 shrink-0">
            {/* Live Indicator */}
            <div className="hidden sm:flex items-center space-x-2 px-3.5 py-2 bg-green-100/90 border border-green-300 rounded-full">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isTransmitting ? 'bg-green-400' : 'bg-green-500'}`}></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-600"></span>
              </span>
              <span className="text-xs font-extrabold text-green-950 tracking-wide font-mono">
                {isTransmitting ? t.transmitting : t.simulationBadge}
              </span>
            </div>

            {/* Language Switcher Button */}
            <button
              onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
              className="flex items-center space-x-2 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 hover:from-green-700 hover:via-emerald-700 hover:to-green-700 text-white rounded-xl text-sm font-extrabold shadow-md shadow-green-900/20 active:scale-95 transition-all cursor-pointer border border-green-400"
              title="Toggle English / తెలుగు"
            >
              <Globe className="w-4 h-4 text-green-100" />
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
                    ? 'bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 text-white shadow-xs'
                    : 'bg-[#e8f5ed] text-green-950 border border-green-200 hover:bg-green-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-green-100' : 'text-green-700'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
