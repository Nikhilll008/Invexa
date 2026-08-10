import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="fp-page">
      <header className="fp-nav">
        <Link to="/" className="fp-nav__logo">Invexa</Link>
        <div className="fp-nav__actions">
          <a href="#contact" className="fp-nav__link">Contact Sales</a>
          <Link to="/login" className="btn-sign-in">Sign In</Link>
        </div>
      </header>

      <main className="fp-main">
        <div className="fp-card">
          <span className="fp-card__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.6" />
              <path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M4 5a7 7 0 0111.5-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M4 2v3h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>

          <h1 className="fp-card__title">Forgot Password</h1>
          <p className="fp-card__desc">
            Enter your registered email or mobile number to receive a recovery code.
          </p>

          {sent ? (
            <div className="fp-success">
              <span className="fp-success__icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10l4 4 8-8" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              Recovery code sent. Check your email or SMS inbox.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label className="fp-field">
                <span className="fp-field__label">Email or Mobile Number</span>
                <input type="text" name="identifier" placeholder="name@company.com" required />
              </label>

              <button type="submit" className="fp-submit">Send Recovery Code</button>
            </form>
          )}

          <Link to="/login" className="fp-back">Back to Login</Link>
        </div>
      </main>

      <footer className="fp-footer">
        <div className="fp-footer__brand">
          <span className="fp-footer__logo">Invexa</span>
          <span className="fp-footer__copy">© 2026. Precision Engineering for Modern Finance.</span>
        </div>
        <nav className="fp-footer__links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#status">Status</a>
        </nav>
      </footer>
    </div>
  );
}
