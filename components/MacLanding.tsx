'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { siteConfig } from '@/lib/site-config';

const IMG = '/images/mac';

type Scene = { cls: string; left?: string; right?: 'up' | 'down' | 'bars' | 'level'; text: string; pill?: boolean };

// What the closed and open notch show in the real app, in turn.
const scenes: Scene[] = [
  { cls: '', text: 'Hover the notch' },
  { cls: 'open', text: 'Music, calendar and your current task, one hover away' },
  { cls: 'wide', left: 'Focus', right: 'up', text: 'Start a task and its timer lives in the notch' },
  { cls: 'wide', left: '🍅 Pomodoro', right: 'down', text: 'A Pomodoro countdown that stays out of your way' },
  { cls: 'wide', left: '♪ Lo-fi focus mix', right: 'bars', text: 'See what is playing' },
  { cls: 'wide', left: '🔊', right: 'level', text: 'Volume and brightness, shown in the notch' },
  { cls: '', text: 'Hold ⌃⇧Space and just talk', pill: true },
];

const replaced = ['Notch app', 'Clipboard manager', 'Launcher', 'Focus timer', 'Task board', 'Dictation app', 'Mac cleaner', 'Window snapper', 'System monitor'];

type Feature = { icon: string; title: string; body: string; keys?: string[]; span?: 'wide' | 'full'; dark?: boolean; tint?: string; shadow?: string; buddy?: string };

const features: Feature[] = [
  {
    icon: '🏝️', title: 'The notch, put to work', span: 'full', dark: true, buddy: 'buddy-focus.png',
    body: "Hover it for music, calendar, tasks, clipboard, AI usage, system stats and timers. Closed, it shows what's running: your task timer, a Pomodoro countdown, the song that's playing, or the volume as you change it.",
  },
  {
    icon: '⚡️', title: 'Tasks that time themselves', tint: 'linear-gradient(135deg,#FB923C,#F87171)', shadow: 'rgba(251,146,60,.7)',
    body: 'Boards with Backlog, Today and Done. Press Start focus and the app tucks away, leaving a slim task sidebar. Finish one and Buddy celebrates.',
  },
  {
    icon: '🍅', title: 'Pomodoro in the notch', tint: 'linear-gradient(135deg,#F87171,#D946EF)', shadow: 'rgba(248,113,113,.7)',
    body: 'Focus, short break, long break after four. The countdown sits beside the notch and the next phase starts by itself.',
  },
  {
    icon: '📋', title: 'Clipboard with pinboards', tint: 'linear-gradient(135deg,#8B5CF6,#4F83FA)', shadow: 'rgba(139,92,246,.7)', keys: ['⇧⌘V', '⌘1–9 quick paste'],
    body: 'Everything you copy, searchable. A shelf slides up from the bottom of the screen; arrow keys to move, Return to paste, pinboards with your own icons for the things you reuse.',
  },
  {
    icon: '🔎', title: 'A launcher that calculates', keys: ['⌥ Space'],
    body: 'Open apps, find files, run commands, do the maths, start a timer or add a task — from one bar. Give anything an alias or a hotkey.',
  },
  {
    icon: '🎙️', title: 'Dictation that never leaves your Mac', span: 'wide', tint: 'linear-gradient(135deg,#F87171,#FB923C)', shadow: 'rgba(248,113,113,.7)',
    keys: ['hold ⌃⇧ Space', 'about 100 languages'],
    body: "Hold the shortcut, talk, let go — the words land in whatever app you're using. Speech is recognised on your Mac by a model you pick; OneBuddy recommends one for your hardware and downloads it for you.",
  },
  {
    icon: '🧹', title: 'A cleaner you can trust', span: 'wide', tint: 'linear-gradient(135deg,#22D3EE,#4F83FA)', shadow: 'rgba(34,211,238,.7)', buddy: 'buddy-private.png',
    body: 'Caches, logs, developer junk, big files, duplicates, similar photos, old apps and their leftovers. Everything it removes goes to the Trash, so nothing is lost by mistake — and every clean is written to an activity log.',
  },
  {
    icon: '🪟', title: 'Snap windows from the keyboard', tint: 'linear-gradient(135deg,#34D399,#22D3EE)', shadow: 'rgba(52,211,153,.7)', keys: ['⌃⌥ ←', '⌃⌥ →', '⌃⌥ ↩'],
    body: 'Halves, thirds, corners, maximize and centre.',
  },
  {
    icon: '✨', title: 'AI usage at a glance', tint: 'linear-gradient(135deg,#D946EF,#8B5CF6)', shadow: 'rgba(217,70,239,.7)',
    body: "See today's Claude Code and Codex tokens and how long your AI apps were in front, read from logs already on your Mac.",
  },
  {
    icon: '🧩', title: 'Works with Claude', tint: 'linear-gradient(135deg,#6366F1,#4F83FA)', shadow: 'rgba(99,102,241,.7)',
    body: 'A built-in MCP server lets Claude add, start and finish your tasks. A task Claude starts shows its timer in your notch.',
  },
];

