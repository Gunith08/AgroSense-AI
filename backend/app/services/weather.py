import requests
import json
import os
from typing import Dict, Any

CACHED_WEATHER_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "cached_weather.json")

LOCATION_COORDINATES = {
    "guntur": {"lat": 16.3067, "lon": 80.4365, "name": "Guntur"},
    "vijayawada": {"lat": 16.5062, "lon": 80.6480, "name": "Vijayawada"},
    "hyderabad": {"lat": 17.3850, "lon": 78.4867, "name": "Hyderabad"},
    "warangal": {"lat": 17.9689, "lon": 79.5941, "name": "Warangal"},
    "tirupati": {"lat": 13.6288, "lon": 79.4192, "name": "Tirupati"},
    "kurnool": {"lat": 15.8281, "lon": 78.0373, "name": "Kurnool"},
    "rajahmundry": {"lat": 17.0005, "lon": 81.8040, "name": "Rajahmundry"},
    "anantapur": {"lat": 14.6819, "lon": 77.6006, "name": "Anantapur"}
}

def get_weather_forecast(location_id: str = "guntur") -> Dict[str, Any]:
    coords = LOCATION_COORDINATES.get(location_id.lower(), LOCATION_COORDINATES["guntur"])
    url = f"https://api.open-meteo.com/v1/forecast?latitude={coords['lat']}&longitude={coords['lon']}&current=temperature_2m,relative_humidity_2m,precipitation&hourly=temperature_2m,precipitation&forecast_days=1"
    
    try:
        res = requests.get(url, timeout=3)
        if res.status_code == 200:
            data = res.json()
            curr = data.get("current", {})
            hourly = data.get("hourly", {})
            rain_sum = sum(hourly.get("precipitation", [])[:24])
            return {
                "location": coords["name"],
                "temperature_c": round(curr.get("temperature_2m", 31.0), 1),
                "humidity_pct": round(curr.get("relative_humidity_2m", 65.0), 1),
                "rain_mm": round(rain_sum, 1),
                "source": "open_meteo_live",
                "status": "online_fresh"
            }
    except Exception:
        pass

    # Read from cached offline fallback
    if os.path.exists(CACHED_WEATHER_PATH):
        try:
            with open(CACHED_WEATHER_PATH, "r") as f:
                cached = json.load(f)
                loc_data = cached.get(location_id.lower(), cached.get("guntur"))
                loc_data["source"] = "cached_offline_fixture"
                return loc_data
        except Exception:
            pass

    return {
        "location": coords["name"],
        "temperature_c": 31.0,
        "humidity_pct": 65.0,
        "rain_mm": 0.0,
        "source": "embedded_fallback",
        "status": "offline_cached"
    }
