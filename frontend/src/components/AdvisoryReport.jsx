import React from 'react';
import { 
  Sprout, Droplets, AlertTriangle, CheckCircle, ShieldAlert, 
  Calendar, Award, ArrowRight, ShieldCheck, ThermometerSnowflake
} from 'lucide-react';
import { translations } from '../data/translations';

export default function AdvisoryReport({ advisory, lang, onNavigateToLeafAi }) {
  const t = translations[lang];

  if (!advisory) {
    return (
      <div className="bg-[#f8fbf9] rounded-3xl p-10 text-center border-2 border-[#cfe3d6] shadow-sm">
        <p className="text-base text-emerald-950 font-bold">
          {lang === 'te' ? 'సలహాలను రూపొందించడానికి సెన్సార్ డేటాను ట్రాన్స్‌మిట్ చేయండి.' : 'Transmit sensor readings from the IoT station to generate the action plan.'}
        </p>
      </div>
    );
  }

  const { topCrops, soilHealth, irrigation, diseaseRisk } = advisory;

  return (
    <div className="space-y-8">

      {/* Section Header with Multi-Tone Forest Green Gradient */}
      <div className="bg-gradient-to-r from-emerald-900 via-green-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-emerald-800/60">
        <div className="flex items-center space-x-4">
          <div className="w-13 h-13 rounded-2xl bg-emerald-700/30 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-300 shadow-inner shrink-0">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div className="overflow-hidden">
            <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white">
              {t.advisoryHeader}
            </h2>
            <p className="text-sm text-emerald-200/90 font-medium mt-1 leading-relaxed">
              {t.advisorySubheader}
            </p>
          </div>
        </div>
      </div>

      {/* Prominent Cautionary Note in Dark Olive / Forest Green Styling */}
      <div className="bg-[#eef5ed] border-2 border-emerald-600 rounded-3xl p-6 sm:p-7 shadow-xs flex items-start gap-4">
        <div className="w-11 h-11 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
          <AlertTriangle className="w-6 h-6 text-emerald-200" />
        </div>
        <div className="space-y-1.5 flex-1">
          <h4 className="text-base sm:text-lg font-black text-[#091f13] flex items-center gap-2">
            <span>{t.cautionTitle}</span>
          </h4>
          <p className="text-sm text-[#0f2d1c] leading-relaxed font-semibold">
            {t.cautionText}
          </p>
        </div>
      </div>

      {/* Grid of 4 Key Agronomic Decision Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* CARD 1: Recommended Crops to Cultivate */}
        <div className="bg-[#f8fbf9] rounded-3xl p-6 sm:p-8 border-2 border-[#cfe3d6] shadow-md shadow-emerald-950/5 space-y-6">
          <div className="flex items-center justify-between border-b border-[#cfe3d6] pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="font-black text-[#0a2316] text-lg sm:text-xl">
                {t.suitableCropsTitle}
              </h3>
            </div>
            <span className="text-xs font-black text-emerald-950 bg-emerald-200/80 px-3 py-1 rounded-full border border-emerald-400">
              {lang === 'te' ? 'టాప్ 3 ఎంపికలు' : 'Top 3 Matches'}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-emerald-950/80 font-medium leading-relaxed">
            {t.suitableCropsDesc}
          </p>

          <div className="space-y-4 pt-1">
            {topCrops.map((crop, idx) => (
              <div 
                key={crop.id}
                className="p-5 rounded-2xl border-2 border-[#cfe3d6] bg-[#edf5f0] hover:border-emerald-600 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-full bg-emerald-800 text-white text-xs font-black flex items-center justify-center shadow-xs">
                      #{idx + 1}
                    </span>
                    <h4 className="font-black text-[#0a2316] text-base sm:text-lg">
                      {lang === 'te' ? crop.nameTe : crop.name}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#0f2d1c] leading-relaxed font-semibold">
                    {lang === 'te' ? crop.descTe : crop.descEn}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1 text-xs text-emerald-950 font-bold">
                    <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-lg border border-emerald-300">
                      <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                      {lang === 'te' ? crop.daysToMaturityTe : crop.daysToMaturity}
                    </span>
                    <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-lg border border-emerald-300">
                      <Droplets className="w-3.5 h-3.5 text-emerald-700" />
                      {lang === 'te' ? crop.waterNeedTe : crop.waterNeed}
                    </span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-[#cfe3d6] shrink-0">
                  <span className="text-xs text-emerald-900 font-extrabold uppercase">{t.suitability}</span>
                  <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-800">
                    {crop.suitabilityScore}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CARD 2: Soil Chemistry & pH Corrective Measures */}
        <div className="bg-[#f8fbf9] rounded-3xl p-6 sm:p-8 border-2 border-[#cfe3d6] shadow-md shadow-emerald-950/5 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#cfe3d6] pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-black text-[#0a2316] text-lg sm:text-xl">
                  {t.soilHealthTitle}
                </h3>
              </div>
              <span className="text-xs sm:text-sm font-black px-3.5 py-1.5 rounded-full border border-emerald-400 bg-emerald-100 text-emerald-950">
                pH {soilHealth.phValue.toFixed(1)}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#edf5f0] border-2 border-emerald-300/80 space-y-3">
              <div className="font-black text-[#0a2316] text-base sm:text-lg flex items-center gap-2.5">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-700"></span>
                <span>{lang === 'te' ? soilHealth.statusTe : soilHealth.statusEn}</span>
              </div>
              <p className="text-sm text-[#0f2d1c] leading-relaxed font-semibold">
                {lang === 'te' ? soilHealth.actionTe : soilHealth.actionEn}
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#e4ede7] border border-[#cfe3d6] text-xs sm:text-sm text-emerald-950 space-y-1.5">
            <span className="font-black uppercase tracking-wider text-xs text-emerald-900 block">
              🌿 {lang === 'te' ? 'రైతుకు ముఖ్యమైన సూచన:' : 'Agronomist Field Guideline:'}
            </span>
            <p className="leading-relaxed font-semibold">
              {lang === 'te'
                ? 'నేలలో pH విలువ 6.0 నుండి 7.2 మధ్య ఉన్నప్పుడే మొక్కలు ఎరువులను సమర్థవంతంగా గ్రహించగలవు. నేల పరీక్షను క్రమం తప్పకుండా చేయించండి.'
                : 'Nutrient absorption efficiency drops significantly if soil pH drifts outside 6.0–7.5. Periodic soil testing ensures optimal yields.'}
            </p>
          </div>
        </div>

        {/* CARD 3: Smart Irrigation (Strictly in Green Spectrum) */}
        <div className="bg-[#f8fbf9] rounded-3xl p-6 sm:p-8 border-2 border-[#cfe3d6] shadow-md shadow-emerald-950/5 space-y-6">
          <div className="flex items-center justify-between border-b border-[#cfe3d6] pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Droplets className="w-6 h-6" />
              </div>
              <h3 className="font-black text-[#0a2316] text-lg sm:text-xl">
                {t.irrigationTitle}
              </h3>
            </div>
            <span className="text-xs sm:text-sm font-black text-emerald-950 bg-emerald-200/90 px-3.5 py-1.5 rounded-full border border-emerald-400">
              {irrigation.urgency}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#edf5f0] border-2 border-emerald-300 space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm text-emerald-950 font-black border-b border-emerald-200/80 pb-2.5">
              <span>{lang === 'te' ? 'ప్రస్తుత నేల తేమ' : 'Soil Moisture'}: <strong>{irrigation.soilMoisture}%</strong></span>
              <span>{lang === 'te' ? 'వర్షపాత అంచనా' : 'Rain Forecast'}: <strong>{irrigation.rainForecast} mm</strong></span>
            </div>
            <p className="text-sm text-[#0f2d1c] leading-relaxed font-semibold">
              {lang === 'te' ? irrigation.actionTe : irrigation.actionEn}
            </p>
          </div>

          <div className="text-xs sm:text-sm text-emerald-950 flex items-center justify-between pt-1 font-bold">
            <span>{lang === 'te' ? 'డ్రిప్ నీటిపారుదల సిఫార్సు' : 'Smart Drip Irrigation Recommendation'}</span>
            <span className="font-mono text-emerald-800 font-extrabold">{lang === 'te' ? 'పొదుపు: ~35% నీరు' : 'Conserves ~35% Water'}</span>
          </div>
        </div>

        {/* CARD 4: 24-72h Environmental Disease Risk Outlook */}
        <div className="bg-[#f8fbf9] rounded-3xl p-6 sm:p-8 border-2 border-[#cfe3d6] shadow-md shadow-emerald-950/5 space-y-6">
          <div className="flex items-center justify-between border-b border-[#cfe3d6] pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <ThermometerSnowflake className="w-6 h-6" />
              </div>
              <h3 className="font-black text-[#0a2316] text-lg sm:text-xl">
                {t.diseaseRiskTitle}
              </h3>
            </div>
            <span className="text-xs sm:text-sm font-black px-3.5 py-1.5 rounded-full border border-emerald-400 bg-emerald-200 text-emerald-950">
              {lang === 'te' ? diseaseRisk.levelTe : diseaseRisk.levelEn}
            </span>
          </div>

          {/* Risk Meter Bar */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs sm:text-sm font-black text-[#0a2316]">
              <span>{lang === 'te' ? 'వాతావరణ తెగుళ్ల ముప్పు సూచిక' : 'Environmental Disease Favorability'}</span>
              <span className="font-mono text-base font-bold">{diseaseRisk.score} / 100</span>
            </div>
            <div className="h-3 w-full bg-[#d6e5dc] rounded-full overflow-hidden border border-[#b8d3c1]">
              <div 
                className="h-full transition-all duration-500 rounded-full bg-gradient-to-r from-emerald-500 to-green-800"
                style={{ width: `${Math.min(100, diseaseRisk.score)}%` }}
              ></div>
            </div>
          </div>

          {/* Contributing Factors */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-black text-emerald-950 uppercase tracking-wider block">
              {lang === 'te' ? 'ముఖ్య కారణాలు:' : 'Contributing Atmospheric Factors:'}
            </span>
            <ul className="space-y-2">
              {(lang === 'te' ? diseaseRisk.factorsTe : diseaseRisk.factorsEn).map((factor, i) => (
                <li key={i} className="text-xs sm:text-sm text-[#0f2d1c] flex items-start gap-2.5 font-semibold">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick link to Leaf AI */}
          <div className="pt-3 border-t border-[#cfe3d6]">
            <button
              onClick={onNavigateToLeafAi}
              className="text-xs sm:text-sm font-black text-emerald-800 hover:text-emerald-900 flex items-center gap-2 cursor-pointer group"
            >
              <span>{lang === 'te' ? 'ఆకు ఫోటోను అప్‌లోడ్ చేసి తెగులును నివారించండి' : 'Upload or verify leaf photo symptoms with AI'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
