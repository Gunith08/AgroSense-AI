import React from 'react';
import { Sprout, Globe, Activity, Layers, BookOpen, Bug, ShieldCheck } from 'lucide-react';
import { translations } from '../data/translations';

export default function Navbar({ activeTab, setActiveTab, lang, setLang, isTransmitting }) {
  const t = translations[lang];

  const navItems = [
    { id: 'overview', label: t.navOverview, icon: Sprout },
    { id: 'advisory', label: t.navAdvisory, icon: ShieldCheck },
    { id: 'leafAi', label: t.navLeafAi, icon: Bug },
    { id: 'pipeline', label: t.navPipeline, icon: Layers },
    { id: 'guide', label: t.navGuide, icon: BookOpen }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Identity */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 ring-4 ring-emerald-50">
              <Sprout className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold tracking-tight text-slate-900 font-sans">
                  {lang === 'te' ? 'ఆగ్రోసెన్స్' : 'AgroSense'}<span className="text-emerald-700"> AI</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {t.workshopBadge}
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 hidden sm:block">
                {t.brandTagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-50 p-1.5 rounded-xl border border-slate-200/80">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-white text-emerald-800 shadow-xs ring-1 ring-slate-200/60 font-bold'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-100/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: Language Switch & Status */}
          <div className="flex items-center space-x-3">
            {/* Live Indicator */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200/80 rounded-full">
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
              className="flex items-center space-x-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-bold shadow-sm shadow-emerald-800/20 active:scale-95 transition-all"
              title="Toggle English / తెలుగు"
            >
              <Globe className="w-4 h-4" />
              <span>{t.languageSwitch}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="lg:hidden flex overflow-x-auto py-2.5 space-x-2 border-t border-slate-100 no-scrollbar">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
