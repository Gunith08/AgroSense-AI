export const translations = {
  en: {
    // Brand & Header
    brandName: "AgroSense AI",
    brandTagline: "Smart Agriculture Decision Support & IoT Advisory",
    workshopBadge: "FDP Workshop Demo",
    simulationBadge: "SIMULATION ENGINE ACTIVE",
    languageSwitch: "తెలుగు",

    // Navigation
    navOverview: "IoT Field Station",
    navAdvisory: "Farmer Advisory",
    navLeafAi: "Leaf Disease AI",
    navPipeline: "Telemetry Inspector",
    navGuide: "30-Min Workshop Guide",

    // Device Station
    deviceStationTitle: "Virtual IoT Field Telemetry Station",
    deviceStationSubtitle: "Interactive simulation representing real-world agricultural IoT nodes with live data ingestion.",
    
    // Node 1: Soil Probe
    soilNodeTitle: "AgroProbe 7-in-1 Soil Multi-Sensor",
    soilNodeModel: "Model: RS485-IP68 Industrial",
    soilNodeStatus: "PROBE ONLINE",
    soilMoistureLabel: "Soil Moisture",
    soilMoistureUnit: "% Volumetric",
    soilMoistureDesc: "Root zone volumetric water content",
    soilPhLabel: "Soil Acidity (pH)",
    soilPhUnit: "pH Scale",
    soilPhDesc: "Soil solution hydrogen ion concentration",
    
    // Quick Presets
    presetDry: "Drought (18%)",
    presetOptimalMoisture: "Optimal (55%)",
    presetWet: "Saturated (85%)",
    presetAcidic: "Acidic (5.2)",
    presetOptimalPh: "Optimal (6.5)",
    presetAlkaline: "Alkaline (8.2)",

    // Node 2: Weather Station
    weatherNodeTitle: "AgroWeather Micro-Climate Node",
    weatherNodeModel: "Model: Solar-LoRaWAN Field Mast",
    weatherNodeStatus: "TRANSMITTING",
    humidityLabel: "Relative Humidity",
    humidityUnit: "% RH",
    humidityDesc: "Ambient air water vapor saturation",
    tempLabel: "Air Temperature",
    tempUnit: "°C",
    rainfallLabel: "Forecast Rainfall (24h)",
    rainfallUnit: "mm",
    presetLowHumidity: "Dry Air (35%)",
    presetModerateHumidity: "Moderate (65%)",
    presetHighHumidity: "High Risk (88%)",

    // Farm Parameters
    soilTypeLabel: "Soil Type Classification",
    locationLabel: "Farm Field Location",
    transmitButton: "Analyze & Generate Farmer Advisory",
    transmitting: "Processing Telemetry with AI...",
    lastUpdated: "Last Synced",

    // Soil Types
    soilBlack: "Black Cotton Soil (Regur - High water retention)",
    soilRed: "Red Soil (Porous, well-draining)",
    soilAlluvial: "Alluvial Soil (Fertile silt-loam delta soil)",
    soilSandy: "Sandy Loam (Quick drainage, warm soil)",
    soilClay: "Clayey Soil (Heavy, moisture-dense)",

    // Advisory Section
    advisoryHeader: "Farmer Decision & Action Report",
    advisorySubheader: "Actionable, evidence-backed recommendations grounded in your live IoT telemetry and location climate.",
    
    suitableCropsTitle: "Recommended Crops to Cultivate",
    suitableCropsDesc: "Ranked by compatibility with your current soil pH, soil type, and regional climate.",
    soilHealthTitle: "Soil Chemistry & pH Corrective Measures",
    irrigationTitle: "Smart Irrigation & Water Schedule",
    diseaseRiskTitle: "24-72h Environmental Disease Risk Outlook",
    
    // Disease Vision Section
    leafAiTitle: "Leaf Disease Detection & Treatment AI",
    leafAiSubtitle: "Pretrained vision model for leaf symptom classification with organic/chemical cures and Telugu video guides.",
    uploadPrompt: "Drop crop leaf image here or click to browse",
    uploadHelp: "Supported formats: JPG, PNG, WEBP (Max 10MB)",
    orSelectSample: "Or select a real field sample for quick demonstration:",
    analyzingImage: "Running Pretrained Vision Model...",
    diagnosisResult: "Diagnostic Assessment",
    confidence: "Model Confidence",
    symptomsTitle: "Observed Symptoms",
    precautionsTitle: "Immediate Precautionary Measures",
    cureTitle: "Field Cure & Agronomic Treatment",
    teluguVideosTitle: "Related YouTube Video Guides (Telugu Only)",
    watchOnYoutube: "Watch Video Guide",

    // Sample Leaf Names
    sampleHealthy: "Healthy Leaf",
    sampleEarlyBlight: "Early Blight",
    sampleLateBlight: "Late Blight",
    sampleLeafMold: "Leaf Mold",
    sampleBacterialSpot: "Bacterial Spot",

    // Telemetry Inspector
    telemetryTitle: "Live MQTT Ingestion & Data Provenance",
    telemetrySubtitle: "Verify the end-to-end data pipeline from virtual sensor packet to database.",
    rawMqttPayload: "Raw MQTT Packet (Topic: agrosense/v1/farm/demo-01/telemetry)",
    dataPipelineFlow: "Data Pipeline Verification",
    statusValid: "PASSED: In plausible agronomic range",
    statusTimestamped: "PASSED: Synchronized UTC timestamp",
    statusDeduplicated: "PASSED: Sequence hash validated",
    
    // Status Badges
    badgeSimulation: "SIMULATION ONLY",
    badgeOfflineReady: "100% OFFLINE READY",
    badgeAiModel: "PRETRAINED MODEL",

    // Common
    viewDetails: "View Details",
    refreshWeather: "Refresh Live Weather",
    suitability: "Suitability",
    daysToMaturity: "Maturity",
    waterNeed: "Water Need",
  },

  te: {
    // Brand & Header
    brandName: "ఆగ్రోసెన్స్ AI (AgroSense AI)",
    brandTagline: "రైతులకు స్మార్ట్ వ్యవసాయ సలహా & IoT నిర్ణయ వ్యవస్థ",
    workshopBadge: "FDP వర్క్‌షాప్ డెమో",
    simulationBadge: "సిమ్యులేషన్ ఇంజిన్ సిద్ధంగా ఉంది",
    languageSwitch: "English",

    // Navigation
    navOverview: "IoT పొలం సెన్సార్లు",
    navAdvisory: "రైతు సలహా పత్రం",
    navLeafAi: "ఆకు తెగులు AI",
    navPipeline: "డేటా పైప్‌లైన్",
    navGuide: "30-నిమిషాల గైడ్",

    // Device Station
    deviceStationTitle: "వర్చువల్ IoT ఫీల్డ్ సెన్సార్ కేంద్రం",
    deviceStationSubtitle: "పొలంలో నిజమైన IoT పరికరాలు పనిచేస్తున్న అనుభూతిని కలిగించే ప్రత్యక్ష సిమ్యులేషన్ వ్యవస్థ.",
    
    // Node 1: Soil Probe
    soilNodeTitle: "ఆగ్రోప్రోబ్ 7-ఇన్-1 భూసార సెన్సార్",
    soilNodeModel: "మోడల్: RS485-IP68 ఇండస్ట్రియల్",
    soilNodeStatus: "సెన్సార్ ఆన్‌లైన్",
    soilMoistureLabel: "నేలలో తేమ శాతం (Soil Moisture)",
    soilMoistureUnit: "% తేమ",
    soilMoistureDesc: "వేర్ల వద్ద నేల తేమ నిల్వ సామర్థ్యం",
    soilPhLabel: "నేల ఆమ్లత / క్షారత (Soil pH)",
    soilPhUnit: "pH స్కేలు",
    soilPhDesc: "నేల సారవంతం మరియు ఆమ్ల-క్షార సమతుల్యత",
    
    // Quick Presets
    presetDry: "కరువు / పొడి నేల (18%)",
    presetOptimalMoisture: "అనుకూల తేమ (55%)",
    presetWet: "ఎక్కువ నీరు (85%)",
    presetAcidic: "ఆమ్ల నేల (5.2)",
    presetOptimalPh: "మంచి సారం (6.5)",
    presetAlkaline: "క్షార నేల (8.2)",

    // Node 2: Weather Station
    weatherNodeTitle: "ఆగ్రోవెదర్ మైక్రో-క్లైమేట్ కేంద్రం",
    weatherNodeModel: "మోడల్: సోలార్-LoRaWAN ఫీల్డ్ మాస్ట్",
    weatherNodeStatus: "సిగ్నల్ యాక్టివ్",
    humidityLabel: "గాలిలో తేమ (Humidity)",
    humidityUnit: "% RH",
    humidityDesc: "వాతావరణంలోని నీటి ఆవిరి శాతం",
    tempLabel: "ఉష్ణోగ్రత (Temperature)",
    tempUnit: "°C",
    rainfallLabel: "వర్షపాత అంచనా (24 గంటలు)",
    rainfallUnit: "మి.మీ (mm)",
    presetLowHumidity: "పొడి వాతావరణం (35%)",
    presetModerateHumidity: "సాధారణం (65%)",
    presetHighHumidity: "తెగుళ్ల ముప్పు (88%)",

    // Farm Parameters
    soilTypeLabel: "పొలంలోని నేల రకం",
    locationLabel: "పొలం ఉన్న ప్రాంతం / జిల్లా",
    transmitButton: "విశ్లేషించి రైతు సలహాను పొందండి",
    transmitting: "AI ద్వారా విశ్లేషిస్తోంది...",
    lastUpdated: "చివరి అప్‌డేట్",

    // Soil Types
    soilBlack: "నల్లరేగడి నేల (నీటిని నిల్వ ఉంచే అధిక సామర్థ్యం)",
    soilRed: "ఎర్ర నేల (నీరు నిలవని అనుకూల నేల)",
    soilAlluvial: "వరి / ఒండ్రు నేల (డెల్టా సారవంతమైన నేల)",
    soilSandy: "ఇసుక రేగడి నేల (వేగంగా నీరు ఇంకే నేల)",
    soilClay: "బంకమట్టి నేల (భారీ తేమ నిల్వ నేల)",

    // Advisory Section
    advisoryHeader: "రైతు నిర్ణయ & కార్యాచరణ నివేదిక",
    advisorySubheader: "మీ పొలం IoT కొలతలు మరియు వాతావరణాన్ని బట్టి AI రూపొందించిన విశ్వసనీయ వ్యవసాయ సలహాలు.",
    
    suitableCropsTitle: "పండించడానికి అత్యంత అనువైన పంటలు",
    suitableCropsDesc: "ప్రస్తుత నేల pH, నేల రకం మరియు వాతావరణానికి సరిపోయే ఉత్తమ పంటలు.",
    soilHealthTitle: "భూసార సంరక్షణ & pH సరిదిద్దే పద్ధతులు",
    irrigationTitle: "స్మార్ట్ నీటిపారుదల షెడ్యూల్",
    diseaseRiskTitle: "రాబోయే 24-72 గంటల్లో వాతావరణ తెగుళ్ల ముప్పు",
    
    // Disease Vision Section
    leafAiTitle: "ఆకు తెగుళ్ల గుర్తింపు & నివారణ AI",
    leafAiSubtitle: "ఆకు ఫోటో ద్వారా తెగులును గుర్తించి, సేంద్రీయ నివారణ మరియు తెలుగు వీడియో మార్గదర్శకాలను అందించే మోడల్.",
    uploadPrompt: "పంట ఆకు ఫోటోను ఇక్కడ అప్‌లోడ్ చేయండి",
    uploadHelp: "మద్దతు గల ఫార్మాట్లు: JPG, PNG, WEBP (గరిష్టంగా 10MB)",
    orSelectSample: "లేదా వెంటనే పరీక్షించడానికి సిద్ధంగా ఉన్న నమూనా ఆకును ఎంచుకోండి:",
    analyzingImage: "AI మోడల్ ద్వారా విశ్లేషిస్తోంది...",
    diagnosisResult: "తెగులు నిర్ధారణ ఫలితం",
    confidence: "విశ్వసనీయత శాతం",
    symptomsTitle: "కనిపిస్తున్న లక్షణాలు",
    precautionsTitle: "రైతు తీసుకోవలసిన ముందస్తు జాగ్రత్తలు",
    cureTitle: "పొలంలో నివారణ చర్యలు & చికిత్స",
    teluguVideosTitle: "సంబంధిత తెలుగు వీడియో సలహాలు (Telugu Only)",
    watchOnYoutube: "యూట్యూబ్‌లో వీడియో చూడండి",

    // Sample Leaf Names
    sampleHealthy: "ఆరోగ్యకరమైన ఆకు",
    sampleEarlyBlight: "ముందస్తు ఆకుమచ్చ తెగులు",
    sampleLateBlight: "ఆలస్యపు ఆకుమచ్చ తెగులు",
    sampleLeafMold: "ఆకు బూడిద / శిలీంధ్ర తెగులు",
    sampleBacterialSpot: "బాక్టీరియల్ మచ్చల తెగులు",

    // Telemetry Inspector
    telemetryTitle: "ప్రత్యక్ష MQTT డేటా & నాణ్యత ధృవీకరణ",
    telemetrySubtitle: "వర్చువల్ సెన్సార్ నుండి డేటాబేస్ వరకు డేటా ప్రవాహాన్ని గమనించండి.",
    rawMqttPayload: "ముడి MQTT ప్యాకెట్ (Topic: agrosense/v1/farm/demo-01/telemetry)",
    dataPipelineFlow: "డేటా ప్రాసెసింగ్ స్థితి",
    statusValid: "సరిచూడబడింది: వ్యవసాయ పరిమితులకు లోబడి ఉంది",
    statusTimestamped: "సరిచూడబడింది: సమయ నమోదు (UTC) నమోదైంది",
    statusDeduplicated: "సరిచూడబడింది: డూప్లికేట్ డేటా తొలగించబడింది",

    // Status Badges
    badgeSimulation: "సిమ్యులేషన్ మాత్రమే",
    badgeOfflineReady: "100% ఆఫ్‌లైన్ పనిచేస్తుంది",
    badgeAiModel: "ప్రీ-ట్రైన్డ్ AI మోడల్",

    // Common
    viewDetails: "వివరాలు చూడండి",
    refreshWeather: "వాతావరణాన్ని రిఫ్రెష్ చేయండి",
    suitability: "అనుకూలత",
    daysToMaturity: "పంట కాలం",
    waterNeed: "నీటి అవసరం",
  }
};
