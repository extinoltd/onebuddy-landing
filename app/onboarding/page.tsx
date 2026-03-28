'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

const TOTAL_SLIDES = 5;

// Personalization logic: role + goal → recommended features
const GOAL_FEATURES: Record<string, string[]> = {
  focus: ['Pomodoro Timer', 'Notes', 'Habit Tracker'],
  privacy: ['Ad Blocker', 'Tracker Blocker', 'Privacy Blur'],
  capture: ['Tab Screenshot', 'Screen Recording', 'Gallery'],
  health: ['Water Reminder', 'Stand Reminder', 'Eye Break'],
  consolidation: ['Pomodoro Timer', 'Ad Blocker', 'Screen Capture'],
};

const ALL_FEATURES = [
  { id: 'pomodoro', label: 'Pomodoro Timer', icon: '⏱️', image: '/new/focus timer.png' },
  { id: 'notes', label: 'Notes & Shortcuts', icon: '📝', image: '/new/note.png' },
  { id: 'clipboard', label: 'Clipboard History', icon: '📋', image: '/new/clipboard.png' },
  { id: 'habit', label: 'Habit Tracker', icon: '✅', image: '/new/habbit.png' },
  { id: 'calendar', label: 'Google Calendar', icon: '📅', image: '/new/calander.png' },
  { id: 'bookmark', label: 'Bookmark Manager', icon: '🔖', image: '/new/bookmark.png' },
  { id: 'water', label: 'Water Reminder', icon: '💧', image: '/new/remiders.png' },
  { id: 'stand', label: 'Stand Reminder', icon: '🧍', image: '/new/remiders.png' },
  { id: 'eyebreak', label: 'Eye Break (20-20-20)', icon: '👁️', image: '/new/eye care.png' },
  { id: 'adblocker', label: 'Ad Blocker', icon: '🛡️', image: '/new/ad block.png' },
  { id: 'tracker', label: 'Tracker Blocker', icon: '🔒', image: '/new/block tracker.png' },
  { id: 'blur', label: 'Privacy Blur', icon: '🫣', image: '/new/privet.png' },
  { id: 'screenshot', label: 'Tab Screenshot', icon: '📸', image: '/new/screenshot.png' },
  { id: 'recording', label: 'Screen Recording', icon: '🎥', image: '/new/videos.png' },
  { id: 'gallery', label: 'Built-in Gallery', icon: '🖼️', image: '/new/screenshot.png' },
  { id: 'browserlock', label: 'Browser Lock', icon: '🔐', image: '/new/privet.png' },
];

const GOAL_TO_FEATURE_IDS: Record<string, string[]> = {
  focus: ['pomodoro', 'notes', 'habit'],
  privacy: ['adblocker', 'tracker', 'blur'],
  capture: ['screenshot', 'recording', 'gallery'],
  health: ['water', 'stand', 'eyebreak'],
  consolidation: ['pomodoro', 'adblocker', 'screenshot'],
};

