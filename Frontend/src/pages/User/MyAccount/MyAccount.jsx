import React, { useState } from 'react';
import './MyAccount.css';

const ICONS = {
  edit: <path d="M4 20h4l11-11-4-4L4 16v4z" />,
  mail: <><path d="M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" /><path d="M3.5 6.5L12 13l8.5-6.5" /></>,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></>,
  eye: <><path d="M2 12c1.8-4.4 6-7.5 10-7.5s8.2 3.1 10 7.5c-1.8 4.4-6 7.5-10 7.5S3.8 16.4 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  eyeOff: <path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M6.5 6.7C4.3 8.1 2.7 10 2 12c1.5 4 5.5 7 10 7 1.7 0 3.3-.4 4.7-1.1M9.9 4.2A10.6 10.6 0 0112 4c4.5 0 8.5 3 10 7-.5 1.4-1.4 2.7-2.4 3.8" />,
  check: <path d="M4 12l5 5L20 6" />,
};

function Icon({ name, size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}

const STATES = [
  'Andhra Pradesh', 'Delhi', 'Gujarat', 'Karnataka', 'Maharashtra',
  'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal',
];

export default function MyAccount() {
  const [editing, setEditing] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@shop.com',
    mobile: '+91 98765 43210',
  });

  const [business, setBusiness] = useState({
    businessName: 'Sharma Retail Store',
    gst: '27AAAPS1234C1Z5',
    state: 'Maharashtra',
    city: 'Nashik',
    pincode: '422001',
  });

  const handleProfileChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
  const handleBusinessChange = (e) => setBusiness({ ...business, [e.target.name]: e.target.value });

  const requestPasswordEmail = (e) => {
    e.preventDefault();
    setEmailSent(true);
  };

  return (
    <div className="account-page">
      <div className="page-head">
        <div>
          <h1 className="page-title">My Account</h1>
          <p className="page-sub">Manage your personal and business details.</p>
        </div>
        <button className="btn-outline" onClick={() => setEditing((v) => !v)}>
          <Icon name="edit" size={15} />
          {editing ? 'Done Editing' : 'Edit Profile'}
        </button>
      </div>

      {/* Owner Profile */}
      <section className="acc-card">
        <div className="acc-card__head">
          <span className="acc-avatar">RS</span>
          <div>
            <h2 className="acc-card__title">Owner Profile</h2>
            <p className="acc-card__sub">Your personal details</p>
          </div>
        </div>

        <div className="acc-grid">
          <label className="acc-field">
            <span>Full Name</span>
            <input type="text" name="name" value={profile.name} disabled={!editing} onChange={handleProfileChange} />
          </label>
          <label className="acc-field">
            <span>Email Address</span>
            <input type="email" name="email" value={profile.email} disabled={!editing} onChange={handleProfileChange} />
          </label>
          <label className="acc-field">
            <span>Mobile Number</span>
            <input type="tel" name="mobile" value={profile.mobile} disabled={!editing} onChange={handleProfileChange} />
          </label>
        </div>

        {editing && (
          <div className="acc-actions">
            <button className="btn-outline" onClick={() => setEditing(false)}>Cancel</button>
            <button className="btn-solid" onClick={() => setEditing(false)}>Save Changes</button>
          </div>
        )}
      </section>

      {/* Business Details */}
      <section className="acc-card">
        <div className="acc-card__head">
          <h2 className="acc-card__title">Business Details</h2>
        </div>

        <div className="acc-grid">
          <label className="acc-field">
            <span>Business Name</span>
            <input type="text" name="businessName" value={business.businessName} disabled={!editing} onChange={handleBusinessChange} />
          </label>
          <label className="acc-field">
            <span>GST Number</span>
            <input type="text" name="gst" value={business.gst} disabled={!editing} onChange={handleBusinessChange} />
          </label>
          <label className="acc-field">
            <span>State</span>
            <select name="state" value={business.state} disabled={!editing} onChange={handleBusinessChange}>
              {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label className="acc-field">
            <span>City</span>
            <input type="text" name="city" value={business.city} disabled={!editing} onChange={handleBusinessChange} />
          </label>
          <label className="acc-field">
            <span>Pincode</span>
            <input type="text" name="pincode" value={business.pincode} disabled={!editing} onChange={handleBusinessChange} maxLength={6} />
          </label>
        </div>

        {editing && (
          <div className="acc-actions">
            <button className="btn-outline" onClick={() => setEditing(false)}>Cancel</button>
            <button className="btn-solid" onClick={() => setEditing(false)}>Save Changes</button>
          </div>
        )}
      </section>

      {/* Change Password */}
      <section className="acc-card">
        <div className="acc-card__head">
          <h2 className="acc-card__title">Change Password</h2>
          <p className="acc-card__sub">For your security, we'll email a confirmation link before the change is applied.</p>
        </div>

        <form className="acc-grid" onSubmit={requestPasswordEmail}>
          <label className="acc-field">
            <span>Current Password</span>
            <span className="acc-field__input-wrap">
              <input type={showCurrent ? 'text' : 'password'} placeholder="Enter current password" required />
              <button type="button" onClick={() => setShowCurrent((v) => !v)} aria-label="Toggle password">
                <Icon name={showCurrent ? 'eyeOff' : 'eye'} />
              </button>
            </span>
          </label>
          <label className="acc-field">
            <span>New Password</span>
            <span className="acc-field__input-wrap">
              <input type={showNew ? 'text' : 'password'} placeholder="Enter new password" required />
              <button type="button" onClick={() => setShowNew((v) => !v)} aria-label="Toggle password">
                <Icon name={showNew ? 'eyeOff' : 'eye'} />
              </button>
            </span>
          </label>
          <label className="acc-field acc-field--full">
            <span>Confirm New Password</span>
            <input type="password" placeholder="Re-enter new password" required />
          </label>

          <div className="acc-field--full">
            {emailSent ? (
              <div className="acc-notice">
                <Icon name="check" size={15} />
                A confirmation link has been sent to <b>{profile.email}</b>. Click it to complete the password change.
              </div>
            ) : (
              <div className="acc-notice acc-notice--muted">
                <Icon name="mail" size={15} />
                We'll send a confirmation link to your registered email before updating your password.
              </div>
            )}
          </div>

          <div className="acc-field--full acc-actions acc-actions--start">
            <button type="submit" className="btn-solid">
              <Icon name="lock" size={15} />
              Send Confirmation Email
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
