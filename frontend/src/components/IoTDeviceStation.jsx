import React from 'react';
import { 
  Cpu, Droplets, Wind, Thermometer, CloudRain, MapPin, 
  Layers, CheckCircle2, RefreshCw, Send, Sparkles, Radio
} from 'lucide-react';
import { translations } from '../data/translations';
import { LOCATIONS, SOIL_TYPES } from '../data/cropsData';
import soilSensorImg from '../assets/real-soil-sensor.jpg';
import weatherStationImg from '../assets/real-weather-station.jpg';

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

  // Helper for pH status in fresh grass-green palette
  const getPhColor = (ph) => {
    if (ph < 6.0) return { label: lang === 'te' ? 'ఆమ్ల స్వభావం (Acidic pH)' : 'Acidic (<6.0 pH)', badge: 'bg-amber-100 text-amber-950 border-amber-300' };
    if (ph <= 7.5) return { label: lang === 'te' ? 'సమతుల్య సారం (Optimal pH)' : 'Optimal Balanced (6.0 - 7.5 pH)', badge: 'bg-emerald-200 text-emerald-950 border-emerald-400' };
    return { label: lang === 'te' ? 'క్షార స్వభావం (Alkaline pH)' : 'Alkaline (>7.5 pH)', badge: 'bg-green-200 text-green-950 border-green-400' };
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
      
      {/* Top Banner: Field Scenarios with Vibrant Grass-Green Gradient */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 text-white rounded-3xl p-6 sm:p-8 shadow-lg shadow-emerald-900/10 border-2 border-green-400">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center space-x-3">
              <span className="p-2 rounded-xl bg-white/20 text-white border border-white/30 shadow-xs">
                <Sparkles className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {lang === 'te' ? 'ఫీల్డ్ సిమ్యులేషన్ దృశ్యాలు (Field Scenarios)' : 'Field Scenario Quick Controls'}
              </h2>
            </div>
            <p className="text-sm text-green-50 font-medium leading-relaxed">
              {lang === 'te' 
                ? 'వివిధ వాతావరణ మరియు నేల పరిస్థితులలో AI ఇచ్చే సలహాలను ఒకే క్లిక్‌తో పరీక్షించండి.'
                : '1-click telemetry injection to evaluate the advisory system under diverse agrarian conditions.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            <button
              onClick={() => applyScenario('optimal')}
              className="px-4 py-2.5 text-xs sm:text-sm font-black rounded-xl bg-white text-green-900 border-2 border-green-300 hover:bg-green-50 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
            >
              🌱 {lang === 'te' ? 'ఆదర్శవంతమైన పొలం' : 'Optimal Field'}
            </button>
            <button
              onClick={() => applyScenario('acidic')}
              className="px-4 py-2.5 text-xs sm:text-sm font-black rounded-xl bg-green-700/90 hover:bg-green-800 text-white border border-green-400/60 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
            >
              ⚠️ {lang === 'te' ? 'ఆమ్ల నేల (pH 5.2)' : 'Acidic Soil (5.2)'}
            </button>
            <button
              onClick={() => applyScenario('drought')}
              className="px-4 py-2.5 text-xs sm:text-sm font-black rounded-xl bg-green-700/90 hover:bg-green-800 text-white border border-green-400/60 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
            >
              ☀️ {lang === 'te' ? 'కరువు / తక్కువ తేమ' : 'Drought / Dry (18%)'}
            </button>
            <button
              onClick={() => applyScenario('blight')}
              className="px-4 py-2.5 text-xs sm:text-sm font-black rounded-xl bg-green-700/90 hover:bg-green-800 text-white border border-green-400/60 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
            >
              🌾 {lang === 'te' ? 'అధిక తేమ తెగులు ముప్పు' : 'High Humidity (88%)'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: 2 Real IoT Field Hardware Devices with 4K Photos & Light Grass-Green Consoles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* DEVICE 1: AgroProbe 7-in-1 Soil Multi-Sensor */}
        <div className="bg-[#f8fbf9] rounded-3xl border-2 border-emerald-200 shadow-md shadow-emerald-950/5 overflow-hidden flex flex-col justify-between transition-all hover:border-green-500">
          
          {/* Header in Fresh Grass Green */}
          <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 text-white p-5 sm:p-6 flex items-center justify-between border-b-2 border-green-400/40">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-white shadow-xs">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="overflow-hidden">
                <h3 className="font-black text-lg sm:text-xl tracking-tight text-white truncate">
                  {t.soilNodeTitle}
                </h3>
                <p className="text-xs text-green-100 font-mono tracking-wider mt-0.5">
                  {t.soilNodeModel}
                </p>
              </div>
            </div>
            
            {/* Status Pill */}
            <div className="flex items-center space-x-2 bg-white/20 px-3.5 py-1.5 rounded-full border border-white/30 shrink-0">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
              </span>
              <span className="text-xs font-black text-white font-mono tracking-wider">
                {t.soilNodeStatus}
              </span>
            </div>
          </div>

          {/* Real 4K Hardware Image Banner - Crisp & Clean with Grass Green Accents */}
          <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-emerald-100 border-b-2 border-emerald-200">
            <img 
              src={soilSensorImg} 
              alt="Real 4K IoT Agricultural Soil Moisture & pH Probe" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent flex items-end justify-between p-4">
              <span className="bg-white/95 text-[#0e4225] text-xs font-black px-3.5 py-1.5 rounded-xl border border-emerald-300 shadow-sm flex items-center gap-1.5 backdrop-blur-xs">
                <Radio className="w-3.5 h-3.5 text-green-600" />
                <span>Field Sensor: Stainless Steel Multi-Prongs</span>
              </span>
              <span className="bg-green-600 text-white text-[11px] font-black px-3 py-1 rounded-lg shadow-sm border border-green-300">
                REAL 4K SENSOR PHOTO
              </span>
            </div>
          </div>

          {/* Clean, Light Grass-Green Console (No dark black terminal!) */}
          <div className="p-6 sm:p-8 space-y-7">
            
            {/* Fresh Grass-Green Digital Readout Console */}
            <div className="bg-gradient-to-br from-[#eaf6ee] via-[#f5fbf7] to-[#e4f3eb] p-5 sm:p-6 rounded-2xl border-2 border-green-300 shadow-sm text-green-950 font-mono space-y-4">
              <div className="flex items-center justify-between text-xs text-green-900 border-b-2 border-green-200/80 pb-2.5">
                <span className="tracking-wider font-extrabold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-600"></span>
                  SOIL SENSOR TELEMETRY // RS-485 BUS
                </span>
                <span className="text-xs bg-green-200/90 px-2.5 py-0.5 rounded-md text-green-950 font-black border border-green-400">
                  ACTIVE
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div className="border-r-2 border-green-200/80 pr-3">
                  <div className="text-xs uppercase text-green-800 font-sans font-black">
                    {t.soilMoistureLabel}
                  </div>
                  <div className="text-4xl sm:text-5xl font-black font-lcd text-[#0e4225] mt-1">
                    {telemetry.soilMoisture.toFixed(1)}<span className="text-2xl font-bold text-green-700 ml-1">%</span>
                  </div>
                </div>

                <div className="pl-3">
                  <div className="text-xs uppercase text-green-800 font-sans font-black">
                    {t.soilPhLabel}
                  </div>
                  <div className="text-4xl sm:text-5xl font-black font-lcd text-[#0e4225] mt-1">
                    {telemetry.soilPh.toFixed(1)}<span className="text-lg font-bold text-green-700 ml-1">pH</span>
                  </div>
                </div>
              </div>

              {/* Status readout */}
              <div className="text-xs text-green-950 pt-2 flex items-center justify-between font-sans border-t-2 border-green-200/80 font-bold">
                <span>{lang === 'te' ? 'భూసార స్థితి:' : 'Soil State:'} <strong className="ml-1 text-[#0e4225] underline">{phMeta.label}</strong></span>
                <span className="font-mono text-green-800 font-extrabold text-[11px]">NIST CERTIFIED</span>
              </div>
            </div>

            {/* Control 1: Soil Moisture */}
            <div className="space-y-3 bg-[#eef8f2] p-5 rounded-2xl border-2 border-green-200">
              <div className="flex items-center justify-between">
                <label className="text-sm sm:text-base font-black text-[#0e4225] flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-green-700" />
                  <span>{t.soilMoistureLabel}</span>
                </label>
                <span className="text-base font-black text-green-950 bg-green-200 px-3.5 py-1 rounded-xl font-mono border border-green-300">
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
                className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
              <div className="flex items-center justify-between text-xs font-bold text-green-950 pt-1">
                <span>5% ({lang === 'te' ? 'ఎండిన నేల' : 'Dry'})</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setTelemetry(prev => ({ ...prev, soilMoisture: 18 }))}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white border border-green-300 font-extrabold text-green-950 hover:bg-green-100 cursor-pointer"
                  >
                    18%
                  </button>
                  <button 
                    onClick={() => setTelemetry(prev => ({ ...prev, soilMoisture: 55 }))}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white border border-green-300 font-extrabold text-green-950 hover:bg-green-100 cursor-pointer"
                  >
                    55%
                  </button>
                  <button 
                    onClick={() => setTelemetry(prev => ({ ...prev, soilMoisture: 85 }))}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white border border-green-300 font-extrabold text-green-950 hover:bg-green-100 cursor-pointer"
                  >
                    85%
                  </button>
                </div>
                <span>95% ({lang === 'te' ? 'అధిక తేమ' : 'Saturated'})</span>
              </div>
            </div>

            {/* Control 2: Soil pH */}
            <div className="space-y-3 bg-[#eef8f2] p-5 rounded-2xl border-2 border-green-200">
              <div className="flex items-center justify-between">
                <label className="text-sm sm:text-base font-black text-[#0e4225] flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-green-600 inline-block"></span>
                  <span>{t.soilPhLabel}</span>
                </label>
                <span className="text-base font-black px-3.5 py-1 rounded-xl font-mono text-green-950 bg-green-200 border border-green-300">
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
                className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
              
              {/* Fresh Grass Green Spectrum Gradient Bar */}
              <div className="h-2 w-full rounded-full bg-gradient-to-r from-emerald-400 via-green-600 to-emerald-800"></div>

              <div className="flex items-center justify-between text-xs font-bold text-green-950 pt-0.5">
                <span>4.0 ({lang === 'te' ? 'ఆమ్లం' : 'Acidic'})</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setTelemetry(prev => ({ ...prev, soilPh: 5.2 }))}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white border border-green-300 font-extrabold text-green-950 hover:bg-green-100 cursor-pointer"
                  >
                    5.2
                  </button>
                  <button 
                    onClick={() => setTelemetry(prev => ({ ...prev, soilPh: 6.5 }))}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white border border-green-300 font-extrabold text-green-950 hover:bg-green-100 cursor-pointer"
                  >
                    6.5
                  </button>
                  <button 
                    onClick={() => setTelemetry(prev => ({ ...prev, soilPh: 8.2 }))}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white border border-green-300 font-extrabold text-green-950 hover:bg-green-100 cursor-pointer"
                  >
                    8.2
                  </button>
                </div>
                <span>9.0 ({lang === 'te' ? 'క్షారం' : 'Alkaline'})</span>
              </div>
            </div>

          </div>

          {/* Footer Bar */}
          <div className="bg-[#e4f3ea] px-6 py-4 border-t-2 border-green-200 flex items-center justify-between text-xs font-black text-green-950">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-700" />
              {lang === 'te' ? 'స్టెయిన్‌లెస్ స్టీల్ ప్రోబ్స్ అమర్చబడ్డాయి' : 'Precision Stainless Steel Probes'}
            </span>
            <span className="font-mono text-xs text-green-900 font-extrabold">Depth: 15-20cm</span>
          </div>

        </div>


        {/* DEVICE 2: AgroWeather Micro-Climate Station */}
        <div className="bg-[#f8fbf9] rounded-3xl border-2 border-emerald-200 shadow-md shadow-emerald-950/5 overflow-hidden flex flex-col justify-between transition-all hover:border-green-500">
          
          {/* Header in Fresh Grass Green */}
          <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 text-white p-5 sm:p-6 flex items-center justify-between border-b-2 border-green-400/40">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-white shadow-xs">
                <Wind className="w-6 h-6" />
              </div>
              <div className="overflow-hidden">
                <h3 className="font-black text-lg sm:text-xl tracking-tight text-white truncate">
                  {t.weatherNodeTitle}
                </h3>
                <p className="text-xs text-green-100 font-mono tracking-wider mt-0.5">
                  {t.weatherNodeModel}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 bg-white/20 px-3.5 py-1.5 rounded-full border border-white/30 shrink-0">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
              </span>
              <span className="text-xs font-black text-white font-mono tracking-wider">
                {t.weatherNodeStatus}
              </span>
            </div>
          </div>

          {/* Real 4K Weather Station Hardware Image Banner */}
          <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-emerald-100 border-b-2 border-emerald-200">
            <img 
              src={weatherStationImg} 
              alt="Real 4K Agricultural Automated Field Weather Station" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent flex items-end justify-between p-4">
              <span className="bg-white/95 text-[#0e4225] text-xs font-black px-3.5 py-1.5 rounded-xl border border-emerald-300 shadow-sm flex items-center gap-1.5 backdrop-blur-xs">
                <Radio className="w-3.5 h-3.5 text-green-600" />
                <span>Field Meteorological Mast & Anemometer</span>
              </span>
              <span className="bg-green-600 text-white text-[11px] font-black px-3 py-1 rounded-lg shadow-sm border border-green-300">
                REAL 4K HARDWARE PHOTO
              </span>
            </div>
          </div>

          {/* Clean, Light Grass-Green Console */}
          <div className="p-6 sm:p-8 space-y-7">
            
            {/* Luminous Light Grass-Green Console */}
            <div className="bg-gradient-to-br from-[#eaf6ee] via-[#f5fbf7] to-[#e4f3eb] p-5 sm:p-6 rounded-2xl border-2 border-green-300 shadow-sm text-green-950 font-mono space-y-4">
              <div className="flex items-center justify-between text-xs text-green-900 border-b-2 border-green-200/80 pb-2.5">
                <span className="tracking-wider font-extrabold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-600"></span>
                  ATMOSPHERIC TELEMETRY NODE
                </span>
                <span className="flex items-center gap-1.5 text-xs text-green-950 font-black bg-green-200/90 px-2.5 py-0.5 rounded border border-green-400">
                  <MapPin className="w-3.5 h-3.5 text-green-700" />
                  {LOCATIONS.find(l => l.id === telemetry.locationId)?.name}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="border-r-2 border-green-200/80 pr-2">
                  <div className="text-xs uppercase text-green-800 font-sans font-black">
                    {t.humidityLabel}
                  </div>
                  <div className="text-3xl sm:text-4xl font-black font-lcd text-[#0e4225] mt-1">
                    {telemetry.humidity.toFixed(0)}<span className="text-lg font-bold text-green-700 ml-0.5">%</span>
                  </div>
                </div>

                <div className="border-r-2 border-green-200/80 pr-2">
                  <div className="text-xs uppercase text-green-800 font-sans font-black">
                    {t.tempLabel}
                  </div>
                  <div className="text-3xl sm:text-4xl font-black font-lcd text-[#0e4225] mt-1">
                    {weather?.temperature_c ?? 31}°<span className="text-base font-bold text-green-700">C</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase text-green-800 font-sans font-black">
                    {lang === 'te' ? 'వర్షపాతం' : 'Forecast Rain'}
                  </div>
                  <div className="text-3xl sm:text-4xl font-black font-lcd text-[#0e4225] mt-1">
                    {weather?.rain_mm ?? 0}<span className="text-xs font-bold text-green-700 ml-1">mm</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-green-950 pt-2 flex items-center justify-between font-sans border-t-2 border-green-200/80 font-bold">
                <span>{lang === 'te' ? 'వాతావరణం: లైవ్ ఓపెన్-మెటియో' : 'Atmospheric Live Sync'}</span>
                <button 
                  onClick={onRefreshWeather}
                  className="flex items-center gap-1.5 text-xs text-green-800 hover:text-green-950 underline font-black cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-green-700" />
                  {t.refreshWeather}
                </button>
              </div>
            </div>

            {/* Control: Air Humidity */}
            <div className="space-y-3 bg-[#eef8f2] p-5 rounded-2xl border-2 border-green-200">
              <div className="flex items-center justify-between">
                <label className="text-sm sm:text-base font-black text-[#0e4225] flex items-center gap-2">
                  <Wind className="w-5 h-5 text-green-700" />
                  <span>{t.humidityLabel}</span>
                </label>
                <span className="text-base font-black text-green-950 bg-green-200 px-3.5 py-1 rounded-xl font-mono border border-green-300">
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
                className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
              <div className="flex items-center justify-between text-xs font-bold text-green-950 pt-1">
                <span>15% ({t.presetLowHumidity})</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setTelemetry(prev => ({ ...prev, humidity: 35 }))}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white border border-green-300 font-extrabold text-green-950 hover:bg-green-100 cursor-pointer"
                  >
                    35%
                  </button>
                  <button 
                    onClick={() => setTelemetry(prev => ({ ...prev, humidity: 65 }))}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white border border-emerald-300 font-extrabold text-emerald-950 hover:bg-emerald-100 cursor-pointer"
                  >
                    65%
                  </button>
                  <button 
                    onClick={() => setTelemetry(prev => ({ ...prev, humidity: 88 }))}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white border border-emerald-300 font-extrabold text-emerald-950 hover:bg-emerald-100 cursor-pointer"
                  >
                    88%
                  </button>
                </div>
                <span>98% ({t.presetHighHumidity})</span>
              </div>
            </div>

            {/* Weather Callout */}
            <div className="p-4 bg-[#eef8f2] rounded-2xl border-2 border-green-200 flex items-start gap-3 text-xs sm:text-sm text-green-950 font-bold">
              <Thermometer className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                {lang === 'te' 
                  ? 'ఎంచుకున్న ప్రాంతం ఆధారంగా ఉష్ణోగ్రత మరియు 24 గంటల వర్షపాత అంచనా స్వయంచాలకంగా పొందబడుతుంది.'
                  : 'Location weather is automatically refreshed from regional forecasts to power rain-aware irrigation.'}
              </span>
            </div>

          </div>

          {/* Footer Bar */}
          <div className="bg-[#e4f3ea] px-6 py-4 border-t-2 border-green-200 flex items-center justify-between text-xs font-black text-green-950">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-700" />
              {lang === 'te' ? 'సోలార్ షీల్డ్ & అల్ట్రాసోనిక్ సెన్సార్లు సిద్ధంగా ఉన్నాయి' : 'Solar Radiation Shield & Anemometer Mast'}
            </span>
            <span className="font-mono text-xs text-green-900 font-extrabold">2.5m Altitude</span>
          </div>

        </div>

      </div>

      {/* Manual Farm Selectors: Soil Type & Location */}
      <div className="bg-[#f8fbf9] rounded-3xl p-6 sm:p-8 border-2 border-green-200 shadow-md shadow-emerald-950/5 space-y-6">
        <div className="border-b-2 border-green-200/80 pb-4">
          <h3 className="font-black text-[#0e4225] text-lg sm:text-xl flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-green-700" />
            <span>{lang === 'te' ? 'పొలం నేల రకం మరియు ప్రాంతం ఎంపిక' : 'Field Soil Classification & Regional Hub'}</span>
          </h3>
          <p className="text-xs sm:text-sm text-green-900 font-medium mt-1">
            {lang === 'te' ? 'మీ ప్రాంతం మరియు నేల లక్షణాలను ఎంచుకోవడం ద్వారా ఖచ్చితమైన పంట సలహాలను రూపొందించండి.' : 'Configure your local field characteristics to tailor the crop and irrigation recommendation.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Soil Type Selection */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-black text-[#0e4225] uppercase tracking-wider block">
              {t.soilTypeLabel}
            </label>
            <select
              value={telemetry.soilType}
              onChange={(e) => setTelemetry(prev => ({ ...prev, soilType: e.target.value }))}
              className="w-full bg-[#eef8f2] border-2 border-green-300 text-[#0e4225] rounded-2xl px-4 py-3.5 text-sm sm:text-base font-black focus:ring-2 focus:ring-green-600 focus:border-green-600 focus:outline-none cursor-pointer"
            >
              {SOIL_TYPES.map(soil => (
                <option key={soil.id} value={soil.id}>
                  {lang === 'te' ? soil.nameTe : soil.name} ({lang === 'te' ? `డ్రైనేజీ: ${soil.drainage}` : `Drainage: ${soil.drainage}`})
                </option>
              ))}
            </select>
            <p className="text-xs text-green-900/80 font-bold">
              {lang === 'te'
                ? 'నేల రకం ఆధారంగా నీటి నిల్వ సామర్థ్యం మరియు పంటల అనుకూలత లెక్కించబడుతుంది.'
                : 'Hydraulic drainage conductivity determines irrigation run-times.'}
            </p>
          </div>

          {/* Location Selection */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-black text-[#0e4225] uppercase tracking-wider block">
              {t.locationLabel}
            </label>
            <select
              value={telemetry.locationId}
              onChange={(e) => setTelemetry(prev => ({ ...prev, locationId: e.target.value }))}
              className="w-full bg-[#eef8f2] border-2 border-green-300 text-[#0e4225] rounded-2xl px-4 py-3.5 text-sm sm:text-base font-black focus:ring-2 focus:ring-green-600 focus:border-green-600 focus:outline-none cursor-pointer"
            >
              {LOCATIONS.map(loc => (
                <option key={loc.id} value={loc.id}>
                  {lang === 'te' ? loc.nameTe : loc.name} — {loc.region}
                </option>
              ))}
            </select>
            <p className="text-xs text-green-900/80 font-bold">
              {lang === 'te'
                ? 'ఆంధ్రప్రదేశ్ మరియు తెలంగాణ ప్రధాన వ్యవసాయ ప్రాంతాల లైవ్ వాతావరణం.'
                : 'Connects regional climate history with live weather and rain forecasting.'}
            </p>
          </div>

        </div>

        {/* Big Transmit Button in Fresh Vibrant Grass Green Gradient */}
        <div className="pt-2">
          <button
            onClick={onTransmit}
            disabled={isTransmitting}
            className="w-full py-5 px-6 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 hover:from-green-700 hover:via-emerald-700 hover:to-green-700 text-white rounded-2xl font-black text-base sm:text-xl shadow-xl shadow-green-900/20 flex items-center justify-center space-x-3 active:scale-[0.99] transition-all disabled:opacity-75 cursor-pointer border-2 border-green-400"
          >
            <Send className={`w-6 h-6 ${isTransmitting ? 'animate-bounce' : ''}`} />
            <span>{isTransmitting ? t.transmitting : t.transmitButton}</span>
          </button>
        </div>

      </div>

    </div>
  );
}
