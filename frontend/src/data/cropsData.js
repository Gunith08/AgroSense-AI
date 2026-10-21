// AgroSense AI - Comprehensive Agricultural Intelligence Database

export const LOCATIONS = [
  { id: "guntur", name: "Guntur", nameTe: "గుంటూరు", lat: 16.3067, lon: 80.4365, defaultTemp: 31, defaultRain: 0, region: "AP Chilli & Cotton Belt" },
  { id: "vijayawada", name: "Vijayawada", nameTe: "విజయవాడ", lat: 16.5062, lon: 80.6480, defaultTemp: 32, defaultRain: 2, region: "Krishna Delta" },
  { id: "hyderabad", name: "Hyderabad", nameTe: "హైదరాబాద్", lat: 17.3850, lon: 78.4867, defaultTemp: 29, defaultRain: 0, region: "Peri-Urban Vegetable Belt" },
  { id: "warangal", name: "Warangal", nameTe: "వరంగల్", lat: 17.9689, lon: 79.5941, defaultTemp: 30, defaultRain: 0, region: "Telangana Cotton & Paddy" },
  { id: "tirupati", name: "Tirupati", nameTe: "తిరుపతి", lat: 13.6288, lon: 79.4192, defaultTemp: 31, defaultRain: 0, region: "Rayalaseema Groundnut Zone" },
  { id: "kurnool", name: "Kurnool", nameTe: "కర్నూలు", lat: 15.8281, lon: 78.0373, defaultTemp: 33, defaultRain: 0, region: "Black Soil Millets & Pulses" },
  { id: "rajahmundry", name: "Rajahmundry", nameTe: "రాజమండ్రి", lat: 17.0005, lon: 81.8040, defaultTemp: 32, defaultRain: 4, region: "Godavari Fertile Alluvium" },
  { id: "anantapur", name: "Anantapur", nameTe: "అనంతపురం", lat: 14.6819, lon: 77.6006, defaultTemp: 34, defaultRain: 0, region: "Dryland Groundnut & Millets" }
];

export const SOIL_TYPES = [
  { id: "black", name: "Black Cotton Soil", nameTe: "నల్లరేగడి నేల", waterHolding: "Very High", drainage: "Slow", phTypical: "7.2 - 8.5" },
  { id: "red", name: "Red Soil", nameTe: "ఎర్ర నేల", waterHolding: "Moderate", drainage: "Good", phTypical: "5.5 - 7.0" },
  { id: "alluvial", name: "Alluvial Soil", nameTe: "వరి / ఒండ్రు నేల", waterHolding: "High", drainage: "Balanced", phTypical: "6.5 - 7.8" },
  { id: "sandy", name: "Sandy Loam Soil", nameTe: "ఇసుక రేగడి నేల", waterHolding: "Low", drainage: "Rapid", phTypical: "6.0 - 7.2" },
  { id: "clay", name: "Clayey Soil", nameTe: "బంకమట్టి నేల", waterHolding: "Extreme", drainage: "Very Slow", phTypical: "6.8 - 8.2" }
];

