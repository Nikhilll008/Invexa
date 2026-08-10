import React, { useEffect, useRef, useState } from 'react';
import transformationImg from "./transformation.png";
import './InvexaLanding.css';
import { Link } from "react-router-dom";

/*  NAVBAR*/
const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Technology', href: '#technology' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-mark">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="18" height="18" rx="6" fill="url(#navLogoGrad)" />
              <path d="M8 12.5L10.5 15L16 9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="navLogoGrad" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0D9488" />
                  <stop offset="1" stopColor="#2DD4BF" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          Invexa
      </Link>

        <nav className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <div className="navbar__mobile-actions">
<Link to="/role-select" className="btn btn-ghost">
    Login
</Link>           
<Link to="/role-select" className="btn btn-primary">
    Get Started
</Link>
          </div>
        </nav>

        <div className="navbar__actions">
          <Link to="/role-select" className="btn btn-ghost">Login</Link>
          <Link to="/role-select" className="btn btn-primary">Get Started</Link>
        </div>

        <button
          className={`navbar__toggle ${menuOpen ? 'navbar__toggle--open' : ''}`}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

/*  HERO*/
const HANDSHAKE_IMG = 'https://images.unsplash.com/photo-1638262052640-82e94d64664a?w=900&q=80&auto=format&fit=crop';
const DESK_IMG = 'https://images.unsplash.com/photo-1710488350873-392a99d1da5d?w=900&q=80&auto=format&fit=crop';

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero__card">
        <span className="hero__blob hero__blob--left" aria-hidden="true"></span>
        <span className="hero__blob hero__blob--right" aria-hidden="true"></span>

        <div className="hero__content container">
          <h1 className="hero__title">Scan. Validate. Automate.</h1>
          <p className="hero__desc">
            Invexa hepls small retailers upload invoices, extract data using OCR, validate GST details,
            collaborate with CA, and generate Tally-compatible XML files--all from one intelligent platform.
          </p>

          <div className="hero__stepper" aria-hidden="true">
            <span className="hero__step-dot"></span>
            <span className="hero__step-line"></span>
            <span className="hero__step-dot"></span>
            <span className="hero__step-line"></span>
            <span className="hero__step-lock">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
            <span className="hero__step-line"></span>
            <span className="hero__step-dot"></span>
            <span className="hero__step-line"></span>
            <span className="hero__step-dot"></span>
          </div>

          <div className="hero__photos">
            <div className="hero__photo hero__photo--side">
              <img src={HANDSHAKE_IMG} alt="Business partners shaking hands over a deal" />
              <span className="hero__photo-tint" aria-hidden="true"></span>
            </div>

            <div className="hero__photo hero__photo--main">
              <img src={transformationImg} alt="Stack of paper invoices transforming into a digital laptop workflow" />
            </div>

            <div className="hero__photo hero__photo--side">
              <img src={DESK_IMG} alt="Laptop, calculator and cash on an office desk" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* TECHSTACK*/ 
const TECHS = [
  { name: 'React', sub: 'Frontend' },
  { name: 'Python Flask', sub: 'Backend' },
  { name: 'MongoDB', sub: 'Database' },
  { name: 'JWT', sub: 'Authentication' },
  { name: 'OCR', sub: 'Text Extraction' },
  { name: 'REST API', sub: 'Integration' },
  { name: 'Bootstrap', sub: 'UI Kit' },
  { name: 'Tally Prime', sub: 'Accounting' },
];

