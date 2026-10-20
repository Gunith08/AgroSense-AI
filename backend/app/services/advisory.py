from typing import Dict, Any, List

CROPS_CATALOG = [
    {
        "id": "tomato",
        "name_en": "Tomato",
        "name_te": "టమాటా",
        "min_ph": 6.0,
        "max_ph": 7.0,
        "preferred_soils": ["sandy", "red", "alluvial"],
        "days_to_harvest": "70-90 days",
        "reason_en": "Ideal match for well-aerated sandy loam/red soil within 6.0-7.0 pH band.",
        "reason_te": "నీరు ఇంకే ఇసుక రేగడి లేదా ఎర్ర నేలల్లో 6.0-7.0 pH పరిధిలో బాగా పండుతుంది."
    },
    {
        "id": "chilli",
        "name_en": "Chilli",
        "name_te": "మిరప",
        "min_ph": 6.0,
        "max_ph": 7.5,
        "preferred_soils": ["black", "red", "alluvial"],
        "days_to_harvest": "90-120 days",
        "reason_en": "High-value commercial cash crop in AP & Telangana with good fertilizer uptake.",
        "reason_te": "తెలుగు రాష్ట్రాల్లో అత్యధిక లాభాలనిచ్చే వాణిజ్య పంట. సమతుల్య pH అవసరం."
    },
    {
        "id": "cotton",
        "name_en": "Cotton",
        "name_te": "పత్తి",
        "min_ph": 6.5,
        "max_ph": 8.5,
        "preferred_soils": ["black", "alluvial"],
        "days_to_harvest": "150-180 days",
        "reason_en": "Thrives in moisture-retentive black cotton soil with neutral to mildly alkaline pH.",
        "reason_te": "తేమను నిల్వ ఉంచే నల్లరేగడి నేలల్లో అద్భుతంగా పండుతుంది."
    },
    {
        "id": "groundnut",
        "name_en": "Groundnut",
        "name_te": "వేరుశనగ",
        "min_ph": 5.8,
        "max_ph": 7.0,
        "preferred_soils": ["red", "sandy"],
        "days_to_harvest": "100-115 days",
        "reason_en": "Requires friable red/sandy loam for easy peg entry and high oilseed yield.",
        "reason_te": "ఊడలు నేలలోకి దిగి కాయలు తయారు కావడానికి వదులుగా ఉండే ఎర్ర నేలలు శ్రేష్టం."
    }
]

