import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "./styles.css";
import Modal from "./Modal"; // Assuming you have a Modal component

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm();
    const [showModal, setShowModal] = useState(false);
    const [mfaCode, setMfaCode] = useState("");
    const [inputCode, setInputCode] = useState("");

    // Hardcoded IP for simulation
    const hardcodedIP = "192.168.1.1";

    const onSubmit = (data) => {
        // Simulate IP check
        const currentIP = "192.168.1.2"; // Replace this with a hardcoded or dynamic IP

        if (currentIP === hardcodedIP) {
            login(data.email, data.password);
            navigate("/AccountSummary");
        } else {
            // Generate a random MFA code and "send" it to the user's email
            const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
            setMfaCode(generatedCode);
            console.log(`MFA code sent to email: ${generatedCode}`); // Simulate email sending
            setShowModal(true);
        }
    };

    const handleMfaSubmit = () => {
        if (inputCode === mfaCode) {
            setShowModal(false);
            // Proceed with login and navigate to Account Summary
            // Replace with actual email and password values
            login("user@example.com", "password");
            navigate("/AccountSummary");
        } else {
            alert("Invalid MFA code. Please try again.");
        }
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
                    {...register("email", { required: true, pattern: /\S+@\S+$/i })}
                    type="email"
                    required
                />
                {errors.email && <p>Email is required and must be valid.</p>}
                
                <label className="input-title">Password</label>
                <input
                    className="input-field"
                    type="password"
                    {...register("password", { required: true })}
                    required
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
            
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <h2>Unusual Login Attempt</h2>
                    <p>Your login attempt is from an unknown IP address. Please enter the code sent to your email.</p>
                    <input
                        type="text"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        placeholder="Enter MFA code"
                    />
                    <button onClick={handleMfaSubmit}>Submit</button>
                </Modal>
            )}
        </div>
    );
};

export default Login;


import React from "react";
import "./Modal.css"; // Add your modal styling here

const Modal = ({ children, onClose }) => {
    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                {children}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;


.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.modal-content input {
    margin: 10px 0;
    padding: 10px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.modal-content button {
    padding: 10px 20px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}

.modal-content button:hover {
    background-color: #0056b3;
}
