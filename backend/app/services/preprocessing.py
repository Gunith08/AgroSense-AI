from typing import Dict, Any, Tuple

SEEN_SEQUENCES = set()

def validate_and_preprocess(payload: Dict[str, Any]) -> Tuple[bool, str, Dict[str, Any]]:
    """
    Validates range boundaries, deduplicates sequence, and normalizes telemetry payload.
    """
    dev_id = payload.get("device_id", "unknown")
    seq = payload.get("sequence", 0)
    key = f"{dev_id}:{seq}"

    if key in SEEN_SEQUENCES:
        return False, "DUPLICATE_SEQUENCE_DROPPED", payload

    SEEN_SEQUENCES.add(key)
    if len(SEEN_SEQUENCES) > 5000:
        SEEN_SEQUENCES.clear()

    # Range checks
    temp = payload.get("temperature_c", 25.0)
    hum = payload.get("humidity_pct", 50.0)
    moist = payload.get("soil_moisture_pct", 50.0)
    ph = payload.get("soil_ph", 6.5)

    if not (-10 <= temp <= 60):
        return False, f"TEMPERATURE_OUT_OF_RANGE: {temp}C", payload

    if not (0 <= hum <= 100):
        return False, f"HUMIDITY_OUT_OF_RANGE: {hum}%", payload

    if not (0 <= moist <= 100):
        return False, f"MOISTURE_OUT_OF_RANGE: {moist}%", payload

    if not (0 <= ph <= 14):
        return False, f"PH_OUT_OF_RANGE: {ph}", payload

    # Plausible and valid
    processed = dict(payload)
    processed["temperature_c"] = round(temp, 1)
    processed["humidity_pct"] = round(hum, 1)
    processed["soil_moisture_pct"] = round(moist, 1)
    processed["soil_ph"] = round(ph, 2)
    processed["quality"] = "valid"

    return True, "PASSED_QUALITY_CHECKS", processed