def generate_advisory_report(telemetry: Dict[str, Any], weather: Dict[str, Any]) -> Dict[str, Any]:
    ph = telemetry.get("soil_ph", 6.5)
    moisture = telemetry.get("soil_moisture_pct", 50.0)
    humidity = telemetry.get("humidity_pct", 65.0)
    soil_type = telemetry.get("soil_type", "alluvial").lower()
    rain_mm = weather.get("rain_mm", 0.0)
    temp_c = weather.get("temperature_c", 30.0)

    # 1. Rank crops
    ranked_crops = []
    for crop in CROPS_CATALOG:
        score = 70
        if crop["min_ph"] <= ph <= crop["max_ph"]:
            score += 20
        else:
            diff = min(abs(ph - crop["min_ph"]), abs(ph - crop["max_ph"]))
            score -= int(diff * 15)

        if soil_type in crop["preferred_soils"]:
            score += 15
        else:
            score -= 10

        score = max(30, min(99, score))
        ranked_crops.append({
            "crop_id": crop["id"],
            "name_en": crop["name_en"],
            "name_te": crop["name_te"],
            "suitability_score": score,
            "days_to_harvest": crop["days_to_harvest"],
            "reason_en": crop["reason_en"],
            "reason_te": crop["reason_te"]
        })

    ranked_crops.sort(key=lambda x: x["suitability_score"], reverse=True)

    # 2. Soil health measures
    if ph < 6.0:
        soil_action = {
            "status": "Acidic Soil Alert",
            "action_en": "Apply Agricultural Lime (Calcium Carbonate) at 250-350 kg/acre to neutralize acidity.",
            "action_te": "నేలలో ఆమ్లత ఎక్కువైంది. ఎకరానికి 250-350 కేజీల వ్యవసాయ సున్నం వేసి దున్నండి."
        }
    elif ph > 7.6:
        soil_action = {
            "status": "Alkaline Soil Alert",
            "action_en": "Apply Agricultural Gypsum at 400 kg/acre and incorporate green manure crops.",
            "action_te": "నేలలో క్షారత ఎక్కువగా ఉంది. ఎకరానికి 400 కేజీల జిప్సం వేయండి మరియు పచ్చిరొట్ట ఎరువులు కలియదున్నండి."
        }
    else:
        soil_action = {
            "status": "Optimal Balanced Soil",
            "action_en": "Soil pH is balanced. Apply 5 tons/acre Farm Yard Manure (FYM) to maintain organic matter.",
            "action_te": "నేల సమతుల్యంగా ఉంది. ఎకరానికి 5 టన్నుల పశువుల ఎరువు వేసి నేల సారాన్ని కాపాడుకోండి."
        }

    # 3. Irrigation advice
    if rain_mm > 10:
        irrigation_advice = {
            "action": "Hold Irrigation",
            "reason_en": f"Heavy rain ({rain_mm}mm) forecast within 24h. Suspend irrigation to prevent waterlogging.",
            "reason_te": f"రాబోయే 24 గంటల్లో వర్షం ({rain_mm} మి.మీ) సూచన ఉంది. నీటిపారుదలని నిలిపివేయండి."
        }
    elif moisture < 30:
        irrigation_advice = {
            "action": "Water Immediately",
            "reason_en": f"Low moisture ({moisture}%). Provide drip irrigation for 45 minutes today.",
            "reason_te": f"నేలలో తేమ చాలా తగ్గింది ({moisture}%). వెంటనే 45 నిమిషాలు డ్రిప్ ద్వారా నీరందించండి."
        }
    elif moisture > 75:
        irrigation_advice = {
            "action": "Over-Moist: Restrict Water",
            "reason_en": f"High soil moisture ({moisture}%). Pause irrigation for 3 days to avoid root rot.",
            "reason_te": f"నేలలో అధిక తేమ ఉంది ({moisture}%). వేరుకుళ్లు రాకుండా 3 రోజుల పాటు నీరు పెట్టకండి."
        }
    else:
        irrigation_advice = {
            "action": "Maintain Routine Cycle",
            "reason_en": f"Moisture is optimal ({moisture}%). Continue scheduled morning watering.",
            "reason_te": f"నేల తేమ అనుకూలంగా ఉంది ({moisture}%). సాధారణ పద్ధతిలో నీరు పెట్టండి."
        }

    # 4. Disease Risk Forecast
    risk_score = 15
    reasons = []
    if humidity >= 80:
        risk_score += 45
        reasons.append("High relative humidity creates fungal germination conditions")
    if 20 <= temp_c <= 32:
        risk_score += 25
        reasons.append("Warm temperature falls into pathogen incubation range")
    if rain_mm > 0:
        risk_score += 20
        reasons.append("Precipitation extends leaf wetness duration")

    risk_level = "low" if risk_score < 40 else "moderate" if risk_score < 70 else "elevated"

    return {
        "farm_id": telemetry.get("farm_id", "demo-01"),
        "crop": "tomato",
        "mode": "simulation",
        "latest_sensor": telemetry,
        "suitable_crops": ranked_crops[:3],
        "soil_health_action": soil_action,
        "irrigation_advice": irrigation_advice,
        "risk_forecast": {
            "score": risk_score,
            "level": risk_level,
            "reasons": reasons,
            "validated": False,
            "method": "educational_rules_baseline"
        },
        "summary_advisory": [
            f"Recommended primary crop: {ranked_crops[0]['name_en']} ({ranked_crops[0]['suitability_score']}% fit)",
            soil_action["action_en"],
            irrigation_advice["reason_en"]
        ]
    }