export default function OnboardingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [role, setRole] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const [experience, setExperience] = useState<string | null>(null);
  const [enabledFeatures, setEnabledFeatures] = useState<string[]>([]);
  const [quickWinDone, setQuickWinDone] = useState(false);

  const particlesRef = useRef<HTMLDivElement>(null);
  const prevSlideRef = useRef(0);

  // Particles
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    const colors = ['#D946EF', '#6366f1', '#0ea5e9', '#a855f7', '#ec4899'];
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'ob-particle';
      const size = Math.random() * 4 + 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;background:${color};animation-duration:${Math.random() * 15 + 10}s;animation-delay:${Math.random() * 10}s;`;
      container.appendChild(p);
    }
    return () => { container.innerHTML = ''; };
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (index < 0 || index >= TOTAL_SLIDES) return;
    setCurrentSlide((prev) => {
      if (index === prev) return prev;
      prevSlideRef.current = prev;
      return index;
    });
  }, []);

  // When goal changes, set recommended features
  useEffect(() => {
    if (goal) {
      setEnabledFeatures(GOAL_TO_FEATURE_IDS[goal] || []);
    }
  }, [goal]);

  const toggleFeature = useCallback((id: string) => {
    setEnabledFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }, []);

  const recommendedIds = useMemo(() => goal ? (GOAL_TO_FEATURE_IDS[goal] || []) : [], [goal]);
  const additionalFeatures = useMemo(() => ALL_FEATURES.filter((f) => !recommendedIds.includes(f.id)), [recommendedIds]);
  const recommendedFeatures = useMemo(() => ALL_FEATURES.filter((f) => recommendedIds.includes(f.id)), [recommendedIds]);

  const handleOpenSidebar = () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const c = (window as any).chrome;
      c?.storage?.local?.set?.({
        onboardingComplete: true,
        onboarding_state: { role, goal, experience, features_enabled: enabledFeatures },
      });
      c?.runtime?.sendMessage?.({ action: 'openSidePanel' });
      setTimeout(() => window.close(), 500);
    } catch {
      console.log('Not in extension context');
    }
  };

  const progressWidth = ((currentSlide + 1) / TOTAL_SLIDES) * 100;

  const slideClass = (index: number) => {
    const isActive = currentSlide === index;
    const isExitLeft = prevSlideRef.current === index && currentSlide > index;
    let cls = 'ob-slide';
    if (isActive) cls += ' ob-slide-active';
    else if (isExitLeft) cls += ' ob-slide-exit-left';
    return cls;
  };

  return (
    <>
      <style jsx global>{`
        .ob-root {
          --ob-bg: #0a0815;
          --ob-bg-card: #140f24;
          --ob-bg-card-hover: #1c1534;
          --ob-text: #f0eef5;
          --ob-text-muted: #8b87a0;
          --ob-border: rgba(255, 255, 255, 0.08);
          --ob-accent: #D946EF;
          --ob-accent-hover: #c026d3;
          --ob-accent-light: rgba(217, 70, 239, 0.12);
          --ob-accent-glow: rgba(217, 70, 239, 0.3);
          --ob-radius: 16px;
          --ob-transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          --ob-spring: 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .ob-root { height: 100vh; overflow: hidden; background: var(--ob-bg); color: var(--ob-text); -webkit-font-smoothing: antialiased; }
        .ob-particles { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        .ob-particle { position: absolute; border-radius: 50%; opacity: 0; animation: obParticleFloat linear infinite; }
        @keyframes obParticleFloat { 0% { opacity: 0; transform: translateY(100vh) scale(0); } 10% { opacity: 1; } 90% { opacity: 1; } 100% { opacity: 0; transform: translateY(-10vh) scale(1); } }
        .ob-progress-bar { position: fixed; top: 0; left: 0; right: 0; height: 3px; background: var(--ob-border); z-index: 100; }
        .ob-progress-fill { height: 100%; background: linear-gradient(90deg, var(--ob-accent), #6366f1); border-radius: 0 3px 3px 0; transition: width 0.5s var(--ob-spring); }
        .ob-slides-wrapper { position: relative; height: 100vh; width: 100%; overflow: hidden; z-index: 1; }
        .ob-slide { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0; transform: translateX(60px); pointer-events: none; transition: opacity 0.45s ease, transform 0.45s var(--ob-spring); padding: 60px 24px 100px; overflow-y: auto; }
        .ob-slide-active { opacity: 1; transform: translateX(0); pointer-events: auto; }
        .ob-slide-exit-left { opacity: 0; transform: translateX(-60px); }
        .ob-slide-content { max-width: 700px; width: 100%; text-align: center; }
        .ob-logo-area { position: relative; margin-bottom: 8px; }
        .ob-logo-glow { position: absolute; top: 50%; left: 50%; width: 160px; height: 160px; transform: translate(-50%, -50%); background: radial-gradient(circle, var(--ob-accent-glow) 0%, transparent 70%); border-radius: 50%; animation: obPulse 3s ease-in-out infinite; }
        @keyframes obPulse { 0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); } 50% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); } }
        .ob-bounce-in { animation: obBounceIn 0.6s var(--ob-spring); }
        @keyframes obBounceIn { 0% { opacity: 0; transform: scale(0.5); } 100% { opacity: 1; transform: scale(1); } }
        .ob-hero-title { font-size: clamp(28px, 5vw, 44px); font-weight: 900; line-height: 1.15; letter-spacing: -1px; color: var(--ob-text); margin-bottom: 8px; }
        .ob-gradient-text { background: linear-gradient(135deg, #D946EF, #6366f1, #0ea5e9); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .ob-hero-subtitle { font-size: clamp(15px, 2vw, 18px); color: var(--ob-text-muted); max-width: 460px; line-height: 1.6; margin: 0 auto 24px; }
        .ob-slide-badge { display: inline-block; padding: 6px 16px; background: var(--ob-accent-light); color: var(--ob-accent); border-radius: 100px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
        .ob-slide-title { font-size: clamp(24px, 4vw, 36px); font-weight: 800; line-height: 1.2; margin-bottom: 12px; letter-spacing: -0.5px; color: var(--ob-text); }
        .ob-slide-desc { font-size: 16px; color: var(--ob-text-muted); margin-bottom: 32px; max-width: 500px; margin-left: auto; margin-right: auto; line-height: 1.5; }
        .ob-hint-text { font-size: 13px; color: var(--ob-text-muted); opacity: 0.6; margin-top: 16px; }

        /* Role / option grid */
        .ob-role-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; max-width: 500px; margin: 0 auto; }
        .ob-role-card {
          background: var(--ob-bg-card); border: 2px solid var(--ob-border); border-radius: var(--ob-radius);
          padding: 18px 16px; text-align: center; cursor: pointer; transition: all var(--ob-transition); font-family: inherit; color: var(--ob-text);
        }
        .ob-role-card:hover { background: var(--ob-bg-card-hover); border-color: rgba(255,255,255,0.15); transform: translateY(-3px); }
        .ob-role-card:active { transform: scale(0.97); }
        .ob-role-card-selected { border-color: var(--ob-accent); background: var(--ob-accent-light); box-shadow: 0 0 0 1px var(--ob-accent), 0 4px 16px var(--ob-accent-glow); }
        .ob-role-card-icon { font-size: 28px; margin-bottom: 8px; display: block; }
        .ob-role-card-label { font-size: 14px; font-weight: 600; }
        .ob-role-card-sublabel { font-size: 12px; color: var(--ob-text-muted); margin-top: 4px; }

        /* Single column options */
        .ob-options-list { display: flex; flex-direction: column; gap: 12px; max-width: 440px; margin: 0 auto; }
        .ob-option-card {
          background: var(--ob-bg-card); border: 2px solid var(--ob-border); border-radius: 14px;
          padding: 16px 20px; text-align: left; cursor: pointer; transition: all var(--ob-transition);
          font-family: inherit; color: var(--ob-text); display: flex; align-items: center; gap: 14px;
        }
        .ob-option-card:hover { background: var(--ob-bg-card-hover); border-color: rgba(255,255,255,0.15); transform: translateY(-2px); }
        .ob-option-card:active { transform: scale(0.98); }
        .ob-option-card-selected { border-color: var(--ob-accent); background: var(--ob-accent-light); box-shadow: 0 0 0 1px var(--ob-accent), 0 4px 16px var(--ob-accent-glow); }
        .ob-option-icon { font-size: 22px; flex-shrink: 0; }
        .ob-option-text { flex: 1; }
        .ob-option-label { font-size: 15px; font-weight: 600; }
        .ob-option-sublabel { font-size: 12px; color: var(--ob-text-muted); margin-top: 2px; }

        /* Feature preview */
        .ob-feature-section-title { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--ob-text-muted); margin: 24px 0 12px; }
        .ob-feature-toggle-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; max-width: 520px; margin: 0 auto; }
        .ob-feature-toggle {
          background: var(--ob-bg-card); border: 2px solid var(--ob-border); border-radius: 14px;
          padding: 14px 10px; text-align: center; cursor: pointer; transition: all var(--ob-transition);
          font-family: inherit; color: var(--ob-text); position: relative;
        }
        .ob-feature-toggle:hover { background: var(--ob-bg-card-hover); border-color: rgba(255,255,255,0.15); }
        .ob-feature-toggle-enabled { border-color: var(--ob-accent); background: var(--ob-accent-light); }
        .ob-feature-toggle img { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; margin: 0 auto 8px; display: block; }
        .ob-feature-toggle-label { font-size: 11px; font-weight: 600; line-height: 1.3; }
        .ob-feature-toggle-check { position: absolute; top: 6px; right: 6px; width: 18px; height: 18px; border-radius: 50%; background: var(--ob-accent); display: flex; align-items: center; justify-content: center; }

        /* Quick win */
        .ob-quickwin-card {
          background: var(--ob-bg-card); border: 1px solid var(--ob-border); border-radius: var(--ob-radius);
          padding: 32px 24px; max-width: 420px; margin: 0 auto; text-align: center;
        }
        .ob-quickwin-card img { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin: 0 auto 16px; display: block; }
        .ob-quickwin-title { font-size: 18px; font-weight: 700; margin-bottom: 8px; }
        .ob-quickwin-desc { font-size: 14px; color: var(--ob-text-muted); line-height: 1.5; margin-bottom: 20px; }
        .ob-quickwin-options { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 16px; }
        .ob-quickwin-pill {
          padding: 10px 20px; border-radius: 100px; background: var(--ob-bg-card-hover); border: 1px solid var(--ob-border);
          color: var(--ob-text); font-size: 14px; font-weight: 500; cursor: pointer; transition: all var(--ob-transition); font-family: inherit;
        }
        .ob-quickwin-pill:hover { border-color: var(--ob-accent); background: var(--ob-accent-light); }
        .ob-quickwin-pill-selected { border-color: var(--ob-accent); background: var(--ob-accent-light); }

        /* Success animation */
        .ob-success-mascot { animation: obBounceIn 0.6s var(--ob-spring); }

        /* Buttons */
        .ob-btn-primary {
          display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px;
          background: linear-gradient(135deg, var(--ob-accent), #a855f7); color: white; border: none;
          border-radius: 14px; font-size: 15px; font-weight: 600; cursor: pointer;
          transition: all var(--ob-transition); font-family: inherit;
          box-shadow: 0 4px 20px var(--ob-accent-glow);
        }
        .ob-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 28px var(--ob-accent-glow); }
        .ob-btn-primary:active { transform: scale(0.97); }
        .ob-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .ob-btn-large { padding: 16px 36px; font-size: 16px; border-radius: 16px; }
        .ob-btn-ghost {
          display: inline-flex; align-items: center; gap: 6px; padding: 10px 20px;
          background: transparent; color: var(--ob-text-muted); border: 1px solid var(--ob-border);
          border-radius: 12px; font-size: 14px; font-weight: 500; cursor: pointer;
          transition: all var(--ob-transition); font-family: inherit;
        }
        .ob-btn-ghost:hover { color: var(--ob-text); border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.04); }
        .ob-skip-link { background: none; border: none; color: var(--ob-text-muted); font-size: 13px; cursor: pointer; font-family: inherit; padding: 8px; transition: color var(--ob-transition); }
        .ob-skip-link:hover { color: var(--ob-text); }

        /* Nav */
        .ob-nav-bar {
          position: fixed; bottom: 0; left: 0; right: 0; display: flex; align-items: center;
          justify-content: space-between; padding: 20px 32px;
          background: linear-gradient(transparent, var(--ob-bg) 40%); z-index: 50;
        }
        .ob-nav-dots { display: flex; gap: 8px; }
        .ob-nav-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--ob-border); border: none; cursor: pointer; transition: all var(--ob-spring); padding: 0; }
        .ob-nav-dot:hover { background: var(--ob-text-muted); }
        .ob-nav-dot-active { width: 28px; border-radius: 4px; background: linear-gradient(90deg, var(--ob-accent), #6366f1); }
        .ob-nav-buttons { display: flex; gap: 8px; align-items: center; }

        /* Animations */
        @keyframes obFadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .ob-slide-active .ob-slide-badge, .ob-slide-active .ob-hero-title, .ob-slide-active .ob-slide-title { animation: obFadeInUp 0.5s ease backwards; }
        .ob-slide-active .ob-hero-subtitle, .ob-slide-active .ob-slide-desc { animation: obFadeInUp 0.5s 0.1s ease backwards; }
        .ob-slide-active .ob-role-grid, .ob-slide-active .ob-options-list, .ob-slide-active .ob-feature-toggle-grid, .ob-slide-active .ob-quickwin-card { animation: obFadeInUp 0.5s 0.2s ease backwards; }

        /* Social links */
        .ob-social-links { display: flex; align-items: center; gap: 12px; margin-top: 12px; justify-content: center; }
        .ob-social-link { font-size: 13px; color: var(--ob-text-muted); text-decoration: none; transition: color var(--ob-transition); }
        .ob-social-link:hover { color: var(--ob-accent); }
        .ob-social-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--ob-text-muted); opacity: 0.4; }

        /* Responsive */
        @media (max-width: 768px) {
          .ob-role-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .ob-feature-toggle-grid { grid-template-columns: repeat(2, 1fr); }
          .ob-slide { padding: 50px 16px 100px; }
          .ob-nav-bar { padding: 16px 20px; }
        }
        @media (max-width: 480px) {
          .ob-role-grid { grid-template-columns: 1fr; max-width: 300px; }
          .ob-feature-toggle-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="ob-root">
        <div className="ob-particles" ref={particlesRef} />

        <div className="ob-progress-bar">
          <div className="ob-progress-fill" style={{ width: `${progressWidth}%` }} />
        </div>

        <div className="ob-slides-wrapper">

          {/* ===== SCREEN 1: Welcome + Role ===== */}
          <section className={slideClass(0)}>
            <div className="ob-slide-content">
              <div className="ob-logo-area">
                <img src="/new/goodmorning.png" alt="OneBuddy" className="ob-bounce-in" style={{ width: 100, height: 100, borderRadius: '50%', position: 'relative', zIndex: 1 }} />
                <div className="ob-logo-glow" />
              </div>
              <h1 className="ob-hero-title">Welcome to <span className="ob-gradient-text">OneBuddy</span></h1>
              <p className="ob-hero-subtitle">One extension. Everything you need.</p>

              <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--ob-text)', marginBottom: 20 }}>What best describes you?</p>

              <div className="ob-role-grid">
                {[
                  { value: 'remote_worker', icon: '🏠', label: 'Remote Worker' },
                  { value: 'student', icon: '🎓', label: 'Student' },
                  { value: 'developer', icon: '💻', label: 'Developer' },
                  { value: 'content_creator', icon: '🎬', label: 'Content Creator' },
                  { value: 'freelancer', icon: '✏️', label: 'Freelancer' },
                  { value: 'explorer', icon: '✨', label: 'Just Exploring' },
                ].map((r) => (
                  <button
                    key={r.value}
                    className={`ob-role-card ${role === r.value ? 'ob-role-card-selected' : ''}`}
                    onClick={() => { setRole(r.value); setTimeout(() => goToSlide(1), 350); }}
                  >
                    <span className="ob-role-card-icon">{r.icon}</span>
                    <span className="ob-role-card-label">{r.label}</span>
                  </button>
                ))}
              </div>

              <button className="ob-skip-link" onClick={() => goToSlide(1)} style={{ marginTop: 20 }}>Skip →</button>
            </div>
          </section>

          {/* ===== SCREEN 2: Goal Selection ===== */}
          <section className={slideClass(1)}>
            <div className="ob-slide-content">
              <span className="ob-slide-badge">Your Priority</span>
              <h2 className="ob-slide-title">What brought you <span className="ob-gradient-text">here?</span></h2>
              <p className="ob-slide-desc">Pick your top priority.</p>

              <div className="ob-options-list">
                {[
                  { value: 'focus', icon: '🎯', label: 'Stay focused & productive', sub: 'Pomodoro, notes, habits' },
                  { value: 'privacy', icon: '🛡️', label: 'Block ads & protect privacy', sub: 'Ad blocker, tracker blocker, blur' },
                  { value: 'capture', icon: '📸', label: 'Record my screen easily', sub: 'Screenshot, recording, gallery' },
                  { value: 'health', icon: '💚', label: 'Take better care of my health', sub: 'Water, stand, eye break reminders' },
                  { value: 'consolidation', icon: '🧩', label: 'Replace too many extensions', sub: 'All-in-one power' },
                ].map((g) => (
                  <button
                    key={g.value}
                    className={`ob-option-card ${goal === g.value ? 'ob-option-card-selected' : ''}`}
                    onClick={() => { setGoal(g.value); setTimeout(() => goToSlide(2), 350); }}
                  >
                    <span className="ob-option-icon">{g.icon}</span>
                    <div className="ob-option-text">
                      <div className="ob-option-label">{g.label}</div>
                      <div className="ob-option-sublabel">{g.sub}</div>
                    </div>
                  </button>
                ))}
              </div>

              <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', maxWidth: 440, margin: '20px auto 0' }}>
                <button className="ob-skip-link" onClick={() => goToSlide(0)}>← Back</button>
                <button className="ob-skip-link" onClick={() => goToSlide(2)}>Skip →</button>
              </div>
            </div>
          </section>

          {/* ===== SCREEN 3: Experience Level ===== */}
          <section className={slideClass(2)}>
            <div className="ob-slide-content">
              <span className="ob-slide-badge">Experience</span>
              <h2 className="ob-slide-title">How familiar are you with <span className="ob-gradient-text">Chrome extensions?</span></h2>
              <p className="ob-slide-desc">This helps us calibrate your experience.</p>

              <div className="ob-options-list">
                {[
                  { value: 'beginner', icon: '🌱', label: 'New to extensions', sub: 'I barely use any' },
                  { value: 'intermediate', icon: '⚡', label: 'I use a few', sub: 'I have 3–5 installed' },
                  { value: 'power_user', icon: '🚀', label: 'Extension power user', sub: 'I have 8+ and manage them' },
                ].map((e) => (
                  <button
                    key={e.value}
                    className={`ob-option-card ${experience === e.value ? 'ob-option-card-selected' : ''}`}
                    onClick={() => { setExperience(e.value); setTimeout(() => goToSlide(3), 350); }}
                  >
                    <span className="ob-option-icon">{e.icon}</span>
                    <div className="ob-option-text">
                      <div className="ob-option-label">{e.label}</div>
                      <div className="ob-option-sublabel">{e.sub}</div>
                    </div>
                  </button>
                ))}
              </div>

              <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', maxWidth: 440, margin: '20px auto 0' }}>
                <button className="ob-skip-link" onClick={() => goToSlide(1)}>← Back</button>
                <button className="ob-skip-link" onClick={() => goToSlide(3)}>Skip →</button>
              </div>
            </div>
          </section>

          {/* ===== SCREEN 4: Personalized Suite Preview ===== */}
          <section className={slideClass(3)}>
            <div className="ob-slide-content">
              <span className="ob-slide-badge">Your Setup</span>
              <h2 className="ob-slide-title">Here&apos;s your <span className="ob-gradient-text">personalized setup</span></h2>
              <p className="ob-slide-desc">Based on your goals, we recommend these tools.</p>

              {recommendedFeatures.length > 0 && (
                <>
                  <div className="ob-feature-section-title">Recommended for you</div>
                  <div className="ob-feature-toggle-grid">
                    {recommendedFeatures.map((f) => (
                      <button key={f.id} className={`ob-feature-toggle ${enabledFeatures.includes(f.id) ? 'ob-feature-toggle-enabled' : ''}`} onClick={() => toggleFeature(f.id)}>
                        {enabledFeatures.includes(f.id) && (
                          <span className="ob-feature-toggle-check">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                          </span>
                        )}
                        <img src={f.image} alt={f.label} />
                        <div className="ob-feature-toggle-label">{f.label}</div>
                      </button>
                    ))}
                  </div>
                </>
              )}

              <div className="ob-feature-section-title">Also available</div>
              <div className="ob-feature-toggle-grid">
                {additionalFeatures.slice(0, 6).map((f) => (
                  <button key={f.id} className={`ob-feature-toggle ${enabledFeatures.includes(f.id) ? 'ob-feature-toggle-enabled' : ''}`} onClick={() => toggleFeature(f.id)}>
                    {enabledFeatures.includes(f.id) && (
                      <span className="ob-feature-toggle-check">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      </span>
                    )}
                    <img src={f.image} alt={f.label} />
                    <div className="ob-feature-toggle-label">{f.label}</div>
                  </button>
                ))}
              </div>

              <p style={{ fontSize: 12, color: 'var(--ob-text-muted)', marginTop: 16 }}>You can always change these in settings.</p>

              <div style={{ marginTop: 20, display: 'flex', gap: 12, justifyContent: 'center' }}>
                <button className="ob-btn-ghost" onClick={() => goToSlide(2)}>← Back</button>
                <button className="ob-btn-primary" onClick={() => goToSlide(4)}>
                  Set Up My OneBuddy →
                </button>
              </div>
            </div>
          </section>

          {/* ===== SCREEN 5: Quick Win + Done ===== */}
          <section className={slideClass(4)}>
            <div className="ob-slide-content">
              {!quickWinDone ? (
                <>
                  {goal === 'focus' && (
                    <div className="ob-quickwin-card">
                      <img src="/new/focus timer.png" alt="Focus Timer" />
                      <div className="ob-quickwin-title">Start your first focus session!</div>
                      <div className="ob-quickwin-desc">Screen dims automatically so you stay focused. Try it now!</div>
                      <div className="ob-quickwin-options">
                        {['25 min', '15 min', '5 min'].map((t) => (
                          <button key={t} className="ob-quickwin-pill" onClick={() => setQuickWinDone(true)}>{t}</button>
                        ))}
                      </div>
                    </div>
                  )}
                  {goal === 'privacy' && (
                    <div className="ob-quickwin-card">
                      <img src="/new/ad block.png" alt="Ad Blocker" />
                      <div className="ob-quickwin-title">Your ad blocker is now active!</div>
                      <div className="ob-quickwin-desc">Ads blocked since install: <strong>0</strong><br />Watch this number grow!</div>
                      <button className="ob-btn-primary" onClick={() => setQuickWinDone(true)}>Open YouTube Ad-Free</button>
                    </div>
                  )}
                  {goal === 'capture' && (
                    <div className="ob-quickwin-card">
                      <img src="/new/screenshot.png" alt="Screenshot" />
                      <div className="ob-quickwin-title">Capture your first screenshot!</div>
                      <div className="ob-quickwin-desc">Your captures are saved in OneBuddy&apos;s built-in gallery. No cloud. No signup. Just yours.</div>
                      <div className="ob-quickwin-options">
                        <button className="ob-quickwin-pill" onClick={() => setQuickWinDone(true)}>📸 Screenshot This Tab</button>
                        <button className="ob-quickwin-pill" onClick={() => setQuickWinDone(true)}>📜 Full Page Capture</button>
                      </div>
                    </div>
                  )}
                  {goal === 'health' && (
                    <div className="ob-quickwin-card">
                      <img src="/new/remiders.png" alt="Health Reminders" />
                      <div className="ob-quickwin-title">Your health reminders are set!</div>
                      <div className="ob-quickwin-desc">
                        💧 Water Reminder: Every 45 min<br />
                        🧍 Stand Reminder: Every 60 min<br />
                        👁️ Eye Break: Every 20 min
                      </div>
                      <div className="ob-quickwin-options">
                        <button className="ob-quickwin-pill" onClick={() => setQuickWinDone(true)}>⚙️ Adjust Timing</button>
                        <button className="ob-quickwin-pill ob-quickwin-pill-selected" onClick={() => setQuickWinDone(true)}>✅ Looks Good!</button>
                      </div>
                    </div>
                  )}
                  {(goal === 'consolidation' || !goal) && (
                    <div className="ob-quickwin-card">
                      <img src="/new/goodmorning.png" alt="OneBuddy" />
                      <div className="ob-quickwin-title">You&apos;re all set up!</div>
                      <div className="ob-quickwin-desc">Your personalized OneBuddy is ready. Open the side panel to explore all your tools.</div>
                      <button className="ob-btn-primary" onClick={() => setQuickWinDone(true)}>Open OneBuddy →</button>
                    </div>
                  )}
                  <button className="ob-skip-link" onClick={() => setQuickWinDone(true)} style={{ marginTop: 16 }}>I&apos;ll try later — open side panel →</button>
                </>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                  <div className="ob-success-mascot">
                    <img src="/hero.gif" alt="OneBuddy ready" style={{ width: 180, height: 112, borderRadius: 16, objectFit: 'cover' }} />
                  </div>
                  <h1 className="ob-hero-title">You&apos;re all set!</h1>
                  <p className="ob-hero-subtitle">Click the OneBuddy icon in your toolbar to open the sidebar and start being productive.</p>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                    <button className="ob-btn-primary ob-btn-large" onClick={handleOpenSidebar}>
                      Open OneBuddy
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </button>
                    <button className="ob-btn-ghost" onClick={() => { try { window.close(); } catch { console.log('close'); } }}>Close this tab</button>
                  </div>
                  <div className="ob-social-links">
                    <a href="https://onebuddy.io/" target="_blank" rel="noopener noreferrer" className="ob-social-link">Website</a>
                    <span className="ob-social-dot" />
                    <a href="https://onebuddy.io/knowledge-base/" target="_blank" rel="noopener noreferrer" className="ob-social-link">Support</a>
                  </div>
                </div>
              )}
            </div>
          </section>

        </div>

        {/* Navigation */}
        <div className="ob-nav-bar">
          <div className="ob-nav-dots">
            {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
              <button key={i} className={`ob-nav-dot ${currentSlide === i ? 'ob-nav-dot-active' : ''}`} onClick={() => goToSlide(i)} />
            ))}
          </div>
          <div className="ob-nav-buttons">
            {currentSlide === 4 && !quickWinDone && (
              <button className="ob-skip-link" onClick={() => goToSlide(3)}>← Back</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
