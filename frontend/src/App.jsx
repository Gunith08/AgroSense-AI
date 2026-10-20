import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import IoTDeviceStation from './components/IoTDeviceStation';
import AdvisoryReport from './components/AdvisoryReport';
import LeafDiseaseLab from './components/LeafDiseaseLab';
import TelemetryInspector from './components/TelemetryInspector';
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
      // Auto-navigate to advisory tab so farmer immediately sees the action plan
      setActiveTab('advisory');
    }, 400);
  };

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-[#f0f5f1] text-[#0f291e] flex flex-col justify-between font-sans">
      
      {/* Top Navigation Bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        lang={lang} 
        setLang={setLang}
        isTransmitting={isTransmitting}
      />

      {/* Main Content Area - Generous Spacing & High-Contrast Readability */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-8 sm:py-12 flex-1 w-full">
        
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

      </main>

      {/* Clean Organic Sage Footer */}
      <footer className="bg-[#f8fbf9] border-t-2 border-[#cfe3d6] mt-14 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-emerald-950 font-bold gap-4">
          <div className="flex items-center space-x-2.5">
            <span className="text-emerald-800 font-black text-base">AgroSense AI</span>
            <span>•</span>
            <span className="font-semibold text-emerald-900">{lang === 'te' ? 'స్మార్ట్ వ్యవసాయ సలహా & నిర్ణయ వ్యవస్థ' : 'Precision Agriculture & Smart Decision Support System'}</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 font-extrabold text-xs">
              {lang === 'te' ? 'ఆఫ్‌లైన్ మరియు ఆన్‌లైన్ రెడీ' : 'Offline & Online Ready'}
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
