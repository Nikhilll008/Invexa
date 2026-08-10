import React, { useState } from 'react';
import './Settings.css';

const ICONS = {
  bell: <><path d="M6 9a6 6 0 1112 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9z" /><path d="M10 19a2 2 0 004 0" /></>,
  mail: <><path d="M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" /><path d="M3.5 6.5L12 13l8.5-6.5" /></>,
  sync: <><path d="M21 12a9 9 0 01-15.5 6.3M3 12a9 9 0 0115.5-6.3" /><path d="M21 5v5h-5M3 19v-5h5" /></>,
  moon: <path d="M20 14.5A8.5 8.5 0 119.5 4a7 7 0 0010.5 10.5z" />,
  shield: <><path d="M12 2l8 4v6c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-4z" /><path d="M9 12l2 2 4-4" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" /></>,
};

function Icon({ name, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      className={`toggle ${checked ? 'toggle--on' : ''}`}
      role="switch"
      aria-checked={checked}
      onClick={onChange}
    >
      <span className="toggle__knob"></span>
    </button>
  );
}

export default function Settings() {
  const [prefs, setPrefs] = useState({
    emailNotif: true,
    smsAlerts: false,
    autoSyncTally: true,
    darkMode: false,
    twoFactor: true,
  });

  const toggle = (key) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const PREF_ROWS = [
    { key: 'emailNotif', icon: 'mail', label: 'Email Notifications', desc: 'Get invoice and approval updates by email.' },
    { key: 'smsAlerts', icon: 'bell', label: 'SMS Alerts', desc: 'Receive an SMS when an invoice is approved or rejected.' },
    { key: 'autoSyncTally', icon: 'sync', label: 'Auto-Sync with Tally', desc: 'Automatically push approved XML files to Tally Prime.' },
    { key: 'darkMode', icon: 'moon', label: 'Dark Mode', desc: 'Switch the dashboard to a darker color theme.' },
    { key: 'twoFactor', icon: 'shield', label: 'Two-Factor Authentication', desc: 'Require an OTP each time you sign in.' },
  ];

  return (
    <div className="settings-page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-sub">Manage how Invexa works for your account.</p>
        </div>
      </div>

      <section className="set-card">
        <h2 className="set-card__title">Account Preferences</h2>

        <div className="set-list">
          {PREF_ROWS.map((row) => (
            <div className="set-row" key={row.key}>
              <span className="set-row__icon"><Icon name={row.icon} size={17} /></span>
              <div className="set-row__meta">
                <span className="set-row__label">{row.label}</span>
                <span className="set-row__desc">{row.desc}</span>
              </div>
              <Toggle checked={prefs[row.key]} onChange={() => toggle(row.key)} />
            </div>
          ))}

          <div className="set-row">
            <span className="set-row__icon"><Icon name="globe" size={17} /></span>
            <div className="set-row__meta">
              <span className="set-row__label">Language</span>
              <span className="set-row__desc">Choose the display language for your dashboard.</span>
            </div>
            <select className="set-select" defaultValue="English">
              <option>English</option>
              <option>Hindi</option>
              <option>Marathi</option>
            </select>
          </div>
        </div>

        <div className="set-actions">
          <button className="btn-solid">Save Preferences</button>
        </div>
      </section>
    </div>
  );
}