const shots = [
  { tab: 'Cleaner', file: 'cleaner.png', alt: 'OneBuddy Cleaner overview with disk usage and Smart Care', note: 'One scan shows what is safe to remove, and how much you would get back.' },
  { tab: 'Tasks', file: 'tasks.png', alt: 'OneBuddy task boards with Backlog, Today and Done columns', note: 'Boards with Backlog, Today and Done. Start focus and the timer moves to the notch.' },
  { tab: 'System', file: 'system.png', alt: 'OneBuddy System page with CPU, memory, disk and battery health', note: 'CPU, memory, disk and battery health on one page.' },
  { tab: 'Integrations', file: 'integrations.png', alt: 'OneBuddy integrations: Asana, ClickUp, Notion, Trello, Todoist, Linear, GitHub', note: 'Pull the tasks assigned to you into their own boards.' },
];

const trust = [
  ['🎙️ Speech stays here', 'Dictation uses a speech model stored on your Mac. Your voice is not uploaded.'],
  ['🗑️ Trash, not delete', 'The cleaner moves files to the Trash. Change your mind and put them back.'],
  ['🔑 Keys in the Keychain', "Integration tokens are stored in your Mac's Keychain and only sent to the service they belong to."],
  ['📋 Passwords skipped', 'Clipboard history ignores items that password managers mark as secret.'],
  ['📊 Usage read locally', 'AI usage is counted from log files already on your disk. Nothing is sent anywhere.'],
  ['🛡️ Honest about security', "The Protection check asks macOS about app signatures and background items. It doesn't pretend to be an antivirus."],
];

const faqs = [
  ['Does it need a MacBook with a notch?', 'No. On a Mac without a notch, OneBuddy draws a small pill at the top of the screen that behaves the same way.'],
  ['Which permissions does it ask for?', 'Only what a feature needs, when you use it: Accessibility to paste and to move windows, Microphone for dictation, Calendar to show your events. Each one is optional.'],
  ['Is dictation as polished as a cloud service?', 'It types what you say, on your Mac, without sending audio anywhere. It does not rewrite or tidy your sentences the way cloud tools that use a language model do.'],
  ['Will the cleaner delete something I need?', 'Items go to the Trash rather than being deleted, risky categories are never ticked for you, and each one is labelled Safe, Caution or Review.'],
  ['Do the task integrations sync both ways?', "Not yet. Today OneBuddy imports the open tasks assigned to you from Todoist, Asana, ClickUp, Trello, Notion, Linear and GitHub. Finishing a task in OneBuddy doesn't close it in the other service."],
  ['I already use the OneBuddy extension. Is this the same thing?', 'Same Buddy, different home. The extension lives in your browser; the Mac app lives in the notch and works across every app.'],
];

const clock = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

function Bars({ count = 4 }: { count?: number }) {
  return <div className="bars">{Array.from({ length: count }, (_, i) => <i key={i} />)}</div>;
}

