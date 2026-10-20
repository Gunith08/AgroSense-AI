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
    waterNeed: "High Deep Root (50-70%)",
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
    waterNeed: "High / Submerged (75-95%)",
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
    nameEn: "Healthy Leaf",
    nameTe: "ఆరోగ్యకరమైన ఆకు",
    confidence: 97.4,
    status: "Healthy Condition",
    statusTe: "ఆరోగ్యకరమైన స్థితి",
    symptomsEn: "Leaf is deep vibrant green with clear cellular structure, no discoloration, spots, or curled margins.",
    symptomsTe: "ఆకు పూర్తి పచ్చదనంతో ఉంది. ఎలాంటి మచ్చలు, పసుపు రంగు, లేదా ఆకు ముడుతలు లేవు.",
    precautionsEn: "Maintain regular drip irrigation intervals, avoid over-fertilizing with excess nitrogen, and scout weekly.",
    precautionsTe: "క్రమశిక్షణతో కూడిన నీటిపారుదల కొనసాగించండి. అధిక నత్రజని వాడకం తగ్గించండి. ప్రతి వారం ఆకులను గమనించండి.",
    cureEn: "No chemical treatment needed. Optional preventive spray: 5ml Neem oil per liter of water as organic pest repellent.",
    cureTe: "ఎలాంటి రసాయన మందులు అవసరం లేదు. ముందస్తు రక్షణగా లీటరు నీటికి 5 మి.లీ వేప నూనె కలిపి పిచికారీ చేయవచ్చు.",
    youtubeVideos: [
      {
        id: "healthy-1",
        titleEn: "Tomato Crop Management & Healthy Plant Growth Tips",
        titleTe: "టమాటా పంట సాగులో మెళకువలు మరియు ఆరోగ్యకరమైన దిగుబడి చిట్కాలు",
        channel: "Rythu Nestham",
        youtubeId: "W7o-Z18E4a0",
        url: "https://www.youtube.com/watch?v=W7o-Z18E4a0"
      },
      {
        id: "healthy-2",
        titleEn: "Organic Fertilizer & Neem Spray for Vegetable Crops",
        titleTe: "కూరగాయల పంటల్లో వేప నూనె మరియు సేంద్రీయ ఎరువుల వినియోగం",
        channel: "Eruvaka Telugu Farming",
        youtubeId: "X8C4M5e-B0E",
        url: "https://www.youtube.com/watch?v=X8C4M5e-B0E"
      }
    ]
  },
  {
    id: "early_blight",
    nameEn: "Early Blight (Alternaria solani)",
    nameTe: "ముందస్తు ఆకుమచ్చ తెగులు (Early Blight)",
    confidence: 94.8,
    status: "Fungal Infection Detected",
    statusTe: "శిలీంధ్ర వ్యాధి సోకింది",
    symptomsEn: "Distinct dark brown to black spots with concentric rings ('bullseye' target pattern) starting on older lower leaves.",
    symptomsTe: "కింది ముదురు ఆకులపై వలయాల వంటి (టార్గెట్ బోర్డు లాంటి) గోధుమ మరియు నలుపు రంగు గుండ్రని మచ్చలు ఏర్పడతాయి.",
    precautionsEn: "Prune affected lower leaves immediately. Avoid overhead sprinkler watering to keep foliage dry. Rotate crops annually.",
    precautionsTe: "తెగులు సోకిన కింది ఆకులను వెంటనే తుంచి నాశనం చేయండి. ఆకులపై నీరు పడేలా కాకుండా మొదళ్ల వద్ద డ్రిప్ ద్వారా నీరందించండి.",
    cureEn: "Spray Mancozeb (2.5g/L) or Copper Oxychloride (3g/L). In severe spread, apply Azoxystrobin + Difenoconazole (1ml/L). Repeat after 10 days.",
    cureTe: "మాంకోజెబ్ (లీటరు నీటికి 2.5 గ్రా) లేదా కాపర్ ఆక్సిక్లోరైడ్ (3 గ్రా) పిచికారీ చేయాలి. ఉధృతి ఎక్కువగా ఉంటే అమిస్టార్ టాప్ (1 మి.లీ) వాడండి.",
    youtubeVideos: [
      {
        id: "eb-1",
        titleEn: "Early Blight Identification and Complete Cure in Tomato & Chilli",
        titleTe: "టమాటాలో ఆకుమచ్చ తెగులు నివారణ మరియు మందుల వివరాలు",
        channel: "Annadata Telugu",
        youtubeId: "fK3Yj9c7d4s",
        url: "https://www.youtube.com/results?search_query=tomato+early+blight+cure+telugu"
      },
      {
        id: "eb-2",
        titleEn: "Mancozeb & Copper Spray Guide for Tomato Blight",
        titleTe: "టమాటా ఆకుమచ్చ తెగులుకు కాపర్ మరియు మాంకోజెబ్ పిచికారీ పద్ధతి",
        channel: "Rythu Nestham Live",
        youtubeId: "b8T6Gq3X7nM",
        url: "https://www.youtube.com/results?search_query=telugu+rythu+early+blight+treatment"
      }
    ]
  },
  {
    id: "late_blight",
    nameEn: "Late Blight (Phytophthora infestans)",
    nameTe: "ఆలస్యపు ఆకుమచ్చ తెగులు (Late Blight)",
    confidence: 92.5,
    status: "High Severity Threat",
    statusTe: "తీవ్రమైన తెగులు హెచ్చరిక",
    symptomsEn: "Rapidly spreading water-soaked dark lesions on leaf tips with delicate white fungal fuzz on the underside during humid weather.",
    symptomsTe: "ఆకుల చివర్లలో నీరు కారినట్లు ముదురు మచ్చలు ఏర్పడి వేగంగా వ్యాపిస్తాయి. తేమతో కూడిన చల్లటి వాతావరణంలో ఆకు అడుగున తెల్లటి బూజు వస్తుంది.",
    precautionsEn: "Discontinue any overhead watering. Destroy heavily infested plants to protect neighboring crops. Improve soil drainage.",
    precautionsTe: "తోటలో నీరు నిలవకుండా డ్రైనేజీ ఏర్పాటు చేయండి. తీవ్రంగా సోకిన మొక్కలను పీకి కాల్చివేయండి.",
    cureEn: "Spray Metalaxyl + Mancozeb (Ridomil Gold 2g/L) or Cymoxanil + Mancozeb (Sectin 2g/L). Alternate with Dimethomorph (1g/L) after 7 days.",
    cureTe: "రిడోమిల్ గోల్డ్ (మెటలాక్సిల్ + మాంకోజెబ్ - 2 గ్రా/లీటరు) లేదా సెక్టిన్ పిచికారీ చేయాలి. వారం తర్వాత డైమెథోమార్ఫ్ (1 గ్రా) వాడాలి.",
    youtubeVideos: [
      {
        id: "lb-1",
        titleEn: "Late Blight Control in Tomato & Potato Crops - Telugu Expert Guide",
        titleTe: "టమాటాలో లేట్ బ్లైట్ (మంచు తెగులు) పూర్తి నివారణ మార్గాలు",
        channel: "Eruvaka Telugu Farming",
        youtubeId: "kL7N9_1oP8w",
        url: "https://www.youtube.com/results?search_query=tomato+late+blight+telugu+farming"
      },
      {
        id: "lb-2",
        titleEn: "Fungicides for Late Blight Season in AP & Telangana",
        titleTe: "చలికాలంలో టమాటా తెగుళ్లకు పిచికారీ చేయవలసిన శిలీంధ్ర నాశినులు",
        channel: "Rythu Badi Telugu",
        youtubeId: "vR2P8xM3qZs",
        url: "https://www.youtube.com/results?search_query=tomato+fungicide+telugu"
      }
    ]
  },
  {
    id: "leaf_mold",
    nameEn: "Leaf Mold (Passalora fulva)",
    nameTe: "ఆకు బూడిద / శిలీంధ్ర తెగులు (Leaf Mold)",
    confidence: 91.2,
    status: "Humidity-Induced Fungus",
    statusTe: "అధిక తేమ వల్ల వచ్చిన తెగులు",
    symptomsEn: "Pale greenish-yellow spots on the upper leaf surface, followed by velvety olive-green to brown mold on the lower leaf surface.",
    symptomsTe: "ఆకు పైభాగంలో లేత పసుపు పచ్చ మచ్చలు, ఆకు కింద భాగాన వెల్వెట్ లాంటి గోధుమ-ఆలివ్ రంగు బూజు ఏర్పడుతుంది.",
    precautionsEn: "Increase plant spacing for aeration. Remove lower foliage touching the soil. Ventilate greenhouse or polytunnel beds.",
    precautionsTe: "మొక్కల మధ్య గాలి ప్రసరణ బాగుండేలా చూడండి. నేలకు ఆనుకున్న కింద ఆకులను కత్తిరించండి.",
    cureEn: "Spray Carbendazim (1g/L) or Chlorothalonil (2g/L). Organic remedy: Trichoderma viride bio-fungicide (5g/L) applied in the evening.",
    cureTe: "కార్బెండజిమ్ (1 గ్రా/లీటరు) లేదా క్లోరోథలోనిల్ (2 గ్రా) పిచికారీ చేయండి. సేంద్రీయంగా ట్రైకోడెర్మా విరిడే (5 గ్రా/లీ) పిచికారీ చేయవచ్చు.",
    youtubeVideos: [
      {
        id: "lm-1",
        titleEn: "Leaf Mold Management and Ventilation Tips in Telugu",
        titleTe: "టమాటా ఆకు బూజు తెగులు నివారణ మరియు సేంద్రీయ చిట్కాలు",
        channel: "Rythu Mitra",
        youtubeId: "qW9E3vN8aL1",
        url: "https://www.youtube.com/results?search_query=leaf+mold+treatment+in+telugu"
      }
    ]
  },
  {
    id: "bacterial_spot",
    nameEn: "Bacterial Spot (Xanthomonas)",
    nameTe: "బాక్టీరియల్ మచ్చల తెగులు (Bacterial Spot)",
    confidence: 93.1,
    status: "Bacterial Infection",
    statusTe: "బాక్టీరియల్ సంక్రమణ",
    symptomsEn: "Small (less than 3mm), water-soaked angular dark brown lesions on leaves and stems, often with yellow halos.",
    symptomsTe: "ఆకులు, కొమ్మలపై చిన్న (3మి.మీ కంటే తక్కువ) కోణీయ నల్లటి మచ్చలు పసుపు రంగు వలయంతో కనిపిస్తాయి.",
    precautionsEn: "Use certified disease-free seeds. Never prune or weed while the plants are wet to avoid mechanical transmission.",
    precautionsTe: "ఆకులు తడిగా ఉన్నప్పుడు తోటలో పనులు చేయకండి. దీనివల్ల వ్యాధి ఇతర మొక్కలకు త్వరగా పాకుతుంది.",
    cureEn: "Spray Streptocycline / Plantomycin (1g per 10 liters) mixed with Copper Oxychloride (25g per 10 liters). Apply twice at 8-day interval.",
    cureTe: "ప్లాంటోమైసిన్ లేదా స్ట్రెప్టోసైక్లిన్ (10 లీటర్ల నీటికి 1 గ్రా) + కాపర్ ఆక్సిక్లోరైడ్ (10 లీటర్లకు 25 గ్రా) కలిపి పిచికారీ చేయాలి.",
    youtubeVideos: [
      {
        id: "bs-1",
        titleEn: "Bacterial Spot in Vegetable Crops - Streptocycline Usage in Telugu",
        titleTe: "కూరగాయల పంటల్లో బాక్టీరియా మచ్చల తెగులుకు ప్లాంటోమైసిన్ వాడే విధానం",
        channel: "Telugu Agriculture Hub",
        youtubeId: "mN8K2vL6xQ4",
        url: "https://www.youtube.com/results?search_query=bacterial+spot+vegetable+telugu"
      }
    ]
  }
];

