'use client';

import { useState, useEffect, useRef } from 'react';
import { siteConfig } from '@/lib/site-config';

export default function UninstallPage() {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Create floating particles
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    const colors = ['#f87171', '#ef4444', '#D946EF', '#a855f7', '#6366f1'];
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.className = 'uninstall-particle';
      const size = Math.random() * 4 + 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;background:${color};animation-duration:${Math.random() * 15 + 10}s;animation-delay:${Math.random() * 10}s;`;
      container.appendChild(p);
    }
    return () => {
      container.innerHTML = '';
    };
  }, []);

  const toggleReason = (value: string) => {
    setSelectedReasons((prev) =>
      prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value]
    );
  };

  const handleSubmit = () => {
    const feedbackData = {
      reasons: selectedReasons,
      comment: comment.trim(),
      timestamp: new Date().toISOString(),
      version: '2.5.1',
    };
    try {
      const endpoint = 'https://onebuddy.io/api/uninstall-feedback';
      navigator.sendBeacon(endpoint, JSON.stringify(feedbackData));
    } catch {
      console.log('Uninstall feedback:', feedbackData);
    }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSkip = () => {
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const reasons = [
    {
      value: 'not_useful',
      label: 'Not useful for me',
      desc: "Didn't fit my needs",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      ),
    },
    {
      value: 'too_many_notifications',
      label: 'Too many notifications',
      desc: 'Reminders were overwhelming',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
    },
    {
      value: 'performance',
      label: 'Slowed down my browser',
      desc: 'Performance issues',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
    },
    {
      value: 'found_alternative',
      label: 'Found a better alternative',
      desc: 'Using another extension',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        </svg>
      ),
    },
    {
      value: 'confusing',
      label: 'Too confusing to use',
      desc: 'Hard to understand',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
    {
      value: 'bugs',
      label: 'Bugs or errors',
      desc: "Something wasn't working",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 2l1.88 1.88M14.12 3.88L16 2M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
          <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6z" />
          <path d="M12 20v-9M6.53 9C4.6 8.8 3 7.1 3 5" />
          <path d="M6 13H2" />
          <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
          <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
          <path d="M22 13h-4" />
          <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
        </svg>
      ),
    },
    {
      value: 'privacy',
      label: 'Privacy concerns',
      desc: 'Worried about permissions',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
    {
      value: 'temporary',
      label: 'Just temporary',
      desc: 'I might come back later',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <style jsx global>{`
        /* Uninstall page overrides the site theme */
        .uninstall-page-root {
          --un-bg: #0a0815;
          --un-bg-card: #140f24;
          --un-bg-card-hover: #1c1534;
          --un-text: #f0eef5;
          --un-text-muted: #8b87a0;
          --un-border: rgba(255, 255, 255, 0.08);
          --un-accent: #D946EF;
          --un-accent-hover: #c026d3;
          --un-accent-light: rgba(217, 70, 239, 0.12);
          --un-accent-glow: rgba(217, 70, 239, 0.3);
          --un-red: #f87171;
          --un-red-light: rgba(248, 113, 113, 0.12);
          --un-transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          --un-spring: 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* Hide navbar and footer on uninstall page */
        .uninstall-page-root ~ footer,
        body > main ~ footer {
          /* footer is outside main, handled by layout */
        }

        .uninstall-particles {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .uninstall-particle {
          position: absolute;
          border-radius: 50%;
          opacity: 0;
          animation: uninstallParticleFloat linear infinite;
        }

        @keyframes uninstallParticleFloat {
          0% { opacity: 0; transform: translateY(100vh) scale(0); }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-10vh) scale(1); }
        }

        @keyframes uninstallFadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes uninstallBounceIn {
          0% { opacity: 0; transform: scale(0.5); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div className="uninstall-page-root" style={{ background: '#0a0815', minHeight: '100vh', marginTop: '-80px', paddingTop: '0' }}>
        {/* Particles */}
        <div className="uninstall-particles" ref={particlesRef} />

        {/* Content */}
        <div
          className="relative z-10 flex items-start justify-center min-h-screen"
          style={{ padding: '80px 24px 40px' }}
        >
          <div className="w-full max-w-[640px]">
            {!submitted ? (
              <>
                {/* Header */}
                <div
                  className="text-center mb-10"
                  style={{ animation: 'uninstallFadeInUp 0.5s ease backwards' }}
                >
                  <div className="mb-5" style={{ animation: 'uninstallBounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                    <img src="/new/sad.png" alt="We're sad to see you go" style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', margin: '0 auto' }} />
                  </div>
                  <h1
                    className="font-extrabold tracking-tight mb-3"
                    style={{ fontSize: 'clamp(24px, 4vw, 36px)', color: '#f0eef5', lineHeight: 1.2 }}
                  >
                    We&apos;re sorry to see you go
                  </h1>
                  <p
                    className="mx-auto"
                    style={{ fontSize: 'clamp(14px, 2vw, 16px)', color: '#8b87a0', maxWidth: 460, lineHeight: 1.6 }}
                  >
                    Your feedback helps us improve OneBuddy for everyone. Would you mind telling us why you&apos;re leaving?
                  </p>
                </div>

                {/* Feedback Form */}
                <div style={{ animation: 'uninstallFadeInUp 0.5s 0.15s ease backwards' }}>
                  <div className="text-center mb-6">
                    <h2
                      className="font-bold mb-1.5"
                      style={{ fontSize: 'clamp(18px, 3vw, 22px)', color: '#f0eef5' }}
                    >
                      Why did you uninstall OneBuddy?
                    </h2>
                    <p style={{ fontSize: 13, color: '#8b87a0' }}>Select all that apply</p>
                  </div>

                  {/* Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-7">
                    {reasons.map((r) => {
                      const isSelected = selectedReasons.includes(r.value);
                      return (
                        <button
                          key={r.value}
                          onClick={() => toggleReason(r.value)}
                          className="relative flex items-center gap-3 text-left transition-all"
                          style={{
                            padding: '14px 16px',
                            background: isSelected ? 'rgba(248, 113, 113, 0.12)' : '#140f24',
                            border: `2px solid ${isSelected ? '#f87171' : 'rgba(255,255,255,0.08)'}`,
                            borderRadius: 14,
                            color: '#f0eef5',
                            boxShadow: isSelected ? '0 0 0 1px #f87171, 0 4px 16px rgba(248,113,113,0.15)' : 'none',
                          }}
                        >
                          <span
                            className="flex items-center justify-center shrink-0"
                            style={{
                              width: 36,
                              height: 36,
                              borderRadius: 10,
                              background: 'rgba(255,255,255,0.04)',
                              color: isSelected ? '#f87171' : '#8b87a0',
                            }}
                          >
                            <span style={{ width: 18, height: 18, display: 'block' }}>{r.icon}</span>
                          </span>
                          <span className="flex flex-col gap-0.5 min-w-0">
                            <span className="text-sm font-semibold" style={{ color: '#f0eef5', lineHeight: 1.3 }}>
                              {r.label}
                            </span>
                            <span style={{ fontSize: 11, color: '#8b87a0', lineHeight: 1.3 }}>
                              {r.desc}
                            </span>
                          </span>
                          {isSelected && (
                            <span
                              className="absolute flex items-center justify-center"
                              style={{
                                top: 8,
                                right: 8,
                                width: 18,
                                height: 18,
                                borderRadius: '50%',
                                background: '#f87171',
                              }}
                            >
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Textarea */}
                  <div className="mb-7">
                    <label
                      htmlFor="feedbackText"
                      className="block text-sm font-semibold mb-2.5"
                      style={{ color: '#f0eef5' }}
                    >
                      Anything else you&apos;d like to share?
                    </label>
                    <textarea
                      id="feedbackText"
                      placeholder="Tell us how we can improve..."
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full outline-none transition-colors"
                      style={{
                        padding: '14px 16px',
                        background: '#140f24',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 12,
                        color: '#f0eef5',
                        fontSize: 14,
                        fontFamily: 'inherit',
                        resize: 'vertical',
                        minHeight: 80,
                      }}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    <button
                      onClick={handleSubmit}
                      className="inline-flex items-center gap-2 font-semibold transition-all hover:-translate-y-0.5"
                      style={{
                        padding: '16px 36px',
                        background: 'linear-gradient(135deg, #D946EF, #a855f7)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 16,
                        fontSize: 16,
                        boxShadow: '0 4px 20px rgba(217,70,239,0.3)',
                        cursor: 'pointer',
                      }}
                    >
                      Submit Feedback
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 2L11 13" />
                        <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                    </button>
                    <button
                      onClick={handleSkip}
                      className="inline-flex items-center gap-1.5 transition-all"
                      style={{
                        padding: '10px 20px',
                        background: 'transparent',
                        color: '#8b87a0',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 12,
                        fontSize: 14,
                        fontWeight: 500,
                        cursor: 'pointer',
                      }}
                    >
                      No thanks
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Success State */
              <div className="text-center" style={{ animation: 'uninstallFadeInUp 0.5s ease', paddingTop: 40 }}>
                <div className="mb-5" style={{ animation: 'uninstallBounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                  <img src="/hero.gif" alt="Thank you" style={{ width: 160, height: 100, borderRadius: 16, objectFit: 'cover', margin: '0 auto' }} />
                </div>
                <h1
                  className="font-extrabold tracking-tight mb-3"
                  style={{ fontSize: 'clamp(24px, 4vw, 36px)', color: '#f0eef5', lineHeight: 1.2 }}
                >
                  Thank you for your feedback!
                </h1>
                <p
                  className="mx-auto"
                  style={{ fontSize: 'clamp(14px, 2vw, 16px)', color: '#8b87a0', maxWidth: 460, lineHeight: 1.6 }}
                >
                  We appreciate you taking the time to help us improve. If you ever want to come back, we&apos;ll be here.
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap mt-7">
                  <a
                    href={siteConfig.extensionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-semibold transition-all hover:-translate-y-0.5"
                    style={{
                      padding: '16px 36px',
                      background: 'linear-gradient(135deg, #D946EF, #a855f7)',
                      color: 'white',
                      border: 'none',
                      borderRadius: 16,
                      fontSize: 16,
                      boxShadow: '0 4px 20px rgba(217,70,239,0.3)',
                      textDecoration: 'none',
                    }}
                  >
                    Reinstall OneBuddy
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </a>
                  <a
                    href="https://onebuddy.io/"
                    className="inline-flex items-center gap-1.5 transition-all"
                    style={{
                      padding: '10px 20px',
                      background: 'transparent',
                      color: '#8b87a0',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 12,
                      fontSize: 14,
                      fontWeight: 500,
                      textDecoration: 'none',
                    }}
                  >
                    Visit our website
                  </a>
                </div>
              </div>
            )}

            {/* Footer */}
            <div
              className="flex items-center justify-center gap-3 mt-12 pt-6"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: 13, color: '#8b87a0' }}
            >
              <span>OneBuddy</span>
              <span className="w-[3px] h-[3px] rounded-full bg-current opacity-40" />
              <a href="https://onebuddy.io/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D946EF] transition-colors" style={{ color: '#8b87a0', textDecoration: 'none' }}>
                Website
              </a>
              <span className="w-[3px] h-[3px] rounded-full bg-current opacity-40" />
              <a href="https://onebuddy.io/knowledge-base/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D946EF] transition-colors" style={{ color: '#8b87a0', textDecoration: 'none' }}>
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
