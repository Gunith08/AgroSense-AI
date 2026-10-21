import React, { useState, useRef } from 'react';
import { 
  Bug, Upload, CheckCircle2, ShieldAlert, 
  Video, ExternalLink, Sparkles, Camera, Play, RefreshCw, X, Image as ImageIcon, Filter, Search, Award
} from 'lucide-react';
import { translations } from '../data/translations';
import { 
  PLANT_DISEASES_DB, 
  BENCHMARK_SAMPLES, 
  CROP_CATEGORIES, 
  diagnosePlantFoliage 
} from '../data/cropsData';

export default function LeafDiseaseLab({ lang }) {
  const t = translations[lang];

  const fileInputRef = useRef(null);
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [selectedDisease, setSelectedDisease] = useState(BENCHMARK_SAMPLES[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [customImage, setCustomImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [diagnostics, setDiagnostics] = useState(null);

  // Handle sample click
  const handleSelectSample = (disease) => {
    setIsAnalyzing(true);
    setCustomImage(null);
    setDiagnostics(null);
    setTimeout(() => {
      setSelectedDisease(disease);
      setIsAnalyzing(false);
    }, 300);
  };

  // Helper to process uploaded file with real canvas feature extraction
  const processFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert(lang === 'te' ? 'దయచేసి సరైన ఫోటో (JPG, PNG, WEBP) మాత్రమే అప్‌లోడ్ చేయండి.' : 'Please upload a valid image file (JPG, PNG, or WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setCustomImage({
        url: dataUrl,
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB'
      });
      setIsAnalyzing(true);

      // Perform real canvas feature extraction
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 120;
        canvas.height = 120;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, 120, 120);

        setTimeout(() => {
          const result = diagnosePlantFoliage({
            canvas,
            file,
            selectedCropId: selectedCrop
          });
          setSelectedDisease(result.disease);
          setDiagnostics(result);
          setIsAnalyzing(false);
        }, 600);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  // Handle crop category filter change
  const handleCropChange = (newCropId) => {
    setSelectedCrop(newCropId);
    if (customImage) {
      setIsAnalyzing(true);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 120;
        canvas.height = 120;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, 120, 120);

        setTimeout(() => {
          const result = diagnosePlantFoliage({
            canvas,
            file: { name: customImage.name },
            selectedCropId: newCropId
          });
          setSelectedDisease(result.disease);
          setDiagnostics(result);
          setIsAnalyzing(false);
        }, 400);
      };
      img.src = customImage.url;
    }
  };

  // Handle custom file upload from input
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
    if (e.target) {
      e.target.value = '';
    }
  };

  // Drag & drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Filtered sample leaves to display based on crop selector
  const visibleSamples = selectedCrop === 'all'
    ? BENCHMARK_SAMPLES
    : PLANT_DISEASES_DB.filter(d => d.crop === selectedCrop);

  const displayConfidence = diagnostics?.confidence || selectedDisease.confidence;

  return (
    <div className="space-y-8">

      {/* Section Header with Fresh Grass-Green Gradient */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 text-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-green-500">
        <div className="flex items-center space-x-4">
          <div className="w-13 h-13 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-white shadow-xs shrink-0">
            <Bug className="w-7 h-7" />
          </div>
          <div className="overflow-hidden">
            <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white">
              {t.leafAiTitle}
            </h2>
            <p className="text-sm text-green-50 font-medium mt-1 leading-relaxed">
              {lang === 'te' 
                ? 'ఏ పంట ఆకు ఫోటోనైనా అప్‌లోడ్ చేసి ఖచ్చితమైన తెగులు, నివారణ మందులు మరియు ప్రత్యక్ష వీడియో సలహాలను పొందండి.'
                : 'Upload leaf photo of any crop to detect the exact pathogen, chemical dosage, organic remedies, and working video guides.'}
            </p>
          </div>
        </div>
      </div>

      {/* Crop Selector Bar */}
      <div className="bg-[#f8fbf9] p-4 sm:p-5 rounded-2xl border-2 border-[#cfe3d6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5 text-sm sm:text-base font-black text-[#0a2316]">
          <Filter className="w-5 h-5 text-green-700 shrink-0" />
          <span>{lang === 'te' ? 'పంట రకం (ఐచ్ఛికం):' : 'Crop Category (Optional Filter):'}</span>
          <span className="text-xs font-semibold text-green-800 hidden md:inline">
            {lang === 'te' ? '(ఆటో డిటెక్షన్ లేదా నిర్దిష్ట పంటను ఎంచుకోండి)' : '(Auto-detect all crops or pick your specific crop)'}
          </span>
        </div>
        <select
          value={selectedCrop}
          onChange={(e) => handleCropChange(e.target.value)}
          className="bg-white border-2 border-green-500 rounded-xl px-4 py-2 font-black text-xs sm:text-sm text-[#0a2316] cursor-pointer shadow-xs focus:ring-2 focus:ring-green-400 outline-none w-full sm:w-auto"
        >
          {CROP_CATEGORIES.map(cat => (
            <option key={cat.id} value={cat.id}>
              {lang === 'te' ? cat.nameTe : cat.nameEn}
            </option>
          ))}
        </select>
      </div>

      {/* Upload Zone & Sample Gallery in Sage/Herbal Card Tints */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Upload Box */}
        <div className="bg-[#f8fbf9] rounded-3xl p-6 sm:p-8 border-2 border-[#cfe3d6] shadow-md shadow-emerald-950/5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-[#0a2316] text-base sm:text-lg flex items-center gap-2">
                <Camera className="w-5 h-5 text-green-700" />
                <span>{lang === 'te' ? 'ఆకు ఫోటో అప్‌లోడ్ చేయండి' : 'Capture / Upload Leaf Photo'}</span>
              </h3>
              {customImage && (
                <span className="text-[11px] font-black bg-green-100 text-green-900 px-2.5 py-0.5 rounded-md border border-green-300">
                  {lang === 'te' ? 'లైవ్ ఫోటో' : 'Live Image'}
                </span>
              )}
            </div>
            
            {/* Hidden Native File Input */}
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              onChange={handleFileUpload} 
              className="hidden" 
            />

            {/* If custom image is uploaded: Show Photo Preview */}
            {customImage ? (
              <div className="relative rounded-2xl overflow-hidden border-2 border-green-400 bg-[#edf5f0] p-3 space-y-3">
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-green-950 shadow-inner">
                  <img 
                    src={customImage.url} 
                    alt="Uploaded Leaf Sample" 
                    className="w-full h-full object-cover" 
                  />
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-green-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center">
                      <div className="w-10 h-10 border-4 border-green-400 border-t-transparent rounded-full animate-spin mb-2.5"></div>
                      <span className="text-xs sm:text-sm font-black text-white">
                        {lang === 'te' ? 'కంప్యూటర్ విజన్ ద్వారా ఆకును స్కాన్ చేస్తోంది...' : 'AI Vision Scanning Foliage...'}
                      </span>
                      <div className="w-48 h-1.5 bg-green-900 rounded-full mt-2.5 overflow-hidden border border-green-700">
                        <div className="h-full bg-green-400 rounded-full animate-pulse w-full"></div>
                      </div>
                    </div>
                  )}
                  {!isAnalyzing && (
                    <div className="absolute top-2 left-2 bg-green-700/95 text-white text-[11px] font-black px-2.5 py-1 rounded-lg backdrop-blur-xs flex items-center gap-1 shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      <span>{lang === 'te' ? 'విశ్లేషణ పూర్తయింది' : 'Analyzed by AI'}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-xs text-green-950 font-bold px-1 pt-1">
                  <div className="truncate max-w-[160px]">
                    <p className="font-extrabold truncate text-[#0a2316]">{customImage.name}</p>
                    <p className="text-[11px] text-green-800 font-mono">{customImage.size}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-extrabold text-xs cursor-pointer flex items-center gap-1 shadow-xs transition-colors"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>{lang === 'te' ? 'మార్చండి' : 'Change'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setCustomImage(null); setDiagnostics(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-red-50 text-red-700 border border-green-300 font-extrabold text-xs cursor-pointer shadow-xs transition-colors"
                      title="Remove image"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Drop Zone / Direct Choose Area */
              <div 
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-6 sm:p-7 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  isDragging 
                    ? 'border-green-600 bg-green-100/70 scale-[1.02]' 
                    : 'border-green-500/70 hover:border-green-600 bg-[#edf5f0] hover:bg-[#e4ede7]'
                }`}
              >
                <div className="w-13 h-13 rounded-2xl bg-white shadow-xs border-2 border-green-300 flex items-center justify-center text-green-700 mb-2.5">
                  <Upload className="w-6 h-6" />
                </div>
                <span className="text-sm font-extrabold text-[#0a2316]">
                  {t.uploadPrompt}
                </span>
                <span className="text-xs text-green-900/80 font-semibold mt-1">
                  {lang === 'te' 
                    ? 'టమాటా, మిరప, వరి, పత్తి, మొక్కజొన్న లేదా ఏదైనా పంట ఆకు ఫోటో'
                    : 'Tomato, Chilli, Rice, Cotton, Corn, Potato, or any crop leaf'}
                </span>
                
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                  className="mt-3.5 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-black text-xs sm:text-sm shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>{lang === 'te' ? 'కెమెరా / ఫోటో ఎంచుకోండి' : 'Browse / Camera'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Model Status Badge */}
          <div className="mt-5 p-3.5 bg-[#edf5f0] rounded-2xl border-2 border-[#cfe3d6] text-xs sm:text-sm text-[#0a2316] flex items-center justify-between font-bold">
            <span>Crop Vision Intelligence Engine</span>
            <span className="text-xs font-mono font-extrabold text-green-950 bg-green-200 px-3 py-1 rounded-full border border-green-400">
              30+ CROPS READY
            </span>
          </div>
        </div>

        {/* Sample Leaf Gallery */}
        <div className="lg:col-span-2 bg-[#f8fbf9] rounded-3xl p-6 sm:p-8 border-2 border-[#cfe3d6] shadow-md shadow-emerald-950/5 space-y-5">
          <div className="flex items-center justify-between border-b border-[#cfe3d6] pb-4">
            <h3 className="font-black text-[#0a2316] text-base sm:text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-green-700" />
              <span>{t.orSelectSample}</span>
            </h3>
            <span className="text-xs font-black text-green-950 bg-green-100 px-3 py-1 rounded-full border border-green-300">
              {visibleSamples.length} {lang === 'te' ? 'నమూనాలు' : 'Verified Samples'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 max-h-[380px] overflow-y-auto pr-1">
            {visibleSamples.map(disease => {
              const isSelected = selectedDisease.id === disease.id && !customImage;
              return (
                <button
                  key={disease.id}
                  onClick={() => handleSelectSample(disease)}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${
                    isSelected
                      ? 'border-green-600 bg-gradient-to-br from-[#e4ede7] to-[#d6e5dc] ring-2 ring-green-600/40 shadow-md'
                      : 'border-[#cfe3d6] hover:border-green-600 bg-[#edf5f0] hover:bg-[#e4ede7]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black px-2 py-0.5 rounded-md bg-white text-green-950 border border-green-300">
                      {lang === 'te' ? disease.cropTe : disease.cropEn}
                    </span>
                    <span className="text-xs font-black font-mono text-green-900 bg-green-200 px-2 py-0.5 rounded-md border border-green-400">
                      {disease.confidence}%
                    </span>
                  </div>
                  <div>
                    <h4 className="font-black text-xs sm:text-sm text-[#0a2316] line-clamp-1">
                      {lang === 'te' ? disease.nameTe : disease.nameEn}
                    </h4>
                    <p className="text-[11px] text-green-900 font-semibold mt-0.5 line-clamp-1">
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
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-green-800">
                {t.diagnosisResult}
              </span>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-green-200 text-green-950 border border-green-400">
                {lang === 'te' ? selectedDisease.cropTe : selectedDisease.cropEn}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0a2316] mt-1 flex items-center gap-3">
              <span>{lang === 'te' ? selectedDisease.nameTe : selectedDisease.nameEn}</span>
              <CheckCircle2 className="w-7 h-7 text-green-700 inline-block shrink-0" />
            </h3>
            <p className="text-xs sm:text-sm text-green-900 font-mono mt-0.5">
              Pathogen: <strong>{selectedDisease.pathogen}</strong>
            </p>
          </div>

          <div className="flex items-center space-x-4 shrink-0">
            <div className="text-right">
              <span className="text-xs text-green-900 font-extrabold uppercase block">{t.confidence}</span>
              <span className="text-2xl sm:text-3xl font-black font-mono text-green-700">
                {displayConfidence}%
              </span>
            </div>
            <span className="px-4 py-2 rounded-full text-xs sm:text-sm font-black border border-green-400 bg-green-100 text-green-950">
              {lang === 'te' ? selectedDisease.statusTe : selectedDisease.status}
            </span>
          </div>
        </div>

        {/* Leaf Image Inspection Visual Card */}
        <div className="bg-[#edf5f0] p-5 sm:p-6 rounded-2xl border-2 border-green-300 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-full sm:w-60 aspect-video sm:aspect-square rounded-2xl overflow-hidden border-2 border-green-400 bg-green-950 shrink-0 shadow-sm">
            <img 
              src={customImage?.url || selectedDisease.sampleImg || "https://images.unsplash.com/photo-1598512752271-33f913a5af13?w=600&q=80"} 
              alt="Analyzed Leaf Sample" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1592417817098-8f3d6910985c?w=600&q=80";
              }}
            />
            <div className="absolute bottom-2 left-2 right-2 bg-black/85 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center justify-between border border-white/20">
              <span className="truncate">
                {customImage 
                  ? (lang === 'te' ? 'రైతు లైవ్ ఫోటో' : 'Farm Uploaded Photo') 
                  : (lang === 'te' ? 'ధృవీకరించిన నమూనా' : 'Agronomic Benchmark')}
              </span>
              <span className="text-green-300 font-mono font-black shrink-0 ml-1">{displayConfidence}%</span>
            </div>
          </div>

          <div className="flex-1 space-y-2.5 w-full">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-green-600 text-white shadow-xs">
                {customImage 
                  ? (lang === 'te' ? 'రైతు ఫోటో విశ్లేషించబడింది' : 'Farmer Photo Verified') 
                  : (lang === 'te' ? 'పరీక్షించిన నమూనా' : 'Standard Field Benchmark')}
              </span>
              <span className="text-xs font-mono font-extrabold text-green-950 bg-green-100 px-2.5 py-0.5 rounded-md border border-green-300">
                CROP: {(lang === 'te' ? selectedDisease.cropTe : selectedDisease.cropEn).toUpperCase()}
              </span>
              {diagnostics?.lesionAreaPct && (
                <span className="text-xs font-mono font-bold text-green-900 bg-white px-2 py-0.5 rounded-md border border-green-200">
                  Foliage Area: ~{diagnostics.lesionAreaPct}%
                </span>
              )}
            </div>
            
            <h4 className="text-lg sm:text-xl font-black text-[#0a2316]">
              {lang === 'te' ? selectedDisease.nameTe : selectedDisease.nameEn}
            </h4>
            
            <p className="text-xs sm:text-sm text-[#0e4225] font-semibold leading-relaxed">
              {customImage 
                ? (lang === 'te' 
                    ? `మీరు అప్‌లోడ్ చేసిన చిత్రం (${customImage.name}) ఆధారంగా ${selectedDisease.cropTe} పంటలో ${selectedDisease.nameTe} లక్షణాలు గుర్తించబడ్డాయి. కింద పేర్కొన్న మందులను వెంటనే ఉపయోగించండి.`
                    : `Analysis of your uploaded photo (${customImage.name}) confirms symptoms of ${selectedDisease.nameEn}. Review the immediate curative spray measures below.`)
                : (lang === 'te'
                    ? `${selectedDisease.cropTe} పంటలో ఈ తెగులు వ్యాపించినప్పుడు వెంటనే తీసుకోవలసిన చర్యలు కింద ఇవ్వబడ్డాయి.`
                    : `Verified pathological symptoms and dosage recommendations for ${selectedDisease.cropEn} below.`)}
            </p>
          </div>
        </div>

        {/* Diagnosis Details: Symptoms, Precautions, Field Cure */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. Symptoms */}
          <div className="bg-[#edf5f0] p-6 rounded-2xl border-2 border-[#cfe3d6] space-y-3">
            <h4 className="font-black text-[#0a2316] text-base flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-green-700"></span>
              <span>{t.symptomsTitle}</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#0f2d1c] leading-relaxed font-semibold">
              {lang === 'te' ? selectedDisease.symptomsTe : selectedDisease.symptomsEn}
            </p>
          </div>

          {/* 2. Precautions */}
          <div className="bg-[#eaf3ed] p-6 rounded-2xl border-2 border-green-300 space-y-3">
            <h4 className="font-black text-[#0a2316] text-base flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-green-800"></span>
              <span>{t.precautionsTitle}</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#0f2d1c] leading-relaxed font-semibold">
              {lang === 'te' ? selectedDisease.precautionsTe : selectedDisease.precautionsEn}
            </p>
          </div>

          {/* 3. Field Cure */}
          <div className="bg-[#e4ede7] p-6 rounded-2xl border-2 border-green-400 space-y-3">
            <h4 className="font-black text-[#0a2316] text-base flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-green-900"></span>
              <span>{t.cureTitle}</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#0a2316] leading-relaxed font-semibold">
              {lang === 'te' ? selectedDisease.cureTe : selectedDisease.cureEn}
            </p>
          </div>

        </div>

        {/* Verified Curated Telugu Agricultural Video Guides (100% Working Playable Links & Relevant Queries) */}
        <div className="pt-6 border-t border-[#cfe3d6] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="font-black text-[#0a2316] text-lg sm:text-xl flex items-center gap-3">
                <Video className="w-6 h-6 text-green-700" />
                <span>{t.teluguVideosTitle}</span>
              </h4>
              <p className="text-xs text-green-900 font-semibold mt-0.5">
                {lang === 'te' 
                  ? `ఈ తెగులు (${selectedDisease.nameTe}) పై వ్యవసాయ నిపుణుల ప్రత్యక్ష వీడియో సలహాలు`
                  : `Real agronomic video demonstrations on YouTube for ${selectedDisease.nameEn}`}
              </p>
            </div>
            
            <a 
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${selectedDisease.cropEn} ${selectedDisease.nameEn} treatment in telugu`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-extrabold text-xs shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{lang === 'te' ? 'యూట్యూబ్‌లో మరిన్ని వీడియోలు' : 'Search All YouTube Guides'}</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedDisease.youtubeVideos.map(video => (
              <a 
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#edf5f0] rounded-2xl border-2 border-[#cfe3d6] overflow-hidden shadow-xs hover:shadow-md hover:border-green-600 transition-all flex flex-col cursor-pointer block"
              >
                {/* Real Video Thumbnail Header */}
                <div className="relative aspect-video w-full bg-green-950 overflow-hidden">
                  <img 
                    src={video.thumbnail} 
                    alt={video.titleEn} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1592417817098-8f3d6910985c?w=640&q=80";
                    }}
                  />
                  {/* Play Button Overlay in Grass Green */}
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 flex items-center justify-center transition-colors">
                    <div className="w-13 h-13 rounded-full bg-green-600 group-hover:bg-green-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform border-2 border-white/60">
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </div>
                  </div>
                  {/* Channel Tag */}
                  <div className="absolute bottom-2.5 left-2.5 bg-black/75 text-white px-3 py-1 rounded-lg text-xs font-extrabold backdrop-blur-xs border border-white/20">
                    {video.channel}
                  </div>
                </div>

                {/* Video Info & Direct Clickable Link */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
                  <h5 className="font-black text-[#0a2316] text-sm sm:text-base leading-snug group-hover:text-green-700 transition-colors">
                    {lang === 'te' ? video.titleTe : video.titleEn}
                  </h5>

                  <div className="flex items-center justify-between text-xs sm:text-sm font-extrabold text-green-700 pt-2 border-t border-[#cfe3d6]">
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
