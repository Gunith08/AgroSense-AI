// AgroSense AI - Compact & Effective Gemini Multimodal Vision Diagnostics
// 100% Live Gemini Multimodal AI Generation: Disease + Why Occurred + How to Cure + How to Prevent

import { CROP_CATEGORIES } from '../data/plantDiseasesData.js';

const DEFAULT_KEY = ""; // Configure via frontend/.env as VITE_GEMINI_API_KEY

// Candidate models in order of priority (high-availability on free tier)
const CANDIDATE_MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3-flash-preview',
  'gemini-3.5-flash'
];

export function getStoredGeminiKey() {
  let stored = '';
  try {
    if (typeof localStorage !== 'undefined') {
      stored = localStorage.getItem('agrosense_gemini_api_key');
    }
  } catch (e) {}
  return stored || (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) || DEFAULT_KEY;
}

export function storeGeminiKey(key) {
  try {
    if (typeof localStorage !== 'undefined') {
      if (key && key.trim()) {
        localStorage.setItem('agrosense_gemini_api_key', key.trim());
      } else {
        localStorage.removeItem('agrosense_gemini_api_key');
      }
    }
  } catch (e) {}
}

/**
 * Fast client-side image downsampler (< 20ms)
 * Reduces payload from 10MB to ~60KB to ensure fast network upload
 */
