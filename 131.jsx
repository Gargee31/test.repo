import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { AuthContext } from "../AuthContext";
import "./styles.css";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const { register, handleSubmit, watch, formState: { errors, isValid }, } = useForm();

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const onSubmit = (data) => {
        login(data.email, data.password);
        setModalIsOpen(true); // Open the modal on form submission
    };

    const closeModal = () => {
        setModalIsOpen(false);
        navigate("/AccountSummary"); // Navigate after closing the modal
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
                    type="email"
                    {...register("email", {
                        required: true,
                        pattern: /^\S+@\S+\.\S+$/,
                    })}
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

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Login Successful"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <h2>Login Successful!</h2>
                <p>You are being redirected to your account summary.</p>
                <button onClick={closeModal}>Close</button>
            </Modal>
        </div>
    );
};

export default Login;


.modal-overlay {
    background-color: rgba(0, 0, 0, 0.75);
}

.modal {
    position: absolute;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    marginRight: -50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 8px;
    outline: none;
    max-width: 400px;
    width: 90%;
}

.modal button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.modal button:hover {
    background-color: #0056b3;
}
