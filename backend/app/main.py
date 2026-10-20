from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router
from app.db.database import init_db

app = FastAPI(
    title="AgroSense AI Backend",
    description="Simulation-Based Smart Agriculture Decision Support & Advisory API",
    version="1.0.0"
)

# Enable CORS for local and web frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database tables on startup
@app.on_event("startup")
def startup_event():
    init_db()

app.include_router(router)

@app.get("/")
def root():
    return {
        "message": "AgroSense AI Decision Support API is active",
        "docs": "/docs",
        "health": "/api/health"
    }
