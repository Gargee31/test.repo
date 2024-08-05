from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import get_db
from models import LocationEvent, User
from utils import is_location_anomalous

app = FastAPI()

# Load model
# (Assume your existing code for loading models, etc.)

class LoginData(BaseModel):
    user_id: str
    latitude: float
    longitude: float
    password: str

@app.post("/login")
async def login(data: LoginData, db: Session = Depends(get_db)):
    # Authenticate user here
    user = db.query(User).filter(User.user_id == data.user_id).first()
    if not user or not user.verify_password(data.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Fetch previous location data
    previous_locations = db.query(LocationEvent).filter(LocationEvent.user_id == data.user_id).all()
    previous_coords = [(loc.latitude, loc.longitude) for loc in previous_locations]

    # Check if the new location is anomalous
    new_location = (data.latitude, data.longitude)
    if is_location_anomalous(new_location, previous_coords):
        # Trigger notification or handle anomaly
        raise HTTPException(status_code=403, detail="Anomalous login detected. Please verify.")

    # Log the location
    location_event = LocationEvent(
        user_id=data.user_id,
        latitude=data.latitude,
        longitude=data.longitude
    )
    db.add(location_event)
    db.commit()

    # Proceed with login
    return {"status": "login successful"}
