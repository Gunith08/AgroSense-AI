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
    <div className="space-y-6 sm:space-y-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-green-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-md shadow-emerald-900/15 border border-emerald-700/50">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-inner shrink-0">
            <Layers className="w-7 h-7" />
          </div>
          <div className="overflow-hidden">
            <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white">
              {t.telemetryTitle}
            </h2>
            <p className="text-xs sm:text-base text-emerald-100 font-medium mt-1">
              {t.telemetrySubtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

        {/* Raw JSON MQTT Packet */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 text-emerald-400 font-mono shadow-xl flex flex-col justify-between space-y-4 border-2 border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-300 font-bold">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>MQTT TOPIC: agrosense/v1/farm/demo-01/telemetry</span>
            </div>
            <span className="text-xs bg-emerald-950 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-800 font-bold">
              QoS 1
            </span>
          </div>

          <pre className="text-xs sm:text-sm overflow-x-auto p-2 leading-relaxed text-emerald-300 bg-black/40 rounded-xl">
            {JSON.stringify(mqttPayload, null, 2)}
          </pre>

          <div className="border-t border-slate-800 pt-3 text-xs sm:text-sm text-slate-400 flex items-center justify-between font-bold">
            <span>Broker: Mosquitto Telemetry Engine</span>
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              CONNECTED
            </span>
          </div>
        </div>

        {/* Data Pipeline Verification & Preprocessing */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-emerald-100 shadow-md shadow-emerald-950/5 space-y-5">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
              {t.dataPipelineFlow}
            </h3>
          </div>

          <div className="space-y-3.5">
            
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50/50 border border-emerald-200 flex items-start gap-3.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-extrabold text-emerald-950">1. Physical Range Validation</h4>
                <p className="text-xs sm:text-sm text-emerald-900 mt-0.5 font-medium">
                  {t.statusValid} (Moisture 0–100%, pH 4–14, Humidity 0–100%).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50/50 border border-emerald-200 flex items-start gap-3.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-extrabold text-emerald-950">2. UTC Timestamp Normalization</h4>
                <p className="text-xs sm:text-sm text-emerald-900 mt-0.5 font-medium">
                  {t.statusTimestamped} (Calibrated to ISO-8601 UTC).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50/50 border border-emerald-200 flex items-start gap-3.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-extrabold text-emerald-950">3. Deduplication & Sequence Verification</h4>
                <p className="text-xs sm:text-sm text-emerald-900 mt-0.5 font-medium">
                  {t.statusDeduplicated} (Packet hash verified; duplicates dropped).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex items-start gap-3.5">
              <HardDriveDownload className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-extrabold text-slate-900">4. Relational Database Persistence</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5 font-medium">
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
