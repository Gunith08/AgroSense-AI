import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import IoTDeviceStation from './components/IoTDeviceStation';
import AdvisoryReport from './components/AdvisoryReport';
import LeafDiseaseLab from './components/LeafDiseaseLab';
import TelemetryInspector from './components/TelemetryInspector';
import WorkshopPresentationGuide from './components/WorkshopPresentationGuide';
import { generateFarmerAdvisory, LOCATIONS } from './data/cropsData';
import { translations } from './data/translations';

export default function App() {
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('overview');
  const [isTransmitting, setIsTransmitting] = useState(false);

  // Core IoT Telemetry State
  const [telemetry, setTelemetry] = useState({
    soilMoisture: 55,
    soilPh: 6.5,
    humidity: 62,
    soilType: 'alluvial',
    locationId: 'guntur'
  });

  // Weather state
  const [weather, setWeather] = useState({
    temperature_c: 31,
    humidity_pct: 62,
    rain_mm: 0,
    source: 'cached_fallback'
  });

  // Advisory State
  const [advisory, setAdvisory] = useState(null);

  // Fetch or update weather whenever location changes
  const fetchWeatherForLocation = async (locId) => {
    const loc = LOCATIONS.find(l => l.id === locId) || LOCATIONS[0];
    try {
      // Open-Meteo free API
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,relative_humidity_2m,precipitation&hourly=precipitation&forecast_days=1`
      );
      if (res.ok) {
        const data = await res.json();
        const currentTemp = Math.round(data.current?.temperature_2m ?? loc.defaultTemp);
        const currentRain = Math.round((data.hourly?.precipitation?.slice(0, 24).reduce((a, b) => a + b, 0) || 0) * 10) / 10;
        setWeather({
          temperature_c: currentTemp,
          humidity_pct: data.current?.relative_humidity_2m ?? 65,
          rain_mm: currentRain,
          source: 'open_meteo_live'
        });
        return;
      }
    } catch (err) {
      console.log("Offline mode: using cached regional weather data");
    }

    // Fallback to local offline cache
    setWeather({
      temperature_c: loc.defaultTemp,
      humidity_pct: 65,
      rain_mm: loc.defaultRain,
      source: 'offline_cached'
    });
  };

  // Initial load
  useEffect(() => {
    fetchWeatherForLocation(telemetry.locationId);
    // Initial advisory
    const initialAdv = generateFarmerAdvisory({
      soilMoisture: telemetry.soilMoisture,
      soilPh: telemetry.soilPh,
      humidity: telemetry.humidity,
      soilType: telemetry.soilType,
      locationId: telemetry.locationId,
      weather: { temperature_c: 31, rain_mm: 0 }
    });
    setAdvisory(initialAdv);
  }, []);

  // Update weather when location changes
  useEffect(() => {
    fetchWeatherForLocation(telemetry.locationId);
  }, [telemetry.locationId]);

  // Transmit telemetry action
  const handleTransmit = () => {
    setIsTransmitting(true);
    setTimeout(() => {
      const adv = generateFarmerAdvisory({
        soilMoisture: telemetry.soilMoisture,
        soilPh: telemetry.soilPh,
        humidity: telemetry.humidity,
        soilType: telemetry.soilType,
        locationId: telemetry.locationId,
        weather
      });
      setAdvisory(adv);
      setIsTransmitting(false);
      // Auto-navigate to advisory tab so farmer/students see the result immediately
      setActiveTab('advisory');
    }, 500);
  };

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        lang={lang} 
        setLang={setLang}
        isTransmitting={isTransmitting}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 w-full">
        
        {activeTab === 'overview' && (
          <IoTDeviceStation
            telemetry={telemetry}
            setTelemetry={setTelemetry}
            onTransmit={handleTransmit}
            isTransmitting={isTransmitting}
            lang={lang}
            weather={weather}
            onRefreshWeather={() => fetchWeatherForLocation(telemetry.locationId)}
          />
        )}

        {activeTab === 'advisory' && (
          <AdvisoryReport 
            advisory={advisory} 
            lang={lang} 
            onNavigateToLeafAi={() => setActiveTab('leafAi')}
          />
        )}

        {activeTab === 'leafAi' && (
          <LeafDiseaseLab 
            lang={lang} 
          />
        )}

        {activeTab === 'pipeline' && (
          <TelemetryInspector 
            telemetry={telemetry} 
            lang={lang} 
          />
        )}

        {activeTab === 'guide' && (
          <WorkshopPresentationGuide 
            lang={lang} 
          />
        )}

      </main>

      {/* Clean Farmer-Friendly Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-700">AgroSense AI</span>
            <span>•</span>
            <span>{lang === 'te' ? 'FDP వర్క్‌షాప్ సిమ్యులేషన్ ప్లాట్‌ఫారమ్' : 'FDP Smart Agriculture Simulation Prototype'}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-[11px]">
              {lang === 'te' ? 'సిమ్యులేషన్ మాత్రమే (100% ఆఫ్‌లైన్)' : 'Simulation Only • 100% Offline Ready'}
            </span>
            <span>Gunith08 / University Workshop</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
