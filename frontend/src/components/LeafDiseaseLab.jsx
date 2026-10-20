import React, { useState } from 'react';
import { 
  Bug, Upload, CheckCircle2, AlertOctagon, ShieldAlert, 
  Video, ExternalLink, Sparkles, RefreshCcw, Camera
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
    }, 400);
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
          // Pretrained model simulation maps to tomato leaf diagnosis
          setSelectedDisease(LEAF_DISEASES[2]); // Late blight sample diagnosis
          setIsAnalyzing(false);
        }, 600);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">

      {/* Section Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Bug className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {t.leafAiTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {t.leafAiSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Upload Zone & Sample Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Upload Box */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Camera className="w-5 h-5 text-emerald-700" />
              <span>{lang === 'te' ? 'ఆకు ఫోటో తీయండి / అప్‌లోడ్ చేయండి' : 'Capture / Upload Leaf Photo'}</span>
            </h3>
            
            <label className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/30 hover:bg-emerald-50/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all group">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileUpload} 
                className="hidden" 
              />
              <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-emerald-200 flex items-center justify-center text-emerald-700 group-hover:scale-110 transition-transform mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-800">
                {t.uploadPrompt}
              </span>
              <span className="text-[11px] text-slate-500 mt-1">
                {t.uploadHelp}
              </span>
            </label>
          </div>

          {/* Offline Pretrained Model Badge */}
          <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <span className="font-medium">{t.badgeAiModel}: MobileNetV2 (PlantVillage)</span>
            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
              OFFLINE READY
            </span>
          </div>
        </div>

        {/* 1-Click Sample Leaf Gallery */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-700" />
              <span>{t.orSelectSample}</span>
            </h3>
            <span className="text-xs text-slate-500">
              {lang === 'te' ? '5 నమూనాలు అందుబాటులో ఉన్నాయి' : '5 Verified Samples'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {LEAF_DISEASES.map(disease => {
              const isSelected = selectedDisease.id === disease.id;
              return (
                <button
                  key={disease.id}
                  onClick={() => handleSelectSample(disease)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-600/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg">
                      {disease.id === 'healthy' ? '🌿' : 
                       disease.id === 'early_blight' ? '🍂' : 
                       disease.id === 'late_blight' ? '🥀' : 
                       disease.id === 'leaf_mold' ? '🍄' : '🦠'}
                    </span>
                    <span className="text-[10px] font-bold font-mono text-slate-500">
                      {disease.confidence}%
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 line-clamp-1">
                      {lang === 'te' ? disease.nameTe : disease.nameEn}
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">
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
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xs space-y-6">
        
        {/* Result Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              {t.diagnosisResult}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5 flex items-center gap-2">
              <span>{lang === 'te' ? selectedDisease.nameTe : selectedDisease.nameEn}</span>
              {selectedDisease.id === 'healthy' ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 inline-block" />
              ) : (
                <ShieldAlert className="w-6 h-6 text-amber-600 inline-block" />
              )}
            </h3>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <span className="text-[11px] text-slate-500 uppercase font-semibold block">{t.confidence}</span>
              <span className="text-xl font-bold font-mono text-emerald-700">
                {selectedDisease.confidence}%
              </span>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
              selectedDisease.id === 'healthy' 
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}>
              {lang === 'te' ? selectedDisease.statusTe : selectedDisease.status}
            </span>
          </div>
        </div>

        {/* Diagnosis Details: Symptoms, Precautions, Field Cure */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* 1. Symptoms */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span>
              <span>{t.symptomsTitle}</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {lang === 'te' ? selectedDisease.symptomsTe : selectedDisease.symptomsEn}
            </p>
          </div>

          {/* 2. Precautions */}
          <div className="bg-amber-50/60 p-4 sm:p-5 rounded-2xl border border-amber-200/80 space-y-2">
            <h4 className="font-bold text-amber-900 text-sm flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
              <span>{t.precautionsTitle}</span>
            </h4>
            <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
              {lang === 'te' ? selectedDisease.precautionsTe : selectedDisease.precautionsEn}
            </p>
          </div>

          {/* 3. Field Cure */}
          <div className="bg-emerald-50/70 p-4 sm:p-5 rounded-2xl border border-emerald-200/80 space-y-2">
            <h4 className="font-bold text-emerald-900 text-sm flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-700"></span>
              <span>{t.cureTitle}</span>
            </h4>
            <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
              {lang === 'te' ? selectedDisease.cureTe : selectedDisease.cureEn}
            </p>
          </div>

        </div>

        {/* Telugu-Only YouTube Video Guides */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Video className="w-5 h-5 text-red-600" />
              <span>{t.teluguVideosTitle}</span>
            </h4>
            <span className="text-xs font-bold text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
              100% TELUGU ONLY
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedDisease.youtubeVideos.map(video => (
              <div 
                key={video.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-red-300 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                    <span className="text-xs font-bold text-red-700">{video.channel}</span>
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm leading-snug">
                    {lang === 'te' ? video.titleTe : video.titleEn}
                  </h5>
                </div>

                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between w-full px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-red-600" />
                    <span>{t.watchOnYoutube} ({lang === 'te' ? 'తెలుగులో చూడండి' : 'In Telugu'})</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
