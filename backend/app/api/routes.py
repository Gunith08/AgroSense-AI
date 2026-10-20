from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional, Dict, Any
from app.models.schemas import TelemetryPayload, AdvisoryResponse, DiseaseDetectionResponse
from app.db.database import save_telemetry, get_latest_telemetry, get_telemetry_history
from app.services.preprocessing import validate_and_preprocess
from app.services.weather import get_weather_forecast
from app.services.leaf_classifier import classify_leaf_image
from app.services.advisory import generate_advisory_report

router = APIRouter(prefix="/api")

@router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "backend": "FastAPI",
        "database": "SQLite",
        "model": "MobileNetV2_PlantVillage_Pretrained",
        "weather_service": "Open-Meteo + Cached Fixture",
        "simulation_mode": True
    }

@router.post("/telemetry/ingest")
def ingest_telemetry(payload: TelemetryPayload):
    data = payload.dict()
    is_valid, reason, processed = validate_and_preprocess(data)
    
    if not is_valid and "OUT_OF_RANGE" in reason:
        raise HTTPException(status_code=422, detail=reason)
        
    quality = "valid" if is_valid else "flagged"
    inserted_id = save_telemetry(processed, quality=quality)
    return {
        "status": "success",
        "id": inserted_id,
        "validation_flag": reason,
        "processed_record": processed
    }

@router.get("/telemetry/latest")
def latest_telemetry():
    rec = get_latest_telemetry()
    if not rec:
        return {
            "device_id": "esp32-sim-01",
            "temperature_c": 30.5,
            "humidity_pct": 65.0,
            "soil_moisture_pct": 55.0,
            "soil_ph": 6.5,
            "soil_type": "alluvial",
            "location": "guntur",
            "quality": "default_seed"
        }
    return rec

@router.get("/telemetry/history")
def telemetry_history(hours: int = 24):
    return get_telemetry_history(limit=50)

@router.get("/weather/forecast")
def weather_forecast(location: str = "guntur"):
    return get_weather_forecast(location)

@router.get("/advisory")
def advisory(
    soil_ph: float = 6.5,
    soil_moisture: float = 50.0,
    humidity: float = 65.0,
    soil_type: str = "alluvial",
    location: str = "guntur"
):
    weather = get_weather_forecast(location)
    telemetry = {
        "farm_id": "demo-01",
        "soil_ph": soil_ph,
        "soil_moisture_pct": soil_moisture,
        "humidity_pct": humidity,
        "soil_type": soil_type,
        "location": location
    }
    return generate_advisory_report(telemetry, weather)

@router.post("/disease/detect")
async def detect_disease(
    file: Optional[UploadFile] = File(None),
    sample_id: Optional[str] = Form(None)
):
    filename = file.filename if file else (sample_id or "early_blight")
    image_bytes = await file.read() if file else None
    result = classify_leaf_image(image_bytes=image_bytes, filename=filename)
    return result
