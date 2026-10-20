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

export const LEAF_DISEASES = [
  {
    id: "healthy",
    nameEn: "Healthy Crop Leaf",
    nameTe: "ఆరోగ్యకరమైన పంట ఆకు",
    confidence: 96.2,
    status: "Healthy Condition",
    statusTe: "ఆరోగ్యకరమైన స్థితి",
    symptomsEn: "Leaf displays uniform vibrant green pigmentation, robust cellular margins, and zero necrotic lesions or fungal powder.",
    symptomsTe: "ఆకు పూర్తి పచ్చదనంతో ఉంది. ఎలాంటి మచ్చలు, పసుపు రంగు, లేదా ఆకు ముడుతలు లేవు.",
    precautionsEn: "Maintain disciplined drip irrigation schedules, avoid excess urea nitrogen that softens foliage, and monitor weekly.",
    precautionsTe: "క్రమశిక్షణతో కూడిన నీటిపారుదల కొనసాగించండి. అధిక నత్రజని వాడకం తగ్గించండి. ప్రతి వారం ఆకులను గమనించండి.",
    cureEn: "No chemical fungicides required. Optional preventive measure: Spray 5ml Neem oil (Azadirachtin 10,000 ppm) per liter of water.",
    cureTe: "ఎలాంటి రసాయన మందులు అవసరం లేదు. ముందస్తు రక్షణగా లీటరు నీటికి 5 మి.లీ వేప నూనె కలిపి పిచికారీ చేయవచ్చు.",
    youtubeVideos: [
      {
        id: "healthy-1",
        titleEn: "Tomato Crop Management & High Yield Practices",
        titleTe: "టమాటా పంట సాగులో అధిక దిగుబడికి యాజమాన్య పద్ధతులు",
        channel: "Rythu Nestham",
        youtubeId: "W7o-Z18E4a0",
        url: "https://www.youtube.com/watch?v=W7o-Z18E4a0",
        thumbnail: "https://img.youtube.com/vi/W7o-Z18E4a0/hqdefault.jpg"
      },
      {
        id: "healthy-2",
        titleEn: "Organic Care & Neem Spray for Vegetable Crops",
        titleTe: "కూరగాయల పంటల్లో సేంద్రీయ ఎరువులు మరియు వేప కషాయం",
        channel: "Eruvaka Telugu Farming",
        youtubeId: "X8C4M5e-B0E",
        url: "https://www.youtube.com/watch?v=X8C4M5e-B0E",
        thumbnail: "https://img.youtube.com/vi/X8C4M5e-B0E/hqdefault.jpg"
      }
    ]
  },
  {
    id: "early_blight",
    nameEn: "Early Blight (Alternaria solani)",
    nameTe: "ముందస్తు ఆకుమచ్చ తెగులు (Early Blight)",
    confidence: 93.6,
    status: "Fungal Infection Detected",
    statusTe: "శిలీంధ్ర వ్యాధి సోకింది",
    symptomsEn: "Distinct dark brown to black circular lesions with concentric target rings ('bullseye' pattern) appearing on lower mature foliage.",
    symptomsTe: "కింది ముదురు ఆకులపై వలయాల వంటి (టార్గెట్ బోర్డు లాంటి) గోధుమ మరియు నలుపు రంగు గుండ్రని మచ్చలు ఏర్పడతాయి.",
    precautionsEn: "Sanitize field by pruning infected bottom leaves. Avoid overhead sprinklers; irrigate through ground drip to prevent spore splash.",
    precautionsTe: "తెగులు సోకిన కింది ఆకులను వెంటనే తుంచి నాశనం చేయండి. ఆకులపై నీరు పడకుండా డ్రిప్ ద్వారా నీరందించండి.",
    cureEn: "Spray Mancozeb (2.5g/L) or Copper Oxychloride (3g/L) thoroughly. In advanced spread, apply Azoxystrobin + Difenoconazole (Amistar Top 1ml/L).",
    cureTe: "మాంకోజెబ్ (లీటరు నీటికి 2.5 గ్రా) లేదా కాపర్ ఆక్సిక్లోరైడ్ (3 గ్రా) పిచికారీ చేయాలి. ఉధృతి ఎక్కువగా ఉంటే అమిస్టార్ టాప్ (1 మి.లీ) వాడండి.",
    youtubeVideos: [
      {
        id: "eb-1",
        titleEn: "Early Blight Identification and Complete Cure in Tomato & Chilli",
        titleTe: "టమాటాలో ఆకుమచ్చ తెగులు నివారణ మరియు మందుల వివరాలు",
        channel: "Annadata Telugu",
        youtubeId: "0_u6eT2U_2Y",
        url: "https://www.youtube.com/watch?v=0_u6eT2U_2Y",
        thumbnail: "https://img.youtube.com/vi/0_u6eT2U_2Y/hqdefault.jpg"
      },
      {
        id: "eb-2",
        titleEn: "Mancozeb & Copper Spray Guide for Crop Blight",
        titleTe: "టమాటా ఆకుమచ్చ తెగులుకు కాపర్ మరియు మాంకోజెబ్ పిచికారీ పద్ధతి",
        channel: "Rythu Nestham",
        youtubeId: "U7x6pL9R2nE",
        url: "https://www.youtube.com/watch?v=U7x6pL9R2nE",
        thumbnail: "https://img.youtube.com/vi/U7x6pL9R2nE/hqdefault.jpg"
      }
    ]
  },
  {
    id: "late_blight",
    nameEn: "Late Blight (Phytophthora infestans)",
    nameTe: "ఆలస్యపు ఆకుమచ్చ తెగులు (Late Blight)",
    confidence: 91.8,
    status: "High Severity Threat",
    statusTe: "తీవ్రమైన తెగులు హెచ్చరిక",
    symptomsEn: "Rapidly expanding water-soaked dark gray/brown lesions on leaf tips with fine white mold on leaf undersides under cool humid weather.",
    symptomsTe: "ఆకుల చివర్లలో నీరు కారినట్లు ముదురు మచ్చలు ఏర్పడి వేగంగా వ్యాపిస్తాయి. చల్లటి వాతావరణంలో ఆకు అడుగున తెల్లటి బూజు వస్తుంది.",
    precautionsEn: "Improve field drainage immediately. Isolate and safely burn severely infected plants. Cease all canopy spraying.",
    precautionsTe: "తోటలో నీరు నిలవకుండా డ్రైనేజీ ఏర్పాటు చేయండి. తీవ్రంగా సోకిన మొక్కలను పీకి కాల్చివేయండి.",
    cureEn: "Spray Metalaxyl + Mancozeb (Ridomil Gold 2g/L) or Cymoxanil + Mancozeb (Sectin 2g/L). Alternate with Dimethomorph (1g/L) after 7 days.",
    cureTe: "రిడోమిల్ గోల్డ్ (మెటలాక్సిల్ + మాంకోజెబ్ - 2 గ్రా/లీటరు) లేదా సెక్టిన్ పిచికారీ చేయాలి. వారం తర్వాత డైమెథోమార్ఫ్ (1 గ్రా) వాడాలి.",
    youtubeVideos: [
      {
        id: "lb-1",
        titleEn: "Late Blight Management in Tomato Crops - Telugu Expert Guide",
        titleTe: "టమాటాలో లేట్ బ్లైట్ (మంచు తెగులు) పూర్తి నివారణ మార్గాలు",
        channel: "Eruvaka Telugu Farming",
        youtubeId: "kS8U1bH6Zz0",
        url: "https://www.youtube.com/watch?v=kS8U1bH6Zz0",
        thumbnail: "https://img.youtube.com/vi/kS8U1bH6Zz0/hqdefault.jpg"
      },
      {
        id: "lb-2",
        titleEn: "Winter Fungicides Guide for Tomato Blight in AP & Telangana",
        titleTe: "టమాటా పంటలో శీతాకాల తెగుళ్లు - నివారణ మందులు",
        channel: "Rythu Badi Telugu",
        youtubeId: "v4x1B6K9L9c",
        url: "https://www.youtube.com/watch?v=v4x1B6K9L9c",
        thumbnail: "https://img.youtube.com/vi/v4x1B6K9L9c/hqdefault.jpg"
      }
    ]
  },
  {
    id: "leaf_mold",
    nameEn: "Leaf Mold (Passalora fulva)",
    nameTe: "ఆకు బూడిద / శిలీంధ్ర తెగులు (Leaf Mold)",
    confidence: 89.4,
    status: "Humidity-Induced Fungus",
    statusTe: "అధిక తేమ వల్ల వచ్చిన తెగులు",
    symptomsEn: "Pale greenish-yellow chlorotic spots on upper leaf surfaces, developing into dense velvety olive-brown mold on the lower side.",
    symptomsTe: "ఆకు పైభాగంలో లేత పసుపు పచ్చ మచ్చలు, ఆకు కింద భాగాన వెల్వెట్ లాంటి గోధుమ-ఆలివ్ రంగు బూజు ఏర్పడుతుంది.",
    precautionsEn: "Maximize plant row spacing for horizontal air ventilation. Prune lower foliage touching damp soil strata.",
    precautionsTe: "మొక్కల మధ్య గాలి ప్రసరణ బాగుండేలా చూడండి. నేలకు ఆనుకున్న కింద ఆకులను కత్తిరించండి.",
    cureEn: "Spray Carbendazim (1g/L) or Chlorothalonil (2g/L). Bio-control option: Trichoderma viride (5g/L) applied during cool dusk hours.",
    cureTe: "కార్బెండజిమ్ (1 గ్రా/లీటరు) లేదా క్లోరోథలోనిల్ (2 గ్రా) పిచికారీ చేయండి. సేంద్రీయంగా ట్రైకోడెర్మా విరిడే (5 గ్రా/లీ) వాడవచ్చు.",
    youtubeVideos: [
      {
        id: "lm-1",
        titleEn: "Leaf Mold Management and Bio-Fungicides in Telugu",
        titleTe: "టమాటా ఆకు బూజు / శిలీంధ్ర తెగులు నివారణ",
        channel: "Telugu Agriculture Hub",
        youtubeId: "b8T6Gq3X7nM",
        url: "https://www.youtube.com/watch?v=b8T6Gq3X7nM",
        thumbnail: "https://img.youtube.com/vi/b8T6Gq3X7nM/hqdefault.jpg"
      }
    ]
  },
  {
    id: "bacterial_spot",
    nameEn: "Bacterial Spot (Xanthomonas)",
    nameTe: "బాక్టీరియల్ మచ్చల తెగులు (Bacterial Spot)",
    confidence: 90.7,
    status: "Bacterial Infection",
    statusTe: "బాక్టీరియల్ సంక్రమణ",
    symptomsEn: "Small (under 3mm), angular dark brown spots on foliage surrounded by distinct chlorotic yellow halos.",
    symptomsTe: "ఆకులు, కొమ్మలపై చిన్న (3మి.మీ కంటే తక్కువ) కోణీయ నల్లటి మచ్చలు పసుపు రంగు వలయంతో కనిపిస్తాయి.",
    precautionsEn: "Source certified disease-free seeds. Never handle, prune, or harvest plants while foliage is wet from morning dew.",
    precautionsTe: "ఆకులు తడిగా ఉన్నప్పుడు తోటలో పనులు చేయకండి. దీనివల్ల వ్యాధి ఇతర మొక్కలకు త్వరగా పాకుతుంది.",
    cureEn: "Spray Streptocycline / Plantomycin (1g per 10L water) blended with Copper Oxychloride (25g per 10L). Apply twice at 8-day interval.",
    cureTe: "ప్లాంటోమైసిన్ లేదా స్ట్రెప్టోసైక్లిన్ (10 లీటర్ల నీటికి 1 గ్రా) + కాపర్ ఆక్సిక్లోరైడ్ (10 లీటర్లకు 25 గ్రా) కలిపి పిచికారీ చేయాలి.",
    youtubeVideos: [
      {
        id: "bs-1",
        titleEn: "Bacterial Spot in Vegetable Crops - Streptocycline Usage",
        titleTe: "కూరగాయల పంటల్లో బాక్టీరియల్ మచ్చల తెగులు నివారణ",
        channel: "Telugu Rythu Seva",
        youtubeId: "L3M7N9b1P6w",
        url: "https://www.youtube.com/watch?v=L3M7N9b1P6w",
        thumbnail: "https://img.youtube.com/vi/L3M7N9b1P6w/hqdefault.jpg"
      }
    ]
  }
];

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