// Core Agronomic Decision Engine
export function generateFarmerAdvisory({ soilMoisture, soilPh, humidity, soilType, locationId, weather }) {
  const loc = LOCATIONS.find(l => l.id === locationId) || LOCATIONS[0];
  const soil = SOIL_TYPES.find(s => s.id === soilType) || SOIL_TYPES[0];
  const rainForecast = weather?.rain_mm ?? loc.defaultRain;
  const temp = weather?.temperature_c ?? loc.defaultTemp;

  // 1. Calculate Crop Suitability Scores
  const cropRankings = CROPS_DATABASE.map(crop => {
    let score = 70; // baseline

    // pH Match
    if (soilPh >= crop.minPh && soilPh <= crop.maxPh) {
      score += 20;
    } else {
      const phDiff = Math.min(Math.abs(soilPh - crop.minPh), Math.abs(soilPh - crop.maxPh));
      score -= Math.round(phDiff * 15);
    }

    // Soil Preference Match
    if (crop.preferredSoils.includes(soilType)) {
      score += 15;
    } else {
      score -= 10;
    }

    // Temperature & Climate Compatibility
    if (temp >= 22 && temp <= 35) {
      score += 5;
    } else {
      score -= 10;
    }

    // Clamp score
    const finalScore = Math.max(25, Math.min(99, score));

    return {
      ...crop,
      suitabilityScore: finalScore
    };
  }).sort((a, b) => b.suitabilityScore - a.suitabilityScore);

  // 2. Soil pH & Health Measures
  let phStatusEn = "Optimal Range (6.2 - 7.2)";
  let phStatusTe = "మంచి సారం గల నేల (6.2 - 7.2)";
  let phActionEn = "Your soil pH is in the balanced zone for primary nutrient uptake (Nitrogen, Phosphorus, Potassium). Maintain with well-decomposed FYM (Farm Yard Manure) at 5 tons/acre.";
  let phActionTe = "మీ నేల pH మొక్కలకు అవసరమైన పోషకాలను అందించే సమతుల్య పరిధిలో ఉంది. ఎకరానికి 5 టన్నుల పశువుల ఎరువు వేసి నేల సారాన్ని కాపాడుకోండి.";
  let phBadgeColor = "text-emerald-700 bg-emerald-50 border-emerald-200";

  if (soilPh < 6.0) {
    phStatusEn = `Acidic Soil Alert (pH ${soilPh})`;
    phStatusTe = `ఆమ్ల నేల హెచ్చరిక (pH ${soilPh})`;
    phActionEn = `Soil is too acidic. Nutrient lockout will cause phosphorus and calcium deficiencies. Apply Agricultural Lime (Calcium Carbonate) or Dolomite at 250-350 kg/acre before next plowing.`;
    phActionTe = `నేలలో ఆమ్లత ఎక్కువైంది. భాస్వరం మరియు కాల్షియం మొక్కలకు అందవు. ఎకరానికి 250-350 కేజీల వ్యవసాయ సున్నం (డోలమైట్) చల్లి దున్నండి.`;
    phBadgeColor = "text-amber-800 bg-amber-50 border-amber-200";
  } else if (soilPh > 7.6) {
    phStatusEn = `Alkaline Soil Alert (pH ${soilPh})`;
    phStatusTe = `క్షార నేల హెచ్చరిక (pH ${soilPh})`;
    phActionEn = `High alkalinity can cause iron, zinc, and micronutrient chlorosis. Apply Agricultural Gypsum at 400 kg/acre and incorporate green manure crops (Dhaincha/Sunn hemp) to naturally lower pH.`;
    phActionTe = `నేలలో క్షారత ఎక్కువగా ఉంది. ఇనుము, జింక్ లోపాలు వస్తాయి. ఎకరానికి 400 కేజీల జిప్సం వేయండి మరియు పచ్చిరొట్ట ఎరువులు (జీలుగ, జనుము) కలియదున్నండి.`;
    phBadgeColor = "text-blue-800 bg-blue-50 border-blue-200";
  }

  // 3. Smart Irrigation Decision
  let irrigationActionEn = "";
  let irrigationActionTe = "";
  let irrigationUrgency = "Normal";

  if (rainForecast > 10) {
    irrigationActionEn = `Rainfall expected (${rainForecast} mm in 24h). Suspend all irrigation immediately. Ensure field drainage channels are clear to prevent water stagnation in ${soil.name}.`;
    irrigationActionTe = `రాబోయే 24 గంటల్లో వర్షం (${rainForecast} మి.మీ) సూచన ఉంది. నీటిపారుదలని వెంటనే నిలిపివేయండి. ${soil.nameTe}లో నీరు నిలవకుండా మురుగు కాల్వలను శుభ్రం చేయండి.`;
    irrigationUrgency = "Hold Irrigation";
  } else if (soilMoisture < 30) {
    if (soilType === "sandy") {
      irrigationActionEn = `Critical Dry Moisture (${soilMoisture}%) in Sandy Loam. Rapid percolation requires immediate drip irrigation for 45-60 mins today.`;
      irrigationActionTe = `ఇసుక నేలలో తేమ చాలా తగ్గింది (${soilMoisture}%). వెంటనే 45-60 నిమిషాలు డ్రిప్ ద్వారా నీరందించండి.`;
    } else {
      irrigationActionEn = `Low Soil Moisture (${soilMoisture}%). Initiate scheduled irrigation within 12 hours. Best time: early morning or late evening.`;
      irrigationActionTe = `నేలలో తేమ తక్కువగా ఉంది (${soilMoisture}%). రాబోయే 12 గంటల్లో ఉదయం లేదా సాయంత్రం వేళల్లో నీరు పెట్టండి.`;
    }
    irrigationUrgency = "Water Immediately";
  } else if (soilMoisture > 75) {
    irrigationActionEn = `Soil is saturated (${soilMoisture}%). Risk of root asphyxiation and collar rot in ${soil.name}. Do not irrigate for 3-4 days until moisture drops below 60%.`;
    irrigationActionTe = `నేలలో అధిక తేమ ఉంది (${soilMoisture}%). వేరుకుళ్లు, మొదలుకుళ్లు తెగులు వచ్చే ప్రమాదం ఉంది. 3-4 రోజుల పాటు నీరు పెట్టకండి.`;
    irrigationUrgency = "Over-Moist";
  } else {
    irrigationActionEn = `Optimal Moisture Band (${soilMoisture}%). Soil water availability is ideal for root uptake. Maintain routine irrigation cycles.`;
    irrigationActionTe = `నేల తేమ అనుకూలంగా ఉంది (${soilMoisture}%). మొక్కలకు సరిపడా నీరు అందుతోంది. సాధారణ పద్ధతిలో కొనసాగించండి.`;
    irrigationUrgency = "Optimal";
  }

  // 4. Environmental Disease Risk Outlook (24-72h)
  let riskScore = 0;
  const contributingFactorsEn = [];
  const contributingFactorsTe = [];

  if (humidity >= 80) {
    riskScore += 45;
    contributingFactorsEn.push(`Sustained high humidity (${humidity}%) creates rapid fungal spore germination conditions.`);
    contributingFactorsTe.push(`గాలిలో అధిక తేమ (${humidity}%) శిలీంధ్రాల వ్యాప్తికి కారణమవుతుంది.`);
  } else if (humidity >= 65) {
    riskScore += 20;
    contributingFactorsEn.push(`Moderate atmospheric humidity (${humidity}%).`);
    contributingFactorsTe.push(`గాలిలో మితమైన తేమ (${humidity}%).`);
  }

  if (temp >= 22 && temp <= 32) {
    riskScore += 30;
    contributingFactorsEn.push(`Warm temperature (${temp}°C) falls directly in the pathogen proliferation window.`);
    contributingFactorsTe.push(`ఉష్ణోగ్రత (${temp}°C) తెగుళ్లు వేగంగా పెరగడానికి అనుకూలంగా ఉంది.`);
  }

  if (rainForecast > 0) {
    riskScore += 25;
    contributingFactorsEn.push(`Incoming precipitation increases leaf surface wetness duration.`);
    contributingFactorsTe.push(`రాబోయే వర్షం ఆకులపై ఎక్కువ సమయం తేమను ఉంచుతుంది.`);
  }

  let riskLevelEn = "Low Risk";
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
