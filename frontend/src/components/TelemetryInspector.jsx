import React from 'react';
import { Layers, Terminal, CheckCircle2, ShieldCheck, Database, HardDriveDownload } from 'lucide-react';
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
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {t.telemetryTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {t.telemetrySubtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Raw JSON MQTT Packet */}
        <div className="bg-slate-900 rounded-3xl p-5 sm:p-6 text-emerald-400 font-mono shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>MQTT TOPIC: agrosense/v1/farm/demo-01/telemetry</span>
            </div>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
              QoS 1 (At least once)
            </span>
          </div>

          <pre className="text-xs sm:text-sm overflow-x-auto p-2 leading-relaxed text-emerald-300">
            {JSON.stringify(mqttPayload, null, 2)}
          </pre>

          <div className="border-t border-slate-800 pt-3 text-xs text-slate-400 flex items-center justify-between">
            <span>Broker: Mosquitto / Embedded WebSocket</span>
            <span className="text-emerald-400 font-bold">● CONNECTED</span>
          </div>
        </div>

        {/* Data Pipeline Verification & Preprocessing */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-5">
          <div className="flex items-center space-x-2.5 border-b border-slate-100 pb-3">
            <Database className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold text-slate-900 text-base sm:text-lg">
              {t.dataPipelineFlow}
            </h3>
          </div>

          <div className="space-y-3">
            
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-emerald-900">1. Pydantic Schema Range Validation</h4>
                <p className="text-xs text-emerald-800 mt-0.5">
                  {t.statusValid} (Moisture 0–100%, pH 4–14, Humidity 0–100%).
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-emerald-900">2. UTC Timestamp Normalization</h4>
                <p className="text-xs text-emerald-800 mt-0.5">
                  {t.statusTimestamped} (Calibrated to ISO-8601 UTC).
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-emerald-900">3. Deduplication & Sequencer</h4>
                <p className="text-xs text-emerald-800 mt-0.5">
                  {t.statusDeduplicated} (Packet hash verified; duplicates dropped).
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <HardDriveDownload className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">4. SQLite Relational Storage</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Clean telemetry persisted in local SQLite table <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-[11px]">telemetry_records</code> for historical rolling trends.
                </p>
              </div>
            </div>

          </div>

          {/* Educational Disclaimer */}
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900">
            <span className="font-bold">⚠️ Workshop Scientific Note: </span>
            <span>
              All sensor readings are simulated and educational. Models demonstrate pipeline integrity and decision support workflows without requiring physical hardware wiring.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
