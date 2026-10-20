import React from 'react';
import { 
  Cpu, Droplets, Wind, Thermometer, CloudRain, MapPin, 
  Layers, CheckCircle2, RefreshCw, Send, Sparkles
} from 'lucide-react';
import { translations } from '../data/translations';
import { LOCATIONS, SOIL_TYPES } from '../data/cropsData';

export default function IoTDeviceStation({ 
  telemetry, 
  setTelemetry, 
  onTransmit, 
  isTransmitting, 
  lang,
  weather,
  onRefreshWeather
}) {
  const t = translations[lang];

  // Helper for pH color spectrum - strictly in Green spectrum
  const getPhColor = (ph) => {
    if (ph < 6.0) return { bg: 'bg-emerald-600', text: 'text-emerald-950', label: lang === 'te' ? 'ఆమ్ల స్వభావం (Acidic pH)' : 'Acidic (<6.0)' };
    if (ph <= 7.5) return { bg: 'bg-emerald-700', text: 'text-emerald-950', label: lang === 'te' ? 'సమతుల్య సారం (Optimal pH)' : 'Optimal Balanced (6.0 - 7.5)' };
    return { bg: 'bg-green-800', text: 'text-green-950', label: lang === 'te' ? 'క్షార స్వభావం (Alkaline pH)' : 'Alkaline (>7.5)' };
  };

  const phMeta = getPhColor(telemetry.soilPh);

  // Quick Field Scenarios
  const applyScenario = (type) => {
    if (type === 'acidic') {
      setTelemetry(prev => ({ ...prev, soilPh: 5.2, soilMoisture: 45, humidity: 70 }));
    } else if (type === 'drought') {
      setTelemetry(prev => ({ ...prev, soilPh: 6.8, soilMoisture: 18, humidity: 35 }));
    } else if (type === 'blight') {
      setTelemetry(prev => ({ ...prev, soilPh: 6.5, soilMoisture: 78, humidity: 88 }));
    } else if (type === 'optimal') {
      setTelemetry(prev => ({ ...prev, soilPh: 6.6, soilMoisture: 55, humidity: 62 }));
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner: Field Scenarios with Multi-Tone Forest Green Gradient */}
      <div className="bg-gradient-to-r from-emerald-900 via-green-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-emerald-800/60">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center space-x-3">
              <span className="p-2 rounded-xl bg-emerald-700/40 text-emerald-300 border border-emerald-500/30">
                <Sparkles className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {lang === 'te' ? 'ఫీల్డ్ సిమ్యులేషన్ దృశ్యాలు (Field Scenarios)' : 'Field Scenario Quick Controls'}
              </h2>
            </div>
            <p className="text-sm text-emerald-200/90 font-medium leading-relaxed">
              {lang === 'te' 
                ? 'వివిధ వాతావరణ మరియు నేల పరిస్థితులలో AI ఇచ్చే సలహాలను ఒకే క్లిక్‌తో పరీక్షించండి.'
                : '1-click telemetry injection to evaluate the advisory system under diverse agrarian conditions.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => applyScenario('optimal')}
              className="px-4 py-2.5 text-xs sm:text-sm font-extrabold rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-white border border-emerald-600 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
            >
              🌱 {lang === 'te' ? 'ఆదర్శవంతమైన పొలం' : 'Optimal Field'}
            </button>
            <button
              onClick={() => applyScenario('acidic')}
              className="px-4 py-2.5 text-xs sm:text-sm font-extrabold rounded-xl bg-green-950/90 hover:bg-green-900 text-emerald-200 border border-emerald-700 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
            >
              ⚠️ {lang === 'te' ? 'ఆమ్ల నేల (pH 5.2)' : 'Acidic Soil (5.2)'}
            </button>
            <button
              onClick={() => applyScenario('drought')}
              className="px-4 py-2.5 text-xs sm:text-sm font-extrabold rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-200 border border-emerald-700 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
            >
              ☀️ {lang === 'te' ? 'కరువు / తక్కువ తేమ' : 'Drought / Dry (18%)'}
            </button>
            <button
              onClick={() => applyScenario('blight')}
              className="px-4 py-2.5 text-xs sm:text-sm font-extrabold rounded-xl bg-green-900/80 hover:bg-green-800 text-emerald-100 border border-emerald-600 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
            >
              🌾 {lang === 'te' ? 'అధిక తేమ తెగులు ముప్పు' : 'High Humidity (88%)'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: 2 Eye-Catching Hardware Panels in Rich Forest Green Styles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* DEVICE 1: AgroProbe 7-in-1 Soil Multi-Sensor */}
        <div className="bg-[#f8fbf9] rounded-3xl border-2 border-[#cfe3d6] shadow-md shadow-emerald-950/5 overflow-hidden flex flex-col justify-between transition-all hover:border-emerald-600">
          
          {/* Casing Header - Forest Green Theme */}
          <div className="bg-gradient-to-r from-[#0d2618] via-[#113320] to-[#0a1e13] text-white p-5 sm:p-6 flex items-center justify-between border-b-2 border-emerald-900/80">
            <div className="flex items-center space-x-4">
              <div className="w-13 h-13 rounded-2xl bg-emerald-600/20 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-300 shadow-inner">
                <Cpu className="w-7 h-7" />
              </div>
              <div className="overflow-hidden">
                <h3 className="font-black text-lg sm:text-xl tracking-tight text-white truncate">
                  {t.soilNodeTitle}
                </h3>
                <p className="text-xs text-emerald-300/80 font-mono tracking-wider mt-0.5">
                  {t.soilNodeModel}
                </p>
              </div>
            </div>
            
            {/* Status LED */}
            <div className="flex items-center space-x-2 bg-[#08180f] px-3.5 py-1.5 rounded-full border border-emerald-800 shrink-0">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-emerald-400 font-mono tracking-wider">
                {t.soilNodeStatus}
              </span>
            </div>
          </div>

          {/* Luminous Digital LCD Console */}
          <div className="p-6 sm:p-8 space-y-7">
            
            {/* High-Contrast Luminous Display in Dark Evergreen Matrix */}
            <div className="bg-gradient-to-b from-[#0a1e13] to-[#06140c] p-6 rounded-2xl border-2 border-emerald-700/80 shadow-2xl text-emerald-300 font-mono space-y-4">
              <div className="flex items-center justify-between text-xs text-emerald-400/80 border-b border-emerald-900/80 pb-3">
                <span className="tracking-widest font-bold">SOIL MATRIX TELEMETRY // RS-485</span>
                <span className="text-xs bg-[#0f301d] px-2.5 py-0.5 rounded text-emerald-300 font-extrabold border border-emerald-700">
                  CALIBRATED
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div className="border-r border-emerald-900/80 pr-3">
                  <div className="text-xs uppercase text-emerald-200 font-sans font-extrabold">
                    {t.soilMoistureLabel}
                  </div>
                  <div className="text-4xl sm:text-5xl font-black font-lcd text-emerald-300 mt-1">
                    {telemetry.soilMoisture.toFixed(1)}<span className="text-xl font-bold text-emerald-400 ml-1">%</span>
                  </div>
                </div>

                <div className="pl-3">
                  <div className="text-xs uppercase text-emerald-200 font-sans font-extrabold">
                    {t.soilPhLabel}
                  </div>
                  <div className="text-4xl sm:text-5xl font-black font-lcd text-emerald-300 mt-1">
                    {telemetry.soilPh.toFixed(1)}<span className="text-base font-bold text-emerald-400 ml-1">pH</span>
                  </div>
                </div>
              </div>

              {/* Status readout */}
              <div className="text-xs text-emerald-200 pt-2 flex items-center justify-between font-sans border-t border-emerald-900/80">
                <span className="font-bold">{lang === 'te' ? 'భూసార స్థితి:' : 'Soil State:'} <strong className="text-white ml-1">{phMeta.label}</strong></span>
                <span className="font-mono text-emerald-400 font-bold">TRIPLE 316L PROBES</span>
              </div>
            </div>

            {/* Control 1: Soil Moisture (Strictly Green Theme, No Blue) */}
            <div className="space-y-3 bg-[#edf5f0] p-5 rounded-2xl border-2 border-[#cfe3d6]">
              <div className="flex items-center justify-between">
                <label className="text-sm sm:text-base font-extrabold text-[#0a2316] flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-emerald-700" />
                  <span>{t.soilMoistureLabel}</span>
                </label>
                <span className="text-base font-black text-emerald-950 bg-emerald-200/90 px-3 py-1 rounded-xl font-mono shadow-2xs border border-emerald-300">
                  {telemetry.soilMoisture}%
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="95"
                step="1"
                value={telemetry.soilMoisture}
                onChange={(e) => setTelemetry(prev => ({ ...prev, soilMoisture: parseFloat(e.target.value) }))}
                className="w-full h-3 bg-emerald-200/70 rounded-lg appearance-none cursor-pointer accent-emerald-800"
              />
              <div className="flex items-center justify-between text-xs font-bold text-emerald-900 pt-1">
                <span>5% ({lang === 'te' ? 'ఎండిన నేల' : 'Dry'})</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setTelemetry(prev => ({ ...prev, soilMoisture: 18 }))}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white border border-emerald-300 font-bold text-emerald-900 hover:bg-emerald-100 cursor-pointer"
                  >
                    18%
                  </button>
                  <button 
                    onClick={() => setTelemetry(prev => ({ ...prev, soilMoisture: 55 }))}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white border border-emerald-300 font-bold text-emerald-900 hover:bg-emerald-100 cursor-pointer"
                  >
                    55%
                  </button>
                  <button 
                    onClick={() => setTelemetry(prev => ({ ...prev, soilMoisture: 85 }))}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white border border-emerald-300 font-bold text-emerald-900 hover:bg-emerald-100 cursor-pointer"
                  >
                    85%
                  </button>
                </div>
                <span>95% ({lang === 'te' ? 'అధిక తేమ' : 'Saturated'})</span>
              </div>
            </div>

            {/* Control 2: Soil pH (Strictly Green Spectrum) */}
            <div className="space-y-3 bg-[#edf5f0] p-5 rounded-2xl border-2 border-[#cfe3d6]">
              <div className="flex items-center justify-between">
                <label className="text-sm sm:text-base font-extrabold text-[#0a2316] flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-700 inline-block shadow-xs"></span>
                  <span>{t.soilPhLabel}</span>
                </label>
                <span className="text-base font-black px-3 py-1 rounded-xl font-mono shadow-2xs text-emerald-950 bg-emerald-200/90 border border-emerald-300">
                  pH {telemetry.soilPh.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min="4.0"
                max="9.0"
                step="0.1"
                value={telemetry.soilPh}
                onChange={(e) => setTelemetry(prev => ({ ...prev, soilPh: parseFloat(e.target.value) }))}
                className="w-full h-3 bg-emerald-200/70 rounded-lg appearance-none cursor-pointer accent-emerald-800"
              />
              
              {/* Green Spectrum Gradient Bar */}
              <div className="h-2 w-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-600 to-green-900"></div>

              <div className="flex items-center justify-between text-xs font-bold text-emerald-900 pt-0.5">
                <span>4.0 ({lang === 'te' ? 'ఆమ్లం' : 'Acidic'})</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setTelemetry(prev => ({ ...prev, soilPh: 5.2 }))}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white border border-emerald-300 font-bold text-emerald-900 hover:bg-emerald-100 cursor-pointer"
                  >
                    5.2
                  </button>
                  <button 
                    onClick={() => setTelemetry(prev => ({ ...prev, soilPh: 6.5 }))}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white border border-emerald-300 font-bold text-emerald-900 hover:bg-emerald-100 cursor-pointer"
                  >
                    6.5
                  </button>
                  <button 
                    onClick={() => setTelemetry(prev => ({ ...prev, soilPh: 8.2 }))}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white border border-emerald-300 font-bold text-emerald-900 hover:bg-emerald-100 cursor-pointer"
                  >
                    8.2
                  </button>
                </div>
                <span>9.0 ({lang === 'te' ? 'క్షారం' : 'Alkaline'})</span>
              </div>
            </div>

          </div>

          {/* Footer Bar */}
          <div className="bg-[#e4ede7] px-6 py-4 border-t border-[#cfe3d6] flex items-center justify-between text-xs font-bold text-emerald-950">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              {lang === 'te' ? 'స్టెయిన్‌లెస్ స్టీల్ 316L ప్రోబ్స్ సక్రమంగా ఉన్నాయి' : 'Triple 316L Industrial Steel Probes'}
            </span>
            <span className="font-mono text-xs text-emerald-900">Depth: 15-20cm</span>
          </div>

        </div>


        {/* DEVICE 2: AgroWeather Micro-Climate Station */}
        <div className="bg-[#f8fbf9] rounded-3xl border-2 border-[#cfe3d6] shadow-md shadow-emerald-950/5 overflow-hidden flex flex-col justify-between transition-all hover:border-emerald-600">
          
          {/* Casing Header */}
          <div className="bg-gradient-to-r from-[#0d2618] via-[#113320] to-[#0a1e13] text-white p-5 sm:p-6 flex items-center justify-between border-b-2 border-emerald-900/80">
            <div className="flex items-center space-x-4">
              <div className="w-13 h-13 rounded-2xl bg-emerald-600/20 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-300 shadow-inner">
                <Wind className="w-7 h-7" />
              </div>
              <div className="overflow-hidden">
                <h3 className="font-black text-lg sm:text-xl tracking-tight text-white truncate">
                  {t.weatherNodeTitle}
                </h3>
                <p className="text-xs text-emerald-300/80 font-mono tracking-wider mt-0.5">
                  {t.weatherNodeModel}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 bg-[#08180f] px-3.5 py-1.5 rounded-full border border-emerald-800 shrink-0">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-emerald-400 font-mono tracking-wider">
                {t.weatherNodeStatus}
              </span>
            </div>
          </div>

          {/* LCD Panel & Controls */}
          <div className="p-6 sm:p-8 space-y-7">
            
            {/* Weather Station LCD Console in Dark Evergreen */}
            <div className="bg-gradient-to-b from-[#0a1e13] to-[#06140c] p-6 rounded-2xl border-2 border-emerald-700/80 shadow-2xl text-emerald-300 font-mono space-y-4">
              <div className="flex items-center justify-between text-xs text-emerald-400/80 border-b border-emerald-900/80 pb-3">
                <span className="tracking-widest font-bold">ATMOSPHERIC TELEMETRY</span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-200 font-bold bg-[#0f301d] px-2.5 py-0.5 rounded border border-emerald-700">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {LOCATIONS.find(l => l.id === telemetry.locationId)?.name}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="border-r border-emerald-900/80 pr-2">
                  <div className="text-xs uppercase text-emerald-200 font-sans font-extrabold">
                    {t.humidityLabel}
                  </div>
                  <div className="text-3xl sm:text-4xl font-black font-lcd text-emerald-300 mt-1">
                    {telemetry.humidity.toFixed(0)}<span className="text-lg font-bold text-emerald-400 ml-0.5">%</span>
                  </div>
                </div>

                <div className="border-r border-emerald-900/80 pr-2">
                  <div className="text-xs uppercase text-emerald-200 font-sans font-extrabold">
                    {t.tempLabel}
                  </div>
                  <div className="text-3xl sm:text-4xl font-black font-lcd text-emerald-300 mt-1">
                    {weather?.temperature_c ?? 31}°<span className="text-base font-bold text-emerald-400">C</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase text-emerald-200 font-sans font-extrabold">
                    {lang === 'te' ? 'వర్షపాతం' : 'Forecast Rain'}
                  </div>
                  <div className="text-3xl sm:text-4xl font-black font-lcd text-emerald-300 mt-1">
                    {weather?.rain_mm ?? 0}<span className="text-xs font-bold text-emerald-400 ml-1">mm</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-emerald-200 pt-2 flex items-center justify-between font-sans border-t border-emerald-900/80">
                <span className="font-bold">{lang === 'te' ? 'వాతావరణం: లైవ్ ఓపెన్-మెటియో' : 'Atmospheric Telemetry Sync'}</span>
                <button 
                  onClick={onRefreshWeather}
                  className="flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white underline font-extrabold cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  {t.refreshWeather}
                </button>
              </div>
            </div>

            {/* Interactive Control: Air Humidity */}
            <div className="space-y-3 bg-[#edf5f0] p-5 rounded-2xl border-2 border-[#cfe3d6]">
              <div className="flex items-center justify-between">
                <label className="text-sm sm:text-base font-extrabold text-[#0a2316] flex items-center gap-2">
                  <Wind className="w-5 h-5 text-emerald-700" />
                  <span>{t.humidityLabel}</span>
                </label>
                <span className="text-base font-black text-emerald-950 bg-emerald-200/90 px-3 py-1 rounded-xl font-mono shadow-2xs border border-emerald-300">
                  {telemetry.humidity}% RH
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="98"
                step="1"
                value={telemetry.humidity}
                onChange={(e) => setTelemetry(prev => ({ ...prev, humidity: parseFloat(e.target.value) }))}
                className="w-full h-3 bg-emerald-200/70 rounded-lg appearance-none cursor-pointer accent-emerald-800"
              />
              <div className="flex items-center justify-between text-xs font-bold text-emerald-900 pt-1">
                <span>15% ({t.presetLowHumidity})</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setTelemetry(prev => ({ ...prev, humidity: 35 }))}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white border border-emerald-300 font-bold text-emerald-900 hover:bg-emerald-100 cursor-pointer"
                  >
                    35%
                  </button>
                  <button 
                    onClick={() => setTelemetry(prev => ({ ...prev, humidity: 65 }))}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white border border-emerald-300 font-bold text-emerald-900 hover:bg-emerald-100 cursor-pointer"
                  >
                    65%
                  </button>
                  <button 
                    onClick={() => setTelemetry(prev => ({ ...prev, humidity: 88 }))}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white border border-emerald-300 font-bold text-emerald-900 hover:bg-emerald-100 cursor-pointer"
                  >
                    88%
                  </button>
                </div>
                <span>98% ({t.presetHighHumidity})</span>
              </div>
            </div>

            {/* Weather Callout */}
            <div className="p-4 bg-[#e8f2eb] rounded-2xl border-2 border-[#cfe3d6] flex items-start gap-3 text-xs sm:text-sm text-emerald-950 font-bold">
              <Thermometer className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                {lang === 'te' 
                  ? 'ఎంచుకున్న ప్రాంతం ఆధారంగా ఉష్ణోగ్రత మరియు 24 గంటల వర్షపాత అంచనా స్వయంచాలకంగా పొందబడుతుంది.'
                  : 'Location weather is automatically refreshed from regional forecasts to power rain-aware irrigation.'}
              </span>
            </div>

          </div>

          {/* Footer Bar */}
          <div className="bg-[#e4ede7] px-6 py-4 border-t border-[#cfe3d6] flex items-center justify-between text-xs font-bold text-emerald-950">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              {lang === 'te' ? 'సోలార్ రేడియేషన్ షీల్డ్ & అల్ట్రాసోనిక్ సెన్సార్లు సిద్ధంగా ఉన్నాయి' : 'Solar Radiation Shield & Anemometer Mast'}
            </span>
            <span className="font-mono text-xs text-emerald-900">2.5m Altitude</span>
          </div>

        </div>

      </div>

      {/* Manual Farm Selectors: Soil Type & Location */}
      <div className="bg-[#f8fbf9] rounded-3xl p-6 sm:p-8 border-2 border-[#cfe3d6] shadow-md shadow-emerald-950/5 space-y-6">
        <div className="border-b border-[#cfe3d6] pb-4">
          <h3 className="font-black text-[#0a2316] text-lg sm:text-xl flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-emerald-700" />
            <span>{lang === 'te' ? 'పొలం నేల రకం మరియు ప్రాంతం ఎంపిక' : 'Field Soil Classification & Regional Hub'}</span>
          </h3>
          <p className="text-xs sm:text-sm text-emerald-900/80 font-medium mt-1">
            {lang === 'te' ? 'మీ ప్రాంతం మరియు నేల లక్షణాలను ఎంచుకోవడం ద్వారా ఖచ్చితమైన పంట సలహాలను రూపొందించండి.' : 'Configure your local field characteristics to tailor the crop and irrigation recommendation.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Soil Type Selection */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-extrabold text-[#0a2316] uppercase tracking-wider block">
              {t.soilTypeLabel}
            </label>
            <select
              value={telemetry.soilType}
              onChange={(e) => setTelemetry(prev => ({ ...prev, soilType: e.target.value }))}
              className="w-full bg-[#edf5f0] border-2 border-[#cfe3d6] text-[#0a2316] rounded-2xl px-4 py-3.5 text-sm sm:text-base font-extrabold focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 focus:outline-none cursor-pointer"
            >
              {SOIL_TYPES.map(soil => (
                <option key={soil.id} value={soil.id}>
                  {lang === 'te' ? soil.nameTe : soil.name} ({lang === 'te' ? `డ్రైనేజీ: ${soil.drainage}` : `Drainage: ${soil.drainage}`})
                </option>
              ))}
            </select>
            <p className="text-xs text-emerald-900/70 font-semibold">
              {lang === 'te'
                ? 'నేల రకం ఆధారంగా నీటి నిల్వ సామర్థ్యం మరియు పంటల అనుకూలత లెక్కించబడుతుంది.'
                : 'Hydraulic drainage conductivity determines the irrigation run-times.'}
            </p>
          </div>

          {/* Location Selection */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-extrabold text-[#0a2316] uppercase tracking-wider block">
              {t.locationLabel}
            </label>
            <select
              value={telemetry.locationId}
              onChange={(e) => setTelemetry(prev => ({ ...prev, locationId: e.target.value }))}
              className="w-full bg-[#edf5f0] border-2 border-[#cfe3d6] text-[#0a2316] rounded-2xl px-4 py-3.5 text-sm sm:text-base font-extrabold focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 focus:outline-none cursor-pointer"
            >
              {LOCATIONS.map(loc => (
                <option key={loc.id} value={loc.id}>
                  {lang === 'te' ? loc.nameTe : loc.name} — {loc.region}
                </option>
              ))}
            </select>
            <p className="text-xs text-emerald-900/70 font-semibold">
              {lang === 'te'
                ? 'ఆంధ్రప్రదేశ్ మరియు తెలంగాణ ప్రధాన వ్యవసాయ ప్రాంతాల లైవ్ వాతావరణం.'
                : 'Connects regional climate history with live weather and rain forecasting.'}
            </p>
          </div>

        </div>

        {/* Big Transmit Button in Rich Forest Green Gradient */}
        <div className="pt-2">
          <button
            onClick={onTransmit}
            disabled={isTransmitting}
            className="w-full py-5 px-6 bg-gradient-to-r from-emerald-800 via-green-800 to-emerald-900 hover:from-emerald-900 hover:to-green-950 text-white rounded-2xl font-black text-base sm:text-lg shadow-xl shadow-emerald-950/20 flex items-center justify-center space-x-3 active:scale-[0.99] transition-all disabled:opacity-75 cursor-pointer border border-emerald-700"
          >
            <Send className={`w-5 h-5 ${isTransmitting ? 'animate-bounce' : ''}`} />
            <span>{isTransmitting ? t.transmitting : t.transmitButton}</span>
          </button>
        </div>

      </div>

    </div>
  );
}
