import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./Dashboard.css";

import MyAccount from "../MyAccount/MyAccount";
import Invoices from "../Invoices/Invoices";
import Settings from "../Settings/Settings";
import Notifications from "../Notifications/Notifications";
import HelpSupport from "../HelpSupport/HelpSupport";

/* 
   ICONS
    */
const I = {
  dashboard: <path d="M4 4h7v7H4V4zm9 0h7v4h-7V4zm0 8h7v8h-7v-8zM4 14h7v6H4v-6z" />,
  upload: <><path d="M12 15V4M12 4L8 8M12 4l4 4" /><path d="M4 15v3a2 2 0 002 2h12a2 2 0 002-2v-3" /></>,
  history: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  track: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></>,
  xml: <><path d="M6 2h9l5 5v13a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" /><path d="M15 2v5h5" /></>,
  bell: <><path d="M6 9a6 6 0 1112 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9z" /><path d="M10 19a2 2 0 004 0" /></>,
  moon: <path d="M20 14.5A8.5 8.5 0 119.5 4a7 7 0 0010.5 10.5z" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.6V21a2 2 0 01-4 0v-.2a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.5-1H3a2 2 0 010-4h.2a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.9.3H9a1.7 1.7 0 001-1.5V3a2 2 0 014 0v.2a1.7 1.7 0 001 1.5 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.9V9a1.7 1.7 0 001.5 1h.2a2 2 0 010 4h-.2a1.7 1.7 0 00-1.5 1z" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 114 2.1c-.7.5-1.5 1-1.5 2.4" /><circle cx="12" cy="17" r="0.4" fill="currentColor" /></>,
  logout: <><path d="M9 21H6a2 2 0 01-2-2V5a2 2 0 012-2h3" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" /></>,
  cloud: <><path d="M7 18a4.5 4.5 0 01-.4-9 5.5 5.5 0 0110.7-1.8A4.5 4.5 0 0117 18H7z" /><path d="M12 12v6M9.5 15.5L12 13l2.5 2.5" /></>,
  file: <><path d="M6 2h9l5 5v13a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" /><path d="M9 13l2 2 4-4" /></>,
  ocr: <><path d="M7 3H4a1 1 0 00-1 1v3M17 3h3a1 1 0 011 1v3M7 21H4a1 1 0 01-1-1v-3M17 21h3a1 1 0 001-1v-3" /><path d="M4 12h16" /></>,
  ca: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></>,
  approved: <><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.5 2.5L16 9.5" /></>,
  rejected: <><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" /></>,
  chevronDown: <path d="M6 9l6 6 6-6" />,
  eye: <><path d="M2 12c1.8-4.4 6-7.5 10-7.5s8.2 3.1 10 7.5c-1.8 4.4-6 7.5-10 7.5S3.8 16.4 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  download: <><path d="M12 3v12M7 10l5 5 5-5" /><path d="M4 21h16" /></>,
  arrowRight: <path d="M4 12h14M13 6l6 6-6 6" />,
  trendUp: <path d="M4 15l6-6 4 4 6-6M20 7h-4v4" />,
  trendDown: <path d="M4 8l6 6 4-4 6 6M20 16h-4v-4" />,
  doc: <><path d="M6 2h9l5 5v13a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" /><path d="M8 12h8M8 16h5" /></>,
  book: <><path d="M4 4.5A2.5 2.5 0 016.5 2H20v17H6.5A2.5 2.5 0 004 21.5v-17z" /><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /></>,
  chat: <path d="M21 11.5a8.4 8.4 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.4 8.4 0 01-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.4 8.4 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />,
  more: <><circle cx="5" cy="12" r="1.4" /><circle cx="12" cy="12" r="1.4" /><circle cx="19" cy="12" r="1.4" /></>,
};

function Icon({ name, size = 18, strokeWidth = 1.7 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {I[name]}
    </svg>
  );
}

/* 
   ICON RAIL (slim vertical icon-only dock)
    */
