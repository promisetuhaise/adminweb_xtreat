import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import logo from "../assets/logo.png";

const API_URL = "https://api-xtreative.onrender.com/accounts/login-admin/";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (response.ok && data.access) {
        // Persist tokens
        localStorage.setItem("authToken", data.access);
        if (data.refresh) {
          localStorage.setItem("refreshToken", data.refresh);
        }

        setLoginError("");
        setLoginSuccess(true);

        // Redirect after a brief success message
        setTimeout(() => {
          navigate("/admin-dashboard");
        }, 2000);
      } else {
        setLoginError(
          data.message ||
            data.detail ||
            "Invalid credentials. Please try again."
        );
        setLoginSuccess(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Something went wrong. Please try again later.");
      setLoginSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-screen">
      {/* Embedded CSS */}
      <style>{`
        /* Overall layout */
        .login-screen {
          min-height: 100vh;
          background-color: #fff;
          display: flex;
          flex-direction: column;
        }
        /* Header styling */
        .login-header {
          padding: 20px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid #ccc;
        }
        /* Container for logo and title */
        .logo-title-container {
          display: flex;
          align-items: center;
        }
        .login-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #f9622c;
          margin-left: -30px;
        }
        .login-welcome {
          display: flex;
          align-items: center;
          font-size: 1rem;
          color: #280300;
        }
        .login-welcome span {
          margin-left: 8px;
        }
        /* Container and card styling */
        .login-container {
          flex-grow: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 16px;
        }
        .login-card {
          width: 100%;
          max-width: 450px;
          background-color: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 40px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          position: relative;
        }
        .login-card-title {
          text-align: center;
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 32px;
          color: #280300;
        }
        /* Form styling */
        .login-form {
          display: flex;
          flex-direction: column;
        }
        .form-group {
          position: relative;
          margin-bottom: 24px;
        }
        /* Input and floating label styling */
        .login-input {
          width: 100%;
          padding: 12px 8px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: transparent;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .login-input:focus {
          border-color: #6B46C1;
        }
        .login-label {
          position: absolute;
          left: 12px;
          top: 12px;
          font-size: 14px;
          color: #999;
          background-color: transparent;
          padding: 0 4px;
          transition: all 0.2s ease;
          pointer-events: none;
        }
        .login-input:focus + .login-label,
        .login-input:not(:placeholder-shown) + .login-label {
          top: -10px;
          left: 8px;
          font-size: 12px;
          color: #6B46C1;
          background-color: #fff;
        }
        /* Error message styling */
        .login-error {
          font-size: 12px;
          color: #F9622C;
          margin-top: 4px;
        }
        /* Forgot password styling */
        .forgot-password-container {
          text-align: right;
          margin-bottom: 24px;
        }
        .forgot-password {
          font-size: 12px;
          color: #1976D2;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        /* Sign in button styling */
        .login-button {
          width: 100%;
          background-color: #280300;
          color: #fff;
          padding: 12px;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .login-button:hover {
          background-color: #1e0200;
        }
        .login-button:disabled {
          background-color: #999;
          cursor: not-allowed;
        }
        /* General error and success message containers */
        .error-message {
          margin-top: 16px;
          background-color: #ffe6e6;
          color: #d9534f;
          text-align: center;
          padding: 8px;
          border-radius: 4px;
          font-size:12px;
        }
        .success-message {
          margin-top: 16px;
          background-color: #e6ffe6;
          color: #28a745;
          text-align: center;
          padding: 8px;
          border-radius: 4px;
          font-size:12px;
        }
        /* Loader styling */
        .loader {
          margin: 0 auto 16px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #280300;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        /* Footer styling */
        .login-footer {
          margin-top: 32px;
          display: flex;
          justify-content: center;
        }
        .login-logo {
          width: 100px;
          height: 60px;
          object-fit: contain;
        }
        .password-toggle-icon {
          position: absolute;
          top: 50%;
          right: 12px;
          transform: translateY(-50%);
          cursor: pointer;
          color: #999;
        }
      `}</style>

      {/* Centered Sign-In Card */}
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-card-title">Sign In</h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} className="login-form">
                {isSubmitting && <div className="loader"></div>}

                {/* Email Field */}
                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className="login-input"
                    placeholder=" "
                  />
                  <label htmlFor="email" className="login-label">
                    Email
                  </label>
                  {touched.email && errors.email && (
                    <p className="login-error">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="form-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className="login-input"
                    placeholder=" "
                  />
                  <label htmlFor="password" className="login-label">
                    Password
                  </label>
                  <span
                    className="password-toggle-icon"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <IoEyeOffOutline size={20} />
                    ) : (
                      <IoEyeOutline size={20} />
                    )}
                  </span>
                  {touched.password && errors.password && (
                    <p className="login-error">{errors.password}</p>
                  )}
                </div>

                {/* Forgot Password Link */}
                <div className="forgot-password-container">
                  <button
                    type="button"
                    className="forgot-password"
                    onClick={() => alert("Forgot Password?")}
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  className="login-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </button>

                {loginError && (
                  <div className="error-message">{loginError}</div>
                )}
                {loginSuccess && (
                  <div className="success-message">
                    Login successful! Redirecting...
                  </div>
                )}
              </form>
            )}
          </Formik>

          {/* Footer Logo */}
          <div className="login-footer">
            <img src={logo} alt="Logo" className="login-logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
