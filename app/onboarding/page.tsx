'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const TOTAL_SLIDES = 6;
const SURVEY_SLIDE = 2;
const PIN_GUIDE_SLIDE = 4;
const LAST_SLIDE = 5;
const TOTAL_SURVEY_STEPS = 3;

export default function OnboardingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSurveyStep, setCurrentSurveyStep] = useState(0);
  const [currentPinStep, setCurrentPinStep] = useState(0);
  const [pinAnimActive, setPinAnimActive] = useState(false);
  const [surveyResponses, setSurveyResponses] = useState<{
    role: string | null;
    useCase: string[];
    frequency: string | null;
  }>({ role: null, useCase: [], frequency: null });

  const particlesRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const prevSlideRef = useRef(0);
  const pinIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // ==================== PARTICLES ====================
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

  // ==================== PIN GUIDE ANIMATION ====================
  useEffect(() => {
    if (pinAnimActive) {
      setCurrentPinStep(0);
      pinIntervalRef.current = setInterval(() => {
        setCurrentPinStep((prev) => (prev >= 3 ? 0 : prev + 1));
      }, 2500);
    } else {
      if (pinIntervalRef.current) {
        clearInterval(pinIntervalRef.current);
        pinIntervalRef.current = null;
      }
      setCurrentPinStep(0);
    }
    return () => {
      if (pinIntervalRef.current) clearInterval(pinIntervalRef.current);
    };
  }, [pinAnimActive]);

  // ==================== SLIDE NAVIGATION ====================
  const goToSlide = useCallback((index: number) => {
    if (index < 0 || index >= TOTAL_SLIDES) return;
    setCurrentSlide((prev) => {
      if (index === prev) return prev;
      prevSlideRef.current = prev;
      return index;
    });
  }, []);

  // Start/stop pin animation based on current slide
  useEffect(() => {
    if (currentSlide === PIN_GUIDE_SLIDE) {
      setPinAnimActive(true);
    } else {
      setPinAnimActive(false);
    }
    // Reset survey when entering survey slide
    if (currentSlide === SURVEY_SLIDE && prevSlideRef.current !== SURVEY_SLIDE) {
      setCurrentSurveyStep(0);
    }
  }, [currentSlide]);

  // ==================== SURVEY LOGIC ====================
  const completeSurvey = useCallback(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).chrome?.storage?.local?.set?.({ surveyResponses });
    } catch {
      console.log('Survey responses:', surveyResponses);
    }
    goToSlide(SURVEY_SLIDE + 1);
  }, [surveyResponses, goToSlide]);

  const handleSurveyOptionClick = useCallback(
    (key: string, value: string, isMulti: boolean) => {
      if (isMulti) {
        setSurveyResponses((prev) => {
          const idx = prev.useCase.indexOf(value);
          const newUseCase = idx > -1 ? prev.useCase.filter((v) => v !== value) : [...prev.useCase, value];
          return { ...prev, useCase: newUseCase };
        });
      } else {
        setSurveyResponses((prev) => ({ ...prev, [key]: value }));
        setTimeout(() => {
          if (key === 'role') {
            setCurrentSurveyStep(1);
          } else if (key === 'frequency') {
            completeSurvey();
          }
        }, 350);
      }
    },
    [completeSurvey]
  );

  // ==================== KEYBOARD NAVIGATION ====================
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (currentSlide === SURVEY_SLIDE) {
        if (e.key === 'ArrowLeft' && currentSurveyStep > 0) {
          setCurrentSurveyStep((p) => p - 1);
        }
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (currentSlide === 0) goToSlide(1);
        else if (currentSlide < LAST_SLIDE) goToSlide(currentSlide + 1);
      }
      if (e.key === 'ArrowLeft' && currentSlide > 0 && currentSlide < LAST_SLIDE) {
        goToSlide(currentSlide - 1);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [currentSlide, currentSurveyStep, goToSlide]);

  // ==================== CHROME ACTIONS ====================
  const handleOpenSidebar = () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const c = (window as any).chrome;
      c?.storage?.local?.set?.({ onboardingComplete: true });
      c?.runtime?.sendMessage?.({ action: 'openSidePanel' });
      setTimeout(() => window.close(), 500);
    } catch {
      console.log('Not in extension context');
    }
  };

  const handleCloseTab = () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).chrome?.storage?.local?.set?.({ onboardingComplete: true });
      window.close();
    } catch {
      console.log('Not in extension context');
    }
  };

  // ==================== UI FLAGS ====================
  const isFirst = currentSlide === 0;
  const isLast = currentSlide === LAST_SLIDE;
  const isSurvey = currentSlide === SURVEY_SLIDE;
  const showPrevNext = !(isFirst || isLast || isSurvey);
  const progressWidth = ((currentSlide + 1) / TOTAL_SLIDES) * 100;
  const surveyProgressWidth = ((currentSurveyStep + 1) / TOTAL_SURVEY_STEPS) * 100;

  // ==================== HELPERS ====================
  const slideClass = (index: number) => {
    const isActive = currentSlide === index;
    const isExitLeft = prevSlideRef.current === index && currentSlide > index;
    let cls = 'ob-slide';
    if (isActive) cls += ' ob-slide-active';
    else if (isExitLeft) cls += ' ob-slide-exit-left';
    return cls;
  };

  const pinStepClass = (index: number) => {
    if (index < currentPinStep) return 'ob-pin-step ob-pin-step-completed';
    if (index === currentPinStep) return 'ob-pin-step ob-pin-step-active';
    return 'ob-pin-step';
  };

  // ==================== RENDER ====================
  return (
    <>
      <style jsx global>{`
        /* ==================== ONBOARDING PAGE STYLES ==================== */
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
          --ob-radius-sm: 10px;
          --ob-transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          --ob-spring: 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .ob-root {
          height: 100vh;
          overflow: hidden;
          background: var(--ob-bg);
          color: var(--ob-text);
          -webkit-font-smoothing: antialiased;
        }

        /* Particles */
        .ob-particles { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        .ob-particle { position: absolute; border-radius: 50%; opacity: 0; animation: obParticleFloat linear infinite; }
        @keyframes obParticleFloat {
          0% { opacity: 0; transform: translateY(100vh) scale(0); }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-10vh) scale(1); }
        }

        /* Progress bar */
        .ob-progress-bar { position: fixed; top: 0; left: 0; right: 0; height: 3px; background: var(--ob-border); z-index: 100; }
        .ob-progress-fill { height: 100%; background: linear-gradient(90deg, var(--ob-accent), #6366f1); border-radius: 0 3px 3px 0; transition: width 0.5s var(--ob-spring); }

        /* Slides */
        .ob-slides-wrapper { position: relative; height: 100vh; width: 100%; overflow: hidden; z-index: 1; }
        .ob-slide {
          position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
          opacity: 0; transform: translateX(60px); pointer-events: none;
          transition: opacity 0.45s ease, transform 0.45s var(--ob-spring);
          padding: 60px 24px 100px; overflow-y: auto;
        }
        .ob-slide-active { opacity: 1; transform: translateX(0); pointer-events: auto; }
        .ob-slide-exit-left { opacity: 0; transform: translateX(-60px); }
        .ob-slide-content { max-width: 900px; width: 100%; text-align: center; }

        /* Welcome */
        .ob-welcome { display: flex; flex-direction: column; align-items: center; gap: 24px; }
        .ob-logo-area { position: relative; margin-bottom: 8px; }
        .ob-app-icon { width: 96px; height: 96px; border-radius: 24px; position: relative; z-index: 1; }
        .ob-logo-glow {
          position: absolute; top: 50%; left: 50%; width: 160px; height: 160px;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, var(--ob-accent-glow) 0%, transparent 70%);
          border-radius: 50%; animation: obPulse 3s ease-in-out infinite;
        }
        @keyframes obPulse {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
        }
        .ob-bounce-in { animation: obBounceIn 0.6s var(--ob-spring); }
        @keyframes obBounceIn { 0% { opacity: 0; transform: scale(0.5); } 100% { opacity: 1; transform: scale(1); } }

        .ob-hero-title { font-size: clamp(28px, 5vw, 44px); font-weight: 900; line-height: 1.15; letter-spacing: -1px; color: var(--ob-text); }
        .ob-gradient-text { background: linear-gradient(135deg, #D946EF, #6366f1, #0ea5e9); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .ob-hero-subtitle { font-size: clamp(15px, 2vw, 18px); color: var(--ob-text-muted); max-width: 460px; line-height: 1.6; }
        .ob-hint-text { font-size: 13px; color: var(--ob-text-muted); opacity: 0.6; }

        /* Buttons */
        .ob-btn-primary {
          display: inline-flex; align-items: center; gap: 8px; padding: 12px 28px;
          background: linear-gradient(135deg, var(--ob-accent), #a855f7); color: white; border: none;
          border-radius: 14px; font-size: 15px; font-weight: 600; cursor: pointer;
          transition: all var(--ob-transition); font-family: inherit;
          box-shadow: 0 4px 20px var(--ob-accent-glow);
        }
        .ob-btn-primary svg { width: 18px; height: 18px; }
        .ob-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 28px var(--ob-accent-glow); }
        .ob-btn-primary:active { transform: scale(0.97); }
        .ob-btn-large { padding: 16px 36px; font-size: 16px; border-radius: 16px; }
        .ob-btn-ghost {
          display: inline-flex; align-items: center; gap: 6px; padding: 10px 20px;
          background: transparent; color: var(--ob-text-muted); border: 1px solid var(--ob-border);
          border-radius: 12px; font-size: 14px; font-weight: 500; cursor: pointer;
          transition: all var(--ob-transition); font-family: inherit;
        }
        .ob-btn-ghost svg { width: 16px; height: 16px; }
        .ob-btn-ghost:hover { color: var(--ob-text); border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.04); }

        /* Badge & desc */
        .ob-slide-badge {
          display: inline-block; padding: 6px 16px; background: var(--ob-accent-light); color: var(--ob-accent);
          border-radius: 100px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px;
        }
        .ob-slide-title { font-size: clamp(24px, 4vw, 36px); font-weight: 800; line-height: 1.2; margin-bottom: 12px; letter-spacing: -0.5px; color: var(--ob-text); }
        .ob-slide-desc { font-size: 16px; color: var(--ob-text-muted); margin-bottom: 40px; max-width: 500px; margin-left: auto; margin-right: auto; line-height: 1.5; }

        /* Features grid */
        .ob-features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 820px; margin: 0 auto; }
        .ob-feature-card {
          background: var(--ob-bg-card); border: 1px solid var(--ob-border); border-radius: var(--ob-radius);
          padding: 28px 20px; text-align: center; transition: all var(--ob-transition); cursor: default;
        }
        .ob-feature-card:hover { background: var(--ob-bg-card-hover); border-color: rgba(255,255,255,0.12); transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.3); }
        .ob-feature-icon {
          width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px;
        }
        .ob-feature-icon svg { width: 24px; height: 24px; }
        .ob-feature-card h3 { font-size: 14px; font-weight: 700; margin-bottom: 6px; color: var(--ob-text); }
        .ob-feature-card p { font-size: 12px; color: var(--ob-text-muted); line-height: 1.5; }

        /* Steps */
        .ob-steps-container { display: flex; align-items: flex-start; justify-content: center; gap: 0; max-width: 860px; margin: 0 auto; }
        .ob-step-card { flex: 1; max-width: 240px; text-align: center; padding: 0 16px; }
        .ob-step-number {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, var(--ob-accent), #6366f1); color: white;
          font-size: 16px; font-weight: 800; display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px; box-shadow: 0 4px 16px var(--ob-accent-glow);
        }
        .ob-step-visual {
          width: 64px; height: 64px; border-radius: 20px; background: var(--ob-bg-card);
          border: 1px solid var(--ob-border); display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px;
        }
        .ob-step-visual svg { width: 28px; height: 28px; color: var(--ob-accent); }
        .ob-step-card h3 { font-size: 15px; font-weight: 700; margin-bottom: 8px; color: var(--ob-text); }
        .ob-step-card p { font-size: 13px; color: var(--ob-text-muted); line-height: 1.5; }
        .ob-step-connector { display: flex; align-items: center; padding-top: 24px; color: var(--ob-text-muted); opacity: 0.3; flex-shrink: 0; }
        .ob-step-connector svg { width: 20px; height: 20px; }

        /* Success */
        .ob-success-icon { margin-bottom: 8px; animation: obBounceIn 0.6s var(--ob-spring); }
        .ob-success-icon svg { width: 80px; height: 80px; }
        .ob-final-actions { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; justify-content: center; }
        .ob-social-links { display: flex; align-items: center; gap: 12px; margin-top: 8px; }
        .ob-social-link { font-size: 13px; color: var(--ob-text-muted); text-decoration: none; transition: color var(--ob-transition); }
        .ob-social-link:hover { color: var(--ob-accent); }
        .ob-social-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--ob-text-muted); opacity: 0.4; }

        /* Nav bar */
        .ob-nav-bar {
          position: fixed; bottom: 0; left: 0; right: 0; display: flex; align-items: center;
          justify-content: space-between; padding: 20px 32px;
          background: linear-gradient(transparent, var(--ob-bg) 40%); z-index: 50;
        }
        .ob-nav-dots { display: flex; gap: 8px; }
        .ob-nav-dot {
          width: 8px; height: 8px; border-radius: 50%; background: var(--ob-border);
          border: none; cursor: pointer; transition: all var(--ob-spring); padding: 0;
        }
        .ob-nav-dot:hover { background: var(--ob-text-muted); }
        .ob-nav-dot-active { width: 28px; border-radius: 4px; background: linear-gradient(90deg, var(--ob-accent), #6366f1); }
        .ob-nav-buttons { display: flex; gap: 8px; }
        .ob-btn-nav { padding: 10px 20px; font-size: 14px; }
        .ob-btn-nav svg { width: 16px; height: 16px; }

        /* Survey */
        .ob-survey-container { position: relative; max-width: 600px; margin: 0 auto; }
        .ob-survey-progress { text-align: center; margin-bottom: 32px; }
        .ob-survey-step-label { display: block; font-size: 13px; color: var(--ob-text-muted); margin-bottom: 10px; font-weight: 500; }
        .ob-survey-progress-bar { height: 4px; background: var(--ob-border); border-radius: 4px; overflow: hidden; }
        .ob-survey-progress-fill { height: 100%; background: linear-gradient(90deg, var(--ob-accent), #6366f1); border-radius: 4px; transition: width 0.4s var(--ob-spring); }
        .ob-survey-skip {
          position: absolute; top: 0; right: 0; background: none; border: none;
          color: var(--ob-text-muted); font-size: 13px; font-weight: 500; cursor: pointer;
          font-family: inherit; padding: 4px 8px; border-radius: 8px; transition: all var(--ob-transition);
        }
        .ob-survey-skip:hover { color: var(--ob-text); background: rgba(255,255,255,0.06); }
        .ob-survey-step { display: none; }
        .ob-survey-step-active { display: block; animation: obFadeInUp 0.35s ease; }
        .ob-survey-options { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin-top: 28px; }
        .ob-survey-option {
          min-height: 52px; min-width: 140px; padding: 14px 22px;
          background: var(--ob-bg-card); border: 2px solid var(--ob-border); border-radius: 14px;
          color: var(--ob-text); font-size: 15px; font-weight: 500; cursor: pointer;
          display: flex; align-items: center; gap: 10px; transition: all var(--ob-transition);
          font-family: inherit; position: relative;
        }
        .ob-survey-option:hover { border-color: rgba(255,255,255,0.2); background: var(--ob-bg-card-hover); transform: translateY(-2px); }
        .ob-survey-option:active { transform: scale(0.97); }
        .ob-survey-option-selected { border-color: var(--ob-accent); background: var(--ob-accent-light); box-shadow: 0 0 0 1px var(--ob-accent), 0 4px 16px var(--ob-accent-glow); }
        .ob-survey-option-icon { font-size: 20px; flex-shrink: 0; }
        .ob-survey-option-checkmark {
          position: absolute; top: 8px; right: 10px; width: 20px; height: 20px;
          border-radius: 50%; background: var(--ob-accent); display: flex; align-items: center; justify-content: center;
        }
        .ob-survey-pills .ob-survey-option { border-radius: 100px; min-width: auto; justify-content: center; padding: 12px 24px; }
        .ob-survey-continue-btn { margin-top: 24px; }

        /* Pin guide */
        .ob-pin-guide-mockup {
          max-width: 480px; margin: 32px auto 0; position: relative;
          border-radius: 12px; overflow: hidden; box-shadow: 0 8px 40px rgba(0,0,0,0.4);
        }
        .ob-chrome-toolbar-mock { background: #202124; border-radius: 12px 12px 0 0; }
        .ob-chrome-tab-bar { display: flex; align-items: flex-end; padding: 8px 12px 0; gap: 2px; }
        .ob-chrome-tab { display: flex; align-items: center; gap: 6px; padding: 8px 16px; background: #292a2d; border-radius: 8px 8px 0 0; font-size: 11px; color: var(--ob-text); }
        .ob-chrome-address-row { display: flex; align-items: center; gap: 8px; padding: 8px 12px 10px; background: #292a2d; }
        .ob-chrome-nav-buttons { display: flex; align-items: center; gap: 6px; color: #9aa0a6; flex-shrink: 0; }
        .ob-chrome-url-bar {
          flex: 1; display: flex; align-items: center; gap: 8px;
          background: #35363a; border-radius: 20px; padding: 6px 14px;
          color: #9aa0a6; font-size: 12px; font-family: inherit;
        }
        .ob-chrome-extensions-area { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
        .ob-chrome-ext-icon { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.3s; }
        .ob-chrome-puzzle-icon {
          width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center;
          justify-content: center; color: #9aa0a6; cursor: pointer; transition: all 0.3s;
        }
        .ob-chrome-puzzle-highlight { color: var(--ob-accent); box-shadow: 0 0 0 3px var(--ob-accent-glow); animation: obPulseRing 1.5s ease-in-out infinite; }
        .ob-chrome-ext-dropdown {
          background: #292a2d; border-top: 1px solid rgba(255,255,255,0.06);
          padding: 0; max-height: 0; opacity: 0; overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ob-chrome-ext-dropdown-visible { opacity: 1; max-height: 200px; padding: 8px; }
        .ob-ext-dropdown-header { font-size: 11px; font-weight: 600; color: #9aa0a6; padding: 6px 12px 8px; text-transform: uppercase; letter-spacing: 0.5px; }
        .ob-ext-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; transition: all 0.3s; }
        .ob-ext-item-highlight { background: rgba(217,70,239,0.08); }
        .ob-ext-item-faded { opacity: 0.35; }
        .ob-ext-icon { width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #9aa0a6; }
        .ob-ext-name { flex: 1; font-size: 13px; color: var(--ob-text); font-weight: 500; }
        .ob-ext-pin-btn {
          background: none; border: none; width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          color: #9aa0a6; transition: all 0.3s;
        }
        .ob-ext-pin-btn:hover { background: rgba(255,255,255,0.08); }
        .ob-ext-pin-btn-highlight { color: var(--ob-accent); animation: obPulseRing 1.5s ease-in-out infinite; }
        .ob-ext-pin-btn-pinned { color: var(--ob-accent); }
        .ob-pin-steps { display: flex; justify-content: center; gap: 28px; margin-top: 36px; }
        .ob-pin-step { text-align: center; opacity: 0.35; transition: all 0.4s var(--ob-spring); }
        .ob-pin-step-active { opacity: 1; transform: translateY(-2px); }
        .ob-pin-step-completed { opacity: 0.7; }
        .ob-pin-step-num {
          width: 28px; height: 28px; border-radius: 50%; background: var(--ob-border); color: var(--ob-text-muted);
          font-size: 13px; font-weight: 700; display: flex; align-items: center; justify-content: center;
          margin: 0 auto 8px; transition: all 0.3s;
        }
        .ob-pin-step-active .ob-pin-step-num { background: linear-gradient(135deg, var(--ob-accent), #6366f1); color: white; box-shadow: 0 2px 12px var(--ob-accent-glow); }
        .ob-pin-step-completed .ob-pin-step-num { background: #22c55e; color: white; }
        .ob-pin-step p { font-size: 12px; color: var(--ob-text-muted); max-width: 100px; line-height: 1.4; }

        @keyframes obPulseRing {
          0%, 100% { box-shadow: 0 0 0 3px var(--ob-accent-glow); }
          50% { box-shadow: 0 0 0 8px rgba(217,70,239,0.15); }
        }

        @keyframes obFadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .ob-slide-active .ob-slide-badge, .ob-slide-active .ob-hero-title, .ob-slide-active .ob-slide-title {
          animation: obFadeInUp 0.5s ease backwards;
        }
        .ob-slide-active .ob-hero-subtitle, .ob-slide-active .ob-slide-desc {
          animation: obFadeInUp 0.5s 0.1s ease backwards;
        }
        .ob-slide-active .ob-features-grid, .ob-slide-active .ob-steps-container, .ob-slide-active .ob-final-actions {
          animation: obFadeInUp 0.5s 0.2s ease backwards;
        }
        .ob-slide-active .ob-btn-large, .ob-slide-active .ob-hint-text {
          animation: obFadeInUp 0.5s 0.25s ease backwards;
        }
        .ob-slide-active .ob-survey-container, .ob-slide-active .ob-pin-guide-mockup {
          animation: obFadeInUp 0.5s 0.15s ease backwards;
        }
        .ob-slide-active .ob-survey-options, .ob-slide-active .ob-pin-steps {
          animation: obFadeInUp 0.5s 0.25s ease backwards;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .ob-features-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .ob-steps-container { flex-direction: column; align-items: center; gap: 24px; }
          .ob-step-connector { transform: rotate(90deg); padding-top: 0; }
          .ob-step-card { max-width: 300px; }
          .ob-slide { padding: 50px 16px 100px; }
          .ob-feature-card { padding: 20px 14px; }
          .ob-nav-bar { padding: 16px 20px; }
          .ob-survey-options { flex-direction: column; align-items: center; }
          .ob-survey-option { width: 100%; max-width: 320px; justify-content: flex-start; }
          .ob-survey-pills .ob-survey-option { justify-content: center; }
          .ob-pin-guide-mockup { max-width: 360px; }
          .ob-pin-steps { gap: 16px; }
          .ob-pin-step p { font-size: 11px; }
        }
        @media (max-width: 480px) {
          .ob-features-grid { grid-template-columns: 1fr; max-width: 300px; }
          .ob-feature-card { display: flex; align-items: center; gap: 14px; text-align: left; padding: 16px; }
          .ob-feature-icon { margin: 0; flex-shrink: 0; }
          .ob-feature-card h3 { margin-bottom: 2px; }
          .ob-final-actions { flex-direction: column; }
          .ob-app-icon { width: 72px; height: 72px; border-radius: 18px; }
          .ob-survey-container { max-width: 100%; }
          .ob-survey-option { min-height: 46px; padding: 12px 16px; font-size: 14px; }
          .ob-pin-guide-mockup { max-width: 100%; margin: 20px auto 0; }
          .ob-chrome-url-bar { font-size: 10px; }
          .ob-pin-steps { gap: 10px; flex-wrap: wrap; justify-content: center; }
          .ob-pin-step { min-width: 70px; }
        }
      `}</style>

      <div className="ob-root">
        {/* Particles */}
        <div className="ob-particles" ref={particlesRef} />

        {/* Progress bar */}
        <div className="ob-progress-bar">
          <div className="ob-progress-fill" style={{ width: `${progressWidth}%` }} />
        </div>

        {/* Slides */}
        <div className="ob-slides-wrapper">

          {/* Slide 0: Welcome */}
          <section className={slideClass(0)} ref={(el) => { slideRefs.current[0] = el; }}>
            <div className="ob-slide-content ob-welcome">
              <div className="ob-logo-area">
                <img src="/logo.svg" alt="OneBuddy" className="ob-app-icon ob-bounce-in" />
                <div className="ob-logo-glow" />
              </div>
              <h1 className="ob-hero-title">Welcome to <span className="ob-gradient-text">OneBuddy</span></h1>
              <p className="ob-hero-subtitle">Your all-in-one productivity &amp; wellness companion for Chrome.</p>
              <button className="ob-btn-primary ob-btn-large" onClick={() => goToSlide(1)}>
                Get Started
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </button>
              <p className="ob-hint-text">Takes about 30 seconds</p>
            </div>
          </section>

          {/* Slide 1: Features overview */}
          <section className={slideClass(1)} ref={(el) => { slideRefs.current[1] = el; }}>
            <div className="ob-slide-content">
              <span className="ob-slide-badge">What you get</span>
              <h2 className="ob-slide-title">Everything you need, <span className="ob-gradient-text">one click away</span></h2>
              <p className="ob-slide-desc">Powerful tools built right into your browser sidebar.</p>
              <div className="ob-features-grid">
                {[
                  { color: '#0ea5e9', title: 'Smart Reminders', desc: 'Water, stretch, custom — never miss a thing.', icon: <><path d="M12 8v4l3 3" /><circle cx="12" cy="12" r="9" /></> },
                  { color: '#D946EF', title: 'Calendar Sync', desc: 'Google Calendar integration at a glance.', icon: <path d="M8 2v3M16 2v3M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" /> },
                  { color: '#22c55e', title: 'Quick Notes', desc: 'Capture ideas instantly while browsing.', icon: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></> },
                  { color: '#f59e0b', title: 'Privacy Shield', desc: 'Ad blocker, tracker blocker & privacy blur.', icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /> },
                  { color: '#6366f1', title: 'E2E Messaging', desc: 'Encrypted peer-to-peer messaging.', icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /> },
                  { color: '#ec4899', title: 'Clipboard Manager', desc: 'History of everything you copy.', icon: <><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="2" /></> },
                ].map((f) => (
                  <div className="ob-feature-card" key={f.title}>
                    <div className="ob-feature-icon" style={{ background: `${f.color}1f` }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke={f.color} strokeWidth="1.5">{f.icon}</svg>
                    </div>
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Slide 2: Survey Quiz */}
          <section className={slideClass(2)} ref={(el) => { slideRefs.current[2] = el; }}>
            <div className="ob-slide-content">
              <div className="ob-survey-container">
                <div className="ob-survey-progress">
                  <span className="ob-survey-step-label">Step {currentSurveyStep + 1} of {TOTAL_SURVEY_STEPS}</span>
                  <div className="ob-survey-progress-bar">
                    <div className="ob-survey-progress-fill" style={{ width: `${surveyProgressWidth}%` }} />
                  </div>
                </div>
                <button className="ob-survey-skip" onClick={completeSurvey}>Skip</button>

                {/* Sub-step 0: Who are you? */}
                <div className={`ob-survey-step ${currentSurveyStep === 0 ? 'ob-survey-step-active' : ''}`}>
                  <span className="ob-slide-badge">About You</span>
                  <h2 className="ob-slide-title">Who are you? <span className="ob-gradient-text">Tell us!</span></h2>
                  <p className="ob-slide-desc">This helps us personalize your experience.</p>
                  <div className="ob-survey-options">
                    {[
                      { value: 'student', icon: '🎓', label: 'Student' },
                      { value: 'business_owner', icon: '💼', label: 'Business Owner' },
                      { value: 'employee', icon: '🏢', label: 'Employee' },
                      { value: 'freelancer', icon: '💻', label: 'Freelancer' },
                      { value: 'other', icon: '✨', label: 'Other' },
                    ].map((o) => (
                      <button
                        key={o.value}
                        className={`ob-survey-option ${surveyResponses.role === o.value ? 'ob-survey-option-selected' : ''}`}
                        onClick={() => handleSurveyOptionClick('role', o.value, false)}
                      >
                        <span className="ob-survey-option-icon">{o.icon}</span><span>{o.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sub-step 1: What reminders? (multi-select) */}
                <div className={`ob-survey-step ${currentSurveyStep === 1 ? 'ob-survey-step-active' : ''}`}>
                  <span className="ob-slide-badge">Your Needs</span>
                  <h2 className="ob-slide-title">What do you need <span className="ob-gradient-text">reminders</span> for?</h2>
                  <p className="ob-slide-desc">Select all that apply.</p>
                  <div className="ob-survey-options">
                    {[
                      { value: 'bills', icon: '💳', label: 'Bills & Payments' },
                      { value: 'meetings', icon: '📅', label: 'Meetings' },
                      { value: 'deadlines', icon: '⏰', label: 'Task Deadlines' },
                      { value: 'goals', icon: '🎯', label: 'Personal Goals' },
                      { value: 'followups', icon: '📬', label: 'Follow-ups' },
                    ].map((o) => (
                      <button
                        key={o.value}
                        className={`ob-survey-option ${surveyResponses.useCase.includes(o.value) ? 'ob-survey-option-selected' : ''}`}
                        onClick={() => handleSurveyOptionClick('useCase', o.value, true)}
                      >
                        <span className="ob-survey-option-icon">{o.icon}</span><span>{o.label}</span>
                        {surveyResponses.useCase.includes(o.value) && (
                          <span className="ob-survey-option-checkmark">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  <button className="ob-btn-primary ob-survey-continue-btn" onClick={() => setCurrentSurveyStep(2)}>
                    Continue
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                  </button>
                </div>

                {/* Sub-step 2: How often? */}
                <div className={`ob-survey-step ${currentSurveyStep === 2 ? 'ob-survey-step-active' : ''}`}>
                  <span className="ob-slide-badge">Frequency</span>
                  <h2 className="ob-slide-title">How <span className="ob-gradient-text">often</span> do you want reminders?</h2>
                  <p className="ob-slide-desc">You can always change this later.</p>
                  <div className="ob-survey-options ob-survey-pills">
                    {[
                      { value: 'daily', icon: '📆', label: 'Daily' },
                      { value: 'weekly', icon: '📋', label: 'Weekly' },
                      { value: 'occasionally', icon: '🔔', label: 'Occasionally' },
                      { value: 'important_only', icon: '⭐', label: 'Only important events' },
                    ].map((o) => (
                      <button
                        key={o.value}
                        className={`ob-survey-option ${surveyResponses.frequency === o.value ? 'ob-survey-option-selected' : ''}`}
                        onClick={() => handleSurveyOptionClick('frequency', o.value, false)}
                      >
                        <span className="ob-survey-option-icon">{o.icon}</span><span>{o.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Slide 3: How to use */}
          <section className={slideClass(3)} ref={(el) => { slideRefs.current[3] = el; }}>
            <div className="ob-slide-content">
              <span className="ob-slide-badge">How it works</span>
              <h2 className="ob-slide-title">Get started in <span className="ob-gradient-text">3 simple steps</span></h2>
              <p className="ob-slide-desc">OneBuddy lives in your browser sidebar for quick access.</p>
              <div className="ob-steps-container">
                <div className="ob-step-card">
                  <div className="ob-step-number">1</div>
                  <div className="ob-step-visual">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" />
                    </svg>
                  </div>
                  <h3>Click the extension icon</h3>
                  <p>Find the OneBuddy icon in your Chrome toolbar and click it to open the side panel.</p>
                </div>
                <div className="ob-step-connector">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
                <div className="ob-step-card">
                  <div className="ob-step-number">2</div>
                  <div className="ob-step-visual">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                    </svg>
                  </div>
                  <h3>Explore the dashboard</h3>
                  <p>Browse reminders, notes, calendar, and privacy tools from the sidebar navigation.</p>
                </div>
                <div className="ob-step-connector">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
                <div className="ob-step-card">
                  <div className="ob-step-number">3</div>
                  <div className="ob-step-visual">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h3>Stay on track</h3>
                  <p>Create reminders, take notes, and let the extension keep you healthy and productive.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Slide 4: Pin Guide */}
          <section className={slideClass(4)} ref={(el) => { slideRefs.current[4] = el; }}>
            <div className="ob-slide-content">
              <span className="ob-slide-badge">Quick Setup</span>
              <h2 className="ob-slide-title">Pin <span className="ob-gradient-text">OneBuddy</span> for quick access</h2>
              <p className="ob-slide-desc">Keep it one click away in your toolbar.</p>

              {/* Chrome toolbar mockup */}
              <div className="ob-pin-guide-mockup">
                <div className="ob-chrome-toolbar-mock">
                  <div className="ob-chrome-tab-bar">
                    <div className="ob-chrome-tab">
                      <span>🌐</span><span>New Tab</span>
                    </div>
                  </div>
                  <div className="ob-chrome-address-row">
                    <div className="ob-chrome-nav-buttons">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M23 4v6h-6" /><path d="M1 20v-6h6" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>
                    </div>
                    <div className="ob-chrome-url-bar">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                      <span>chrome://extensions</span>
                    </div>
                    <div className="ob-chrome-extensions-area">
                      <div className="ob-chrome-ext-icon">
                        <img src="/logo.svg" alt="" width="16" height="16" style={{ display: currentPinStep >= 3 ? 'block' : 'none', borderRadius: 2 }} />
                      </div>
                      <div className={`ob-chrome-puzzle-icon ${currentPinStep === 0 ? 'ob-chrome-puzzle-highlight' : ''}`}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                          <path d="M20 16V7a2 2 0 0 0-2-2h-3a2 2 0 0 1-2-2 2 2 0 0 0-2 2H8a2 2 0 0 0-2 2v3a2 2 0 0 1 2 2 2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 1 2-2 2 2 0 0 0 2 2h3a2 2 0 0 0 2-2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Extensions dropdown */}
                <div className={`ob-chrome-ext-dropdown ${currentPinStep >= 1 ? 'ob-chrome-ext-dropdown-visible' : ''}`}>
                  <div className="ob-ext-dropdown-header">Extensions</div>
                  <div className={`ob-ext-item ${currentPinStep >= 1 && currentPinStep <= 2 ? 'ob-ext-item-highlight' : ''}`}>
                    <span className="ob-ext-icon"><img src="/logo.svg" alt="" width="16" height="16" style={{ borderRadius: 2 }} /></span>
                    <span className="ob-ext-name">OneBuddy</span>
                    <button
                      className={`ob-ext-pin-btn ${currentPinStep === 2 ? 'ob-ext-pin-btn-highlight' : ''} ${currentPinStep === 3 ? 'ob-ext-pin-btn-pinned' : ''}`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M12 2l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z" /></svg>
                    </button>
                  </div>
                  <div className="ob-ext-item ob-ext-item-faded">
                    <span className="ob-ext-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
                        <circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                      </svg>
                    </span>
                    <span className="ob-ext-name">Other Extension</span>
                    <button className="ob-ext-pin-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M12 2l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z" /></svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Step indicators */}
              <div className="ob-pin-steps">
                {['Click the puzzle icon', 'Find OneBuddy', 'Click the pin icon', 'All done!'].map((label, i) => (
                  <div key={i} className={pinStepClass(i)}>
                    <div className="ob-pin-step-num">{i + 1}</div>
                    <p>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Slide 5: Ready to go */}
          <section className={slideClass(5)} ref={(el) => { slideRefs.current[5] = el; }}>
            <div className="ob-slide-content ob-welcome">
              <div className="ob-success-icon">
                <svg viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="40" r="36" fill="url(#obSuccessGrad)" opacity="0.12" />
                  <circle cx="40" cy="40" r="28" fill="url(#obSuccessGrad)" opacity="0.2" />
                  <circle cx="40" cy="40" r="20" fill="url(#obSuccessGrad)" />
                  <polyline points="28,40 36,48 52,32" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <defs>
                    <linearGradient id="obSuccessGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D946EF" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h1 className="ob-hero-title">You&apos;re all set!</h1>
              <p className="ob-hero-subtitle">Click the OneBuddy icon in your toolbar to open the sidebar and start being productive.</p>
              <div className="ob-final-actions">
                <button className="ob-btn-primary ob-btn-large" onClick={handleOpenSidebar}>
                  Open OneBuddy
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </button>
                <button className="ob-btn-ghost" onClick={handleCloseTab}>Close this tab</button>
              </div>
              <div className="ob-social-links">
                <a href="https://onebuddy.io/" target="_blank" rel="noopener noreferrer" className="ob-social-link">Website</a>
                <span className="ob-social-dot" />
                <a href="https://onebuddy.io/knowledge-base/" target="_blank" rel="noopener noreferrer" className="ob-social-link">Support</a>
              </div>
            </div>
          </section>
        </div>

        {/* Navigation */}
        <div className="ob-nav-bar">
          <div className="ob-nav-dots">
            {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
              <button
                key={i}
                className={`ob-nav-dot ${currentSlide === i ? 'ob-nav-dot-active' : ''}`}
                onClick={() => goToSlide(i)}
              />
            ))}
          </div>
          <div className="ob-nav-buttons">
            {showPrevNext && (
              <>
                <button className="ob-btn-ghost ob-btn-nav" onClick={() => goToSlide(currentSlide - 1)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>
                  Back
                </button>
                <button className="ob-btn-primary ob-btn-nav" onClick={() => goToSlide(currentSlide + 1)}>
                  Next
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
