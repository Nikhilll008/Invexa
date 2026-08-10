import React, { useState } from 'react';
import './HelpSupport.css';

const ICONS = {
  mail: <><path d="M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" /><path d="M3.5 6.5L12 13l8.5-6.5" /></>,
  phone: <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.4 2.1L8 9.9a16 16 0 006 6l1.4-1.4a2 2 0 012.1-.4c.9.3 1.8.5 2.7.6a2 2 0 011.8 2.2z" />,
  chat: <path d="M21 11.5a8.4 8.4 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.4 8.4 0 01-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.4 8.4 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />,
  check: <path d="M4 12l5 5L20 6" />,
};

function Icon({ name, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}

export default function HelpSupport() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="help-page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Help &amp; Support</h1>
          <p className="page-sub">Have a question or an issue? Send us a message and we'll get back to you.</p>
        </div>
      </div>

      <div className="help-grid">
        <section className="help-form-card">
          <h2 className="help-card__title">Contact Support</h2>

          {sent ? (
            <div className="help-success">
              <span className="help-success__icon"><Icon name="check" size={20} /></span>
              <p><b>Message sent.</b> Our support team will reply to your registered email within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label className="help-field">
                <span>Subject</span>
                <input
                  type="text"
                  placeholder="What do you need help with?"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                />
              </label>

              <label className="help-field">
                <span>Message</span>
                <textarea
                  rows={5}
                  placeholder="Describe your issue in detail..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                />
              </label>

              <button type="submit" className="btn-solid">Send Message</button>
            </form>
          )}
        </section>

        <aside className="help-contact-card">
          <h2 className="help-card__title">Other Ways to Reach Us</h2>

          <div className="help-contact-item">
            <span className="help-contact-item__icon"><Icon name="mail" size={16} /></span>
            <div>
              <span className="help-contact-item__label">Email</span>
              <span className="help-contact-item__value">support@invexa.com</span>
            </div>
          </div>

          <div className="help-contact-item">
            <span className="help-contact-item__icon"><Icon name="phone" size={16} /></span>
            <div>
              <span className="help-contact-item__label">Phone</span>
              <span className="help-contact-item__value">+91 1800-123-4567</span>
            </div>
          </div>

          <div className="help-contact-item">
            <span className="help-contact-item__icon"><Icon name="chat" size={16} /></span>
            <div>
              <span className="help-contact-item__label">Live Chat</span>
              <span className="help-contact-item__value">Mon–Sat, 9 AM – 7 PM IST</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
