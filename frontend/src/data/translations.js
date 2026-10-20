export const translations = {
  en: {
    // Brand & Header
    brandName: "AgroSense AI",
    brandTagline: "Precision Agriculture & Smart Decision Support System",
    platformBadge: "Smart Farming System",
    simulationBadge: "IoT System Active",
    languageSwitch: "తెలుగు",

    // Navigation
    navOverview: "IoT Field Station",
    navAdvisory: "Farmer Advisory",
    navLeafAi: "Leaf Disease AI",
    navPipeline: "Data Pipeline",

    // Device Station
    deviceStationTitle: "Virtual IoT Field Telemetry Station",
    deviceStationSubtitle: "Interactive agricultural monitoring unit with real-time sensor telemetry and environmental tracking.",
    
    // Node 1: Soil Probe
    soilNodeTitle: "AgroProbe 7-in-1 Soil Multi-Sensor",
    soilNodeModel: "Hardware: RS485-IP68 Industrial Grade",
    soilNodeStatus: "PROBE LIVE",
    soilMoistureLabel: "Soil Moisture Content",
    soilMoistureUnit: "% Volumetric",
    soilMoistureDesc: "Active root-zone moisture level",
    soilPhLabel: "Soil Acidity / Alkalinity (pH)",
    soilPhUnit: "pH Scale",
    soilPhDesc: "Soil solution chemical balance",
    
    // Quick Presets
    presetDry: "Drought (18%)",
    presetOptimalMoisture: "Optimal (55%)",
    presetWet: "Saturated (85%)",
    presetAcidic: "Acidic (5.2)",
    presetOptimalPh: "Optimal (6.5)",
    presetAlkaline: "Alkaline (8.2)",

    // Node 2: Weather Station
    weatherNodeTitle: "AgroWeather Micro-Climate Station",
    weatherNodeModel: "Hardware: Solar Wireless Field Mast",
    weatherNodeStatus: "SYNCED",
    humidityLabel: "Relative Humidity",
    humidityUnit: "% RH",
    humidityDesc: "Atmospheric moisture saturation",
    tempLabel: "Air Temperature",
    tempUnit: "°C",
    rainfallLabel: "Forecast Rain (24h)",
    rainfallUnit: "mm",
    presetLowHumidity: "Dry Air (35%)",
    presetModerateHumidity: "Moderate (65%)",
    presetHighHumidity: "High Risk (88%)",

    // Farm Parameters
    soilTypeLabel: "Soil Type Classification",
    locationLabel: "Farm Field Region",
    transmitButton: "Analyze Telemetry & Generate Advisory",
    transmitting: "Analyzing with Agricultural Intelligence...",
    lastUpdated: "Last Synced",

    // Soil Types
    soilBlack: "Black Cotton Soil (Deep clay, high water retention)",
    soilRed: "Red Soil (Porous, well-draining loam)",
    soilAlluvial: "Alluvial Soil (Highly fertile delta soil)",
    soilSandy: "Sandy Loam (Quick drainage, warm soil)",
    soilClay: "Clayey Soil (Heavy moisture-dense soil)",

    // Advisory Section
    advisoryHeader: "Farmer Decision & Field Action Report",
    advisorySubheader: "Actionable, evidence-backed recommendations grounded in your live IoT measurements and regional climate.",
    
    suitableCropsTitle: "Top Recommended Crops to Cultivate",
    suitableCropsDesc: "Ranked by biological compatibility with your current soil pH, soil type, and climate.",
    soilHealthTitle: "Soil Chemistry & pH Corrective Measures",
    irrigationTitle: "Smart Irrigation & Water Schedule",
    diseaseRiskTitle: "24-72h Environmental Disease Risk Outlook",

    // Cautionary Note
    cautionTitle: "Important Advisory Caution",
    cautionText: "Please exercise careful judgment with your field decisions. These AI recommendations are based on simulated telemetry and regional trends. Always confirm with your local agricultural officer or soil testing laboratory before undertaking major financial or chemical applications.",
    
    // Disease Vision Section
    leafAiTitle: "Crop Leaf Disease Diagnosis & Cure",
    leafAiSubtitle: "Computer vision analysis to identify plant leaf symptoms with practical cures and Telugu video guides.",
    uploadPrompt: "Drop leaf image here or click to browse",
    uploadHelp: "Supported formats: JPG, PNG, WEBP (Max 10MB)",
    orSelectSample: "Or select a sample crop leaf for instant testing:",
    analyzingImage: "Analyzing Leaf Symptoms with AI...",
    diagnosisResult: "Diagnostic Assessment",
    confidence: "Model Confidence",
    symptomsTitle: "Observed Symptoms",
    precautionsTitle: "Immediate Precautionary Measures",
    cureTitle: "Field Cure & Practical Treatment",
    teluguVideosTitle: "Recommended Video Guides (Telugu)",
    watchOnYoutube: "Watch Full Video on YouTube",

    // Sample Leaf Names
    sampleHealthy: "Healthy Leaf",
    sampleEarlyBlight: "Early Blight",
    sampleLateBlight: "Late Blight",
    sampleLeafMold: "Leaf Mold",
    sampleBacterialSpot: "Bacterial Spot",

    // Telemetry Inspector
    telemetryTitle: "Live Data Pipeline & Telemetry Verification",
    telemetrySubtitle: "Real-time verification of incoming IoT sensor packets, validation checks, and database persistence.",
    rawMqttPayload: "Raw Telemetry Packet (Topic: agrosense/v1/farm/demo-01/telemetry)",
    dataPipelineFlow: "Automated Data Processing Pipeline",
    statusValid: "PASSED: Within plausible physical range",
    statusTimestamped: "PASSED: Calibrated UTC timestamp logged",
    statusDeduplicated: "PASSED: Deduplication hash verified",
    
    // Status Badges
    badgeSimulation: "LIVE SIMULATION",
    badgeOfflineReady: "OFFLINE READY",

    // Common
    viewDetails: "View Details",
    refreshWeather: "Refresh Weather",
    suitability: "Suitability",
    daysToMaturity: "Maturity",
    waterNeed: "Water Need",
  },

  te: {
    // Brand & Header
    brandName: "ఆగ్రోసెన్స్ AI (AgroSense AI)",
    brandTagline: "రైతులకు ఖచ్చితమైన వ్యవసాయ సలహా & నిర్ణయ వ్యవస్థ",
    platformBadge: "స్మార్ట్ వ్యవసాయ వేదిక",
    simulationBadge: "IoT వ్యవస్థ యాక్టివ్",
    languageSwitch: "English",

    // Navigation
    navOverview: "IoT పొలం సెన్సార్లు",
    navAdvisory: "రైతు సలహా పత్రం",
    navLeafAi: "ఆకు తెగులు AI",
    navPipeline: "డేటా పైప్‌లైన్",

    // Device Station
    deviceStationTitle: "వర్చువల్ IoT ఫీల్డ్ సెన్సార్ కేంద్రం",
    deviceStationSubtitle: "నిజమైన పొలంలో అమర్చినట్లుగా పనిచేసే ఇంటరాక్టివ్ IoT సెన్సార్లు మరియు వాతావరణ సమాచారం.",
    
    // Node 1: Soil Probe
    soilNodeTitle: "ఆగ్రోప్రోబ్ 7-ఇన్-1 భూసార సెన్సార్",
    soilNodeModel: "హార్డ్‌వేర్: RS485-IP68 ఇండస్ట్రియల్ గ్రేడ్",
    soilNodeStatus: "సెన్సార్ లైవ్",
    soilMoistureLabel: "నేలలో తేమ శాతం (Soil Moisture)",
    soilMoistureUnit: "% తేమ",
    soilMoistureDesc: "వేర్ల వద్ద నేల తేమ నిల్వ సామర్థ్యం",
    soilPhLabel: "నేల ఆమ్లత / క్షారత (Soil pH)",
    soilPhUnit: "pH స్కేలు",
    soilPhDesc: "నేల సారవంతం మరియు ఆమ్ల-క్షార సమతుల్యత",
    
    // Quick Presets
    presetDry: "కరువు / పొడి నేల (18%)",
    presetOptimalMoisture: "అనుకూల తేమ (55%)",
    presetWet: "అధిక తేమ (85%)",
    presetAcidic: "ఆమ్ల నేల (5.2)",
    presetOptimalPh: "మంచి సారం (6.5)",
    presetAlkaline: "క్షార నేల (8.2)",

    // Node 2: Weather Station
    weatherNodeTitle: "ఆగ్రోవెదర్ మైక్రో-క్లైమేట్ స్టేషన్",
    weatherNodeModel: "హార్డ్‌వేర్: సోలార్ వైర్‌లెస్ ఫీల్డ్ మాస్ట్",
    weatherNodeStatus: "సింక్ అయింది",
    humidityLabel: "గాలిలో తేమ (Humidity)",
    humidityUnit: "% RH",
    humidityDesc: "వాతావరణంలోని నీటి ఆవిరి శాతం",
    tempLabel: "ఉష్ణోగ్రత (Temperature)",
    tempUnit: "°C",
    rainfallLabel: "వర్షపాత అంచనా (24 గంటలు)",
    rainfallUnit: "మి.మీ (mm)",
    presetLowHumidity: "పొడి గాలి (35%)",
    presetModerateHumidity: "సాధారణం (65%)",
    presetHighHumidity: "తెగుళ్ల ముప్పు (88%)",

    // Farm Parameters
    soilTypeLabel: "పొలంలోని నేల రకం",
    locationLabel: "పొలం ఉన్న ప్రాంతం / జిల్లా",
    transmitButton: "సెన్సార్ డేటా విశ్లేషించి రైతు సలహాను పొందండి",
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
    advisorySubheader: "మీ పొలం IoT కొలతలు మరియు వాతావరణాన్ని బట్టి రూపొందించిన విశ్వసనీయ వ్యవసాయ సలహాలు.",
    
    suitableCropsTitle: "పండించడానికి అత్యంత అనువైన పంటలు",
    suitableCropsDesc: "ప్రస్తుత నేల pH, నేల రకం మరియు వాతావరణానికి సరిపోయే ఉత్తమ పంటలు.",
    soilHealthTitle: "భూసార సంరక్షణ & pH సరిదిద్దే పద్ధతులు",
    irrigationTitle: "స్మార్ట్ నీటిపారుదల షెడ్యూల్",
    diseaseRiskTitle: "రాబోయే 24-72 గంటల్లో వాతావరణ తెగుళ్ల ముప్పు",

    // Cautionary Note
    cautionTitle: "రైతులకు ముఖ్యమైన జాగ్రత్త సూచన",
    cautionText: "పంట నిర్ణయాలు తీసుకునేటప్పుడు జాగ్రత్త వహించండి. ఈ సిఫార్సులు సిమ్యులేషన్ కొలతలు మరియు వాతావరణ ఆధారంగా రూపొందించిన AI మార్గదర్శకాలు మాత్రమే. పెద్ద ఎత్తున మందులు లేదా ఖర్చులు పెట్టే ముందు స్థానిక వ్యవసాయ అధికారి లేదా కృషి విజ్ఞాన కేంద్రాన్ని (KVK) సంప్రదించండి.",
    
    // Disease Vision Section
    leafAiTitle: "ఆకు తెగుళ్ల గుర్తింపు & నివారణ",
    leafAiSubtitle: "ఆకు ఫోటో ద్వారా తెగులును గుర్తించి, సేంద్రీయ నివారణ మరియు తెలుగు వీడియో మార్గదర్శకాలను అందించే వ్యవస్థ.",
    uploadPrompt: "పంట ఆకు ఫోటోను ఇక్కడ అప్‌లోడ్ చేయండి",
    uploadHelp: "మద్దతు గల ఫార్మాట్లు: JPG, PNG, WEBP (గరిష్టంగా 10MB)",
    orSelectSample: "లేదా వెంటనే పరీక్షించడానికి సిద్ధంగా ఉన్న నమూనా ఆకును ఎంచుకోండి:",
    analyzingImage: "AI ద్వారా ఆకు లక్షణాలను విశ్లేషిస్తోంది...",
    diagnosisResult: "తెగులు నిర్ధారణ ఫలితం",
    confidence: "విశ్వసనీయత శాతం",
    symptomsTitle: "కనిపిస్తున్న లక్షణాలు",
    precautionsTitle: "రైతు తీసుకోవలసిన ముందస్తు జాగ్రత్తలు",
    cureTitle: "పొలంలో నివారణ చర్యలు & చికిత్స",
    teluguVideosTitle: "సంబంధిత తెలుగు వీడియో సలహాలు",
    watchOnYoutube: "యూట్యూబ్‌లో పూర్తి వీడియో చూడండి",

    // Sample Leaf Names
    sampleHealthy: "ఆరోగ్యకరమైన ఆకు",
    sampleEarlyBlight: "ముందస్తు ఆకుమచ్చ తెగులు",
    sampleLateBlight: "ఆలస్యపు ఆకుమచ్చ తెగులు",
    sampleLeafMold: "ఆకు బూడిద / శిలీంధ్ర తెగులు",
    sampleBacterialSpot: "బాక్టీరియల్ మచ్చల తెగులు",

    // Telemetry Inspector
    telemetryTitle: "ప్రత్యక్ష డేటా పైప్‌లైన్ & నాణ్యత ధృవీకరణ",
    telemetrySubtitle: "వర్చువల్ సెన్సార్ నుండి డేటాబేస్ వరకు డేటా ప్రవాహాన్ని గమనించండి.",
    rawMqttPayload: "ముడి టెలిమెట్రీ ప్యాకెట్ (Topic: agrosense/v1/farm/demo-01/telemetry)",
    dataPipelineFlow: "డేటా ప్రాసెసింగ్ స్థితి",
    statusValid: "సరిచూడబడింది: వ్యవసాయ పరిమితులకు లోబడి ఉంది",
    statusTimestamped: "సరిచూడబడింది: సమయ నమోదు (UTC) నమోదైంది",
    statusDeduplicated: "సరిచూడబడింది: డూప్లికేట్ డేటా తొలగించబడింది",

    // Status Badges
    badgeSimulation: "లైవ్ సిమ్యులేషన్",
    badgeOfflineReady: "ఆఫ్‌లైన్ సిద్ధం",

    // Common
    viewDetails: "వివరాలు చూడండి",
    refreshWeather: "వాతావరణాన్ని రిఫ్రెష్ చేయండి",
    suitability: "అనుకూలత",
    daysToMaturity: "పంట కాలం",
    waterNeed: "నీటి అవసరం",
  }
};
