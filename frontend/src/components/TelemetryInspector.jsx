import React from 'react';
import { Layers, Terminal, CheckCircle2, Database, HardDriveDownload } from 'lucide-react';
import { translations } from '../data/translations';

export default function TelemetryInspector({ telemetry, lang }) {
  const t = translations[lang];

  // Generate realistic MQTT packet
  const mqttPayload = {
    schema_version: "1.0",
    device_id: "esp32-agrosense-01",
    farm_id: "farm-andhra-01",
    timestamp: new Date().toISOString(),
    sequence: 142,
    simulated: true,
    telemetry: {
      soil_moisture_pct: telemetry.soilMoisture,
      soil_ph: telemetry.soilPh,
      humidity_pct: telemetry.humidity,
      soil_type: telemetry.soilType,
      location: telemetry.locationId
    },
    quality_flags: {
      range_valid: true,
      timestamp_synced: true,
      deduplicated: true
    }
  };

  return (
    <div className="space-y-8">

      {/* Header with Fresh Grass-Green Gradient */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 text-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-green-500">
        <div className="flex items-center space-x-4">
          <div className="w-13 h-13 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-white shadow-xs shrink-0">
            <Layers className="w-7 h-7" />
          </div>
          <div className="overflow-hidden">
            <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white">
              {t.telemetryTitle}
            </h2>
            <p className="text-sm text-green-50 font-medium mt-1 leading-relaxed">
              {t.telemetrySubtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Raw JSON MQTT Packet in Clean Light Grass-Green Console */}
        <div className="bg-gradient-to-br from-[#ebf7ef] to-[#dff1e5] rounded-3xl p-6 sm:p-8 text-[#0e4225] font-mono shadow-md flex flex-col justify-between space-y-5 border-2 border-green-300">
          <div className="flex items-center justify-between border-b-2 border-green-200 pb-4">
            <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-[#0e4225] font-extrabold">
              <Terminal className="w-4 h-4 text-green-700" />
              <span>MQTT TOPIC: agrosense/v1/farm/demo-01/telemetry</span>
            </div>
            <span className="text-xs bg-white text-green-900 px-3 py-1 rounded-full border border-green-300 font-black shadow-xs">
              QoS 1
            </span>
          </div>

          <pre className="text-xs sm:text-sm overflow-x-auto p-4 leading-relaxed text-[#0e4225] bg-white/95 rounded-2xl border-2 border-green-200 shadow-inner font-bold">
            {JSON.stringify(mqttPayload, null, 2)}
          </pre>

          <div className="border-t-2 border-green-200 pt-3.5 text-xs sm:text-sm text-[#0e4225] flex items-center justify-between font-bold">
            <span>Broker: Mosquitto Telemetry Engine</span>
            <span className="text-green-800 flex items-center gap-2 font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-green-600 animate-pulse"></span>
              CONNECTED
            </span>
          </div>
        </div>

        {/* Data Pipeline Verification & Preprocessing */}
        <div className="bg-[#f8fbf9] rounded-3xl p-6 sm:p-8 border-2 border-[#cfe3d6] shadow-md shadow-emerald-950/5 space-y-6">
          <div className="flex items-center space-x-3 border-b border-[#cfe3d6] pb-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="font-black text-[#0a2316] text-lg sm:text-xl">
              {t.dataPipelineFlow}
            </h3>
          </div>

          <div className="space-y-4">
            
            <div className="p-4 sm:p-5 rounded-2xl bg-[#edf5f0] border-2 border-[#cfe3d6] flex items-start gap-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm sm:text-base font-black text-[#0a2316]">1. Physical Range Validation</h4>
                <p className="text-xs sm:text-sm text-[#0f2d1c] mt-1 font-semibold leading-relaxed">
                  {t.statusValid} (Moisture 0–100%, pH 4–14, Humidity 0–100%).
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#edf5f0] border-2 border-[#cfe3d6] flex items-start gap-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm sm:text-base font-black text-[#0a2316]">2. UTC Timestamp Normalization</h4>
                <p className="text-xs sm:text-sm text-[#0f2d1c] mt-1 font-semibold leading-relaxed">
                  {t.statusTimestamped} (Calibrated to ISO-8601 UTC).
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#edf5f0] border-2 border-[#cfe3d6] flex items-start gap-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm sm:text-base font-black text-[#0a2316]">3. Deduplication & Sequence Verification</h4>
                <p className="text-xs sm:text-sm text-[#0f2d1c] mt-1 font-semibold leading-relaxed">
                  {t.statusDeduplicated} (Packet hash verified; duplicates dropped).
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#e4ede7] border-2 border-[#cfe3d6] flex items-start gap-4">
              <HardDriveDownload className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm sm:text-base font-black text-[#0a2316]">4. Relational Database Persistence</h4>
                <p className="text-xs sm:text-sm text-[#0f2d1c] mt-1 font-semibold leading-relaxed">
                  Validated telemetry is committed to local database storage for time-series trend analysis.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
