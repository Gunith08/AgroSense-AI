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
      <div className="bg-white rounded-3xl p-8 text-center border border-slate-200">
        <p className="text-slate-500">
          {lang === 'te' ? 'సలహాలను రూపొందించడానికి సెన్సార్ డేటాను ట్రాన్స్‌మిట్ చేయండి.' : 'Transmit sensor readings to generate advisory.'}
        </p>
      </div>
    );
  }

  const { topCrops, soilHealth, irrigation, diseaseRisk } = advisory;

  return (
    <div className="space-y-6">

      {/* Section Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {t.advisoryHeader}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {t.advisorySubheader}
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Key Advisories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* CARD 1: Recommended Crops to Cultivate */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2.5">
              <Sprout className="w-5 h-5 text-emerald-700" />
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                {t.suitableCropsTitle}
              </h3>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              {lang === 'te' ? 'టాప్ 3 ఎంపికలు' : 'Top 3 Matches'}
            </span>
          </div>

          <p className="text-xs text-slate-500">
            {t.suitableCropsDesc}
          </p>

          <div className="space-y-3 pt-1">
            {topCrops.map((crop, idx) => (
              <div 
                key={crop.id}
                className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-slate-50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <h4 className="font-bold text-slate-900 text-base">
                      {lang === 'te' ? crop.nameTe : crop.name}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {lang === 'te' ? crop.descTe : crop.descEn}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-200">
                      <Calendar className="w-3 h-3 text-emerald-700" />
                      {lang === 'te' ? crop.daysToMaturityTe : crop.daysToMaturity}
                    </span>
                    <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-200">
                      <Droplets className="w-3 h-3 text-blue-600" />
                      {lang === 'te' ? crop.waterNeedTe : crop.waterNeed}
                    </span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                  <span className="text-[11px] text-slate-500 font-semibold uppercase">{t.suitability}</span>
                  <span className="text-xl font-bold font-mono text-emerald-700">
                    {crop.suitabilityScore}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CARD 2: Soil Chemistry & pH Corrective Measures */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2.5">
              <Award className="w-5 h-5 text-emerald-700" />
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                {t.soilHealthTitle}
              </h3>
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${soilHealth.badgeColor}`}>
              pH {soilHealth.phValue.toFixed(1)}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <span>{lang === 'te' ? soilHealth.statusTe : soilHealth.statusEn}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {lang === 'te' ? soilHealth.actionTe : soilHealth.actionEn}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs text-emerald-900 space-y-1.5">
            <span className="font-bold uppercase tracking-wider text-[11px] text-emerald-800">
              💡 {lang === 'te' ? 'రైతుకు ముఖ్య గమనిక:' : 'Agronomist Practical Note:'}
            </span>
            <p className="leading-relaxed">
              {lang === 'te'
                ? 'నేలలో pH విలువ 6.0 నుండి 7.2 మధ్య ఉన్నప్పుడే మొక్కలు ఎరువులను సమర్థవంతంగా గ్రహించగలవు. నేల పరీక్ష ప్రతి సంవత్సరం చేయించడం శ్రేయస్కరం.'
                : 'Nutrient absorption efficiency drops below 60% if soil pH drifts outside 6.0–7.5. Always conduct periodic field soil testing.'}
            </p>
          </div>
        </div>

        {/* CARD 3: Smart Irrigation & Water Schedule */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2.5">
              <Droplets className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                {t.irrigationTitle}
              </h3>
            </div>
            <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              {irrigation.urgency}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2">
            <div className="flex items-center justify-between text-xs text-blue-900 font-semibold">
              <span>{lang === 'te' ? 'ప్రస్తుత నేల తేమ' : 'Soil Moisture Level'}: {irrigation.soilMoisture}%</span>
              <span>{lang === 'te' ? 'వర్షపాత అంచనా' : 'Rain Forecast'}: {irrigation.rainForecast} mm</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              {lang === 'te' ? irrigation.actionTe : irrigation.actionEn}
            </p>
          </div>

          <div className="text-xs text-slate-500 flex items-center justify-between pt-1">
            <span>{lang === 'te' ? 'డ్రిప్ నీటిపారుదల సిఫార్సు' : 'Drip Automation Logic'}</span>
            <span className="font-mono text-emerald-700 font-bold">{lang === 'te' ? 'పొదుపు: 35% నీరు' : 'Conserves ~35% Water'}</span>
          </div>
        </div>

        {/* CARD 4: 24-72h Environmental Disease Risk Outlook */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2.5">
              <ThermometerSnowflake className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                {t.diseaseRiskTitle}
              </h3>
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
              diseaseRisk.color === 'red' ? 'bg-red-50 text-red-800 border-red-200' :
              diseaseRisk.color === 'amber' ? 'bg-amber-50 text-amber-800 border-amber-200' :
              'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}>
              {lang === 'te' ? diseaseRisk.levelTe : diseaseRisk.levelEn}
            </span>
          </div>

          {/* Risk Meter Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>{lang === 'te' ? 'వాతావరణ తెగుళ్ల ముప్పు సూచిక' : 'Environmental Favorability Score'}</span>
              <span className="font-mono text-sm">{diseaseRisk.score} / 100</span>
            </div>
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div 
                className={`h-full transition-all duration-500 rounded-full ${
                  diseaseRisk.score >= 70 ? 'bg-red-500' :
                  diseaseRisk.score >= 40 ? 'bg-amber-500' :
                  'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(100, diseaseRisk.score)}%` }}
              ></div>
            </div>
          </div>

          {/* Contributing Factors */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {lang === 'te' ? 'కారణాలు:' : 'Contributing Atmospheric Factors:'}
            </span>
            <ul className="space-y-1">
              {(lang === 'te' ? diseaseRisk.factorsTe : diseaseRisk.factorsEn).map((factor, i) => (
                <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick link to Leaf AI */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={onNavigateToLeafAi}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 cursor-pointer"
            >
              <span>{lang === 'te' ? 'ఆకు ఫోటోను అప్‌లోడ్ చేసి తెగులును పరీక్షించండి' : 'Upload a leaf photo to verify symptoms with AI'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