const RAIL_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: "dashboard" },
  { key: "notifications", label: "Notifications", icon: "bell" },
  { key: "my-account", label: "My Account", icon: "user" },
  { key: "settings", label: "Settings", icon: "settings" },
  { key: "help", label: "Help Support", icon: "help" },
];

function IconRail({ activeSection, setActiveSection }) {
  const [dark, setDark] = useState(false);

  return (
    <aside className="rail">
      <div className="rail__logo">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="6" fill="url(#railLogoGrad)" />
          <path d="M8 12.5L10.5 15L16 9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id="railLogoGrad" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0D9488" />
              <stop offset="1" stopColor="#2DD4BF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

     <button
        className={`rail__btn ${dark ? "rail__btn--active" : ""}`}
        onClick={() => setDark((v) => !v)}
        title="Toggle dark mode"
        aria-label="Toggle dark mode"
      >
        <Icon name="moon" size={18} />
      </button>

      <nav className="rail__nav">
        {RAIL_ITEMS.map((item) => (
          <button
            key={item.key}
            className={`rail__btn ${
              activeSection === item.key
                ? "rail__btn--active"
                : ""
            }`}
            onClick={() => setActiveSection(item.key)}
            title={item.label}
            aria-label={item.label}
          >
            <Icon name={item.icon} size={18} />

            {item.key === "notifications" && (
              <span className="rail__dot"></span>
            )}
          </button>
        ))}
      </nav>

      <button className="rail__btn rail__logout" title="Logout" aria-label="Logout">
        <Icon name="logout" size={18} />
      </button>
    </aside>
  );
}

/* 
   TOP NAV (horizontal tab menu)
    */
const TOP_TABS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "invoices", label: "Invoices" },
  { key: "my-account", label: "My Account" },
  { key: "settings", label: "Settings" },
  { key: "notifications", label: "Notifications" },
  { key: "help", label: "Help Support" },
];

