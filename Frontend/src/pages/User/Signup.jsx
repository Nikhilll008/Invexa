import React, { useState } from 'react';
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import './Signup.css';

const STATUS_CARDS = [
  { label: 'Invoice Processing', progress: 78, icon: 'doc' },
  { label: 'OCR Scanning', progress: 60, icon: 'scan' },
  { label: 'GST Verification', progress: 45, icon: 'gst' },
  { label: 'Tally Integration', progress: 55, icon: 'tally' },
];

const STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan',
  'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
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

      <a href="#home" className="auth-side__logo">Invexa</a>

      <div className="auth-side__illustration">
        <div className="auth-side__avatar">
          <svg width="120" height="150" viewBox="0 0 120 150" fill="none">
            <circle cx="60" cy="38" r="26" fill="url(#avatarHeadSU)" />
            <path d="M18 150v-24c0-23 19-42 42-42s42 19 42 42v24H18z" fill="url(#avatarBodySU)" />
            <rect x="70" y="80" width="30" height="42" rx="4" fill="#ffffff" opacity="0.9" transform="rotate(8 70 80)" />
            <defs>
              <linearGradient id="avatarHeadSU" x1="34" y1="12" x2="86" y2="64" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FBCFA0" />
                <stop offset="1" stopColor="#F4B983" />
              </linearGradient>
              <linearGradient id="avatarBodySU" x1="18" y1="84" x2="102" y2="150" gradientUnits="userSpaceOnUse">
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

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  

  const navigate = useNavigate();

const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    gstNumber: "",
    businessEmail: "",
    mobileNumber: "",
    state: "",
    city: "",
    pincode: "",
    password: ""
});

const handleChange = (e) => {
  

    const {name,value}=e.target;

    setFormData({
        ...formData,
        [name]:value
    });

  

}

const checks = {

    length: formData.password.length >= 8,

    upper: /[A-Z]/.test(formData.password),

    lower: /[a-z]/.test(formData.password),

    numberSpecial:
        /[0-9]/.test(formData.password) &&
        /[^A-Za-z0-9]/.test(formData.password),

};


  const handleSubmit = async (e) => {

    e.preventDefault();

    console.log("Button Clicked");
    console.log(formData);

    try {

        const response = await api.post("/api/owner/signup", {
            businessName: formData.businessName,
            ownerName: formData.ownerName,
            gstNumber: formData.gstNumber,
            businessEmail: formData.businessEmail,
            mobileNumber: formData.mobileNumber,
            state: formData.state,
            city: formData.city,
            pincode: formData.pincode,
            password: formData.password
        });

        console.log(response.data);

        alert(response.data.message);

        navigate("/login");

    } catch (error) {

        console.log("ERROR:", error);

        if (error.response) {
            console.log(error.response.data);
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
<form
      className="auth-form auth-form--wide"
    onSubmit={handleSubmit}>          
    <h1 className="auth-form__title">Create Your Business Account</h1>
          <p className="auth-form__desc">Register your business and start digitizing invoices.</p>

          <div className="auth-grid">
            <label className="auth-field">
              <span className="auth-field__label">Business Name</span>
              <input
type="text"
name="businessName"
placeholder="Acme Corp Pvt Ltd"
value={formData.businessName}
onChange={handleChange}
required
/>
            </label>

            <label className="auth-field">
              <span className="auth-field__label">Owner Full Name</span>
<input
type="text"
name="ownerName"
placeholder="Johnathan Doe"
autoComplete="name"
value={formData.ownerName}
onChange={handleChange}
required
/>           </label>

            <label className="auth-field auth-field--full">
              <span className="auth-field__label">GST Number</span>
<input
type="text"
name="gstNumber"
placeholder="22AAAAA0000A1Z5"
value={formData.gstNumber}
onChange={handleChange}
required
/>            </label>

            <label className="auth-field">
              <span className="auth-field__label">Business Email</span>
<input
type="email"
name="businessEmail"
placeholder="finance@acme.com"
autoComplete="email"
value={formData.businessEmail}
onChange={handleChange}
required
/>            </label>

            <label className="auth-field">
              <span className="auth-field__label">Mobile Number</span>
              <span className="auth-field__phone-wrap">
                <span className="auth-field__country-code">+91</span>
<input
type="tel"
name="mobileNumber"
placeholder="9876543210"
autoComplete="tel"
value={formData.mobileNumber}
onChange={handleChange}
required
/>              </span>
            </label>

            <div className="auth-field auth-field--full">
              <span className="auth-field__label">Business Address</span>
              <div className="auth-address-row">
<select
name="state"
value={formData.state}
onChange={handleChange}
required
>                  <option value="" disabled>Select State</option>
                  {STATES.map((s) => (
                    <option value={s} key={s}>{s}</option>
                  ))}
                </select>
<input
type="text"
name="city"
placeholder="City"
value={formData.city}
onChange={handleChange}
required
/>                <input
type="text"
name="pincode"
placeholder="Pincode"
inputMode="numeric"
maxLength={6}
value={formData.pincode}
onChange={handleChange}
required
/>
              </div>
            </div>

            <label className="auth-field auth-field--full">
              <span className="auth-field__label">Security Password</span>
              <span className="auth-field__input-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Create a strong password"
                  autoComplete="new-password"
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

            <div className="auth-field auth-field--full auth-password-checks">
              <span className={`auth-check ${checks.length ? 'auth-check--ok' : ''}`}>
                <CheckIcon /> 8+ Characters
              </span>
              <span className={`auth-check ${checks.upper ? 'auth-check--ok' : ''}`}>
                <CheckIcon /> Uppercase Letter
              </span>
              <span className={`auth-check ${checks.lower ? 'auth-check--ok' : ''}`}>
                <CheckIcon /> Lowercase Letter
              </span>
              <span className={`auth-check ${checks.numberSpecial ? 'auth-check--ok' : ''}`}>
                <CheckIcon /> Number &amp; Special
              </span>
            </div>
          </div>

          <button type="submit" className="auth-submit">
            Create Secure Account
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>

          <p className="auth-form__footer">
            Already have an account? <a href="/login" className="auth-form__link">Sign In</a>
          </p>
        </form>
      </main>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6.3" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4.3 7.2l1.8 1.8 3.6-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}