/** Download button: a real link once `siteConfig.macDownloadUrl` is set, "coming soon" until then. */
function DownloadButton() {
  const url = siteConfig.macDownloadUrl;
  return url
    ? <a className="btn primary" href={url}> Download for Mac</a>
    : <a className="btn primary" href="#download"> Coming soon to Mac</a>;
}

export function MacLanding() {
  const [scene, setScene] = useState(0);
  const [tick, setTick] = useState(0);
  const [shot, setShot] = useState(0);
  const [time, setTime] = useState('Tue 9:41');

  useEffect(() => {
    const now = new Date();
    setTime(`${now.toLocaleDateString('en', { weekday: 'short' })} ${now.toLocaleTimeString('en', { hour: 'numeric', minute: '2-digit' })}`);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cycle = reduced ? undefined : window.setInterval(() => setScene((s) => (s + 1) % scenes.length), 3200);
    const second = window.setInterval(() => setTick((t) => t + 1), 1000);
    const observer = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')), { threshold: 0.12 });
    document.querySelectorAll('.macp .reveal').forEach((el) => observer.observe(el));
    return () => { if (cycle) window.clearInterval(cycle); window.clearInterval(second); observer.disconnect(); };
  }, []);

  const current = scenes[scene];
  const right = current.right === 'up' ? clock(768 + tick)
    : current.right === 'down' ? clock(Math.max(0, 1488 - tick))
    : current.right === 'bars' ? <Bars />
    : current.right === 'level' ? <div className="level"><i /></div> : null;

  return (
    <div className="macp">
      <section className="hero">
        <div className="blob b1" /><div className="blob b2" /><div className="blob b3" />
        <div className="wrap">
          <img className="mascot" src={`${IMG}/buddy-hello.png`} alt="Buddy, the OneBuddy mascot" width={118} height={118} />
          <div style={{ marginTop: 18 }}><span className="eyebrow">New · OneBuddy comes to the Mac</span></div>
          <h1>Your Mac&apos;s buddy <span className="gradient-text">lives in the notch.</span></h1>
          <p className="lead">Tasks, a Pomodoro timer, clipboard history, a launcher, voice dictation and a cleaner — one app, one hover away. No more drawer full of little utilities.</p>
          <div className="cta">
            <DownloadButton />
            <a className="btn ghost" href="#features">See what&apos;s inside</a>
          </div>
          <p className="fine">macOS 14 or later · your data stays on your Mac</p>

          <div className="stage reveal">
            <div className="screen">
              <div className="menubar">
                <span></span><span>Finder</span>
                <span style={{ opacity: 0.7, fontWeight: 500 }}>File</span><span style={{ opacity: 0.7, fontWeight: 500 }}>Edit</span><span style={{ opacity: 0.7, fontWeight: 500 }}>View</span>
                <span className="right">{time}</span>
              </div>
              <div className={`notch ${current.cls}`}>
                <span className="l">{current.left === 'Focus' ? <><span className="dot" /> Focus</> : current.left}</span>
                <span className="r">{right}</span>
                <div className="panel">
                  <div className="tile"><small>Focus</small><p style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>Write the launch post</p><b style={{ color: '#67ACFF' }}>{clock(768 + tick)}</b><p>of 25 min · Pause · Done</p></div>
                  <div className="tile"><small>Tuesday</small><b>13</b><p>10:30 Design review<br />14:00 Call with Sam</p></div>
                  <div className="tile"><small>Now playing</small><p style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>Lo-fi focus mix</p><Bars /><p>◀︎ &nbsp; ❚❚ &nbsp; ▶︎</p></div>
                </div>
              </div>
              <div className={`pill ${current.pill ? 'show' : ''}`}>🎙️ <Bars count={7} /></div>
              <div className="caption">{current.text}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="center" style={{ paddingTop: 40 }}>
        <div className="wrap reveal">
          <h2>One app <span className="gradient-text">instead of seven.</span></h2>
          <p className="lead">Most Macs collect a utility for every small job. OneBuddy does those jobs in one place, with one look and one set of shortcuts.</p>
          <div className="chips">{replaced.map((name) => <span className="chip" key={name}>{name}</span>)}</div>
          <div className="arrow">↓ &nbsp;<img src={`${IMG}/icon.png`} alt="" width={40} height={40} /> OneBuddy</div>
        </div>
      </section>

      <section id="features">
        <div className="wrap">
          <div className="center reveal">
            <span className="eyebrow">Everything inside</span>
            <h2 style={{ marginTop: 16 }}>Small tools, <span className="gradient-text">one buddy.</span></h2>
          </div>
          <div className="bento">
            {features.map((feature) => (
              <article
                key={feature.title}
                className={`card reveal ${feature.span ?? ''} ${feature.dark ? 'dark' : ''}`}
                style={feature.tint ? ({ '--tint': feature.tint, '--tint-shadow': feature.shadow } as CSSProperties) : undefined}
              >
                <div className="icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
                {feature.keys && <div className="keys">{feature.keys.map((key) => <kbd key={key}>{key}</kbd>)}</div>}
                {feature.buddy && <img className="buddy" src={`${IMG}/${feature.buddy}`} alt="" width={120} height={120} />}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shots center" id="screens">
        <div className="wrap reveal">
          <span className="eyebrow">Real screens, no mock-ups</span>
          <h2 style={{ marginTop: 16 }}>Calm, dark and <span className="gradient-text">easy to find your way.</span></h2>
          <div className="tabs" role="tablist">
            {shots.map((item, index) => (
              <button key={item.tab} role="tab" aria-selected={shot === index} className={shot === index ? 'on' : ''} onClick={() => setShot(index)}>{item.tab}</button>
            ))}
          </div>
          <p className="shot-note" style={{ marginTop: 18 }}>{shots[shot].note}</p>
          <div className="shot">
            <img key={shots[shot].file} className="on" src={`${IMG}/${shots[shot].file}`} alt={shots[shot].alt} width={1700} height={1245} />
          </div>
        </div>
      </section>

      <section id="privacy">
        <div className="wrap">
          <div className="center reveal">
            <span className="eyebrow">Local first</span>
            <h2 style={{ marginTop: 16 }}>It runs on your Mac. <span className="gradient-text">So does your data.</span></h2>
          </div>
          <div className="trust">
            {trust.map(([title, body]) => <div className="reveal" key={title}><h4>{title}</h4><p>{body}</p></div>)}
          </div>
        </div>
      </section>

      <section id="faq" style={{ paddingTop: 40 }}>
        <div className="wrap" style={{ maxWidth: 780 }}>
          <h2 className="center reveal">Questions, <span className="gradient-text">answered straight.</span></h2>
          <div style={{ marginTop: 30 }} className="reveal">
            {faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
          </div>
        </div>
      </section>

      <section id="download" style={{ paddingTop: 30 }}>
        <div className="wrap">
          <div className="final reveal">
            <img src={`${IMG}/buddy-hello.png`} alt="" width={92} height={92} style={{ width: 92, margin: '0 auto 14px', filter: 'drop-shadow(0 14px 24px rgba(124,58,237,.6))' }} />
            <h2>Give your notch <span style={{ color: '#C4B5FD' }}>a job.</span></h2>
            <p className="lead">OneBuddy for Mac — tasks, clipboard, launcher, dictation and a cleaner, one hover away.</p>
            <div className="cta">
              <DownloadButton />
              <a className="btn ghost" href={siteConfig.extensionUrl} target="_blank" rel="noopener noreferrer">Get the Chrome extension</a>
            </div>
            <p className="fine" style={{ color: '#8A9AAA' }}>
              {siteConfig.macDownloadUrl ? 'macOS 14 or later' : 'The Mac app is not out yet. The Chrome extension is available today.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