export const CROPS_DATABASE = [
  {
    id: "tomato",
    name: "Tomato",
    nameTe: "టమాటా",
    minPh: 6.0,
    maxPh: 7.0,
    preferredSoils: ["sandy", "red", "alluvial"],
    waterNeed: "Moderate (45-60%)",
    waterNeedTe: "మితమైన నీరు (45-60%)",
    daysToMaturity: "70-90 days",
    daysToMaturityTe: "70-90 రోజులు",
    descEn: "Thrives in well-drained sandy loam or red soils. Highly sensitive to waterlogging and acidic soil.",
    descTe: "నీరు ఇంకే ఇసుక రేగడి లేదా ఎర్ర నేలల్లో బాగా పండుతుంది. నీరు నిలవడం, ఆమ్ల నేలలను తట్టుకోలేదు."
  },
  {
    id: "chilli",
    name: "Chilli",
    nameTe: "మిరప",
    minPh: 6.0,
    maxPh: 7.5,
    preferredSoils: ["black", "red", "alluvial"],
    waterNeed: "Moderate (40-55%)",
    waterNeedTe: "మితమైన నీరు (40-55%)",
    daysToMaturity: "90-120 days",
    daysToMaturityTe: "90-120 రోజులు",
    descEn: "Premier cash crop in Guntur and Warangal. Demands balanced moisture and neutral to mildly alkaline pH.",
    descTe: "గుంటూరు మరియు వరంగల్ ప్రధాన వాణిజ్య పంట. సరైన తేమ మరియు సమతుల్య pH అవసరం."
  },
  {
    id: "cotton",
    name: "Cotton",
    nameTe: "పత్తి",
    minPh: 6.5,
    maxPh: 8.5,
    preferredSoils: ["black", "alluvial"],
    waterNeed: "Deep Root (50-70%)",
    waterNeedTe: "లోతైన తేమ అవసరం (50-70%)",
    daysToMaturity: "150-180 days",
    daysToMaturityTe: "150-180 రోజులు",
    descEn: "Exceptional match for deep black cotton soils with high moisture retention and moderate alkalinity.",
    descTe: "నల్లరేగడి నేలల్లో అద్భుతంగా పండుతుంది. తేమను నిల్వ ఉంచుకునే స్వభావం చాలా అనుకూలం."
  },
  {
    id: "groundnut",
    name: "Groundnut",
    nameTe: "వేరుశనగ",
    minPh: 5.8,
    maxPh: 7.0,
    preferredSoils: ["red", "sandy"],
    waterNeed: "Low to Moderate (35-50%)",
    waterNeedTe: "తక్కువ నుండి మితమైన నీరు (35-50%)",
    daysToMaturity: "100-115 days",
    daysToMaturityTe: "100-115 రోజులు",
    descEn: "Requires loose, well-aerated sandy or red loam for smooth peg penetration and pod development.",
    descTe: "ఊడలు నేలలోకి దిగి కాయలు తయారు కావడానికి వదులుగా ఉండే ఎర్ర నేలలు, ఇసుక నేలలు శ్రేష్టం."
  },
  {
    id: "maize",
    name: "Maize / Corn",
    nameTe: "మొక్కజొన్న",
    minPh: 6.0,
    maxPh: 7.5,
    preferredSoils: ["alluvial", "red", "black"],
    waterNeed: "Moderate (45-65%)",
    waterNeedTe: "మితమైన నీరు (45-65%)",
    daysToMaturity: "85-105 days",
    daysToMaturityTe: "85-105 రోజులు",
    descEn: "Fast-growing high-yield cereal crop with broad soil adaptability and strong fertilizer response.",
    descTe: "అన్ని రకాల నేలల్లో సులభంగా పెరిగే అధిక దిగుబడినిచ్చే పంట. ఎరువులను బాగా గ్రహిస్తుంది."
  },
  {
    id: "paddy",
    name: "Paddy (Rice)",
    nameTe: "వరి (వరి ధాన్యం)",
    minPh: 5.5,
    maxPh: 7.5,
    preferredSoils: ["alluvial", "clay", "black"],
    waterNeed: "High Water (75-95%)",
    waterNeedTe: "అత్యధిక నీరు (75-95%)",
    daysToMaturity: "120-140 days",
    daysToMaturityTe: "120-140 రోజులు",
    descEn: "Staple food crop ideal for heavy alluvial or clayey soils capable of standing water retention.",
    descTe: "కృష్ణా, గోదావరి డెల్టా ఒండ్రు మరియు బంకమట్టి నేలల్లో నీటి నిల్వను తట్టుకుని సమృద్ధిగా పండుతుంది."
  }
];

export { 
  PLANT_DISEASES_DB, 
  BENCHMARK_SAMPLES, 
  BENCHMARK_SAMPLES as LEAF_DISEASES, 
  CROP_CATEGORIES, 
  diagnosePlantFoliage 
} from './plantDiseasesData.js';

