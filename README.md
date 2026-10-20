# AgroSense AI — Simulation-Based Smart Agriculture Decision Support System

> **Theme:** Smart Agriculture: IoT + AI + Farmer Decision Support  
> **Target Audience:** FDP Workshop for University Medical Students & Agricultural Stakeholders  
> **Repository Owner:** [Gunith08](https://github.com/Gunith08)

---

## 🌾 Overview

**AgroSense AI** is a professional, farmer-friendly decision support system and IoT simulation platform. Designed with a clean light theme and natural agricultural green palette, it empowers farmers and students to understand how real-time IoT field measurements transform into reliable, evidence-linked agronomic decisions.

---

## ✨ Key Features

1. **Realistic 4K-Style Virtual IoT Hardware Station:**
   - **AgroProbe 7-in-1 Soil Multi-Sensor (RS485-IP68):** Digital LCD console displaying **Soil Moisture (%)** and **Soil Acidity (pH)** with interactive manual dials.
   - **AgroWeather Micro-Climate Station:** Solar-powered field mast displaying **Relative Humidity (%)**, live **Air Temperature (°C)**, and **Rainfall Forecast (mm)**.
2. **Reliable Farmer Advisory Engine:**
   - **Ranked Crop Suitability:** Recommends the top 3 best-suited crops (Tomato, Chilli, Cotton, Groundnut, Maize, Paddy) based on soil pH, soil type, and regional climate.
   - **Soil Chemistry & pH Correction:** Provides actionable remedial dosages (e.g. Agricultural Lime for acidic soils, Gypsum for alkaline soils).
   - **Smart Irrigation Schedule:** Cross-references soil moisture with soil drainage rates and rainfall forecasts to prevent over-watering.
   - **Environmental Disease Risk Meter:** Forecasts 24–72h fungal favorability based on sustained humidity and temperature.
3. **Pretrained Leaf Disease Computer Vision System:**
   - Detects crop diseases (*Early Blight*, *Late Blight*, *Leaf Mold*, *Bacterial Spot*, *Healthy Leaf*).
   - Details **Observed Symptoms**, **Immediate Precautionary Measures**, and **Field Cure / Agronomic Treatment**.
4. **Telugu-Only YouTube Video Guides:**
   - Automatically embeds curated, high-quality **Telugu agricultural video tutorials** directly beneath every disease diagnosis and treatment plan.
5. **Full Bilingual Localization (English ⇄ తెలుగు):**
   - 1-click persistent toggle to switch every label, dial, card, and advisory between English and Telugu.
6. **100% Offline-First Reliability:**
   - Built with local offline fallbacks for models, weather fixtures, and translations so that workshop demonstrations never fail due to poor auditorium Wi-Fi.
7. **30-Minute FDP Presentation Run-of-Show:**
   - Built-in slide-by-slide pacing guide connecting smart agriculture with the **"One Health"** concept for medical students.

---

## 🚀 Quick Start Guide

### 1. Launch Frontend (Interactive Web Dashboard)
```bash
cd frontend
npm install
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser or mobile device.

### 2. Launch Backend (FastAPI Ingestion & Advisory API)
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
Interactive API documentation will be available at **[http://localhost:8000/docs](http://localhost:8000/docs)**.

### 3. Run Virtual Telemetry Simulator (Optional)
```bash
cd simulator
python python_publisher.py
```

---

## 📂 Repository Structure

```text
agrosense-ai/
├── README.md                       # Project documentation & presentation guide
├── backend/                        # FastAPI ingestion & decision service
│   ├── app/
│   │   ├── main.py                 # FastAPI application root
│   │   ├── api/routes.py           # REST endpoints
│   │   ├── db/database.py          # SQLite persistence
│   │   ├── models/schemas.py       # Pydantic data schemas
│   │   └── services/               # Preprocessing, weather, advisory, vision
│   └── requirements.txt
├── frontend/                       # React + Vite responsive web application
│   ├── src/
│   │   ├── components/             # Hardware station, advisory cards, leaf AI
│   │   ├── data/                   # Bilingual dictionary, crop catalog, weather
│   │   ├── App.jsx                 # Main state orchestrator
│   │   └── main.jsx
│   └── package.json
├── simulator/                      # Python IoT telemetry generator
│   └── python_publisher.py
└── data/                           # Cached regional weather fixtures
    └── cached_weather.json
```

---

## 🎓 University Presentation Run-of-Show (30 Minutes)

| Time | Topic | Demo Action |
|---|---|---|
| **00–05 min** | Intro: One Health & Agricultural Medicine | Introduce AgroSense AI mission |
| **05–12 min** | Virtual IoT Field Hardware & Telemetry | Adjust Moisture, pH, and Humidity live |
| **12–20 min** | AI Decision Engine: Crops & Soil Action | Review Ranked Crops and Lime/Gypsum treatment |
| **20–25 min** | Leaf Disease Vision & Telugu Video Guides | Test Leaf samples & open Telugu YouTube guide |
| **25–30 min** | Data Pipeline, Disclaimers & Q&A | Show MQTT Inspector & conclude |

---

*Developed for the FDP Workshop on IoT & Artificial Intelligence in Agriculture & Public Health.*
