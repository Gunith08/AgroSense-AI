import React from 'react';
import { 
  Sprout, Droplets, AlertTriangle, CheckCircle, ShieldAlert, 
  Calendar, Award, ArrowRight, ShieldCheck, ThermometerSnowflake, AlertOctagon
} from 'lucide-react';
import { translations } from '../data/translations';

export default function AdvisoryReport({ advisory, lang, onNavigateToLeafAi }) {
  const t = translations[lang];

  if (!advisory) {
    return (
      <div className="bg-white rounded-3xl p-10 text-center border-2 border-emerald-100 shadow-sm">
        <p className="text-base text-slate-600 font-semibold">
          {lang === 'te' ? 'సలహాలను రూపొందించడానికి సెన్సార్ డేటాను ట్రాన్స్‌మిట్ చేయండి.' : 'Transmit sensor readings from the IoT station to generate the action plan.'}
        </p>
      </div>
    );
  }

  const { topCrops, soilHealth, irrigation, diseaseRisk } = advisory;

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* Section Header with Green Gradient Accent */}
      <div className="bg-gradient-to-r from-emerald-800 via-green-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-md shadow-emerald-900/15 border border-emerald-700/50">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-inner shrink-0">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div className="overflow-hidden">
            <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white">
              {t.advisoryHeader}
            </h2>
            <p className="text-xs sm:text-base text-emerald-100 font-medium mt-1">
              {t.advisorySubheader}
            </p>
          </div>
        </div>
      </div>

      {/* Prominent Cautionary Note as Requested */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-xs flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm sm:text-base font-black text-amber-950 flex items-center gap-2">
            <span>{t.cautionTitle}</span>
          </h4>
          <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
            {t.cautionText}
          </p>
        </div>
      </div>

      {/* Grid of Key Advisories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

        {/* CARD 1: Recommended Crops to Cultivate */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-emerald-100 shadow-md shadow-emerald-950/5 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
                {t.suitableCropsTitle}
              </h3>
            </div>
            <span className="text-xs font-black text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              {lang === 'te' ? 'టాప్ 3 ఎంపికలు' : 'Top 3 Matches'}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            {t.suitableCropsDesc}
          </p>

          <div className="space-y-3.5 pt-1">
            {topCrops.map((crop, idx) => (
              <div 
                key={crop.id}
                className="p-4 sm:p-5 rounded-2xl border-2 border-slate-200/90 bg-slate-50/70 hover:bg-emerald-50/30 hover:border-emerald-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-7 h-7 rounded-full bg-gradient-to-r from-emerald-700 to-green-700 text-white text-xs font-black flex items-center justify-center shadow-xs">
                      #{idx + 1}
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-base sm:text-lg">
                      {lang === 'te' ? crop.nameTe : crop.name}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {lang === 'te' ? crop.descTe : crop.descEn}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1 text-xs text-slate-600 font-bold">
                    <span className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                      <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                      {lang === 'te' ? crop.daysToMaturityTe : crop.daysToMaturity}
                    </span>
                    <span className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                      <Droplets className="w-3.5 h-3.5 text-blue-600" />
                      {lang === 'te' ? crop.waterNeedTe : crop.waterNeed}
                    </span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2.5 sm:pt-0 border-slate-200 shrink-0">
                  <span className="text-xs text-slate-500 font-bold uppercase">{t.suitability}</span>
                  <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-800">
                    {crop.suitabilityScore}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CARD 2: Soil Chemistry & pH Corrective Measures */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-emerald-100 shadow-md shadow-emerald-950/5 space-y-5 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
                  {t.soilHealthTitle}
                </h3>
              </div>
              <span className={`text-xs sm:text-sm font-black px-3 py-1 rounded-full border ${soilHealth.badgeColor}`}>
                pH {soilHealth.phValue.toFixed(1)}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/50 border-2 border-emerald-200/80 space-y-2.5">
              <div className="font-black text-slate-900 text-base flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                <span>{lang === 'te' ? soilHealth.statusTe : soilHealth.statusEn}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                {lang === 'te' ? soilHealth.actionTe : soilHealth.actionEn}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950 space-y-1">
            <span className="font-black uppercase tracking-wider text-xs text-emerald-900 block">
              💡 {lang === 'te' ? 'రైతుకు ముఖ్యమైన సూచన:' : 'Agronomist Field Guideline:'}
            </span>
            <p className="leading-relaxed font-medium">
              {lang === 'te'
                ? 'నేలలో pH విలువ 6.0 నుండి 7.2 మధ్య ఉన్నప్పుడే మొక్కలు ఎరువులను సమర్థవంతంగా గ్రహించగలవు. నేల పరీక్షను ప్రతి సంవత్సరం చేయించడం శ్రేయస్కరం.'
                : 'Nutrient absorption efficiency drops below 60% if soil pH drifts outside 6.0–7.5. Always conduct periodic field soil testing.'}
            </p>
          </div>
        </div>

        {/* CARD 3: Smart Irrigation & Water Schedule */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-emerald-100 shadow-md shadow-emerald-950/5 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                <Droplets className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
                {t.irrigationTitle}
              </h3>
            </div>
            <span className="text-xs sm:text-sm font-black text-blue-900 bg-blue-100 px-3 py-1 rounded-full border border-blue-300">
              {irrigation.urgency}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/80 to-slate-50 border-2 border-blue-200 space-y-2.5">
            <div className="flex items-center justify-between text-xs sm:text-sm text-blue-950 font-bold border-b border-blue-100 pb-2">
              <span>{lang === 'te' ? 'ప్రస్తుత నేల తేమ' : 'Soil Moisture Level'}: <strong>{irrigation.soilMoisture}%</strong></span>
              <span>{lang === 'te' ? 'వర్షపాత అంచనా' : 'Rain Forecast'}: <strong>{irrigation.rainForecast} mm</strong></span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              {lang === 'te' ? irrigation.actionTe : irrigation.actionEn}
            </p>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 flex items-center justify-between pt-1 font-semibold">
            <span>{lang === 'te' ? 'డ్రిప్ నీటిపారుదల సిఫార్సు' : 'Smart Drip Irrigation Recommendation'}</span>
            <span className="font-mono text-emerald-800 font-bold">{lang === 'te' ? 'పొదుపు: ~35% నీరు' : 'Conserves ~35% Water'}</span>
          </div>
        </div>

        {/* CARD 4: 24-72h Environmental Disease Risk Outlook */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-emerald-100 shadow-md shadow-emerald-950/5 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <ThermometerSnowflake className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
                {t.diseaseRiskTitle}
              </h3>
            </div>
            <span className={`text-xs sm:text-sm font-black px-3 py-1 rounded-full border ${
              diseaseRisk.color === 'red' ? 'bg-red-100 text-red-900 border-red-300' :
              diseaseRisk.color === 'amber' ? 'bg-amber-100 text-amber-900 border-amber-300' :
              'bg-emerald-100 text-emerald-900 border-emerald-300'
            }`}>
              {lang === 'te' ? diseaseRisk.levelTe : diseaseRisk.levelEn}
            </span>
          </div>

          {/* Risk Meter Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm font-extrabold text-slate-800">
              <span>{lang === 'te' ? 'వాతావరణ తెగుళ్ల ముప్పు సూచిక' : 'Environmental Disease Favorability'}</span>
              <span className="font-mono text-base font-bold">{diseaseRisk.score} / 100</span>
            </div>
            <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden border border-slate-300">
              <div 
                className={`h-full transition-all duration-500 rounded-full ${
                  diseaseRisk.score >= 70 ? 'bg-red-500' :
                  diseaseRisk.score >= 40 ? 'bg-amber-500' :
                  'bg-emerald-600'
                }`}
                style={{ width: `${Math.min(100, diseaseRisk.score)}%` }}
              ></div>
            </div>
          </div>

          {/* Contributing Factors */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
              {lang === 'te' ? 'ముఖ్య కారణాలు:' : 'Contributing Atmospheric Factors:'}
            </span>
            <ul className="space-y-1.5">
              {(lang === 'te' ? diseaseRisk.factorsTe : diseaseRisk.factorsEn).map((factor, i) => (
                <li key={i} className="text-xs sm:text-sm text-slate-800 flex items-start gap-2 font-medium">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick link to Leaf AI */}
          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={onNavigateToLeafAi}
              className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1.5 cursor-pointer group"
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