function TopNav({ owner, activeSection, setActiveSection }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="top-tabs">
        {TOP_TABS.map((t) => (
          <button
            key={t.key}
            className={`top-tabs__item ${
  activeSection === t.key ? "top-tabs__item--active" : ""}`}
onClick={() => setActiveSection(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="topbar__actions">
        <div className="topbar__search">
          <Icon name="search" size={15} />
          <input type="text" placeholder="Search..." />
        </div>

        <div className="topbar__profile" onClick={() => setMenuOpen((v) => !v)}>
<span className="topbar__avatar">
    {owner.ownerName.charAt(0).toUpperCase()}
</span>         
 <div className="topbar__profile-meta">
{owner.ownerName}
{owner.businessName}
          </div>
          <Icon name="chevronDown" size={15} />

          {menuOpen && (
            <div className="topbar__dropdown">
              <a href="#profile">View Profile</a>
              <a href="#settings">Settings</a>
              <a href="#logout">Logout</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

/* 
   WELCOME SECTION
    */
function WelcomeSection({ owner }) {
      return (
    <section className="welcome">
      <div className="welcome__copy">
        <p className="welcome__eyebrow">Good morning</p>
        <h1 className="welcome__title">Welcome back, {owner.ownerName} 👋</h1>
        <p className="welcome__desc">
          You have 12 invoices processing and 8 waiting for CA review. Let's keep your books current.
        </p>
        <div className="welcome__actions">
          <button className="btn-dash btn-dash--primary">
            <Icon name="upload" size={16} />
            Upload Invoice
          </button>
          <button className="btn-dash btn-dash--secondary">
            View History
            <Icon name="arrowRight" size={16} />
          </button>
        </div>
      </div>

      <div className="welcome__art" aria-hidden="true">
        <svg width="220" height="170" viewBox="0 0 220 170" fill="none">
          <ellipse cx="110" cy="150" rx="90" ry="12" fill="#0D9488" opacity="0.06" />
          <rect x="40" y="30" width="100" height="110" rx="12" fill="#F0FDFA" stroke="#0D9488" strokeWidth="1.4" />
          <rect x="54" y="48" width="72" height="8" rx="4" fill="#99F6E4" />
          <rect x="54" y="64" width="50" height="8" rx="4" fill="#CCFBF1" />
          <rect x="54" y="80" width="60" height="8" rx="4" fill="#CCFBF1" />
          <rect x="54" y="106" width="72" height="20" rx="6" fill="url(#weGrad)" />
          <circle cx="150" cy="60" r="30" fill="#0D9488" opacity="0.08" />
          <path d="M138 60l8 8 16-16" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id="weGrad" x1="54" y1="106" x2="126" y2="126" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0D9488" />
              <stop offset="1" stopColor="#2DD4BF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}

/* 
   STATS SECTION
    */
const STATS = [
  { label: 'Total Uploaded', desc: 'Invoices this month', value: '428', change: '+8.2%', up: true, icon: 'doc' },
  { label: 'OCR Processing', desc: 'Currently extracting', value: '12', change: '+2', up: true, icon: 'ocr' },
  { label: 'Under CA Review', desc: 'Awaiting approval', value: '8', change: '-3', up: false, icon: 'ca' },
  { label: 'Approved', desc: 'Verified invoices', value: '382', change: '+14', up: true, icon: 'approved' },
  { label: 'Rejected', desc: 'Needs correction', value: '6', change: '+1', up: false, icon: 'rejected' },
  { label: 'XML Ready', desc: 'Ready for Tally', value: '20', change: '+5', up: true, icon: 'xml' },
];

function StatsSection() {
  return (
    <section className="stats">
      {STATS.map((s) => (
        <div className="stat-card" key={s.label}>
          <div className="stat-card__top">
            <span className="stat-card__icon"><Icon name={s.icon} size={17} /></span>
            <span className={`stat-card__change ${s.up ? 'stat-card__change--up' : 'stat-card__change--down'}`}>
              <Icon name={s.up ? 'trendUp' : 'trendDown'} size={12} />
              {s.change}
            </span>
          </div>
          <span className="stat-card__value">{s.value}</span>
          <span className="stat-card__label">{s.label}</span>
          <span className="stat-card__desc">{s.desc}</span>
        </div>
      ))}
    </section>
  );
}

/* 
   QUICK ACTIONS
    */
const ACTIONS = [
  { label: 'Upload Invoice', desc: 'Add a new bill', icon: 'upload' },
  { label: 'Track Invoice', desc: 'Check live status', icon: 'track' },
  { label: 'Invoice History', desc: 'Browse past bills', icon: 'history' },
  { label: 'Download XML', desc: 'Export for Tally', icon: 'xml' },
];

function QuickActions() {
  return (
    <section className="quick">
      <h2 className="section-title">Quick Actions</h2>
      <div className="quick__grid">
        {ACTIONS.map((a) => (
          <button className="quick__card" key={a.label}>
            <span className="quick__icon"><Icon name={a.icon} size={19} /></span>
            <span className="quick__label">{a.label}</span>
            <span className="quick__desc">{a.desc}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

/* 
   UPLOAD SECTION
    */
function UploadSection() {
  const [progress, setProgress] = useState(64);

  return (
    <section className="upload-section">
      <h2 className="section-title">Upload Invoice</h2>

      <div className="upload-zone">
        <span className="upload-zone__icon"><Icon name="cloud" size={30} strokeWidth={1.5} /></span>
        <p className="upload-zone__title">Drag &amp; drop your invoice here</p>
        <p className="upload-zone__sub">Supported formats: PDF, PNG, JPG · Max 10MB</p>
        <button className="btn-dash btn-dash--primary upload-zone__browse">Browse Files</button>
      </div>

      <div className="upload-recent">
        <div className="upload-recent__file">
          <span className="upload-recent__icon">PDF</span>
          <div className="upload-recent__meta">
            <span className="upload-recent__name">retail-invoice-0417.pdf</span>
            <span className="upload-recent__sub">2.1 MB · Uploading…</span>
          </div>
          <span className="upload-recent__pct">{progress}%</span>
        </div>
        <div className="upload-progress">
          <div className="upload-progress__fill" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="upload-actions">
          <button className="btn-dash btn-dash--secondary" onClick={() => setProgress(0)}>Cancel</button>
          <button className="btn-dash btn-dash--primary" onClick={() => setProgress(100)}>Upload</button>
        </div>
      </div>
    </section>
  );
}

/* 
   WORKFLOW SECTION
    */
const WORKFLOW_STEPS = [
  { label: 'Upload', icon: 'upload' },
  { label: 'OCR Extraction', icon: 'ocr' },
  { label: 'Validation', icon: 'approved' },
  { label: 'CA Review', icon: 'ca' },
  { label: 'Approved', icon: 'approved' },
  { label: 'XML Generated', icon: 'xml' },
  { label: 'Ready for Tally', icon: 'doc' },
];

function WorkflowSection() {
  return (
    <section className="workflow-dash">
      <h2 className="section-title">Invoice Workflow</h2>
      <div className="workflow-dash__track">
        {WORKFLOW_STEPS.map((s, i) => (
          <React.Fragment key={s.label}>
            <div className={`workflow-dash__step ${i < 4 ? 'workflow-dash__step--done' : ''}`}>
              <span className="workflow-dash__icon"><Icon name={s.icon} size={17} /></span>
              <span className="workflow-dash__label">{s.label}</span>
            </div>
            {i < WORKFLOW_STEPS.length - 1 && (
              <span className={`workflow-dash__connector ${i < 3 ? 'workflow-dash__connector--done' : ''}`}></span>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

/* 
   RECENT INVOICES TABLE
    */
const INVOICES = [
  { id: 'INV-2041', vendor: 'Sharma Wholesale', date: '04 Aug 2026', amount: '₹12,480', status: 'Approved' },
  { id: 'INV-2040', vendor: 'Metro Traders', date: '03 Aug 2026', amount: '₹8,250', status: 'XML Ready' },
  { id: 'INV-2039', vendor: 'Patel Distributors', date: '03 Aug 2026', amount: '₹21,900', status: 'Review' },
  { id: 'INV-2038', vendor: 'Gupta Enterprises', date: '02 Aug 2026', amount: '₹5,760', status: 'OCR' },
  { id: 'INV-2037', vendor: 'Verma & Sons', date: '01 Aug 2026', amount: '₹14,300', status: 'Rejected' },
];

const STATUS_CLASS = {
  Uploaded: 'badge--uploaded',
  OCR: 'badge--ocr',
  Review: 'badge--review',
  Approved: 'badge--approved',
  Rejected: 'badge--rejected',
  'XML Ready': 'badge--xml',
};

function InvoicesTable() {
  return (
    <section className="invoices">
      <div className="section-head">
        <h2 className="section-title">Recent Invoices</h2>
        <a href="#history" className="section-link">View all</a>
      </div>

      <div className="invoices__table-wrap">
        <table className="invoices__table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Vendor</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {INVOICES.map((inv) => (
              <tr key={inv.id}>
                <td className="invoices__id">{inv.id}</td>
                <td>{inv.vendor}</td>
                <td>{inv.date}</td>
                <td>{inv.amount}</td>
                <td>
                  <span className={`badge ${STATUS_CLASS[inv.status]}`}>{inv.status}</span>
                </td>
                <td>
                  <div className="invoices__row-actions">
                    <button aria-label="View"><Icon name="eye" size={15} /></button>
                    <button aria-label="Track"><Icon name="track" size={15} /></button>
                    <button aria-label="Download"><Icon name="download" size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* 
   ANALYTICS SECTION
    */
const MONTHLY = [
  { m: 'Jan', v: 30 }, { m: 'Feb', v: 42 }, { m: 'Mar', v: 38 }, { m: 'Apr', v: 55 },
  { m: 'May', v: 48 }, { m: 'Jun', v: 62 }, { m: 'Jul', v: 58 }, { m: 'Aug', v: 70 },
];
const STATUS_SPLIT = [
  { label: 'Approved', pct: 68, color: '#0D9488' },
  { label: 'Review', pct: 18, color: '#2DD4BF' },
  { label: 'OCR', pct: 9, color: '#F59E0B' },
  { label: 'Rejected', pct: 5, color: '#EF4444' },
];

function DonutChart() {
  let cumulative = 0;
  const stops = STATUS_SPLIT.map((s) => {
    const start = cumulative;
    cumulative += s.pct;
    return `${s.color} ${start}% ${cumulative}%`;
  }).join(', ');

  return (
    <div className="donut" style={{ background: `conic-gradient(${stops})` }}>
      <div className="donut__hole">
        <span>96%</span>
        <small>Approval Rate</small>
      </div>
    </div>
  );
}

function AnalyticsSection() {
  const maxV = Math.max(...MONTHLY.map((d) => d.v));

  return (
    <section className="analytics">
      <h2 className="section-title">Analytics</h2>
      <div className="analytics__grid">
        <div className="analytics__card analytics__card--wide">
          <div className="analytics__card-head">
            <span>Monthly Uploads</span>
            <span className="analytics__card-sub">Last 8 months</span>
          </div>
          <div className="bar-chart">
            {MONTHLY.map((d) => (
              <div className="bar-chart__col" key={d.m}>
                <div className="bar-chart__bar" style={{ height: `${(d.v / maxV) * 100}%` }}></div>
                <span>{d.m}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics__card">
          <div className="analytics__card-head">
            <span>Invoice Status</span>
          </div>
          <DonutChart />
          <ul className="donut-legend">
            {STATUS_SPLIT.map((s) => (
              <li key={s.label}>
                <span className="donut-legend__dot" style={{ background: s.color }}></span>
                {s.label} <b>{s.pct}%</b>
              </li>
            ))}
          </ul>
        </div>

        <div className="analytics__card">
          <div className="analytics__card-head">
            <span>Avg. Processing Time</span>
          </div>
          <div className="processing-time">
            <span className="processing-time__value">2.4 hrs</span>
            <span className="processing-time__change stat-card__change--up">
              <Icon name="trendUp" size={12} /> 18% faster
            </span>
            <svg className="processing-time__spark" width="100%" height="46" viewBox="0 0 160 46" preserveAspectRatio="none">
              <polyline points="0,36 24,30 48,32 72,20 96,24 120,12 144,16 160,6" fill="none" stroke="#0D9488" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 
   RIGHT COLUMN — PROFILE CARD
    */
function ProfileCard({ owner }) {
    return (
    <section className="side-card profile-card">
      <span className="profile-card__avatar">
    {owner.ownerName.charAt(0).toUpperCase()}
</span>
<span className="profile-card__company">
    {owner.businessName}
</span>
<span className="profile-card__gst">
    GSTIN : {owner.gstNumber}
</span>
<span className="profile-card__email">
    {owner.businessEmail}
</span>
      <button className="btn-dash btn-dash--secondary profile-card__btn">View Profile</button>
    </section>
  );
}

/* 
   RIGHT COLUMN — NOTIFICATION PANEL
    */
const NOTIFICATIONS = [
  { text: 'Invoice INV-2041 uploaded successfully', time: '5m ago', icon: 'upload' },
  { text: 'OCR completed for INV-2040', time: '22m ago', icon: 'ocr' },
  { text: 'INV-2038 approved by CA', time: '1h ago', icon: 'approved' },
  { text: 'XML ready for INV-2039', time: '2h ago', icon: 'xml' },
  { text: 'INV-2037 rejected — missing GST no.', time: '3h ago', icon: 'rejected' },
];

function NotificationPanel() {
  return (
    <section className="side-card">
      <div className="section-head section-head--tight">
        <h3 className="side-card__title">Notifications</h3>
        <span className="topbar__badge topbar__badge--static">3 new</span>
      </div>
      <ul className="notif-list">
        {NOTIFICATIONS.map((n, i) => (
          <li key={i}>
            <span className={`notif-list__icon notif-list__icon--${n.icon}`}><Icon name={n.icon} size={14} /></span>
            <div>
              <p>{n.text}</p>
              <span>{n.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* 
   RIGHT COLUMN — RECENT ACTIVITY TIMELINE
    */
const ACTIVITY = [
  { label: 'Invoice Uploaded', time: 'Today, 10:12 AM' },
  { label: 'OCR Started', time: 'Today, 10:13 AM' },
  { label: 'OCR Completed', time: 'Today, 10:15 AM' },
  { label: 'Validation Passed', time: 'Today, 10:16 AM' },
  { label: 'Sent to CA', time: 'Today, 10:20 AM' },
  { label: 'Approved', time: 'Today, 11:02 AM' },
  { label: 'XML Generated', time: 'Today, 11:03 AM' },
];

function RecentActivity() {
  return (
    <section className="side-card">
      <h3 className="side-card__title">Recent Activity</h3>
      <ul className="timeline">
        {ACTIVITY.map((a, i) => (
          <li key={a.label} className={i === ACTIVITY.length - 1 ? 'timeline__item--last' : ''}>
            <span className="timeline__dot"></span>
            <div>
              <p>{a.label}</p>
              <span>{a.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* RIGHT COLUMN — HELP CARD*/
function HelpCard() {
  return (
    <section className="side-card help-card">
      <h3 className="side-card__title">Need Help?</h3>
      <p className="help-card__desc">Get answers or reach out to our support team anytime.</p>
      <a href="#docs" className="help-card__link"><Icon name="book" size={15} /> Documentation</a>
      <a href="#support" className="help-card__link"><Icon name="chat" size={15} /> Support</a>
      <a href="#faq" className="help-card__link"><Icon name="help" size={15} /> FAQ</a>
    </section>
  );
}




function DashboardFooter() {
  return (
    <footer className="dash-footer">
      <span className="dash-footer__brand">Invexa</span>
      <span>v1.0.0</span>
      <span>
        © {new Date().getFullYear()} Invexa. All rights reserved.
      </span>
    </footer>
  );
}

/* ========================================================
   FOOTER
   ======================================================== */
export default function Dashboard() {

    const [activeSection, setActiveSection] = useState("dashboard");

    // Get logged in owner

    // Get logged in owner
    const ownerData = localStorage.getItem("owner");
    const owner = ownerData ? JSON.parse(ownerData) : null;

    // If user is not logged in
    if (!owner) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="dash">

            <IconRail
  activeSection={activeSection}
  setActiveSection={setActiveSection}
/>

            <div className="dash__body">

                <TopNav
    owner={owner}
    activeSection={activeSection}
    setActiveSection={setActiveSection}
/>

                <main className="dash__main">

                    <div className="dash__grid">

                        <div className="dash__col-main">

    {activeSection === "dashboard" && (
        <>
            <WelcomeSection owner={owner} />

            <StatsSection />

            <QuickActions />

            <UploadSection />

            <WorkflowSection />

            <InvoicesTable />

            <AnalyticsSection />
        </>
    )}

    {activeSection === "my-account" && (
        <MyAccount />
    )}

    {activeSection === "invoices" && (
        <Invoices />
    )}

    {activeSection === "settings" && (
        <Settings />
    )}

    {activeSection === "notifications" && (
        <Notifications />
    )}

    {activeSection === "help" && (
        <HelpSupport />
    )}

</div>

                        <div className="dash__col-side">

                            <ProfileCard owner={owner} />

                            <NotificationPanel />

                            <RecentActivity />

                            <HelpCard />

                        </div>

                    </div>

                    <DashboardFooter />

                </main>

            </div>

        </div>
    );
}