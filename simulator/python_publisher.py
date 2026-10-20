"""
AgroSense AI - Python Virtual IoT Telemetry Generator
Publishes synthetic sensor readings over MQTT with HTTP POST fallback.
"""
import time
import json
import random
import datetime
import requests

MQTT_TOPIC = "agrosense/v1/farm/demo-01/telemetry"
FASTAPI_INGEST_URL = "http://localhost:8000/api/telemetry/ingest"

SCENARIOS = {
    "normal": {"moisture": 55.0, "humidity": 65.0, "ph": 6.5, "temp": 30.0},
    "dry_soil": {"moisture": 18.0, "humidity": 35.0, "ph": 6.8, "temp": 34.0},
    "humid_rain": {"moisture": 78.0, "humidity": 88.0, "ph": 6.4, "temp": 28.0},
    "acidic": {"moisture": 45.0, "humidity": 60.0, "ph": 5.2, "temp": 31.0}
}

def generate_telemetry_packet(scenario_name: str = "normal", sequence: int = 1):
    base = SCENARIOS.get(scenario_name, SCENARIOS["normal"])
    # Apply small realistic jitter
    moisture = round(base["moisture"] + random.uniform(-1.0, 1.0), 1)
    humidity = round(base["humidity"] + random.uniform(-1.5, 1.5), 1)
    ph = round(base["ph"] + random.uniform(-0.05, 0.05), 2)
    temp = round(base["temp"] + random.uniform(-0.5, 0.5), 1)

    return {
        "schema_version": "1.0",
        "device_id": "esp32-sim-01",
        "farm_id": "demo-01",
        "timestamp": datetime.datetime.utcnow().isoformat() + "Z",
        "sequence": sequence,
        "simulated": True,
        "temperature_c": temp,
        "humidity_pct": humidity,
        "soil_moisture_pct": moisture,
        "soil_ph": ph,
        "soil_type": "alluvial",
        "location": "guntur"
    }

def run_simulation_loop(interval_sec: float = 3.0, total_packets: int = 10, scenario: str = "normal"):
    print(f"=== AgroSense AI Simulator Starting (Scenario: {scenario}) ===")
    seq = 1
    for _ in range(total_packets):
        packet = generate_telemetry_packet(scenario, seq)
        print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] Transmitting Packet #{seq} -> {packet}")
        
        # Try HTTP Ingestion
        try:
            resp = requests.post(FASTAPI_INGEST_URL, json=packet, timeout=1.5)
            if resp.status_code == 200:
                print(f"  ✓ Ingestion ACK: {resp.json().get('status')}")
            else:
                print(f"  ✗ Ingestion Rejected: {resp.text}")
        except Exception:
            print("  (Offline local mode: FastAPI backend not running; packet printed to stdout)")
            
        seq += 1
        time.sleep(interval_sec)

if __name__ == "__main__":
    run_simulation_loop(interval_sec=2.0, total_packets=5, scenario="normal")