function TechStack() {
  return (
    <section className="techstack" id="technology">
      <div className="container">
        <p className="techstack__label">Trusted Technologies</p>
        <div className="techstack__row">
          {TECHS.map((t) => (
            <div className="techstack__item" key={t.name}>
              <span className="techstack__name">{t.name}</span>
              <span className="techstack__sub">{t.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* WHYINVEXA */
const PROBLEMS = [
  {
    title: 'Manual Paperwork',
    desc: 'Shopkeepers spend hours every week sorting, filing and re-entering paper bills by hand.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
        <rect x="10" y="6" width="24" height="34" rx="2" fill="#F0FDFA" stroke="#0D9488" strokeWidth="1.5" />
        <rect x="14" y="13" width="16" height="2" rx="1" fill="#5EEAD4" />
        <rect x="14" y="19" width="16" height="2" rx="1" fill="#5EEAD4" />
        <rect x="14" y="25" width="10" height="2" rx="1" fill="#5EEAD4" />
        <rect x="16" y="2" width="24" height="34" rx="2" fill="#CCFBF1" stroke="#0D9488" strokeWidth="1.5" />
        <rect x="20" y="9" width="16" height="2" rx="1" fill="#0D9488" opacity="0.5" />
        <rect x="20" y="15" width="16" height="2" rx="1" fill="#0D9488" opacity="0.5" />
        <rect x="20" y="21" width="10" height="2" rx="1" fill="#0D9488" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: 'Repeated CA Visits',
    desc: 'Retailers make frequent trips to their accountant just to submit and verify bills each month.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
        <path d="M8 40V16l16-10 16 10v24" stroke="#0D9488" strokeWidth="1.5" strokeLinejoin="round" fill="#F0FDFA" />
        <rect x="20" y="26" width="8" height="14" fill="#CCFBF1" stroke="#0D9488" strokeWidth="1.5" />
        <circle cx="24" cy="18" r="4" fill="#5EEAD4" stroke="#0D9488" strokeWidth="1.3" />
        <path d="M14 40v-6a10 10 0 0120 0v6" stroke="#0D9488" strokeWidth="1.3" fill="none" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: 'Human Errors',
    desc: 'Manual data entry leads to mismatched GST numbers, wrong totals and compliance headaches.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="18" fill="#FEF2F2" stroke="#F87171" strokeWidth="1.5" />
        <path d="M24 15v12" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="24" cy="32" r="1.6" fill="#EF4444" />
      </svg>
    ),
  },
  {
    title: 'Slow Accounting',
    desc: 'Delayed reconciliation keeps books outdated, making real-time business decisions impossible.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="17" fill="#F0FDFA" stroke="#0D9488" strokeWidth="1.5" />
        <path d="M24 14v10l7 5" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function WhyInvexa() {
  return (
    <section className="why" id="about">
      <div className="container">
        <div className="why__head">
          <span className="eyebrow">The Problem</span>
          <h2 className="why__title">Why Small Retailers Need Invexa</h2>
          <p className="why__desc">
            Bookkeeping for small retail shops is still stuck in stacks of paper — and it's costing
            time, money and accuracy every single day.
          </p>
        </div>

        <div className="why__grid">
          {PROBLEMS.map((p, i) => (
            <div className="why__card" key={p.title} style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="why__card-icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 
   TRANSFORMATION */
function Transformation() {
  return (
    <section className="transform">
      <div className="container">
        <div className="transform__head">
          <span className="eyebrow">The Shift</span>
          <h2 className="transform__title">From Paper Bills to Intelligent Accounting</h2>
          <p className="transform__desc">
            Every invoice that once lived in a dusty ledger now moves through a single digital
            pipeline — scanned, read, verified and posted to Tally in minutes, not weeks.
          </p>
        </div>

        <div className="transform__grid">
          <div className="transform__image-wrap">
            <img src={transformationImg} alt="Stack of paper invoices transforming into a digital laptop workflow" />
          </div>

          <div className="transform__scanner">
            <div className="scanner__frame">
              <div className="scanner__header">
                <span className="scanner__dot"></span>
                <span className="scanner__dot"></span>
                <span className="scanner__dot"></span>
                <span className="scanner__header-title">Invoice Scanning Workstation</span>
              </div>

              <div className="scanner__stage">
                <div className="scanner__doc">
                  <div className="scanner__doc-line" style={{ width: '70%' }}></div>
                  <div className="scanner__doc-line" style={{ width: '40%' }}></div>
                  <div className="scanner__doc-line" style={{ width: '85%' }}></div>
                  <div className="scanner__doc-line" style={{ width: '55%' }}></div>
                  <div className="scanner__doc-line" style={{ width: '65%' }}></div>
                  <div className="scanner__doc-line" style={{ width: '30%' }}></div>

                  <span className="scanner__box scanner__box--gst" style={{ top: '14%', left: '10%', width: '58%', height: '14%' }}>
                    <em>GST No.</em>
                  </span>
                  <span className="scanner__box scanner__box--inv" style={{ top: '34%', left: '10%', width: '40%', height: '12%' }}>
                    <em>Invoice #</em>
                  </span>
                  <span className="scanner__box scanner__box--vendor" style={{ top: '52%', left: '10%', width: '68%', height: '12%' }}>
                    <em>Vendor</em>
                  </span>
                  <span className="scanner__box scanner__box--total" style={{ top: '72%', left: '10%', width: '35%', height: '12%' }}>
                    <em>Amount</em>
                  </span>

                  <div className="scanner__beam"></div>
                </div>
              </div>

              <div className="scanner__results">
                <div className="scanner__result">
                  <span className="scanner__result-dot" style={{ background: '#0D9488' }}></span>
                  GST Number Recognized
                </div>
                <div className="scanner__result">
                  <span className="scanner__result-dot" style={{ background: '#2DD4BF' }}></span>
                  Invoice Number Detected
                </div>
                <div className="scanner__result">
                  <span className="scanner__result-dot" style={{ background: '#10B981' }}></span>
                  Vendor Identified
                </div>
                <div className="scanner__progress">
                  <div className="scanner__progress-bar">
                    <div className="scanner__progress-fill"></div>
                  </div>
                  <span>96% Confidence</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* FEATURES*/
const FEATURES = [
  {
    title: 'Authentication',
    desc: 'Secure sign-up and login with JWT-based session handling for every retailer account.',
    icon: 'M12 2l7 4v6c0 5-3.4 8.4-7 10-3.6-1.6-7-5-7-10V6l7-4z',
  },
  {
    title: 'Invoice Upload',
    desc: 'Drag, drop or snap a photo of any paper bill straight from the shop counter.',
    icon: 'M12 16V4M12 4L7 9M12 4l5 5M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2',
  },
  {
    title: 'OCR Engine',
    desc: 'Extracts vendor names, GST numbers, line items and totals from scanned bills.',
    icon: 'M4 4h16v16H4zM8 9h8M8 13h8M8 17h4',
  },
  {
    title: 'Validation Engine',
    desc: 'Cross-checks extracted data against GST formats and flags mismatches instantly.',
    icon: 'M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'CA Dashboard',
    desc: 'A dedicated workspace for Chartered Accountants to review and approve bills.',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  {
    title: 'Invoice Tracking',
    desc: 'Follow every bill through upload, OCR, validation, review and approval in real time.',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'XML Export',
    desc: 'Generates Tally-ready XML the moment an invoice is approved by the reviewer.',
    icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6',
  },
  {
    title: 'Tally Integration',
    desc: 'Imports validated invoices directly into Tally Prime — no manual re-typing.',
    icon: 'M3 3v18h18M8 17V9m4 8V5m4 12v-6',
  },
  {
    title: 'Role Based Access',
    desc: 'Separate, permissioned views for retailers, accountants and administrators.',
    icon: 'M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 100-8 4 4 0 000 8zm6 4v-2a4 4 0 00-3-3.87',
  },
  {
    title: 'Secure Cloud Storage',
    desc: 'Every original bill and digitized record is encrypted and safely archived.',
    icon: 'M7 16a4 4 0 01-.88-7.9A5.5 5.5 0 0117 8a4 4 0 010 8H7z',
  },
];

function Features() {
  return (
    <section className="features" id="features">
      <div className="container">
        <div className="features__head">
          <span className="eyebrow">Platform</span>
          <h2 className="features__title">Everything Your Shop Needs, Built In</h2>
          <p className="features__desc">
            A single, connected system that carries every bill from your counter to your accountant to Tally.
          </p>
        </div>

        <div className="features__grid">
          {FEATURES.map((f) => (
            <div className="features__card" key={f.title}>
              <div className="features__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d={f.icon} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* WORKFLOW*/
const STEPS = [
  { title: 'Register', desc: 'Create a retailer account in under a minute.' },
  { title: 'Login', desc: 'Secure JWT-based access to your dashboard.' },
  { title: 'Upload Invoice', desc: 'Scan or photograph a paper bill.' },
  { title: 'OCR Extraction', desc: 'Vendor, GST and totals pulled automatically.' },
  { title: 'Validation', desc: 'Data checked against GST compliance rules.' },
  { title: 'CA Review', desc: 'A Chartered Accountant verifies the invoice.' },
  { title: 'Approved', desc: 'Invoice is marked verified and locked.' },
  { title: 'Generate XML', desc: 'Tally-ready XML is produced instantly.' },
  { title: 'Import to Tally', desc: 'Synced straight into Tally Prime.' },
];

function Workflow() {
  return (
    <section className="workflow" id="workflow">
      <div className="container">
        <div className="workflow__head">
          <span className="eyebrow">How It Works</span>
          <h2 className="workflow__title">One Bill, Nine Steps, Zero Paperwork</h2>
          <p className="workflow__desc">
            From the moment a bill lands on the counter to the moment it's posted in Tally —
            here's the exact path it takes through Invexa.
          </p>
        </div>

        <div className="workflow__track">
          {STEPS.map((s, i) => (
            <div className="workflow__step" key={s.title}>
              <div className="workflow__node">
                <span className="workflow__index">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="workflow__step-copy">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
              {i < STEPS.length - 1 && <span className="workflow__connector" aria-hidden="true"></span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 
   REALWORLD */
const PHOTOS = [
  {
    src: 'https://images.unsplash.com/photo-1771574209038-01ad953ca43a?w=900&q=80&auto=format&fit=crop',
    alt: 'Retail shop owner seated at a small table outside a well-stocked store',
    caption: 'Retail shop owners',
  },
  {
    src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80&auto=format&fit=crop',
    alt: 'Accountant holding a pencil while reviewing paperwork near a laptop',
    caption: 'Chartered Accountants',
  },
  {
    src: 'https://images.unsplash.com/photo-1707157284454-553ef0a4ed0d?w=900&q=80&auto=format&fit=crop',
    alt: 'Office desk with a smartphone and financial charts',
    caption: 'Office environments',
  },
  {
    src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80&auto=format&fit=crop',
    alt: 'Hands holding a paper bill beside a pen and calculator',
    caption: 'Document verification',
  },
  {
    src: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=900&q=80&auto=format&fit=crop',
    alt: 'Printed tax certificate on top of a white folder',
    caption: 'Printed GST bills',
  },
  {
    src: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=80&auto=format&fit=crop',
    alt: 'Finance professional writing notes on a paper ledger',
    caption: 'Finance professionals',
  },
];

function RealWorld() {
  return (
    <section className="realworld">
      <div className="container">
        <div className="realworld__head">
          <span className="eyebrow">Real Businesses</span>
          <h2 className="realworld__title">Built for the People Behind the Counter</h2>
          <p className="realworld__desc">
            Invexa isn't an abstraction — it's designed around the shopkeepers, accountants and
            offices that handle bills every single day.
          </p>
        </div>

        <div className="realworld__grid">
          {PHOTOS.map((p) => (
            <figure className="realworld__item" key={p.caption}>
              <img src={p.src} alt={p.alt} loading="lazy" />
              <figcaption>{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* SHOWCASE */
const SCREENS = [
  { title: 'Login', desc: 'Secure JWT sign-in for retailers, accountants and admins.' },
  { title: 'Dashboard', desc: 'A single view of pending, validated and approved invoices.' },
  { title: 'Invoice Upload', desc: 'Drag-and-drop or camera capture for paper bills.' },
  { title: 'Invoice History', desc: 'Every bill, searchable by date, vendor or amount.' },
  { title: 'OCR Result', desc: 'Extracted fields shown side-by-side with the original scan.' },
  { title: 'Validation', desc: 'Flags mismatches before a bill reaches the CA.' },
  { title: 'CA Review', desc: 'Approve, correct or reject invoices in a focused queue.' },
  { title: 'Reports', desc: 'Monthly summaries ready for GST filing and audits.' },
];

function ScreenMock({ title }) {
  return (
    <div className="showcase__mock">
      <div className="showcase__mock-bar">
        <span></span><span></span><span></span>
      </div>
      <div className="showcase__mock-body">
        <div className="showcase__mock-side">
          <div className="showcase__mock-pill" style={{ width: '70%' }}></div>
          <div className="showcase__mock-pill" style={{ width: '50%' }}></div>
          <div className="showcase__mock-pill" style={{ width: '60%' }}></div>
          <div className="showcase__mock-pill" style={{ width: '40%' }}></div>
        </div>
        <div className="showcase__mock-main">
          <span className="showcase__mock-label">{title}</span>
          <div className="showcase__mock-row"></div>
          <div className="showcase__mock-row" style={{ width: '85%' }}></div>
          <div className="showcase__mock-row" style={{ width: '65%' }}></div>
          <div className="showcase__mock-card"></div>
        </div>
      </div>
    </div>
  );
}

function Showcase() {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  const scrollToIndex = (i) => {
    const clamped = Math.max(0, Math.min(SCREENS.length - 1, i));
    setIndex(clamped);
    const track = trackRef.current;
    if (track) {
      const card = track.children[clamped];
      if (card) card.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    }
  };

  return (
    <section className="showcase">
      <div className="container">
        <div className="showcase__head">
          <span className="eyebrow">Inside Invexa</span>
          <h2 className="showcase__title">A Look at Every Screen</h2>
          <p className="showcase__desc">Swipe through the exact screens your team will use, from first login to final report.</p>
        </div>
      </div>

      <div className="showcase__carousel">
        <div className="showcase__track" ref={trackRef}>
          {SCREENS.map((s) => (
            <div className="showcase__card" key={s.title}>
              <ScreenMock title={s.title} />
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="showcase__controls">
          <button className="showcase__arrow" onClick={() => scrollToIndex(index - 1)} aria-label="Previous screen">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4l-5 5 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div className="showcase__dots">
            {SCREENS.map((s, i) => (
              <button
                key={s.title}
                className={`showcase__dot ${i === index ? 'showcase__dot--active' : ''}`}
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to ${s.title}`}
              />
            ))}
          </div>
          <button className="showcase__arrow" onClick={() => scrollToIndex(index + 1)} aria-label="Next screen">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

/*  FAQ*/
const FAQS = [
  {
    q: 'Does Invexa replace my Chartered Accountant?',
    a: 'No. Invexa automates the repetitive parts — scanning, extraction and formatting — while your CA still reviews and approves every invoice from a dedicated dashboard before it reaches Tally.',
  },
  {
    q: 'What file types can I upload?',
    a: 'You can upload PDF invoices or simply photograph paper bills with a phone. The OCR engine is tuned for both scanned documents and camera captures.',
  },
  {
    q: 'How accurate is the OCR extraction?',
    a: 'Extraction accuracy typically runs above 90% for clearly printed GST invoices, and every field is cross-checked by the validation engine before it reaches CA review.',
  },
  {
    q: 'Does the XML work directly with Tally Prime?',
    a: 'Yes. Once an invoice is approved, Invexa generates XML formatted specifically for Tally Prime import — no reformatting required.',
  },
  {
    q: 'Is my data secure?',
    a: 'All invoices and account data are encrypted in transit and at rest, with role-based access so only authorized retailers, accountants and admins can view specific records.',
  },
  {
    q: 'Can multiple shop staff use one account?',
    a: 'Yes. Role-based access lets you add staff members with permissions scoped to uploading and tracking, while approvals stay limited to your CA and admins.',
  },
];

function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="faq" id="faq">
      <div className="container">
        <div className="faq__head">
          <span className="eyebrow">FAQ</span>
          <h2 className="faq__title">Questions, Answered</h2>
        </div>

        <div className="faq__list">
          {FAQS.map((item, i) => (
            <div className={`faq__item ${open === i ? 'faq__item--open' : ''}`} key={item.q}>
              <button className="faq__question" onClick={() => setOpen(open === i ? -1 : i)}>
                {item.q}
                <span className="faq__icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3.5 8H12.5M8 3.5V12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                </span>
              </button>
              <div className="faq__answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/*CTA*/
function CTA() {
  return (
    <section className="cta" id="get-started">
      <div className="container">
        <div className="cta__card">
          <div className="cta__glow" aria-hidden="true"></div>
          <span className="cta__eyebrow">Get Started Today</span>
          <h2 className="cta__title">Ready to Digitize Your Accounting?</h2>
          <p className="cta__desc">
            Join small retailers who've traded stacks of paper for a system that reads,
            checks and files every bill automatically.
          </p>
          <div className="cta__actions">
            <Link to="/role-select" className="btn cta__btn-primary">
              Get Started</Link>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            
            <Link to="/contact" className="btn cta__btn-secondary">
              Book Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/*  FOOTER*/
const COLUMNS = [
  {
    title: 'Product',
    links: ['Features', 'Workflow', 'Technology', 'Pricing', 'Security'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Blog', 'Press'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'API Reference', 'Help Center', 'FAQ'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Service', 'GST Compliance'],
  },
];

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
<Link to="/" className="footer__logo">            
  <span className="footer__logo-mark">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="6" fill="url(#footerLogoGrad)" />
                  <path d="M8 12.5L10.5 15L16 9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <defs>
                    <linearGradient id="footerLogoGrad" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#0D9488" />
                      <stop offset="1" stopColor="#2DD4BF" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              Invexa
            </Link>
            <p>Automated bill digitization and Tally integration for small retailers.</p>
            <div className="footer__social">
              <a href="#" aria-label="Twitter"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 00-7 3.7 11.6 11.6 0 01-8.4-4.3 4.1 4.1 0 001.3 5.5c-.7 0-1.3-.2-1.9-.5v.1a4.1 4.1 0 003.3 4 4.2 4.2 0 01-1.9.1 4.1 4.1 0 003.8 2.8A8.2 8.2 0 012 19a11.6 11.6 0 006.3 1.8c7.5 0 11.6-6.2 11.6-11.6v-.5c.8-.6 1.5-1.3 2.1-2.1z" /></svg></a>
              <a href="#" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.9 3.9 6 2.5 6S0 4.9 0 3.5 1.1 1 2.5 1s2.48 1.1 2.48 2.5zM.2 8.5h4.6V23H.2V8.5zM8.4 8.5h4.4v2h.06c.6-1.1 2.1-2.3 4.3-2.3 4.6 0 5.4 3 5.4 6.9V23h-4.6v-6.9c0-1.6 0-3.7-2.3-3.7-2.3 0-2.6 1.8-2.6 3.6V23H8.4V8.5z" /></svg></a>
              <a href="#" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 3.3.15 4.8 1.7 5 5 .06 1.3.07 1.6.07 4.8s0 3.6-.07 4.9c-.15 3.3-1.7 4.8-5 5-1.3.06-1.6.07-4.9.07s-3.6 0-4.9-.07c-3.3-.15-4.8-1.7-5-5C2.03 15.6 2 15.3 2 12s0-3.6.07-4.9c.15-3.3 1.7-4.8 5-5C8.4 2.2 8.7 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.07-2.4.1-3.5 1.2-3.6 3.6C3.6 8.9 3.6 9.3 3.6 12s0 3.1.06 4.3c.1 2.4 1.2 3.5 3.6 3.6 1.2.06 1.6.07 4.7.07s3.5 0 4.7-.07c2.4-.1 3.5-1.2 3.6-3.6.06-1.2.07-1.6.07-4.3s0-3.1-.07-4.3c-.1-2.4-1.2-3.5-3.6-3.6C15.5 4 15.1 4 12 4zm0 3.6a4.4 4.4 0 110 8.8 4.4 4.4 0 010-8.8zm0 7.3a2.9 2.9 0 100-5.8 2.9 2.9 0 000 5.8zm5.6-7.5a1 1 0 11-2 0 1 1 0 012 0z" /></svg></a>
            </div>
          </div>

          <div className="footer__columns">
            {COLUMNS.map((col) => (
              <div className="footer__column" key={col.title}>
                <h4>{col.title}</h4>
                <ul>
                  {col.links.map((l) => (
                    <li key={l}><a href="#">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Invexa. All rights reserved.</p>
          <p>Built for small retailers, chartered accountants and Tally Prime.</p>
        </div>
      </div>
    </footer>
  );
}
/* 
   LANDING (default export)*/
export default function Landing() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <TechStack />
        <WhyInvexa />
        <Transformation />
        <Features />
        <Workflow />
        <RealWorld />
        <Showcase />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}