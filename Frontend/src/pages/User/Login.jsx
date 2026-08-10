import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import './Login.css';

const STATUS_CARDS = [
  { label: 'Invoice Processing', progress: 78, icon: 'doc' },
  { label: 'OCR Scanning', progress: 60, icon: 'scan' },
  { label: 'GST Verification', progress: 45, icon: 'gst' },
  { label: 'Tally Integration', progress: 55, icon: 'tally' },
];

function CardIcon({ type }) {
  if (type === 'doc') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M6 2h9l5 5v15a1 1 0 01-1 1H6a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 13l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === 'scan') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M7 3H4a1 1 0 00-1 1v3M17 3h3a1 1 0 011 1v3M7 21H4a1 1 0 01-1-1v-3M17 21h3a1 1 0 001-1v-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M4 12h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'gst') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M6 2h8l4 4v15a1 1 0 01-1 1H6a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M8 11h8M8 15h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 4l16 16M6 3l15 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function AuthSidePanel() {
  return (
    <aside className="auth-side">
      <span className="auth-side__blob auth-side__blob--top" aria-hidden="true"></span>
      <span className="auth-side__blob auth-side__blob--bottom" aria-hidden="true"></span>

      <Link to="/" className="auth-side__logo">Invexa</Link>

      <div className="auth-side__illustration">
        <div className="auth-side__avatar">
          <svg width="120" height="150" viewBox="0 0 120 150" fill="none">
            <circle cx="60" cy="38" r="26" fill="url(#avatarHead)" />
            <path d="M18 150v-24c0-23 19-42 42-42s42 19 42 42v24H18z" fill="url(#avatarBody)" />
            <rect x="70" y="80" width="30" height="42" rx="4" fill="#ffffff" opacity="0.9" transform="rotate(8 70 80)" />
            <defs>
              <linearGradient id="avatarHead" x1="34" y1="12" x2="86" y2="64" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FBCFA0" />
                <stop offset="1" stopColor="#F4B983" />
              </linearGradient>
              <linearGradient id="avatarBody" x1="18" y1="84" x2="102" y2="150" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0D9488" />
                <stop offset="1" stopColor="#14B8A6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="auth-side__cards">
          {STATUS_CARDS.map((c) => (
            <div className={`auth-side__card auth-side__card--${c.icon}`} key={c.label}>
              <span className="auth-side__card-icon"><CardIcon type={c.icon} /></span>
              <span className="auth-side__card-label">{c.label}</span>
              <span className="auth-side__card-bar">
                <span className="auth-side__card-fill" style={{ width: `${c.progress}%` }}></span>
              </span>
            </div>
          ))}
        </div>

        <div className="auth-side__badge">
          <span className="auth-side__badge-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l2.5 1.6 3-.4 1 2.8 2.7 1.2-.7 2.9 1.5 2.5-2 2.2.4 3-2.9.7-1.6 2.6-2.9-.8-2.9.8-1.6-2.6-2.9-.7.4-3-2-2.2 1.5-2.5-.7-2.9L7.5 3.2l3 .4L12 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
              <path d="M9 12.5l2 2 4-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <span className="auth-side__badge-title">GST Verified</span>
            <span className="auth-side__badge-sub">Precision match 100%</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
    businessEmail: "",
    password: ""
});

    const navigate = useNavigate();
    const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
        ...formData,
        [name]: value
    });
};

    const handleLogin = async (e) => {

    e.preventDefault();

    try {

        const response = await api.post("/api/owner/login", {
            businessEmail: formData.businessEmail,
            password: formData.password
        });

        // JWT Token Save
        localStorage.setItem("token", response.data.token);

        // Owner Data Save
        localStorage.setItem(
            "owner",
            JSON.stringify(response.data.owner)
        );

        navigate("/dashboard");

    } catch (error) {

        if (error.response) {
            alert(error.response.data.message);
        } else {
            alert("Backend not connected");
        }

    }

};

    return (
    <div className="auth-page">
      <AuthSidePanel />

      <main className="auth-main">
<form className="auth-form" onSubmit={handleLogin}>          <h1 className="auth-form__title">Welcome Back <span aria-hidden="true">👋</span></h1>
          <p className="auth-form__desc">Enter your credentials to access your dashboard.</p>

          <label className="auth-field">
            <span className="auth-field__label">Work Email</span>
            <input
    type="email"
    name="businessEmail"
    placeholder="name@company.com"
    autoComplete="email"
    value={formData.businessEmail}
    onChange={handleChange}
    required
/>
          </label>

          <label className="auth-field">
            <span className="auth-field__label-row">
              <span className="auth-field__label">Password</span>
          <Link to="/forgot-password" className="auth-field__link">Forgot Password?</Link>            
          </span>
            <span className="auth-field__input-wrap">
             <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Enter your password"
    autoComplete="current-password"
    value={formData.password}
    onChange={handleChange}
    required
/>
              <button
                type="button"
                className="auth-field__eye"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M6.5 6.7C4.3 8.1 2.7 10 2 12c1.5 4 5.5 7 10 7 1.7 0 3.3-.4 4.7-1.1M9.9 4.2A10.6 10.6 0 0112 4c4.5 0 8.5 3 10 7-.5 1.4-1.4 2.7-2.4 3.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M2 12c1.5-4 5.5-7 10-7s8.5 3 10 7c-1.5 4-5.5 7-10 7s-8.5-3-10-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" /></svg>
                )}
              </button>
            </span>
          </label>

          <label className="auth-checkbox">
            <input type="checkbox" name="stay-signed-in" />
            <span>Stay signed in for 30 days</span>
          </label>

          <button type="submit" className="auth-submit">
            Sign In to Dashboard
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>

          <div className="auth-divider"><span>Or continue with</span></div>

          <div className="auth-social">
            <button type="button" aria-label="Continue with Google">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.7 4.2-5.5 4.2-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.9 1.5l2.6-2.5C16.9 3.5 14.7 2.5 12 2.5 6.9 2.5 2.7 6.7 2.7 11.8S6.9 21 12 21c6.9 0 8.9-4.8 8.9-7.3 0-.5 0-.9-.1-1.3H12z" /></svg>
            </button>
            <button type="button" aria-label="Continue with Microsoft">
              <svg width="18" height="18" viewBox="0 0 24 24"><rect x="3" y="3" width="8" height="8" fill="#F35325" /><rect x="13" y="3" width="8" height="8" fill="#81BC06" /><rect x="3" y="13" width="8" height="8" fill="#05A6F0" /><rect x="13" y="13" width="8" height="8" fill="#FFBA08" /></svg>
            </button>
            <button type="button" aria-label="Continue with LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#0A66C2" /><path d="M7.1 9.6H4.4V19h2.7V9.6zM5.8 8.4a1.6 1.6 0 100-3.1 1.6 1.6 0 000 3.1zM19.6 19h-2.7v-4.9c0-1.2 0-2.7-1.6-2.7s-1.9 1.3-1.9 2.6V19H10.7V9.6h2.6v1.3h.1c.4-.7 1.3-1.5 2.7-1.5 2.9 0 3.5 1.9 3.5 4.4V19z" fill="#fff" /></svg>
            </button>
          </div>

          <p className="auth-form__footer">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </main>
    </div>
  );
}
