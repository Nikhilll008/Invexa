import React, { useState } from 'react';
import './Invoices.css';

const ICONS = {
  search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></>,
  eye: <><path d="M2 12c1.8-4.4 6-7.5 10-7.5s8.2 3.1 10 7.5c-1.8 4.4-6 7.5-10 7.5S3.8 16.4 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  download: <><path d="M12 3v12M7 10l5 5 5-5" /><path d="M4 21h16" /></>,
  track: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></>,
  upload: <><path d="M12 15V4M12 4L8 8M12 4l4 4" /><path d="M4 15v3a2 2 0 002 2h12a2 2 0 002-2v-3" /></>,
  ocr: <><path d="M7 3H4a1 1 0 00-1 1v3M17 3h3a1 1 0 011 1v3M7 21H4a1 1 0 01-1-1v-3M17 21h3a1 1 0 001-1v-3" /><path d="M4 12h16" /></>,
  ca: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></>,
  approved: <><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.5 2.5L16 9.5" /></>,
  xml: <><path d="M6 2h9l5 5v13a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" /><path d="M15 2v5h5" /></>,
};

function Icon({ name, size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}

const FILTERS = ['All', 'Uploaded', 'OCR', 'Review', 'Approved', 'Rejected', 'XML Ready'];

const INVOICES = [
  { id: 'INV-2041', vendor: 'Sharma Wholesale', date: '04 Aug 2026', amount: '₹12,480', status: 'Approved' },
  { id: 'INV-2040', vendor: 'Metro Traders', date: '03 Aug 2026', amount: '₹8,250', status: 'XML Ready' },
  { id: 'INV-2039', vendor: 'Patel Distributors', date: '03 Aug 2026', amount: '₹21,900', status: 'Review' },
  { id: 'INV-2038', vendor: 'Gupta Enterprises', date: '02 Aug 2026', amount: '₹5,760', status: 'OCR' },
  { id: 'INV-2037', vendor: 'Verma & Sons', date: '01 Aug 2026', amount: '₹14,300', status: 'Rejected' },
  { id: 'INV-2036', vendor: 'Anand Traders', date: '31 Jul 2026', amount: '₹9,120', status: 'Approved' },
  { id: 'INV-2035', vendor: 'Bhatia Wholesale', date: '30 Jul 2026', amount: '₹17,650', status: 'Uploaded' },
  { id: 'INV-2034', vendor: 'Kapoor Supplies', date: '29 Jul 2026', amount: '₹6,340', status: 'XML Ready' },
];

const STATUS_CLASS = {
  Uploaded: 'badge--uploaded',
  OCR: 'badge--ocr',
  Review: 'badge--review',
  Approved: 'badge--approved',
  Rejected: 'badge--rejected',
  'XML Ready': 'badge--xml',
};

const TRACK_STEPS = [
  { key: 'upload', label: 'Uploaded', icon: 'upload' },
  { key: 'ocr', label: 'OCR Extraction', icon: 'ocr' },
  { key: 'review', label: 'CA Review', icon: 'ca' },
  { key: 'approved', label: 'Approved', icon: 'approved' },
  { key: 'xml', label: 'XML Ready', icon: 'xml' },
];

export default function Invoices() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [trackId, setTrackId] = useState('INV-2039');
  const [trackResult, setTrackResult] = useState({ id: 'INV-2039', stepIndex: 2 });

  const filtered = INVOICES.filter((inv) => {
    const matchesFilter = filter === 'All' || inv.status === filter;
    const matchesSearch = inv.id.toLowerCase().includes(search.toLowerCase()) || inv.vendor.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleTrack = (e) => {
    e.preventDefault();
    const found = INVOICES.find((i) => i.id.toLowerCase() === trackId.toLowerCase());
    const idx = found ? Math.min(TRACK_STEPS.length - 1, ['Uploaded', 'OCR', 'Review', 'Approved', 'XML Ready'].indexOf(found.status)) : 0;
    setTrackResult({ id: found ? found.id : trackId, stepIndex: found ? idx : -1 });
  };

  return (
    <div className="invoices-page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Invoices</h1>
          <p className="page-sub">View your invoice history and track any bill's live status.</p>
        </div>
      </div>

      {/* Invoice History */}
      <section className="inv-card">
        <div className="inv-card__head">
          <h2 className="inv-card__title">All / Invoice History</h2>
          <div className="inv-search">
            <Icon name="search" size={14} />
            <input
              type="text"
              placeholder="Search invoice ID or vendor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="inv-filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`inv-filters__item ${filter === f ? 'inv-filters__item--active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="inv-table-wrap">
          <table className="inv-table">
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
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="inv-empty">No invoices match your search.</td></tr>
              )}
              {filtered.map((inv) => (
                <tr key={inv.id}>
                  <td className="inv-id">{inv.id}</td>
                  <td>{inv.vendor}</td>
                  <td>{inv.date}</td>
                  <td>{inv.amount}</td>
                  <td><span className={`badge ${STATUS_CLASS[inv.status]}`}>{inv.status}</span></td>
                  <td>
                    <div className="inv-row-actions">
                      <button aria-label="View"><Icon name="eye" /></button>
                      <button aria-label="Download"><Icon name="download" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Invoice Status / Tracking */}
      <section className="inv-card">
        <div className="inv-card__head">
          <h2 className="inv-card__title">Invoice Status / Tracking</h2>
        </div>

        <form className="track-form" onSubmit={handleTrack}>
          <div className="track-form__input">
            <Icon name="track" size={15} />
            <input
              type="text"
              placeholder="Enter Invoice ID, e.g. INV-2039"
              value={trackId}
              onChange={(e) => setTrackId(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-solid">Track Invoice</button>
        </form>

        {trackResult.stepIndex === -1 ? (
          <p className="track-empty">No invoice found with ID "{trackResult.id}".</p>
        ) : (
          <div className="track-result">
            <p className="track-result__label">Showing status for <b>{trackResult.id}</b></p>
            <div className="track-steps">
              {TRACK_STEPS.map((s, i) => (
                <React.Fragment key={s.key}>
                  <div className={`track-step ${i <= trackResult.stepIndex ? 'track-step--done' : ''}`}>
                    <span className="track-step__icon"><Icon name={s.icon} size={16} /></span>
                    <span className="track-step__label">{s.label}</span>
                  </div>
                  {i < TRACK_STEPS.length - 1 && (
                    <span className={`track-connector ${i < trackResult.stepIndex ? 'track-connector--done' : ''}`}></span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
