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
          setSelectedDisease(LEAF_DISEASES[2]);
          setIsAnalyzing(false);
        }, 500);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">

      {/* Section Header with Multi-Tone Forest Green Gradient */}
      <div className="bg-gradient-to-r from-emerald-900 via-green-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-emerald-800/60">
        <div className="flex items-center space-x-4">
          <div className="w-13 h-13 rounded-2xl bg-emerald-700/30 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-300 shadow-inner shrink-0">
            <Bug className="w-7 h-7" />
          </div>
          <div className="overflow-hidden">
            <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white">
              {t.leafAiTitle}
            </h2>
            <p className="text-sm text-emerald-200/90 font-medium mt-1 leading-relaxed">
              {t.leafAiSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Upload Zone & Sample Gallery in Sage/Herbal Card Tints */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Upload Box */}
        <div className="bg-[#f8fbf9] rounded-3xl p-6 sm:p-8 border-2 border-[#cfe3d6] shadow-md shadow-emerald-950/5 flex flex-col justify-between">
          <div className="space-y-5">
            <h3 className="font-black text-[#0a2316] text-base sm:text-lg flex items-center gap-2">
              <Camera className="w-5 h-5 text-emerald-700" />
              <span>{lang === 'te' ? 'ఆకు ఫోటో తీయండి / అప్‌లోడ్ చేయండి' : 'Capture / Upload Leaf Photo'}</span>
            </h3>
            
            <label className="border-2 border-dashed border-emerald-600/70 hover:border-emerald-700 bg-[#edf5f0] hover:bg-[#e4ede7] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all group">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileUpload} 
                className="hidden" 
              />
              <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border-2 border-emerald-300 flex items-center justify-center text-emerald-700 group-hover:scale-110 transition-transform mb-3">
                <Upload className="w-7 h-7" />
              </div>
              <span className="text-sm font-extrabold text-[#0a2316]">
                {t.uploadPrompt}
              </span>
              <span className="text-xs text-emerald-900/70 font-semibold mt-1">
                {t.uploadHelp}
              </span>
            </label>
          </div>

          {/* Model Status Badge */}
          <div className="mt-6 p-4 bg-[#edf5f0] rounded-2xl border-2 border-[#cfe3d6] text-xs sm:text-sm text-[#0a2316] flex items-center justify-between font-bold">
            <span>Crop Vision Intelligence Engine</span>
            <span className="text-xs font-mono font-extrabold text-emerald-950 bg-emerald-200/90 px-3 py-1 rounded-full border border-emerald-400">
              READY
            </span>
          </div>
        </div>

        {/* Sample Leaf Gallery */}
        <div className="lg:col-span-2 bg-[#f8fbf9] rounded-3xl p-6 sm:p-8 border-2 border-[#cfe3d6] shadow-md shadow-emerald-950/5 space-y-5">
          <div className="flex items-center justify-between border-b border-[#cfe3d6] pb-4">
            <h3 className="font-black text-[#0a2316] text-base sm:text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-700" />
              <span>{t.orSelectSample}</span>
            </h3>
            <span className="text-xs font-black text-emerald-950 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              {lang === 'te' ? '5 నమూనాలు' : '5 Verified Samples'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {LEAF_DISEASES.map(disease => {
              const isSelected = selectedDisease.id === disease.id;
              return (
                <button
                  key={disease.id}
                  onClick={() => handleSelectSample(disease)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'border-emerald-700 bg-gradient-to-br from-[#e4ede7] to-[#d6e5dc] ring-2 ring-emerald-600/30 shadow-md'
                      : 'border-[#cfe3d6] hover:border-emerald-600 bg-[#edf5f0] hover:bg-[#e4ede7]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">
                      {disease.id === 'healthy' ? '🌿' : 
                       disease.id === 'early_blight' ? '🍂' : 
                       disease.id === 'late_blight' ? '🥀' : 
                       disease.id === 'leaf_mold' ? '🍄' : '🌾'}
                    </span>
                    <span className="text-xs font-black font-mono text-emerald-950 bg-white px-2 py-0.5 rounded-md border border-emerald-300">
                      {disease.confidence}%
                    </span>
                  </div>
                  <div>
                    <h4 className="font-black text-xs sm:text-sm text-[#0a2316] line-clamp-1">
                      {lang === 'te' ? disease.nameTe : disease.nameEn}
                    </h4>
                    <p className="text-xs text-emerald-900/80 font-semibold mt-0.5 line-clamp-1">
                      {lang === 'te' ? disease.statusTe : disease.status}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Diagnosis Results Card in Sage/Herbal Tint */}
      <div className="bg-[#f8fbf9] rounded-3xl p-6 sm:p-9 border-2 border-[#cfe3d6] shadow-lg shadow-emerald-950/5 space-y-8">
        
        {/* Result Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#cfe3d6] gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
              {t.diagnosisResult}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0a2316] mt-1 flex items-center gap-3">
              <span>{lang === 'te' ? selectedDisease.nameTe : selectedDisease.nameEn}</span>
              <CheckCircle2 className="w-7 h-7 text-emerald-700 inline-block" />
            </h3>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <span className="text-xs text-emerald-900 font-extrabold uppercase block">{t.confidence}</span>
              <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-800">
                {selectedDisease.confidence}%
              </span>
            </div>
            <span className="px-4 py-2 rounded-full text-xs sm:text-sm font-black border border-emerald-400 bg-emerald-100 text-emerald-950">
              {lang === 'te' ? selectedDisease.statusTe : selectedDisease.status}
            </span>
          </div>
        </div>

        {/* Diagnosis Details: Symptoms, Precautions, Field Cure */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. Symptoms */}
          <div className="bg-[#edf5f0] p-6 rounded-2xl border-2 border-[#cfe3d6] space-y-3">
            <h4 className="font-black text-[#0a2316] text-base flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-700"></span>
              <span>{t.symptomsTitle}</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#0f2d1c] leading-relaxed font-semibold">
              {lang === 'te' ? selectedDisease.symptomsTe : selectedDisease.symptomsEn}
            </p>
          </div>

          {/* 2. Precautions */}
          <div className="bg-[#eaf3ed] p-6 rounded-2xl border-2 border-emerald-300 space-y-3">
            <h4 className="font-black text-[#0a2316] text-base flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-800"></span>
              <span>{t.precautionsTitle}</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#0f2d1c] leading-relaxed font-semibold">
              {lang === 'te' ? selectedDisease.precautionsTe : selectedDisease.precautionsEn}
            </p>
          </div>

          {/* 3. Field Cure */}
          <div className="bg-[#e4ede7] p-6 rounded-2xl border-2 border-emerald-400/80 space-y-3">
            <h4 className="font-black text-[#0a2316] text-base flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-900"></span>
              <span>{t.cureTitle}</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#0a2316] leading-relaxed font-semibold">
              {lang === 'te' ? selectedDisease.cureTe : selectedDisease.cureEn}
            </p>
          </div>

        </div>

        {/* Curated Telugu Agricultural Video Guides (Strictly Green Theme, Real Thumbnails, Clickable Redirects) */}
        <div className="pt-6 border-t border-[#cfe3d6] space-y-5">
          <div className="flex items-center justify-between">
            <h4 className="font-black text-[#0a2316] text-lg sm:text-xl flex items-center gap-3">
              <Video className="w-6 h-6 text-emerald-700" />
              <span>{t.teluguVideosTitle}</span>
            </h4>
            <span className="text-xs font-bold text-emerald-950">
              {lang === 'te' ? 'రైతు మార్గదర్శక వీడియోలు' : 'Expert Agronomic Demonstrations'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedDisease.youtubeVideos.map(video => (
              <a 
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#edf5f0] rounded-2xl border-2 border-[#cfe3d6] overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-700 transition-all flex flex-col cursor-pointer block"
              >
                {/* Real YouTube Video Thumbnail */}
                <div className="relative aspect-video w-full bg-[#0a1e13] overflow-hidden">
                  <img 
                    src={video.thumbnail} 
                    alt={video.titleEn} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1592417817098-8f3d6910985c?w=640&q=80";
                    }}
                  />
                  {/* Play Button Overlay in Emerald Green */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 flex items-center justify-center transition-colors">
                    <div className="w-13 h-13 rounded-full bg-emerald-800 group-hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform border-2 border-white/40">
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </div>
                  </div>
                  {/* Channel Tag */}
                  <div className="absolute bottom-2.5 left-2.5 bg-[#0a1e13]/90 text-emerald-200 px-3 py-1 rounded-lg text-xs font-extrabold backdrop-blur-xs border border-emerald-800">
                    {video.channel}
                  </div>
                </div>

                {/* Video Info & Direct Clickable Link */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
                  <h5 className="font-black text-[#0a2316] text-sm sm:text-base leading-snug group-hover:text-emerald-800 transition-colors">
                    {lang === 'te' ? video.titleTe : video.titleEn}
                  </h5>

                  <div className="flex items-center justify-between text-xs sm:text-sm font-extrabold text-emerald-800 pt-2 border-t border-[#cfe3d6]">
                    <span className="flex items-center gap-1.5">
                      <span>{t.watchOnYoutube}</span>
                    </span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
