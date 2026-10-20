import React from 'react';
import { Sprout, Globe, Layers, Bug, ShieldCheck, Activity } from 'lucide-react';
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Identity with Vibrant Green Gradient */}
          <div 
            className="flex items-center space-x-3.5 cursor-pointer group" 
            onClick={() => setActiveTab('overview')}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 via-green-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-700/25 ring-4 ring-emerald-100 group-hover:scale-105 transition-transform">
              <Sprout className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-sans">
                  {lang === 'te' ? 'ఆగ్రోసెన్స్' : 'AgroSense'}<span className="bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent"> AI</span>
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {t.platformBadge}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500 hidden sm:block">
                {t.brandTagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-700 to-green-700 text-white shadow-sm shadow-emerald-800/30'
                      : 'text-slate-700 hover:text-emerald-800 hover:bg-white/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-700'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: Language Switch & Status */}
          <div className="flex items-center space-x-3">
            {/* Live Indicator */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isTransmitting ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isTransmitting ? 'bg-amber-500' : 'bg-emerald-600'}`}></span>
              </span>
              <span className="text-xs font-bold text-emerald-900 tracking-wide">
                {isTransmitting ? t.transmitting : t.simulationBadge}
              </span>
            </div>

            {/* Language Switcher Button */}
            <button
              onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
              className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-emerald-700 to-green-800 hover:from-emerald-800 hover:to-green-900 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-800/25 active:scale-95 transition-all cursor-pointer"
              title="Toggle English / తెలుగు"
            >
              <Globe className="w-4 h-4" />
              <span>{t.languageSwitch}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex overflow-x-auto py-2.5 space-x-2 border-t border-slate-100 no-scrollbar">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-700 to-green-700 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-emerald-700'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
