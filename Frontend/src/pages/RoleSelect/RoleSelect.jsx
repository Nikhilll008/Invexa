import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RoleSelect.css';

function ShopOwnerAvatar({ active }) {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="32" fill={active ? 'url(#shopBg)' : '#F1F5F9'} />
      <path d="M20 28l1.6-8h20.8l1.6 8" stroke={active ? '#fff' : '#334155'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 28h28v3a4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 01-4 4 4 4 0 01-4-4v-3z" stroke={active ? '#fff' : '#334155'} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M21 35v11a1.5 1.5 0 001.5 1.5h19a1.5 1.5 0 001.5-1.5V35" stroke={active ? '#fff' : '#334155'} strokeWidth="1.8" strokeLinejoin="round" />
      <rect x="28" y="39" width="8" height="8.5" rx="0.5" stroke={active ? '#fff' : '#334155'} strokeWidth="1.6" />
      <defs>
        <linearGradient id="shopBg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0D9488" />
          <stop offset="1" stopColor="#2DD4BF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CAAvatar({ active }) {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="32" fill={active ? 'url(#caBg)' : '#F1F5F9'} />
      <circle cx="32" cy="24" r="8" fill={active ? 'rgba(255,255,255,0.9)' : '#CBD5E1'} />
      <path d="M16 50c0-9.4 7.2-17 16-17s16 7.6 16 17" stroke={active ? '#fff' : '#334155'} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M25 36l7 4 7-4" stroke={active ? '#fff' : '#334155'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 40v9" stroke={active ? '#fff' : '#334155'} strokeWidth="1.8" strokeLinecap="round" />
      <defs>
        <linearGradient id="caBg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0D9488" />
          <stop offset="1" stopColor="#2DD4BF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const ROLES = [
  {
    id: 'shop',
    label: 'Shop Owner',
    desc: 'Upload bills, track GST and sync invoices to Tally.',
    Avatar: ShopOwnerAvatar,
    loginPath: '/login',
    signupPath: '/signup',
  },
  {
    id: 'ca',
    label: 'Chartered Accountant',
    desc: 'Review, validate and approve client invoices.',
    Avatar: CAAvatar,
    loginPath: '/ca-login',
    signupPath: '/ca-signup',
  },
];

export default function RoleSelect() {
  const [selected, setSelected] = useState(null);
  const role = ROLES.find((r) => r.id === selected);

  return (
    <div className="role-page">
      <span className="role-page__blob role-page__blob--a" aria-hidden="true"></span>
      <span className="role-page__blob role-page__blob--b" aria-hidden="true"></span>

      <Link to="/" className="role-page__logo">Invexa</Link>

      <div className="role-page__body">
        <h1 className="role-page__title">What's Your Role?</h1>
        <p className="role-page__desc">Choose how you'll use Invexa so we can set up the right dashboard for you.</p>

        <div className="role-cards">
          {ROLES.map((r) => {
            const active = selected === r.id;
            const Avatar = r.Avatar;
            return (
              <button
                key={r.id}
                type="button"
                className={`role-card ${active ? 'role-card--active' : ''}`}
                onClick={() => setSelected(r.id)}
              >
                {active && (
                  <span className="role-card__check">
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 7l2.5 2.5L11 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                )}
                <Avatar active={active} />
                <span className="role-card__label">{r.label}</span>
                <span className="role-card__desc">{r.desc}</span>
              </button>
            );
          })}
        </div>

        <div className={`role-continue ${role ? 'role-continue--visible' : ''}`}>
          {role && (
            <>
              <p className="role-continue__text">Continue as <strong>{role.label}</strong></p>
              <div className="role-continue__actions">
                <Link to={role.loginPath} className="btn-role btn-role--secondary">Sign In</Link>
                <Link to={role.signupPath} className="btn-role btn-role--primary">
                  Create Account
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
