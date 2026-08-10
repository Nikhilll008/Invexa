import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CASignup.css';

const PHOTO = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80&auto=format&fit=crop';

const IMPACT = [
  { value: '3,200+', label: 'Invoices Reviewed', icon: 'doc' },
  { value: '98%', label: 'Approval Rate', icon: 'check' },
  { value: '1,250+', label: 'GST Validations', icon: 'gst' },
];

function ImpactIcon({ type }) {
  if (type === 'doc') {
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 2h9l5 5v15a1 1 0 01-1 1H6a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>;
  }
  if (type === 'check') {
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" /><path d="M8 12.5l2.5 2.5L16 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  }
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 2h8l4 4v15a1 1 0 01-1 1H6a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M8 11h8M8 15h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>;
}

export default function CASignup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="ca-page">
      <div className="ca-photo" style={{ backgroundImage: `url(${PHOTO})` }}>
        <div className="ca-photo__overlay"></div>

        <div className="ca-photo__badges">
          <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.5 1.6 3-.4 1 2.8 2.7 1.2-.7 2.9 1.5 2.5-2 2.2.4 3-2.9.7-1.6 2.6-2.9-.8-2.9.8-1.6-2.6-2.9-.7.4-3-2-2.2 1.5-2.5-.7-2.9L7.5 3.2l3 .4L12 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg> Verified Chartered Accountant</span>
          <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2l8 4v6c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg> Secure Financial Review</span>
        </div>

        <div className="ca-photo__impact">
          <span className="ca-photo__impact-title">Platform Impact</span>
          {IMPACT.map((s) => (
            <div className="ca-impact-row" key={s.label}>
              <span className="ca-impact-row__icon"><ImpactIcon type={s.icon} /></span>
              <div>
                <span className="ca-impact-row__label">{s.label}</span>
                <span className="ca-impact-row__value">{s.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ca-main">
        <div className="ca-card ca-card--wide">
          <Link to="/" className="ca-card__logo">Invexa</Link>
          <h2 className="ca-card__title">Create CA Account</h2>
          <p className="ca-card__desc">Join our exclusive network of financial auditors and gain access to high-precision algorithmic tools.</p>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="ca-grid">
              <label className="ca-field">
                <span className="ca-field__label">Full Name</span>
                <input type="text" name="fullName" placeholder="John Doe" autoComplete="name" required />
              </label>

              <label className="ca-field">
                <span className="ca-field__label">Email Address</span>
                <input type="email" name="email" placeholder="john@firm.com" autoComplete="email" required />
              </label>

              <label className="ca-field">
                <span className="ca-field__label">Mobile Number</span>
                <span className="ca-field__phone-wrap">
                  <span className="ca-field__country-code">+91</span>
                  <input type="tel" name="mobile" placeholder="98765 43210" autoComplete="tel" required />
                </span>
              </label>

              <label className="ca-field">
                <span className="ca-field__label">ICAI Membership Number</span>
                <input type="text" name="icaiNumber" placeholder="MRN 123456" required />
              </label>

              <label className="ca-field ca-field--full">
                <span className="ca-field__label">Firm Name</span>
                <input type="text" name="firmName" placeholder="Doe & Associates Chartered Accountants" required />
              </label>

              <label className="ca-field">
                <span className="ca-field__label">Password</span>
                <span className="ca-field__input-wrap">
                  <input type={showPassword ? 'text' : 'password'} name="password" placeholder="••••••••" autoComplete="new-password" required />
                  <button type="button" className="ca-field__eye" onClick={() => setShowPassword((v) => !v)} aria-label="Toggle password">
                    <EyeIcon show={showPassword} />
                  </button>
                </span>
              </label>

              <label className="ca-field">
                <span className="ca-field__label">Confirm Password</span>
                <span className="ca-field__input-wrap">
                  <input type={showConfirm ? 'text' : 'password'} name="confirmPassword" placeholder="••••••••" autoComplete="new-password" required />
                  <button type="button" className="ca-field__eye" onClick={() => setShowConfirm((v) => !v)} aria-label="Toggle confirm password">
                    <EyeIcon show={showConfirm} />
                  </button>
                </span>
              </label>
            </div>

            <label className="ca-confirm-checkbox">
              <input type="checkbox" name="confirmCA" required />
              <span>I confirm that I am a registered Chartered Accountant and my membership with ICAI is currently active and in good standing.</span>
            </label>

            <button type="submit" className="ca-submit">
              Create Account
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>

            <p className="ca-card__footer">
              Already have an account? <Link to="/ca-login">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

function EyeIcon({ show }) {
  return show ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M6.5 6.7C4.3 8.1 2.7 10 2 12c1.5 4 5.5 7 10 7 1.7 0 3.3-.4 4.7-1.1M9.9 4.2A10.6 10.6 0 0112 4c4.5 0 8.5 3 10 7-.5 1.4-1.4 2.7-2.4 3.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M2 12c1.5-4 5.5-7 10-7s8.5 3 10 7c-1.5 4-5.5 7-10 7s-8.5-3-10-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" /></svg>
  );
}
