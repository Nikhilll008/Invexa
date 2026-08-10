import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CALogin.css';

const PHOTO = 'https://images.unsplash.com/photo-1758874383352-481f911951aa?w=1200&q=80&auto=format&fit=crop';

const STATS = [
  { value: 'ISO 27001', label: 'Bank-Grade Security', icon: 'shield' },
  { value: '99.9%', label: 'Audit Accuracy', icon: 'chart' },
  { value: '10x', label: 'Faster Compliance', icon: 'bolt' },
  { value: '5k+', label: 'Certified Partners', icon: 'users' },
];

function StatIcon({ type }) {
  if (type === 'shield') {
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l8 4v6c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  }
  if (type === 'chart') {
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 17l6-6 4 4 8-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M15 7h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  }
  if (type === 'bolt') {
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>;
  }
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="17" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.6" /><path d="M15.5 14.2c2.6.4 4.5 2.6 4.5 5.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>;
}

export default function CALogin() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="ca-page">
      <div className="ca-photo" style={{ backgroundImage: `url(${PHOTO})` }}>
        <div className="ca-photo__overlay"></div>
        <div className="ca-photo__content">
          <h1>Professional-Grade Audit Intelligence.</h1>
          <p>Empowering Chartered Accountants with real-time algorithmic insights and frictionless workflow management.</p>

          <div className="ca-stats">
            {STATS.map((s) => (
              <div className="ca-stat" key={s.label}>
                <span className="ca-stat__icon"><StatIcon type={s.icon} /></span>
                <span className="ca-stat__value">{s.value}</span>
                <span className="ca-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ca-main">
        <div className="ca-card">
          <Link to="/" className="ca-card__logo">Invexa</Link>
          <h2 className="ca-card__title">CA Login</h2>
          <p className="ca-card__desc">Secure access to your professional dashboard.</p>

          <form onSubmit={(e) => e.preventDefault()}>
            <label className="ca-field">
              <span className="ca-field__label">Email Address</span>
              <input type="email" name="email" placeholder="name@firm.com" autoComplete="email" required />
            </label>

            <label className="ca-field">
              <span className="ca-field__label">Password</span>
              <span className="ca-field__input-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="ca-field__eye"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M6.5 6.7C4.3 8.1 2.7 10 2 12c1.5 4 5.5 7 10 7 1.7 0 3.3-.4 4.7-1.1M9.9 4.2A10.6 10.6 0 0112 4c4.5 0 8.5 3 10 7-.5 1.4-1.4 2.7-2.4 3.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  ) : (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M2 12c1.5-4 5.5-7 10-7s8.5 3 10 7c-1.5 4-5.5 7-10 7s-8.5-3-10-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" /></svg>
                  )}
                </button>
              </span>
            </label>

            <div className="ca-field-row">
              <label className="ca-checkbox">
                <input type="checkbox" name="remember" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="ca-link">Forgot Password?</Link>
            </div>

            <button type="submit" className="ca-submit">Login</button>

            <p className="ca-card__footer">
              Don't have a CA account? <Link to="/ca-signup">Create Account</Link>
            </p>
          </form>
        </div>

        <div className="ca-encryption">
          <span className="ca-encryption__icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2l8 4v6c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
          </span>
          <div>
            <span className="ca-encryption__title">End-to-End Encryption</span>
            <span className="ca-encryption__sub">AES-256 data security for all client records.</span>
          </div>
        </div>

        <div className="ca-badges">
          <span>GDPR Compliant</span>
          <span>Regulatory Ready</span>
        </div>
      </div>
    </div>
  );
}
