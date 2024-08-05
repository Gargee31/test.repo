import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import axios from "axios";

import "./styles.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm();
  const [location, setLocation] = useState({ lat: null, long: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude
        });
      });
    }
  }, []);

  const onSubmit = async (data) => {
    await axios.post('/api/location', { ...location, user_id: data.email });
    login(data.email, data.password);
    navigate("/AccountSummary");
  };

  const allFields = watch(["email", "password"]);
  const isFormValid = allFields.every((field) => field) && isValid;

  return (
    <div className="login">
      <h1 className="welcome">Welcome</h1>
      <h4 className="welcome-subheading">Please enter your details.</h4>
      <form onSubmit={handleSubmit(onSubmit)} className="sign-in-form">
        <label className="input-title">Email</label>
        <input
          className="input-field"
          {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })}
          type="email"
        />
        {errors.email && <p>Email is required and must be valid.</p>}

        <label className="input-title">Password</label>
        <input
          className="input-field"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && <p>Password is required!</p>}

        <button className="login-btn" type="submit" disabled={!isFormValid}>
          Log in
        </button>
      </form>

      <div className="forgot-password">
        <h3 className="endingline">Don't have an account?</h3>
        <h3 style={{ marginLeft: "10px" }}>
          <Link to="/signup">Sign Up</Link>
        </h3>
      </div>
    </div>
  );
};

export default Login;

@app.post("/api/location") async def save_location(data: LocationData, db: Session = Depends(get_db)): location_event = LocationEvent( user_id=data.user_id, latitude=data.latitude, longitude=data.longitude ) db.add(location_event) db.commit() return {"status": "location saved"}