export async function compressImageForFastAI(dataUrl, maxDim = 720, quality = 0.8) {
  if (!dataUrl || typeof window === 'undefined') return dataUrl;
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let w = img.width;
      let h = img.height;
      if (w <= maxDim && h <= maxDim && dataUrl.length < 250000) {
        resolve(dataUrl);
        return;
      }
      if (w > h) {
        h = Math.round((h * maxDim) / w);
        w = maxDim;
      } else {
        w = Math.round((w * maxDim) / h);
        h = maxDim;
      }
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

function parseDataUrl(dataUrl) {
  const matches = dataUrl.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
  if (matches && matches.length === 3) {
    return {
      mimeType: matches[1],
      base64Data: matches[2]
    };
  }
  return {
    mimeType: 'image/jpeg',
    base64Data: dataUrl
  };
}

/**
 * Live Multimodal AI Diagnosis from Gemini
 * Generates concise, highly effective 4-part report:
 * 1. Disease Name & Pathogen
 * 2. Why It Occurred (Etiology / Root Cause)
 * 3. How to Cure It (Exact ANGRAU/PJTSAU Chemical/Organic Dosage)
 * 4. How to Prevent It (Future Prevention & Practices)
 */
export async function analyzeLeafWithGemini({ dataUrl, selectedCropId = 'all', lang = 'en' }) {
  const apiKey = getStoredGeminiKey();
  if (!apiKey) {
    return {
      success: false,
      reason: 'NO_KEY',
      message: 'No Gemini API key available.'
    };
  }

  // Pre-compress image for fast transit
  const compressedDataUrl = await compressImageForFastAI(dataUrl, 720, 0.8);
  const { mimeType, base64Data } = parseDataUrl(compressedDataUrl);

  const selectedCropObj = CROP_CATEGORIES.find(c => c.id === selectedCropId);
  const cropHint = selectedCropId !== 'all' 
    ? `Target Crop: ${selectedCropObj?.nameEn || selectedCropId} (${selectedCropObj?.nameTe || ''}). Restrict diagnosis to this crop.`
    : `Identify crop species from foliage morphology.`;

  const systemPrompt = `You are a Senior Plant Pathologist at ANGRAU / PJTSAU.
${cropHint}

CRITICAL RULES:
1. HEALTHY LEAVES: If the leaf is fresh, green, and lacks distinct lesions/mildew/wilting, set isHealthy: true. State clearly that the foliage is healthy. Never invent diseases on healthy leaves.
2. CONCISE & ACTIONABLE: Do NOT write long essays. Provide compact, informative, high-impact bullet points.
3. 3-PART REPORT:
   - Why It Occurred: Exact cause (humidity, fungus, insect vector, soil moisture, or balanced health).
   - How to Cure It: Exact spray chemicals and dosage (g/L or ml/L) or organic care.
   - How to Prevent It: 2 clear cultural/field practices to prevent recurrence.
4. BILINGUAL: Output valid JSON in both English and clear natural Telugu (తెలుగు).`;

  const userPrompt = `Analyze this leaf photo. Respond strictly with valid JSON conforming to this schema without markdown fences:
{
  "isHealthy": boolean,
  "cropId": "paddy|chilli|cotton|groundnut|maize|tomato|redgram|turmeric|citrus|mango|other",
  "cropEn": "Crop Name",
  "cropTe": "పంట పేరు",
  "nameEn": "Disease Name or Healthy Foliage",
  "nameTe": "వ్యాధి లేదా ఆరోగ్యకరమైన ఆకు పేరు",
  "pathogen": "Scientific pathogen name or 'None (Healthy Vegetative State)'",
  "confidence": 96.5,
  "status": "Healthy Crop OR Infection Detected",
  "statusTe": "ఆరోగ్యకరమైన స్థితి OR తెగులు సోకింది",
  "whyOccurredEn": "Concise 1-2 sentences on why this happened (environmental trigger, pathogen, or good health)",
  "whyOccurredTe": "ఇది ఎందుకు సంభవించిందో 1-2 వాక్యాల వివరణ",
  "howToCureEn": "Direct curative chemical spray dosage (g/L or ml/L) & organic care",
  "howToCureTe": "తక్షణ నివారణ మందులు మరియు పిచికారీ మోతాదు",
  "howToPreventEn": "1-2 practical steps to prevent it from happening again",
  "howToPreventTe": "ఈ తెగులు మళ్లీ రాకుండా తీసుకోవలసిన 1-2 ముందస్తు జాగ్రత్తలు",
  "youtubeSearchQuery": "Telugu YouTube search query for treatment video"
}`;

  let lastError = null;

  // Generous time window per model (25s) so Gemini has full time to inspect and write
  for (const modelName of CANDIDATE_MODELS) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000); // 25-second generous time window

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { text: systemPrompt + "\n\n" + userPrompt },
                {
                  inline_data: {
                    mime_type: mimeType,
                    data: base64Data
                  }
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.1,
            max_output_tokens: 500, // Compact token budget for fast, punchy responses
            response_mime_type: "application/json"
          }
        })
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorJson = await response.json().catch(() => ({}));
        const errorMsg = errorJson?.error?.message || `HTTP ${response.status}`;
        console.warn(`[Gemini ${modelName}] error:`, errorMsg);
        lastError = errorMsg;
        continue;
      }

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) {
        lastError = "Empty response from Gemini";
        continue;
      }

      const parsed = JSON.parse(rawText.trim());

      const searchQuery = parsed.youtubeSearchQuery || `${parsed.cropEn} ${parsed.nameEn} treatment in telugu`;
      const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
      const annadataSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${parsed.cropEn} ${parsed.nameEn} annadata rythu nestham`)}`;

      const liveGeminiReport = {
        id: `gemini_live_${Date.now()}`,
        crop: (parsed.cropId || selectedCropId).toLowerCase(),
        cropEn: parsed.cropEn || "Crop",
        cropTe: parsed.cropTe || "పంట",
        nameEn: parsed.nameEn || (parsed.isHealthy ? "Healthy Foliage" : "Foliar Pathology"),
        nameTe: parsed.nameTe || (parsed.isHealthy ? "ఆరోగ్యకరమైన ఆకు" : "ఆకు తెగులు లక్షణం"),
        pathogen: parsed.pathogen || (parsed.isHealthy ? "None (Healthy Vegetative State)" : "Plant Pathogen"),
        confidence: typeof parsed.confidence === 'number' ? Math.round(parsed.confidence * 10) / 10 : 96.5,
        status: parsed.status || (parsed.isHealthy ? "Healthy Crop Condition" : "Infection Detected"),
        statusTe: parsed.statusTe || (parsed.isHealthy ? "ఆరోగ్యకరమైన స్థితి" : "తెగులు సోకింది"),
        
        // 3 Key Structured Pillars
        whyOccurredEn: parsed.whyOccurredEn || "Occurred due to environmental factors and pathogen presence.",
        whyOccurredTe: parsed.whyOccurredTe || "వాతావరణ పరిస్థితులు మరియు తెగులు వ్యాప్తి వల్ల సంభవించింది.",
        howToCureEn: parsed.howToCureEn || "Apply recommended university fungicides/bactericides.",
        howToCureTe: parsed.howToCureTe || "సిఫార్సు చేసిన మందులను తగిన మోతాదులో పిచికారీ చేయండి.",
        howToPreventEn: parsed.howToPreventEn || "Follow proper crop sanitation and field drainage.",
        howToPreventTe: parsed.howToPreventTe || "పొలాన్ని శుభ్రంగా ఉంచి నీరు నిలవకుండా మురుగు కాల్వలు తీయండి.",
        
        sampleImg: dataUrl,
        isHealthy: Boolean(parsed.isHealthy),
        isGeminiLiveGenerated: true,
        youtubeVideos: [
          {
            id: `gemini-yt-live-1`,
            titleEn: `${parsed.cropEn} ${parsed.nameEn} - Field Spray Guide`,
            titleTe: `${parsed.cropTe} లో ${parsed.nameTe} పై నిపుణుల సలహాలు (రైతు నేస్తం)`,
            channel: "Rythu Nestham",
            url: searchUrl,
            thumbnail: "https://images.unsplash.com/photo-1592417817098-8f3d6910985c?w=640&q=80"
          },
          {
            id: `gemini-yt-live-2`,
            titleEn: `ANGRAU / PJTSAU Treatment for ${parsed.cropEn}`,
            titleTe: `వ్యవసాయ నిపుణుల సిఫార్సులు మరియు వీడియో వివరాలు (అన్నదాత)`,
            channel: "Annadata Agriculture",
            url: annadataSearchUrl,
            thumbnail: "https://images.unsplash.com/photo-1598512752271-33f913a5af13?w=640&q=80"
          }
        ]
      };

      return {
        success: true,
        disease: liveGeminiReport,
        confidence: liveGeminiReport.confidence,
        modelUsed: modelName,
        engine: 'Gemini Live AI Vision'
      };

    } catch (err) {
      console.warn(`[Gemini ${modelName}] Exception:`, err.message);
      lastError = err.message;
    }
  }

  return {
    success: false,
    reason: 'FAILED',
    message: lastError || 'Google AI servers unavailable.'
  };
}
