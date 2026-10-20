from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field

class TelemetryPayload(BaseModel):
    schema_version: str = "1.0"
    device_id: str = "esp32-sim-01"
    farm_id: str = "demo-01"
    timestamp: Optional[str] = None
    sequence: int = 1
    simulated: bool = True
    temperature_c: float = Field(..., ge=-10.0, le=60.0, description="Ambient temperature in Celsius")
    humidity_pct: float = Field(..., ge=0.0, le=100.0, description="Relative humidity percentage")
    soil_moisture_pct: float = Field(..., ge=0.0, le=100.0, description="Soil moisture volumetric percentage")
    soil_ph: Optional[float] = Field(6.5, ge=0.0, le=14.0, description="Soil acidity/alkalinity pH")
    soil_type: Optional[str] = Field("alluvial", description="Soil type classification")
    location: Optional[str] = Field("guntur", description="Geographic location identifier")

class DiseaseDetectionResponse(BaseModel):
    crop: str = "tomato"
    disease_id: str
    disease_name_en: str
    disease_name_te: str
    confidence: float
    status: str
    symptoms: Dict[str, str]
    precautions: Dict[str, str]
    cure: Dict[str, str]
    telugu_youtube_videos: List[Dict[str, str]]
    source: str = "pretrained_mobilenet_v2_plantvillage"

class AdvisoryResponse(BaseModel):
    farm_id: str
    crop: str = "tomato"
    mode: str = "simulation"
    latest_sensor: Dict[str, Any]
    suitable_crops: List[Dict[str, Any]]
    soil_health_action: Dict[str, Any]
    irrigation_advice: Dict[str, Any]
    risk_forecast: Dict[str, Any]
    summary_advisory: List[str]
