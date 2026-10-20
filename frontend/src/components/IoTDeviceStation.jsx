import React from 'react';
import { 
  Cpu, Droplets, Wind, Thermometer, CloudRain, MapPin, 
  Layers, CheckCircle2, RefreshCw, Send, Sparkles, AlertTriangle
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

  // Helper for pH color spectrum
  const getPhColor = (ph) => {
    if (ph < 6.0) return { bg: 'bg-amber-500', text: 'text-amber-700', label: lang === 'te' ? 'ఆమ్ల స్వభావం (Acidic)' : 'Acidic (<6.0)' };
    if (ph <= 7.5) return { bg: 'bg-emerald-500', text: 'text-emerald-700', label: lang === 'te' ? 'సమతుల్య సారం (Optimal)' : 'Optimal (6.0 - 7.5)' };
    return { bg: 'bg-blue-600', text: 'text-blue-700', label: lang === 'te' ? 'క్షార స్వభావం (Alkaline)' : 'Alkaline (>7.5)' };
  };

  const phMeta = getPhColor(telemetry.soilPh);

  // Quick Scenario Presets for 30-min workshop presentation
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
    <div className="space-y-6">
      
      {/* Top Banner: Scenario Quick Launcher */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-emerald-700" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {lang === 'te' ? 'వర్క్‌షాప్ ప్రత్యక్ష డెమో దృశ్యాలు (Live Scenarios)' : 'Live Workshop Scenario Presets'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === 'te' 
                ? '30 నిమిషాల ప్రదర్శన కోసం ఒకే క్లిక్‌తో సెన్సార్ విలువలను మార్చండి'
                : '1-click telemetry injection to demonstrate AI reasoning during your 30-min presentation'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => applyScenario('optimal')}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
            >
              🌱 {lang === 'te' ? 'ఆదర్శవంతమైన పొలం' : 'Optimal Field'}
            </button>
            <button
              onClick={() => applyScenario('acidic')}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors"
            >
              ⚠️ {lang === 'te' ? 'ఆమ్ల నేల (Acidic pH 5.2)' : 'Acidic Soil (5.2)'}
            </button>
            <button
              onClick={() => applyScenario('drought')}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-orange-50 text-orange-800 border border-orange-200 hover:bg-orange-100 transition-colors"
            >
              ☀️ {lang === 'te' ? 'కరువు / తక్కువ తేమ (18%)' : 'Drought / Dry (18%)'}
            </button>
            <button
              onClick={() => applyScenario('blight')}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-red-50 text-red-800 border border-red-200 hover:bg-red-100 transition-colors"
            >
              🍄 {lang === 'te' ? 'అధిక తేమ తెగుళ్ల ముప్పు (88%)' : 'High Humidity (88%)'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: 2 Realistic IoT Field Hardware Devices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* DEVICE 1: AgroProbe 7-in-1 Soil Multi-Sensor */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
          
          {/* Hardware Header / Rugged Casing Plate */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg tracking-tight text-white flex items-center gap-2">
                  {t.soilNodeTitle}
                </h3>
                <p className="text-xs text-slate-400 font-mono tracking-wider">
                  {t.soilNodeModel} • ID: RS485-SOIL-01
                </p>
              </div>
            </div>
            
            {/* Pulsing Status LED */}
            <div className="flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-bold text-emerald-400 font-mono tracking-wider">
                {t.soilNodeStatus}
              </span>
            </div>
          </div>

          {/* Hardware Visual & Digital LCD Screen */}
          <div className="p-5 sm:p-6 space-y-6">
            
            {/* Digital Backlit LCD Panel */}
            <div className="bg-[#1b2b20] p-4 rounded-2xl border-2 border-[#2c4a35] shadow-inner text-emerald-400 font-mono space-y-3">
              <div className="flex items-center justify-between text-xs text-emerald-400/70 border-b border-[#2c4a35] pb-2">
                <span>AGRO-TELEMETRY RX-BUS // VOLT: 3.3V</span>
                <span>CALIBRATED: NIST</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs uppercase text-emerald-300/80 font-sans font-semibold">
                    {t.soilMoistureLabel}
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold font-lcd text-emerald-300">
                    {telemetry.soilMoisture.toFixed(1)}<span className="text-lg font-normal text-emerald-400">%</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase text-emerald-300/80 font-sans font-semibold">
                    {t.soilPhLabel}
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold font-lcd text-emerald-300">
                    {telemetry.soilPh.toFixed(2)}<span className="text-sm font-normal text-emerald-400 ml-1">pH</span>
                  </div>
                </div>
              </div>

              {/* Status readout */}
              <div className="text-xs text-emerald-300/90 pt-1 flex items-center justify-between font-sans">
                <span>{lang === 'te' ? 'భూసార స్థితి:' : 'Soil Chemistry:'} {phMeta.label}</span>
                <span className="font-mono text-[10px] text-emerald-400/70">SIG: 98% RSSI</span>
              </div>
            </div>

            {/* Interactive Control 1: Soil Moisture */}
            <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-blue-600" />
                  <span>{t.soilMoistureLabel}</span>
                </label>
                <span className="text-sm font-bold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full font-mono">
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
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>5% ({lang === 'te' ? 'పొడి' : 'Dry'})</span>
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => setTelemetry(prev => ({ ...prev, soilMoisture: 18 }))}
                    className="text-[11px] px-2 py-0.5 rounded bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                  >
                    18%
                  </button>
                  <button 
                    onClick={() => setTelemetry(prev => ({ ...prev, soilMoisture: 55 }))}
                    className="text-[11px] px-2 py-0.5 rounded bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                  >
                    55%
                  </button>
                  <button 
                    onClick={() => setTelemetry(prev => ({ ...prev, soilMoisture: 85 }))}
                    className="text-[11px] px-2 py-0.5 rounded bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                  >
                    85%
                  </button>
                </div>
                <span>95% ({lang === 'te' ? 'అధిక తేమ' : 'Wet'})</span>
              </div>
            </div>

            {/* Interactive Control 2: Soil pH */}
            <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 inline-block"></span>
                  <span>{t.soilPhLabel}</span>
                </label>
                <span className={`text-sm font-bold px-2.5 py-0.5 rounded-full font-mono ${phMeta.text} bg-white border border-slate-200`}>
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
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
              />
              
              {/* Color Bar Scale */}
              <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-red-500 via-emerald-500 to-blue-600"></div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-0.5">
                <span className="text-red-700 font-medium">4.0 ({lang === 'te' ? 'ఆమ్లం' : 'Acidic'})</span>
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => setTelemetry(prev => ({ ...prev, soilPh: 5.2 }))}
                    className="text-[11px] px-2 py-0.5 rounded bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                  >
                    5.2
                  </button>
                  <button 
                    onClick={() => setTelemetry(prev => ({ ...prev, soilPh: 6.5 }))}
                    className="text-[11px] px-2 py-0.5 rounded bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                  >
                    6.5
                  </button>
                  <button 
                    onClick={() => setTelemetry(prev => ({ ...prev, soilPh: 8.2 }))}
                    className="text-[11px] px-2 py-0.5 rounded bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                  >
                    8.2
                  </button>
                </div>
                <span className="text-blue-700 font-medium">9.0 ({lang === 'te' ? 'క్షారం' : 'Alkaline'})</span>
              </div>
            </div>

          </div>

          {/* Stainless Probe Graphic Footer */}
          <div className="bg-slate-100/90 px-5 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {lang === 'te' ? 'స్టెయిన్‌లెస్ స్టీల్ 316L ప్రోబ్స్ సక్రమంగా ఉన్నాయి' : 'Triple 316L Stainless Probes Anchored'}
            </span>
            <span className="font-mono text-[11px] text-slate-600">Depth: 15cm</span>
          </div>

        </div>


        {/* DEVICE 2: AgroWeather Micro-Climate Station */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
          
          {/* Hardware Header */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400">
                <Wind className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg tracking-tight text-white flex items-center gap-2">
                  {t.weatherNodeTitle}
                </h3>
                <p className="text-xs text-slate-400 font-mono tracking-wider">
                  {t.weatherNodeModel} • ID: CLIM-NODE-02
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
              </span>
              <span className="text-[11px] font-bold text-sky-400 font-mono tracking-wider">
                {t.weatherNodeStatus}
              </span>
            </div>
          </div>

          {/* LCD Panel & Controls */}
          <div className="p-5 sm:p-6 space-y-6">
            
            {/* Weather Station LCD Console */}
            <div className="bg-[#192734] p-4 rounded-2xl border-2 border-[#2b3e52] shadow-inner text-sky-400 font-mono space-y-3">
              <div className="flex items-center justify-between text-xs text-sky-400/70 border-b border-[#2b3e52] pb-2">
                <span>LORAWAN EU868 // SOLAR PWR: 99%</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-sky-400" />
                  {LOCATIONS.find(l => l.id === telemetry.locationId)?.name}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="border-r border-[#2b3e52] pr-2">
                  <div className="text-[11px] uppercase text-sky-300/80 font-sans font-semibold">
                    {t.humidityLabel}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-lcd text-sky-300">
                    {telemetry.humidity.toFixed(0)}<span className="text-sm font-normal text-sky-400">%</span>
                  </div>
                </div>

                <div className="border-r border-[#2b3e52] pr-2">
                  <div className="text-[11px] uppercase text-sky-300/80 font-sans font-semibold">
                    {t.tempLabel}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-lcd text-amber-300">
                    {weather?.temperature_c ?? 31}°<span className="text-sm font-normal text-amber-400">C</span>
                  </div>
                </div>

                <div>
                  <div className="text-[11px] uppercase text-sky-300/80 font-sans font-semibold">
                    {lang === 'te' ? 'వర్షపాతం' : 'Rain (24h)'}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-lcd text-blue-300">
                    {weather?.rain_mm ?? 0}<span className="text-xs font-normal text-blue-400 ml-0.5">mm</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-sky-300/80 pt-1 flex items-center justify-between font-sans">
                <span>{lang === 'te' ? 'వాతావరణ మూలం: ఓపెన్-మెటియో (లైవ్/కాష్)' : 'Source: Open-Meteo & Simulated Mast'}</span>
                <button 
                  onClick={onRefreshWeather}
                  className="flex items-center gap-1 text-[11px] text-sky-300 hover:text-white underline cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  {t.refreshWeather}
                </button>
              </div>
            </div>

            {/* Interactive Control: Air Humidity */}
            <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <Wind className="w-4 h-4 text-sky-600" />
                  <span>{t.humidityLabel} ({lang === 'te' ? 'గాలిలో తేమ' : 'Air Humidity'})</span>
                </label>
                <span className="text-sm font-bold text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-full font-mono">
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
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>15% ({t.presetLowHumidity})</span>
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => setTelemetry(prev => ({ ...prev, humidity: 35 }))}
                    className="text-[11px] px-2 py-0.5 rounded bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                  >
                    35%
                  </button>
                  <button 
                    onClick={() => setTelemetry(prev => ({ ...prev, humidity: 65 }))}
                    className="text-[11px] px-2 py-0.5 rounded bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                  >
                    65%
                  </button>
                  <button 
                    onClick={() => setTelemetry(prev => ({ ...prev, humidity: 88 }))}
                    className="text-[11px] px-2 py-0.5 rounded bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                  >
                    88%
                  </button>
                </div>
                <span>98% ({t.presetHighHumidity})</span>
              </div>
            </div>

            {/* Weather Notice */}
            <div className="p-3 bg-sky-50/70 rounded-xl border border-sky-100 flex items-start gap-2 text-xs text-sky-900">
              <Thermometer className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <span>
                {lang === 'te' 
                  ? 'ఎంచుకున్న ప్రాంతం ఆధారంగా ఉష్ణోగ్రత మరియు వర్షపాతం స్వయంచాలకంగా అప్‌డేట్ అవుతాయి.'
                  : 'Location weather is automatically refreshed from Open-Meteo forecasts and cached offline.'}
              </span>
            </div>

          </div>

          {/* Mast Status Footer */}
          <div className="bg-slate-100/90 px-5 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-600" />
              {lang === 'te' ? 'సోలార్ ప్యానెల్ & ఆల్ట్రాసోనిక్ సెన్సార్లు చురుగ్గా ఉన్నాయి' : 'Solar Radiation Shield & Anemometer Active'}
            </span>
            <span className="font-mono text-[11px] text-slate-600">Height: 2.5m</span>
          </div>

        </div>

      </div>

      {/* Manual Farm Selectors: Soil Type & Location */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-700" />
          <span>{lang === 'te' ? 'పొలం రకం మరియు ప్రాంతం ఎంపిక' : 'Field Context & Geographic Location'}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Soil Type Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              {t.soilTypeLabel}
            </label>
            <select
              value={telemetry.soilType}
              onChange={(e) => setTelemetry(prev => ({ ...prev, soilType: e.target.value }))}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            >
              {SOIL_TYPES.map(soil => (
                <option key={soil.id} value={soil.id}>
                  {lang === 'te' ? soil.nameTe : soil.name} ({lang === 'te' ? `డ్రైనేజీ: ${soil.drainage}` : `Drainage: ${soil.drainage}`})
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500">
              {lang === 'te'
                ? 'నేల రకం ఆధారంగా నీటి నిల్వ సామర్థ్యం మరియు పంటల అనుకూలత నిర్ణయించబడుతుంది.'
                : 'Defines soil water retention, hydraulic conductivity, and drainage rate.'}
            </p>
          </div>

          {/* Location Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              {t.locationLabel}
            </label>
            <select
              value={telemetry.locationId}
              onChange={(e) => setTelemetry(prev => ({ ...prev, locationId: e.target.value }))}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            >
              {LOCATIONS.map(loc => (
                <option key={loc.id} value={loc.id}>
                  {lang === 'te' ? loc.nameTe : loc.name} — {loc.region}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500">
              {lang === 'te'
                ? 'ఆంధ్రప్రదేశ్ మరియు తెలంగాణ ప్రధాన వ్యవసాయ ప్రాంతాల లైవ్ వాతావరణ సమాచారం.'
                : 'Automatically aligns historical climate and 24h precipitation forecasts.'}
            </p>
          </div>

        </div>

        {/* Big Transmit Button */}
        <div className="pt-2">
          <button
            onClick={onTransmit}
            disabled={isTransmitting}
            className="w-full py-4 px-6 bg-gradient-to-r from-emerald-700 to-green-700 hover:from-emerald-800 hover:to-green-800 text-white rounded-2xl font-bold text-base sm:text-lg shadow-md shadow-emerald-800/25 flex items-center justify-center space-x-3 active:scale-[0.99] transition-all disabled:opacity-75 cursor-pointer"
          >
            <Send className={`w-5 h-5 ${isTransmitting ? 'animate-bounce' : ''}`} />
            <span>{isTransmitting ? t.transmitting : t.transmitButton}</span>
          </button>
        </div>

      </div>

    </div>
  );
}