// Core Agronomic Decision Engine with Realistic Suitability Calibration
export function generateFarmerAdvisory({ soilMoisture, soilPh, humidity, soilType, locationId, weather }) {
  const loc = LOCATIONS.find(l => l.id === locationId) || LOCATIONS[0];
  const soil = SOIL_TYPES.find(s => s.id === soilType) || SOIL_TYPES[0];
  const rainForecast = weather?.rain_mm ?? loc.defaultRain;
  const temp = weather?.temperature_c ?? loc.defaultTemp;

  // 1. Calculate Realistic Crop Suitability Scores (e.g. 72% to 91%)
  const cropRankings = CROPS_DATABASE.map(crop => {
    let score = 65; // realistic baseline

    // pH Match (up to +15, down to -20)
    if (soilPh >= crop.minPh && soilPh <= crop.maxPh) {
      score += 16;
    } else {
      const phDiff = Math.min(Math.abs(soilPh - crop.minPh), Math.abs(soilPh - crop.maxPh));
      score -= Math.round(phDiff * 12);
    }

    // Soil Type Match (up to +12, down to -8)
    if (crop.preferredSoils.includes(soilType)) {
      score += 11;
    } else {
      score -= 8;
    }

    // Temperature & Climate Compatibility
    if (temp >= 24 && temp <= 33) {
      score += 5;
    } else {
      score -= 6;
    }

    // Moisture Compatibility
    if (soilMoisture >= 40 && soilMoisture <= 70) {
      score += 4;
    }

    // Realistic clamp: between 45% and 92% (realistic field agronomic scoring)
    const realisticScore = Math.max(45, Math.min(92, score));

    return {
      ...crop,
      suitabilityScore: realisticScore
    };
  }).sort((a, b) => b.suitabilityScore - a.suitabilityScore);

  // 2. Soil pH & Health Measures
  let phStatusEn = "Optimal Balanced Range (6.2 - 7.2)";
  let phStatusTe = "మంచి సారం గల నేల (6.2 - 7.2)";
  let phActionEn = "Your soil pH is in the balanced zone for primary nutrient uptake (Nitrogen, Phosphorus, Potassium). Maintain with well-decomposed Farm Yard Manure (FYM) at 4-5 tons/acre.";
  let phActionTe = "మీ నేల pH మొక్కలకు అవసరమైన పోషకాలను అందించే సమతుల్య పరిధిలో ఉంది. ఎకరానికి 4-5 టన్నుల పశువుల ఎరువు వేసి నేల సారాన్ని కాపాడుకోండి.";
  let phBadgeColor = "text-emerald-800 bg-emerald-100/80 border-emerald-300";

  if (soilPh < 6.0) {
    phStatusEn = `Acidic Soil Alert (pH ${soilPh.toFixed(1)})`;
    phStatusTe = `ఆమ్ల నేల హెచ్చరిక (pH ${soilPh.toFixed(1)})`;
    phActionEn = `Soil is overly acidic. Nutrient lockout will restrict phosphorus and calcium uptake. Apply Agricultural Lime (Calcium Carbonate) or Dolomite at 250-350 kg/acre before the next plowing cycle.`;
    phActionTe = `నేలలో ఆమ్లత ఎక్కువైంది. భాస్వరం మరియు కాల్షియం మొక్కలకు సరిగ్గా అందవు. ఎకరానికి 250-350 కేజీల వ్యవసాయ సున్నం (డోలమైట్) చల్లి దున్నండి.`;
    phBadgeColor = "text-amber-900 bg-amber-100 border-amber-300";
  } else if (soilPh > 7.6) {
    phStatusEn = `Alkaline Soil Alert (pH ${soilPh.toFixed(1)})`;
    phStatusTe = `క్షార నేల హెచ్చరిక (pH ${soilPh.toFixed(1)})`;
    phActionEn = `High alkalinity can cause iron and zinc chlorosis. Apply Agricultural Gypsum at 350-400 kg/acre and incorporate green manure crops (Dhaincha/Sunn hemp) to organically buffer the pH.`;
    phActionTe = `నేలలో క్షారత ఎక్కువగా ఉంది. ఇనుము, జింక్ లోపాలు వస్తాయి. ఎకరానికి 350-400 కేజీల జిప్సం వేయండి మరియు పచ్చిరొట్ట ఎరువులు (జీలుగ, జనుము) కలియదున్నండి.`;
    phBadgeColor = "text-blue-900 bg-blue-100 border-blue-300";
  }

  // 3. Smart Irrigation Decision
  let irrigationActionEn = "";
  let irrigationActionTe = "";
  let irrigationUrgency = "Normal";

  if (rainForecast > 10) {
    irrigationActionEn = `Substantial rainfall expected (${rainForecast} mm in 24h). Suspend all artificial irrigation immediately. Clear boundary drainage trenches to avoid root stagnation in ${soil.name}.`;
    irrigationActionTe = `రాబోయే 24 గంటల్లో వర్షం (${rainForecast} మి.మీ) సూచన ఉంది. నీటిపారుదలని వెంటనే నిలిపివేయండి. ${soil.nameTe}లో నీరు నిలవకుండా మురుగు కాల్వలను శుభ్రం చేయండి.`;
    irrigationUrgency = "Hold Irrigation";
  } else if (soilMoisture < 30) {
    if (soilType === "sandy") {
      irrigationActionEn = `Critical moisture deficit (${soilMoisture}%) in Sandy Loam. Rapid drainage necessitates immediate drip irrigation for 45-60 minutes today.`;
      irrigationActionTe = `ఇసుక నేలలో తేమ చాలా తగ్గింది (${soilMoisture}%). వెంటనే 45-60 నిమిషాలు డ్రిప్ ద్వారా నీరందించండి.`;
    } else {
      irrigationActionEn = `Low soil moisture detected (${soilMoisture}%). Schedule field watering within 12 hours. Preferred timing: early morning or late dusk.`;
      irrigationActionTe = `నేలలో తేమ తక్కువగా ఉంది (${soilMoisture}%). రాబోయే 12 గంటల్లో ఉదయం లేదా సాయంత్రం వేళల్లో నీరు పెట్టండి.`;
    }
    irrigationUrgency = "Water Needed";
  } else if (soilMoisture > 75) {
    irrigationActionEn = `Soil is over-saturated (${soilMoisture}%). High threat of root asphyxiation and collar rot in ${soil.name}. Restrict watering for 3-4 days until moisture stabilizes below 60%.`;
    irrigationActionTe = `నేలలో అధిక తేమ ఉంది (${soilMoisture}%). వేరుకుళ్లు, మొదలుకుళ్లు తెగులు వచ్చే ప్రమాదం ఉంది. 3-4 రోజుల పాటు నీరు పెట్టకండి.`;
    irrigationUrgency = "Over-Moist";
  } else {
    irrigationActionEn = `Optimal root-zone moisture (${soilMoisture}%). Water availability is well-balanced for continuous vegetative nutrient flow.`;
    irrigationActionTe = `నేల తేమ అనుకూలంగా ఉంది (${soilMoisture}%). మొక్కలకు సరిపడా నీరు అందుతోంది. సాధారణ పద్ధతిలో కొనసాగించండి.`;
    irrigationUrgency = "Optimal Moisture";
  }

  // 4. Environmental Disease Risk Outlook (24-72h)
  let riskScore = 0;
  const contributingFactorsEn = [];
  const contributingFactorsTe = [];

  if (humidity >= 80) {
    riskScore += 45;
    contributingFactorsEn.push(`Atmospheric humidity (${humidity}%) creates rapid fungal spore germination conditions.`);
    contributingFactorsTe.push(`గాలిలో అధిక తేమ (${humidity}%) శిలీంధ్రాల వ్యాప్తికి కారణమవుతుంది.`);
  } else if (humidity >= 65) {
    riskScore += 20;
    contributingFactorsEn.push(`Moderate atmospheric humidity (${humidity}%).`);
    contributingFactorsTe.push(`గాలిలో మితమైన తేమ (${humidity}%).`);
  }

  if (temp >= 22 && temp <= 32) {
    riskScore += 30;
    contributingFactorsEn.push(`Warm ambient temperature (${temp}°C) falls directly in pathogen incubation limits.`);
    contributingFactorsTe.push(`ఉష్ణోగ్రత (${temp}°C) తెగుళ్లు వేగంగా పెరగడానికి అనుకూలంగా ఉంది.`);
  }

  if (rainForecast > 0) {
    riskScore += 25;
    contributingFactorsEn.push(`Incoming precipitation increases foliar wetness duration.`);
    contributingFactorsTe.push(`రాబోయే వర్షం ఆకులపై ఎక్కువ సమయం తేమను ఉంచుతుంది.`);
  }

  let riskLevelEn = "Low Environmental Risk";
  let riskLevelTe = "తక్కువ ముప్పు";
  let riskColor = "emerald";

  if (riskScore >= 70) {
    riskLevelEn = "Elevated Risk - Action Needed";
    riskLevelTe = "అధిక ముప్పు - జాగ్రత్త అవసరం";
    riskColor = "red";
  } else if (riskScore >= 40) {
    riskLevelEn = "Moderate Risk - Monitor Closely";
    riskLevelTe = "మితమైన ముప్పు - గమనించండి";
    riskColor = "amber";
  }

  return {
    topCrops: cropRankings.slice(0, 3),
    soilHealth: {
      statusEn: phStatusEn,
      statusTe: phStatusTe,
      actionEn: phActionEn,
      actionTe: phActionTe,
      badgeColor: phBadgeColor,
      phValue: soilPh
    },
    irrigation: {
      urgency: irrigationUrgency,
      actionEn: irrigationActionEn,
      actionTe: irrigationActionTe,
      soilMoisture,
      rainForecast
    },
    diseaseRisk: {
      score: riskScore,
      levelEn: riskLevelEn,
      levelTe: riskLevelTe,
      color: riskColor,
      factorsEn: contributingFactorsEn,
      factorsTe: contributingFactorsTe
    }
  };
}
