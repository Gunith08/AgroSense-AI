import sqlite3
import os
from datetime import datetime
from typing import List, Dict, Any, Optional

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "agrosense.db")

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Raw telemetry table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS telemetry_raw (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        device_id TEXT NOT NULL,
        farm_id TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        sequence INTEGER NOT NULL,
        payload_json TEXT NOT NULL,
        received_at TEXT NOT NULL
    );
    """)

    # Processed telemetry table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS telemetry_processed (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        device_id TEXT NOT NULL,
        farm_id TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        temperature_c REAL NOT NULL,
        humidity_pct REAL NOT NULL,
        soil_moisture_pct REAL NOT NULL,
        soil_ph REAL NOT NULL,
        soil_type TEXT NOT NULL,
        location TEXT NOT NULL,
        quality_status TEXT NOT NULL,
        created_at TEXT NOT NULL
    );
    """)

    conn.commit()
    conn.close()

def save_telemetry(payload: Dict[str, Any], quality: str = "valid") -> int:
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()
    now_str = datetime.utcnow().isoformat() + "Z"
    
    cursor.execute("""
    INSERT INTO telemetry_processed (
        device_id, farm_id, timestamp, temperature_c, humidity_pct, 
        soil_moisture_pct, soil_ph, soil_type, location, quality_status, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        payload.get("device_id", "esp32-sim-01"),
        payload.get("farm_id", "demo-01"),
        payload.get("timestamp") or now_str,
        payload.get("temperature_c", 30.0),
        payload.get("humidity_pct", 65.0),
        payload.get("soil_moisture_pct", 50.0),
        payload.get("soil_ph", 6.5),
        payload.get("soil_type", "alluvial"),
        payload.get("location", "guntur"),
        quality,
        now_str
    ))
    
    inserted_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return inserted_id

def get_latest_telemetry() -> Optional[Dict[str, Any]]:
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM telemetry_processed ORDER BY id DESC LIMIT 1")
    row = cursor.fetchone()
    conn.close()
    if row:
        return dict(row)
    return None

def get_telemetry_history(limit: int = 50) -> List[Dict[str, Any]]:
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM telemetry_processed ORDER BY id DESC LIMIT ?", (limit,))
    rows = cursor.fetchall()
    conn.close()
    return [dict(r) for r in rows]
