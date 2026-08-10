import React from 'react';
import './Notifications.css';

const ICONS = {
  upload: <><path d="M12 15V4M12 4L8 8M12 4l4 4" /><path d="M4 15v3a2 2 0 002 2h12a2 2 0 002-2v-3" /></>,
  ocr: <><path d="M7 3H4a1 1 0 00-1 1v3M17 3h3a1 1 0 011 1v3M7 21H4a1 1 0 01-1-1v-3M17 21h3a1 1 0 001-1v-3" /><path d="M4 12h16" /></>,
  gst: <><path d="M6 2h8l4 4v15a1 1 0 01-1 1H6a1 1 0 01-1-1V3a1 1 0 011-1z" /><path d="M8 11h8M8 15h5" /></>,
  ca: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></>,
  approved: <><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.5 2.5L16 9.5" /></>,
  rejected: <><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" /></>,
};

function Icon({ name, size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}

const GROUPS = [
  {
    title: 'Invoice Notifications',
    desc: 'Updates on uploads and OCR processing.',
    items: [
      { icon: 'upload', text: 'Invoice INV-2041 uploaded successfully.', time: '5m ago', unread: true },
      { icon: 'ocr', text: 'OCR extraction completed for INV-2040.', time: '22m ago', unread: true },
      { icon: 'upload', text: 'Invoice INV-2035 uploaded successfully.', time: 'Yesterday', unread: false },
    ],
  },
  {
    title: 'GST Verification Notifications',
    desc: 'Alerts about GST number matches and mismatches.',
    items: [
      { icon: 'gst', text: 'GST number verified for INV-2040 — 100% match.', time: '20m ago', unread: true },
      { icon: 'gst', text: 'GST mismatch found on INV-2037. Please review.', time: '3h ago', unread: false },
    ],
  },
  {
    title: 'CA Action / Approval Notifications',
    desc: 'Decisions and comments from your Chartered Accountant.',
    items: [
      { icon: 'approved', text: 'INV-2038 approved by your CA.', time: '1h ago', unread: false },
      { icon: 'rejected', text: 'INV-2037 rejected — missing GST number.', time: '3h ago', unread: false },
      { icon: 'ca', text: 'Your CA left a note on INV-2039.', time: '5h ago', unread: false },
    ],
  },
];

export default function Notifications() {
  return (
    <div className="notifpage">
      <div className="page-head">
        <div>
          <h1 className="page-title">Notifications</h1>
          <p className="page-sub">Stay updated on invoice, GST and CA activity.</p>
        </div>
        <button className="btn-outline">Mark all as read</button>
      </div>

      {GROUPS.map((group) => (
        <section className="notif-card" key={group.title}>
          <div className="notif-card__head">
            <h2 className="notif-card__title">{group.title}</h2>
            <p className="notif-card__desc">{group.desc}</p>
          </div>

          <ul className="notif-items">
            {group.items.map((item, i) => (
              <li key={i} className={item.unread ? 'notif-items__row--unread' : ''}>
                <span className={`notif-items__icon notif-items__icon--${item.icon}`}>
                  <Icon name={item.icon} />
                </span>
                <p>{item.text}</p>
                <span className="notif-items__time">{item.time}</span>
                {item.unread && <span className="notif-items__dot"></span>}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
