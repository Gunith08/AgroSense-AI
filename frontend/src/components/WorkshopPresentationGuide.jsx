import React from 'react';
import { BookOpen, Clock, HeartPulse, CheckCircle2, Lightbulb, Users, Award } from 'lucide-react';

export default function WorkshopPresentationGuide({ lang }) {
  const isTe = lang === 'te';

  const schedule = [
    {
      time: "00 – 05 min",
      title: isTe ? "పరిచయం & వ్యవసాయ-వైద్య అనుసంధానం" : "Introduction & The Agro-Medical Connection (One Health)",
      desc: isTe 
        ? "స్మార్ట్ అగ్రికల్చర్ మరియు ప్రజారోగ్యం మధ్య సంబంధం (పంటల తెగుళ్లు, పురుగుమందుల అవశేషాల నివారణ, పోషకాహార భద్రత)."
        : "Explain the 'One Health' concept to medical students: healthy soils and crops mean reduced pesticide toxicity in food and better public health nutrition.",
      keyAction: isTe ? "AgroSense AI లక్ష్యాన్ని వివరించండి" : "Introduce AgroSense AI mission & architecture"
    },
    {
      time: "05 – 12 min",
      title: isTe ? "వర్చువల్ IoT ఫీల్డ్ హార్డ్‌వేర్ & లైవ్ సిమ్యులేషన్" : "Virtual IoT Field Hardware & Live Telemetry",
      desc: isTe
        ? "AgroProbe 7-in-1 భూసార సెన్సార్ (pH, తేమ) మరియు AgroWeather వాతావరణ కేంద్రాన్ని చూపించండి. స్లైడర్లతో విలువలను మార్చండి."
        : "Show the realistic IoT devices. Adjust Soil Moisture, Soil pH, and Air Humidity live. Show how values travel over MQTT.",
      keyAction: isTe ? "'Acidic Soil' లేదా 'Drought' దృశ్యాన్ని ఎంచుకోండి" : "Click 'Acidic Soil' or 'Drought' scenario preset"
    },
    {
      time: "12 – 20 min",
      title: isTe ? "రైతు సలహా పత్రం (Advisory Engine)" : "AI Farmer Decision Engine: Crops & Soil Action",
      desc: isTe
        ? "నేల రకం మరియు pH ఆధారంగా పంటల ఎంపిక (టాప్ 3), సున్నం/జిప్సం నివారణ చర్యలు, మరియు వాతావరణ ఆధారిత నీటిపారుదలని చూపించండి."
        : "Walk through the generated advisory: top suitable crops, pH neutralization with agricultural lime, and rain-aware irrigation saving water.",
      keyAction: isTe ? "రైతు నిర్ణయ నివేదికను సమీక్షించండి" : "Show the Ranked Crops & Lime/Gypsum dosages"
    },
    {
      time: "20 – 25 min",
      title: isTe ? "ఆకు తెగుళ్ల గుర్తింపు AI & తెలుగు యూట్యూబ్ వీడియోలు" : "Pretrained Leaf Disease Vision AI & Telugu Video Guides",
      desc: isTe
        ? "నమూనా ఆకును ఎంచుకుని (Early Blight / Late Blight), కంప్యూటర్ విజన్ ద్వారా తెగులు గుర్తింపు, ముందస్తు జాగ్రత్తలు, మరియు తెలుగు యూట్యూబ్ వీడియోలను చూపించండి."
        : "Upload or click sample leaves (Healthy vs. Blight). Highlight model confidence, symptoms, organic/agronomic cure, and Telugu YouTube guides.",
      keyAction: isTe ? "ఆకు తెగులు ల్యాబ్‌లో నమూనాను పరీక్షించండి" : "Demonstrate Leaf AI and play/open Telugu video link"
    },
    {
      time: "25 – 30 min",
      title: isTe ? "డేటా పైప్‌లైన్, పరిమితులు & ప్రశ్నలు (Q&A)" : "Data Pipeline Provenance, Disclaimers & Q&A",
      desc: isTe
        ? "డేటా పైప్‌లైన్ స్క్రీన్‌లో MQTT ప్యాకెట్ తనిఖీని చూపించండి. ఇది ప్రయోగాత్మక సిమ్యులేషన్ అని స్పష్టం చేసి విద్యార్థుల ప్రశ్నలకు సమాధానాలు ఇవ్వండి."
        : "Open the Telemetry Inspector to show raw MQTT payloads, schema validation, and SQLite persistence. Reiterate simulation caveats and take Q&A.",
      keyAction: isTe ? "MQTT ప్యాకెట్ ఇన్‌స్పెక్టర్‌ను చూపించి ముగించండి" : "Conclude with Telemetry Inspector & wrap up"
    }
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {isTe ? '30-నిమిషాల FDP వర్క్‌షాప్ ప్రెజెంటేషన్ గైడ్' : '30-Minute FDP Workshop Presentation Run-of-Show'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {isTe 
                ? 'వైద్య విద్యార్థులకు IoT మరియు వ్యవసాయ AI సిస్టమ్‌ను సమర్థవంతంగా వివరించడానికి సమయ విభజన.'
                : 'Pacing schedule and talking points tailored for your 30-minute university medical student workshop.'}
            </p>
          </div>
        </div>
      </div>

      {/* Why Medical Students? One-Health Callout Box */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-5 sm:p-6 border border-emerald-200/80 shadow-xs space-y-3">
        <div className="flex items-center space-x-2.5 text-emerald-900 font-bold text-base">
          <HeartPulse className="w-5 h-5 text-emerald-700" />
          <span>{isTe ? 'వైద్య విద్యార్థులకు ఇది ఎందుకు ముఖ్యం? (The One Health Concept)' : 'Why Teach Smart Agriculture to Medical Students?'}</span>
        </div>
        <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
          {isTe 
            ? 'ప్రజారోగ్యం (Public Health) నేల మరియు పంటల ఆరోగ్యం నుండే ప్రారంభమవుతుంది. పొలంలో అధిక పురుగుమందుల వాడకం క్యాన్సర్, కిడ్నీ వ్యాధులకు దారితీస్తోంది. AgroSense AI వంటి IoT వ్యవస్థలు పురుగుమందుల అవసరాన్ని తగ్గించి, ఆరోగ్యకరమైన ఆహార ఉత్పత్తికి మరియు నివారణా వైద్యానికి (Preventive Medicine) తోడ్పడతాయి.'
            : 'Human medicine and soil health are deeply intertwined. Excessive synthetic pesticide runoff and soil degradation are leading causes of chronic toxicity, endocrine disruption, and kidney disease in rural communities. By using IoT telemetry and AI precision advising, farmers can curb over-spraying, protect groundwater, and ensure safer food supply chains.'}
        </p>
      </div>

      {/* Pacing Timeline Cards */}
      <div className="space-y-4">
        {schedule.map((item, idx) => (
          <div 
            key={idx}
            className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-start space-x-3.5">
              <div className="w-9 h-9 rounded-2xl bg-emerald-700 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                0{idx + 1}
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-mono">
                    {item.time}
                  </span>
                  <h4 className="font-bold text-slate-900 text-base">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>

            <div className="sm:text-right shrink-0 w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
              <span className="text-[11px] uppercase font-bold text-slate-400 block">
                {isTe ? 'ప్రదర్శన చర్య' : 'Demo Action'}
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50/80 px-2.5 py-1 rounded-lg border border-emerald-200 inline-block mt-0.5">
                {item.keyAction}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
