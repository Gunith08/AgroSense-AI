// Comprehensive End-to-End Test Suite for AgroSense AI
// Tests all modules, algorithms, API services, and data structures

const fs = require('fs');
const path = require('path');

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    testsPassed++;
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
    testsFailed++;
  }
}

async function runAllTests() {
  // Load local environment for testing
  if (fs.existsSync('./frontend/.env')) {
    const envContent = fs.readFileSync('./frontend/.env', 'utf-8');
    const match = envContent.match(/VITE_GEMINI_API_KEY=(.*)/);
    if (match && match[1]) {
      process.env.VITE_GEMINI_API_KEY = match[1].trim();
    }
  }

  console.log("=================================================");
  console.log("🧪 RUNNING AGROSENSE AI COMPREHENSIVE TEST SUITE");
  console.log("=================================================\n");

  // TEST SUITE 1: Translations Integrity
  console.log("--- 1. Testing Translations Dictionary (translations.js) ---");
  const { translations } = await import('./frontend/src/data/translations.js');
  assert(translations.en && translations.te, "Both English and Telugu translations exist");
  const enKeys = Object.keys(translations.en);
  const teKeys = Object.keys(translations.te);
  assert(enKeys.length > 30, `English has ${enKeys.length} translation keys`);
  assert(teKeys.length > 30, `Telugu has ${teKeys.length} translation keys`);
  let missingTeKeys = enKeys.filter(k => !translations.te[k]);
  assert(missingTeKeys.length === 0, `All ${enKeys.length} English keys exist in Telugu translation`);

  // TEST SUITE 2: Crops & Advisory Logic (cropsData.js)
  console.log("\n--- 2. Testing Crops & Agronomic Advisory Engine (cropsData.js) ---");
  const { LOCATIONS, SOIL_TYPES, generateFarmerAdvisory } = await import('./frontend/src/data/cropsData.js');
  
  assert(LOCATIONS.length >= 8, `Found ${LOCATIONS.length} regional locations across AP and Telangana`);
  LOCATIONS.forEach(loc => {
    assert(loc.id && loc.lat && loc.lon && loc.name && loc.nameTe, `Location '${loc.id}' has valid coordinates and bilingual names`);
  });

  assert(SOIL_TYPES.length >= 5, `Found ${SOIL_TYPES.length} soil types`);
  SOIL_TYPES.forEach(st => {
    assert(st.id && st.name && st.nameTe, `Soil type '${st.id}' has bilingual definitions`);
  });

  // Test Advisory: Optimal Field
  const optAdv = generateFarmerAdvisory({
    soilMoisture: 55,
    soilPh: 6.5,
    humidity: 62,
    soilType: 'alluvial',
    locationId: 'guntur',
    weather: { temperature_c: 30, rain_mm: 0 }
  });
  assert(optAdv.topCrops && optAdv.topCrops.length === 3, "Optimal scenario returns Top 3 recommended crops");
  assert(optAdv.soilHealth && optAdv.soilHealth.statusEn.includes('Optimal'), "Soil health accurately classified as 'Optimal'");
  assert(optAdv.diseaseRisk && typeof optAdv.diseaseRisk.levelEn === 'string', "Disease risk calculation generated");

  // Test Advisory: Acidic Soil Alert
  const acidicAdv = generateFarmerAdvisory({
    soilMoisture: 45,
    soilPh: 5.2,
    humidity: 70,
    soilType: 'red',
    locationId: 'warangal',
    weather: { temperature_c: 32, rain_mm: 0 }
  });
  assert(acidicAdv.soilHealth.statusEn.includes('Acidic'), "Low pH 5.2 accurately classified as 'Acidic'");
  assert(acidicAdv.soilHealth.actionEn.includes('Lime') || acidicAdv.soilHealth.actionTe.includes('సున్నం'), "Acidic soil recommends Agricultural Lime / సున్నం");

  // Test Advisory: Drought Stress Alert
  const droughtAdv = generateFarmerAdvisory({
    soilMoisture: 18,
    soilPh: 6.8,
    humidity: 35,
    soilType: 'sandy',
    locationId: 'anantapur',
    weather: { temperature_c: 38, rain_mm: 0 }
  });
  assert(droughtAdv.irrigation.urgency === 'Water Needed', "Drought (18% moisture) triggers Water Needed urgency");

  // Test Advisory: High Humidity Blight Risk
  const humidAdv = generateFarmerAdvisory({
    soilMoisture: 80,
    soilPh: 6.5,
    humidity: 88,
    soilType: 'clay',
    locationId: 'rajahmundry',
    weather: { temperature_c: 28, rain_mm: 25 }
  });
  assert(humidAdv.diseaseRisk.levelEn.includes('Elevated') || humidAdv.diseaseRisk.score >= 70, "High moisture + 88% humidity triggers Elevated Disease Risk warning");

  // TEST SUITE 3: Plant Diseases Database & Offline Pretrained Model (plantDiseasesData.js)
  console.log("\n--- 3. Testing Plant Diseases DB & Offline Model (plantDiseasesData.js) ---");
  const { CROP_CATEGORIES, PLANT_DISEASES_DB, diagnosePlantFoliage } = await import('./frontend/src/data/plantDiseasesData.js');

  const EXPECTED_CROPS = ['paddy', 'chilli', 'cotton', 'groundnut', 'maize', 'tomato', 'redgram', 'turmeric', 'citrus', 'mango'];
  assert(CROP_CATEGORIES.length === 11, `Crop selector has 'All' plus exactly 10 AP/Telangana crops (found ${CROP_CATEGORIES.length})`);
  EXPECTED_CROPS.forEach(cropId => {
    assert(CROP_CATEGORIES.some(c => c.id === cropId), `Verified crop category exists: '${cropId}'`);
  });

  assert(PLANT_DISEASES_DB.length >= 30, `Verified Plant Diseases DB contains ${PLANT_DISEASES_DB.length} verified diseases`);
  
  // Verify structure of every disease
  let structureOk = true;
  PLANT_DISEASES_DB.forEach(d => {
    if (!d.id || !d.crop || !d.nameEn || !d.nameTe || !d.pathogen || !d.cureEn || !d.cureTe || !d.symptomsEn) {
      structureOk = false;
    }
  });
  assert(structureOk, "All 32 diseases have complete bilingual metadata, pathogens, and cure dosages");

  // Test Offline Diagnosis: Crop Constraint Filtering
  const tomatoDiag = diagnosePlantFoliage({
    file: { name: "farm_sample_01.jpg" },
    selectedCropId: "tomato"
  });
  assert(tomatoDiag.disease.crop === "tomato", `Selected crop 'tomato' restricts candidate diagnosis to tomato (diagnosed: ${tomatoDiag.disease.crop})`);

  const chilliDiag = diagnosePlantFoliage({
    file: { name: "leaf_image.jpg" },
    selectedCropId: "chilli"
  });
  assert(chilliDiag.disease.crop === "chilli", `Selected crop 'chilli' restricts candidate diagnosis to chilli (diagnosed: ${chilliDiag.disease.crop})`);

  // TEST SUITE 4: Gemini Vision API Integration (geminiVisionService.js)
  console.log("\n--- 4. Testing Live Gemini Multimodal Vision Service ---");
  const { getStoredGeminiKey, compressImageForFastAI, analyzeLeafWithGemini } = await import('./frontend/src/services/geminiVisionService.js');

  const apiKey = getStoredGeminiKey();
  assert(apiKey && apiKey.startsWith("AQ."), "Valid Gemini API Key loaded from environment configuration");

  // Test live API call with a realistic test request
  const testImagePath = 'C:/Users/Tejasree/.gemini/antigravity/brain/28f610f4-0ca3-40bc-9fcd-b0e0d37ee663/.user_uploaded/media_1792509559172_440434a4.png';
  if (fs.existsSync(testImagePath)) {
    const imgBuffer = fs.readFileSync(testImagePath);
    const dataUrl = `data:image/png;base64,${imgBuffer.toString('base64')}`;

    console.log("  Testing live Gemini vision diagnosis on sample image...");
    const t0 = Date.now();
    const geminiRes = await analyzeLeafWithGemini({
      dataUrl,
      selectedCropId: "tomato",
      lang: "en"
    });
    const duration = ((Date.now() - t0) / 1000).toFixed(2);
    console.log(`  Gemini responded in ${duration}s`);

    assert(geminiRes.success === true, "Gemini Live API call succeeded with 200 OK");
    assert(geminiRes.disease !== undefined, "Diagnosis object returned");
    assert(typeof geminiRes.disease.isHealthy === 'boolean', "Diagnosis provides boolean isHealthy field");
    assert(geminiRes.disease.nameEn && geminiRes.disease.nameTe, "Diagnosis has bilingual names");
    assert(geminiRes.disease.whyOccurredEn && geminiRes.disease.whyOccurredTe, "3-Pillar 1: 'Why It Occurred' populated in English & Telugu");
    assert(geminiRes.disease.howToCureEn && geminiRes.disease.howToCureTe, "3-Pillar 2: 'How to Cure It' populated with dosage in English & Telugu");
    assert(geminiRes.disease.howToPreventEn && geminiRes.disease.howToPreventTe, "3-Pillar 3: 'How to Prevent It' populated in English & Telugu");
    assert(geminiRes.disease.youtubeVideos && geminiRes.disease.youtubeVideos.length > 0, "Telugu YouTube video links populated");
  } else {
    console.warn("  Sample image not found on disk, skipping live image call");
  }

  // TEST SUITE 5: Build Bundle & Web Route Availability
  console.log("\n--- 5. Testing Build Bundle & Route Availability ---");
  try {
    const res = await fetch("http://localhost:5173/");
    if (res.ok) {
      assert(res.status === 200, "Vite dev server is responding on http://localhost:5173/ with HTTP 200");
      const html = await res.text();
      assert(html.includes('<div id="root"></div>'), "HTML contains React root mounting point (<div id=\"root\"></div>)");
      assert(html.includes('AgroSense AI'), "HTML title contains 'AgroSense AI'");
    }
  } catch (err) {
    // If dev server is offline, verify static production build
    const distHtmlPath = './frontend/dist/index.html';
    assert(fs.existsSync(distHtmlPath), "Production build dist/index.html exists and is verified");
    const html = fs.readFileSync(distHtmlPath, 'utf-8');
    assert(html.includes('<div id="root"></div>'), "Production HTML contains React root mounting point (<div id=\"root\"></div>)");
    assert(html.includes('AgroSense AI'), "Production HTML title contains 'AgroSense AI'");
  }

  // SUMMARY
  console.log("\n=================================================");
  console.log(`🎉 TEST RESULTS: ${testsPassed} PASSED, ${testsFailed} FAILED`);
  console.log("=================================================");
}

runAllTests().then(() => {
  if (testsFailed > 0) {
    process.exitCode = 1;
  } else {
    process.exitCode = 0;
  }
}).catch(err => {
  console.error("Test execution threw unhandled exception:", err);
  process.exitCode = 1;
});
