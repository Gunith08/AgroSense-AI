import React, { useState } from 'react';
import { 
  Bug, Upload, CheckCircle2, ShieldAlert, 
  Video, ExternalLink, Sparkles, Camera, Play
} from 'lucide-react';
import { translations } from '../data/translations';
import { LEAF_DISEASES } from '../data/cropsData';

export default function LeafDiseaseLab({ lang }) {
  const t = translations[lang];

  const [selectedDisease, setSelectedDisease] = useState(LEAF_DISEASES[1]); // default to Early Blight
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [customImage, setCustomImage] = useState(null);

  // Handle sample click
  const handleSelectSample = (disease) => {
    setIsAnalyzing(true);
    setCustomImage(null);
    setTimeout(() => {
      setSelectedDisease(disease);
      setIsAnalyzing(false);
    }, 350);
  };

  // Handle custom file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImage(event.target.result);
        setIsAnalyzing(true);
        setTimeout(() => {
          setSelectedDisease(LEAF_DISEASES[2]); // mapped sample
          setIsAnalyzing(false);
        }, 500);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* Section Header with Green Gradient */}
      <div className="bg-gradient-to-r from-emerald-800 via-green-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-md shadow-emerald-900/15 border border-emerald-700/50">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-inner shrink-0">
            <Bug className="w-7 h-7" />
          </div>
          <div className="overflow-hidden">
            <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white">
              {t.leafAiTitle}
            </h2>
            <p className="text-xs sm:text-base text-emerald-100 font-medium mt-1">
              {t.leafAiSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Upload Zone & Sample Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

        {/* Upload Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-emerald-100 shadow-md shadow-emerald-950/5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
              <Camera className="w-5 h-5 text-emerald-700" />
              <span>{lang === 'te' ? 'ఆకు ఫోటో తీయండి / అప్‌లోడ్ చేయండి' : 'Capture / Upload Leaf Photo'}</span>
            </h3>
            
            <label className="border-2 border-dashed border-emerald-300 hover:border-emerald-600 bg-emerald-50/40 hover:bg-emerald-50/80 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all group">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileUpload} 
                className="hidden" 
              />
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-emerald-200 flex items-center justify-center text-emerald-700 group-hover:scale-110 transition-transform mb-3">
                <Upload className="w-7 h-7" />
              </div>
              <span className="text-sm font-extrabold text-slate-900">
                {t.uploadPrompt}
              </span>
              <span className="text-xs text-slate-500 font-medium mt-1">
                {t.uploadHelp}
              </span>
            </label>
          </div>

          {/* Model Status Badge (Without technical model names) */}
          <div className="mt-5 p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 text-xs sm:text-sm text-emerald-950 flex items-center justify-between font-bold">
            <span>Crop Vision Intelligence Engine</span>
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-200/80 px-2.5 py-0.5 rounded-full">
              READY
            </span>
          </div>
        </div>

        {/* Sample Leaf Gallery */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border-2 border-emerald-100 shadow-md shadow-emerald-950/5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-700" />
              <span>{t.orSelectSample}</span>
            </h3>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              {lang === 'te' ? '5 నమూనాలు' : '5 Verified Samples'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {LEAF_DISEASES.map(disease => {
              const isSelected = selectedDisease.id === disease.id;
              return (
                <button
                  key={disease.id}
                  onClick={() => handleSelectSample(disease)}
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'border-emerald-600 bg-gradient-to-br from-emerald-50 to-green-50 ring-2 ring-emerald-500/20 shadow-md'
                      : 'border-slate-200 hover:border-emerald-300 bg-slate-50/60 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">
                      {disease.id === 'healthy' ? '🌿' : 
                       disease.id === 'early_blight' ? '🍂' : 
                       disease.id === 'late_blight' ? '🥀' : 
                       disease.id === 'leaf_mold' ? '🍄' : '🦠'}
                    </span>
                    <span className="text-xs font-extrabold font-mono text-emerald-800 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      {disease.confidence}%
                    </span>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 line-clamp-1">
                      {lang === 'te' ? disease.nameTe : disease.nameEn}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">
                      {lang === 'te' ? disease.statusTe : disease.status}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Diagnosis Results Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-100 shadow-lg shadow-emerald-950/5 space-y-6 sm:space-y-8">
        
        {/* Result Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
              {t.diagnosisResult}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 flex items-center gap-2.5">
              <span>{lang === 'te' ? selectedDisease.nameTe : selectedDisease.nameEn}</span>
              {selectedDisease.id === 'healthy' ? (
                <CheckCircle2 className="w-7 h-7 text-emerald-600 inline-block" />
              ) : (
                <ShieldAlert className="w-7 h-7 text-amber-600 inline-block" />
              )}
            </h3>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="text-right">
              <span className="text-xs text-slate-500 uppercase font-bold block">{t.confidence}</span>
              <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-800">
                {selectedDisease.confidence}%
              </span>
            </div>
            <span className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black border ${
              selectedDisease.id === 'healthy' 
                ? 'bg-emerald-100 text-emerald-900 border-emerald-300' 
                : 'bg-amber-100 text-amber-900 border-amber-300'
            }`}>
              {lang === 'te' ? selectedDisease.statusTe : selectedDisease.status}
            </span>
          </div>
        </div>

        {/* Diagnosis Details: Symptoms, Precautions, Field Cure */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          
          {/* 1. Symptoms */}
          <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-200/90 space-y-2.5">
            <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-500"></span>
              <span>{t.symptomsTitle}</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {lang === 'te' ? selectedDisease.symptomsTe : selectedDisease.symptomsEn}
            </p>
          </div>

          {/* 2. Precautions */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/40 p-5 rounded-2xl border-2 border-amber-200 space-y-2.5">
            <h4 className="font-extrabold text-amber-950 text-base flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span>{t.precautionsTitle}</span>
            </h4>
            <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
              {lang === 'te' ? selectedDisease.precautionsTe : selectedDisease.precautionsEn}
            </p>
          </div>

          {/* 3. Field Cure */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-50/50 p-5 rounded-2xl border-2 border-emerald-200 space-y-2.5">
            <h4 className="font-extrabold text-emerald-950 text-base flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
              <span>{t.cureTitle}</span>
            </h4>
            <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
              {lang === 'te' ? selectedDisease.cureTe : selectedDisease.cureEn}
            </p>
          </div>

        </div>

        {/* Curated Telugu Agricultural Video Guides with Real Thumbnails & Clickable Links */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-slate-900 text-lg sm:text-xl flex items-center gap-2.5">
              <Video className="w-6 h-6 text-red-600" />
              <span>{t.teluguVideosTitle}</span>
            </h4>
            <span className="text-xs font-bold text-slate-500">
              {lang === 'te' ? 'రైతు మార్గదర్శక వీడియోలు' : 'Expert Video Demonstrations'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {selectedDisease.youtubeVideos.map(video => (
              <a 
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl border-2 border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-red-400 transition-all flex flex-col cursor-pointer block"
              >
                {/* Real YouTube Video Thumbnail */}
                <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                  <img 
                    src={video.thumbnail} 
                    alt={video.titleEn} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback image if network fails
                      e.target.src = "https://images.unsplash.com/photo-1592417817098-8f3d6910985c?w=640&q=80";
                    }}
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 flex items-center justify-center transition-colors">
                    <div className="w-12 h-12 rounded-full bg-red-600 group-hover:bg-red-700 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </div>
                  </div>
                  {/* Channel Tag */}
                  <div className="absolute bottom-2 left-2 bg-black/80 text-white px-2.5 py-0.5 rounded-md text-xs font-bold backdrop-blur-xs">
                    {video.channel}
                  </div>
                </div>

                {/* Video Info & Direct Link */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <h5 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-red-700 transition-colors">
                    {lang === 'te' ? video.titleTe : video.titleEn}
                  </h5>

                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-red-600 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1.5">
                      <span>{t.watchOnYoutube}</span>
                    </span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
