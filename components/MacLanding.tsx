'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { siteConfig } from '@/lib/site-config';

const IMG = '/images/mac';

/* ------------------------------------------------------------------ helpers */

/** Counts up forever, one step every `ms`. Drives the looping demos. */
function useTicker(ms: number) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setTick((t) => t + 1), ms);
    return () => window.clearInterval(id);
  }, [ms]);
  return tick;
}

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

/* ---------------------------------------------------------------- hero notch */

type Scene = { cls: string; left?: string; right?: 'up' | 'down' | 'bars' | 'level'; text: string; pill?: boolean };

const scenes: Scene[] = [
  { cls: '', text: 'Hover the notch' },
  { cls: 'open', text: 'Music, calendar and your current task, one hover away' },
  { cls: 'wide', left: 'Focus', right: 'up', text: 'Start a task and its timer lives in the notch' },
  { cls: 'wide', left: '🍅 Pomodoro', right: 'down', text: 'A Pomodoro countdown that stays out of your way' },
  { cls: 'wide', left: '♪ Lo-fi focus mix', right: 'bars', text: 'See what is playing' },
  { cls: 'wide', left: '🔊', right: 'level', text: 'Volume and brightness, shown in the notch' },
  { cls: '', text: 'Hold ⌃⇧Space and just talk', pill: true },
];

function HeroStage() {
  const scene = scenes[useTicker(3200) % scenes.length];
  const tick = useTicker(1000);
  const [time, setTime] = useState('Tue 9:41');
  useEffect(() => {
    const now = new Date();
    setTime(`${now.toLocaleDateString('en', { weekday: 'short' })} ${now.toLocaleTimeString('en', { hour: 'numeric', minute: '2-digit' })}`);
  }, []);
  const right = scene.right === 'up' ? clock(768 + tick)
    : scene.right === 'down' ? clock(Math.max(0, 1488 - tick))
    : scene.right === 'bars' ? <Bars />
    : scene.right === 'level' ? <div className="level"><i /></div> : null;

  return (
    <div className="stage reveal">
      <div className="screen">
        <div className="menubar">
          <span></span><span>Finder</span>
          <span style={{ opacity: 0.7, fontWeight: 500 }}>File</span><span style={{ opacity: 0.7, fontWeight: 500 }}>Edit</span><span style={{ opacity: 0.7, fontWeight: 500 }}>View</span>
          <span className="right">{time}</span>
        </div>
        <div className={`notch ${scene.cls}`}>
          <span className="l">{scene.left === 'Focus' ? <><span className="dot" /> Focus</> : scene.left}</span>
          <span className="r">{right}</span>
          <div className="panel">
            <div className="tile"><small>Focus</small><p style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>Write the launch post</p><b style={{ color: '#67ACFF' }}>{clock(768 + tick)}</b><p>of 25 min · Pause · Done</p></div>
            <div className="tile"><small>Tuesday</small><b>13</b><p>10:30 Design review<br />14:00 Call with Sam</p></div>
            <div className="tile"><small>Now playing</small><p style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>Lo-fi focus mix</p><Bars /><p>◀︎ &nbsp; ❚❚ &nbsp; ▶︎</p></div>
          </div>
        </div>
        <div className={`pill ${scene.pill ? 'show' : ''}`}>🎙️ <Bars count={7} /></div>
        <div className="caption">{scene.text}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- demos */

/** Real screenshots that advance by themselves, like a GIF, with labels you can click. */
function Carousel({ slides, ratio, notch }: { slides: { label: string; file: string; alt: string }[]; ratio: string; notch?: boolean }) {
  const auto = useTicker(2800);
  const [picked, setPicked] = useState<{ index: number; at: number } | null>(null);
  // A click holds that slide for a few beats before the loop resumes.
  const index = picked && auto - picked.at < 4 ? picked.index : auto % slides.length;
  return (
    <div className="carousel">
      <div className={`frame ${notch ? 'notch-frame' : ''}`} style={{ aspectRatio: ratio }}>
        {slides.map((slide, i) => (
          <img key={slide.file} src={`${IMG}/${slide.file}`} alt={slide.alt} className={i === index ? 'on' : ''} loading={i === 0 ? 'eager' : 'lazy'} />
        ))}
      </div>
      <div className="dots" role="tablist">
        {slides.map((slide, i) => (
          <button key={slide.label} role="tab" aria-selected={i === index} className={i === index ? 'on' : ''} onClick={() => setPicked({ index: i, at: auto })}>{slide.label}</button>
        ))}
      </div>
    </div>
  );
}

const launcherQueries: { query: string; icon: string; title: string; sub: string; kind: string }[] = [
  { query: 'chro', icon: '🌐', title: 'Google Chrome', sub: '/Applications', kind: 'Application' },
  { query: '(128*4)+15%', icon: '＝', title: '512.15', sub: 'Return copies the result', kind: 'Calculator' },
  { query: 'timer 25', icon: '⏱', title: 'Start 25 minute timer', sub: 'OneBuddy timer', kind: 'Command' },
  { query: 'window left', icon: '◧', title: 'Window: Left Half', sub: '⌃⌥←', kind: 'Command' },
  { query: 'call the bank', icon: '＋', title: 'Add task: call the bank', sub: 'Adds to Today', kind: 'Command' },
];

function LauncherDemo() {
  const tick = useTicker(110);
  // Each query types itself out, rests, then the next one starts.
  const span = 34;
  const item = launcherQueries[Math.floor(tick / span) % launcherQueries.length];
  const typed = item.query.slice(0, Math.min(item.query.length, (tick % span)));
  const ready = typed.length === item.query.length;
  return (
    <div className="launcher">
      <div className="launcher-bar"><img src={`${IMG}/icon.png`} alt="" width={26} height={26} /><span>{typed}<i className="caret" /></span></div>
      <div className={`launcher-row ${ready ? 'on' : ''}`}>
        <span className="launcher-icon">{item.icon}</span>
        <span><b>{item.title}</b><small>{item.sub}</small></span>
        <em>{item.kind}</em>
      </div>
      <div className="launcher-row ghost"><span className="launcher-icon">⚡️</span><span><b>Open Tasks</b><small>OneBuddy</small></span><em>Command</em></div>
      <div className="launcher-foot"><kbd>↩</kbd> Open <kbd>⌘K</kbd> Alias <kbd>⇧⌘K</kbd> Hotkey</div>
    </div>
  );
}

const clips = [
  { kind: 'Link', color: '#22D3EE', body: 'onebuddy.io/mac' },
  { kind: 'Text', color: '#4F83FA', body: 'Thanks — sending the invoice today.' },
  { kind: 'Color', color: '#8B5CF6', body: '#7C3AED' },
  { kind: 'Text', color: '#4F83FA', body: 'npm run build && npm run deploy' },
  { kind: 'Link', color: '#22D3EE', body: 'figma.com/file/launch-kit' },
];

function ClipboardDemo() {
  const tick = useTicker(650);
  const step = tick % 9;
  const selected = Math.min(step, 3);
  const pasted = step >= 5 && step <= 6;
  const up = step < 8;
  return (
    <div className="shelf-stage">
      <div className="shelf-doc">
        <i /><i style={{ width: '70%' }} /><i style={{ width: '85%' }} />
        <p className={pasted ? 'on' : ''}>{clips[3].body}</p>
      </div>
      <div className={`shelf ${up ? 'up' : ''}`}>
        <div className="shelf-tabs"><span className="on">🕘 Clipboard</span><span>🔥 Useful Links</span><span>💡 Prompts</span><span>⌨️ Snippets</span></div>
        <div className="shelf-cards">
          {clips.map((clip, i) => (
            <div key={clip.body} className={`clip ${i === selected ? 'sel' : ''}`}>
              <header style={{ background: clip.color }}>{clip.kind} <kbd>⌘{i + 1}</kbd></header>
              <p>{clip.kind === 'Color' ? <><span className="swatch" style={{ background: clip.body }} />{clip.body}</> : clip.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const spoken = 'Remind me to send the invoice to the client before five o’clock today.';

function DictationDemo() {
  const tick = useTicker(70);
  const t = tick % 150;
  const phase = t < 46 ? 'listen' : t < 62 ? 'think' : t < 140 ? 'type' : 'rest';
  const typed = phase === 'type' ? spoken.slice(0, Math.floor(((t - 62) / 60) * spoken.length)) : phase === 'rest' ? spoken : '';
  return (
    <div className="dictation">
      <div className="editor">
        <header><i /><i /><i /><span>Notes</span></header>
        <p>{typed}<i className="caret" /></p>
      </div>
      <div className={`pill show ${phase === 'think' ? 'think' : ''} ${phase === 'type' || phase === 'rest' ? 'done' : ''}`}>
        {phase === 'listen' && <>🎙️ <Bars count={9} /><span className="x">✕</span></>}
        {phase === 'think' && <span className="thinking"><i /><i /><i /><i /></span>}
        {(phase === 'type' || phase === 'rest') && <span className="tick">✓</span>}
      </div>
      <div className="key-hint"><kbd>hold ⌃⇧ Space</kbd> <kbd>esc cancels</kbd></div>
    </div>
  );
}

const snaps = [
  { key: '⌃⌥ ←', label: 'Left half', box: { left: '0%', top: '0%', width: '50%', height: '100%' } },
  { key: '⌃⌥ →', label: 'Right half', box: { left: '50%', top: '0%', width: '50%', height: '100%' } },
  { key: '⌃⌥ U', label: 'Top left', box: { left: '0%', top: '0%', width: '50%', height: '50%' } },
  { key: '⌃⌥ G', label: 'Right third', box: { left: '66.6%', top: '0%', width: '33.4%', height: '100%' } },
  { key: '⌃⌥ ↩', label: 'Maximize', box: { left: '0%', top: '0%', width: '100%', height: '100%' } },
  { key: '⌃⌥ C', label: 'Center', box: { left: '22%', top: '16%', width: '56%', height: '68%' } },
];

function SnapDemo() {
  const snap = snaps[useTicker(1500) % snaps.length];
  return (
    <div className="snap">
      <div className="snap-desk">
        <div className="snap-window" style={snap.box}><header><i /><i /><i /></header><span>{snap.label}</span></div>
      </div>
      <div className="snap-key"><kbd>{snap.key}</kbd></div>
    </div>
  );
}

/* -------------------------------------------------------------------- data */

type Row = { id: string; eyebrow: string; title: ReactNode; body: string; points: string[]; demo: ReactNode; buddy?: string };

const rows: Row[] = [
  {
    id: 'notch', eyebrow: 'The notch', title: <>Everything you check, <span className="gradient-text">one hover away.</span></>,
    body: 'Move the pointer to the notch and it opens into a panel with seven tabs. Leave, and it folds back. When something is running it stays visible beside the notch, so you never have to open anything to see it.',
    points: ['Home: music controls, your next events and the task you are on', 'Tasks, clipboard, AI usage, system stats, Pomodoro and timers', 'Closed, it shows a running timer, the song playing or the volume as you change it', 'Works on Macs without a notch too, as a small pill at the top'],
    demo: <Carousel notch ratio="1320 / 544" slides={[
      { label: 'Home', file: 'notch-home.webp', alt: 'OneBuddy notch Home tab with now playing, calendar and focus' },
      { label: 'Tasks', file: 'notch-tasks.webp', alt: 'OneBuddy notch Tasks tab' },
      { label: 'AI usage', file: 'notch-ai.webp', alt: 'OneBuddy notch AI usage tab with Claude Code and Codex tokens' },
      { label: 'System', file: 'notch-system.webp', alt: 'OneBuddy notch System tab with CPU, memory, disk and network' },
      { label: 'Pomodoro', file: 'notch-pomodoro.webp', alt: 'OneBuddy notch Pomodoro tab' },
      { label: 'Timer', file: 'notch-timer.webp', alt: 'OneBuddy notch Timer tab with stopwatch, timer and reminders' },
    ]} />,
  },
  {
    id: 'tasks', eyebrow: 'Tasks and focus', title: <>Plan it. Start it. <span className="gradient-text">Watch the clock in the notch.</span></>,
    body: 'Keep as many boards as you like, each with Backlog, Today and Done. Press Start focus and the app gets out of the way, leaving a slim task list floating at the side of your screen.',
    points: ['Drag tasks between columns and boards; add estimates', 'The running task shows its timer beside the notch', 'Finish a task and Buddy celebrates with confetti (or your own GIF)', 'Pull in the tasks assigned to you from Todoist, Asana, ClickUp, Trello, Notion, Linear and GitHub'],
    demo: <div className="frame shot-frame"><img className="on" src={`${IMG}/tasks.webp`} alt="OneBuddy task boards with Backlog, Today and Done columns" loading="lazy" /></div>,
    buddy: 'buddy-todo.webp',
  },
  {
    id: 'pomodoro', eyebrow: 'Pomodoro', title: <>Twenty-five minutes, <span className="gradient-text">no tab to babysit.</span></>,
    body: 'Start a Pomodoro from the notch and forget it. Focus, short break, and a long break after every fourth session, each one starting by itself with a gentle heads-up.',
    points: ['The countdown sits next to the notch while you work', 'Four dots show where you are in the round', 'Change the lengths, or pick 25 / 5 or 50 / 10', 'Start or pause it from the launcher'],
    demo: (
      <div className="stack">
        <div className="frame notch-frame" style={{ aspectRatio: '1320 / 544' }}><img className="on" src={`${IMG}/notch-pomodoro.webp`} alt="OneBuddy Pomodoro timer in the notch" loading="lazy" /></div>
        <div className="frame strip"><img className="on" src={`${IMG}/notch-countdown.webp`} alt="Pomodoro countdown shown beside the notch" loading="lazy" /></div>
        <p className="demo-note">Open, and closed: the countdown stays beside the notch.</p>
      </div>
    ),
  },
  {
    id: 'clipboard', eyebrow: 'Clipboard', title: <>Copy once. <span className="gradient-text">Find it for good.</span></>,
    body: 'Everything you copy is kept and searchable: text, links, images, files and colours. Press the shortcut in any app and a shelf slides up from the bottom of the screen.',
    points: ['Arrow keys to move, Return to paste, ⌘1–9 to paste straight away', 'Pinboards for the things you reuse, each with its own emoji or icon', 'Edit a clip before pasting it', 'Sync clips and pinboards between your Macs through your own iCloud Drive', 'Items from password managers are never recorded', 'Bring your history over from another clipboard app'],
    demo: <ClipboardDemo />,
    buddy: 'buddy-clipboard.webp',
  },
  {
    id: 'launcher', eyebrow: 'Launcher', title: <>One bar for apps, files, <span className="gradient-text">maths and commands.</span></>,
    body: 'Press ⌥Space and start typing. Open an app, find a file, work out a sum, start a timer, add a task or move a window, without reaching for the mouse.',
    points: ['Learns what you use and ranks it first', 'Calculator with brackets, powers and percentages', 'Give any app or command an alias, or a global hotkey', '“timer 25”, “window left”, or just type a task and press Return'],
    demo: <LauncherDemo />,
  },
  {
    id: 'dictation', eyebrow: 'Voice dictation', title: <>Talk. It types. <span className="gradient-text">Nothing leaves your Mac.</span></>,
    body: 'Hold the shortcut and speak; let go and the words appear in whatever app you are using. Speech is recognised by a model that lives on your Mac, so there is no account and no upload.',
    points: ['OneBuddy checks your Mac and recommends the right model, then downloads it for you', 'Models from 32 MB to 1 GB; about 100 languages on the larger ones', 'Hold to talk, or tap once to start and again to stop', 'A small animated pill shows it is listening; Esc cancels'],
    demo: <DictationDemo />,
  },
  {
    id: 'cleaner', eyebrow: 'Cleaner', title: <>Get your disk back, <span className="gradient-text">without the fear.</span></>,
    body: 'One scan shows what is taking up space and what is safe to remove. Every category is labelled Safe, Caution or Review, risky ones are never ticked for you, and everything goes to the Trash rather than being deleted.',
    points: ['System junk, user files and developer caches', 'Uninstall apps with the files they leave behind', 'Duplicates, similar photos, large files and a folder-by-folder disk map', 'Browser caches, history and cookies', 'Caches and old versions left by the Claude and ChatGPT apps', 'A security check-up for apps and background items', 'Every clean is recorded in an activity log'],
    demo: <Carousel ratio="1700 / 1245" slides={[
      { label: 'Overview', file: 'cleaner.webp', alt: 'OneBuddy Cleaner overview with disk usage and Smart Care' },
      { label: 'System junk', file: 'cleaner-junk.webp', alt: 'OneBuddy Cleaner system junk list with Safe, Caution and Review labels' },
    ]} />,
    buddy: 'buddy-private.webp',
  },
  {
    id: 'windows', eyebrow: 'Window snapping', title: <>Tidy windows <span className="gradient-text">from the keyboard.</span></>,
    body: 'Hold ⌃⌥ and press a key to send the window you are using exactly where you want it. The same actions are in the launcher if you would rather type.',
    points: ['Halves, thirds and corners', 'Maximize and centre', 'Works with the window of any app'],
    demo: <SnapDemo />,
  },
];

const tools: { title: string; body: string; tag: string; image?: string; ratio?: string; icon?: string; notch?: boolean }[] = [
  { title: 'System monitor', body: 'CPU, memory, disk, network and battery, live in the notch.', tag: 'Real-time stats', image: 'notch-system.webp', ratio: '1320 / 544', notch: true },
  { title: 'AI usage', body: "Today's Claude Code and Codex tokens, and time spent in your AI apps.", tag: 'Read from local logs', image: 'notch-ai.webp', ratio: '1320 / 544', notch: true },
  { title: 'Stopwatch, timers, reminders', body: 'Quick timers and nudges that pop out of the notch when they are due.', tag: 'In the notch', image: 'notch-timer.webp', ratio: '1320 / 544', notch: true },
  { title: 'Battery health', body: 'Maximum capacity, charge cycles and temperature, with a reminder to unplug.', tag: 'On the System page', image: 'system.webp', ratio: '1700 / 1245' },
  { title: 'Task integrations', body: 'Each service you connect gets its own board.', tag: 'Tokens stay in the Keychain', image: 'integrations.webp', ratio: '1700 / 1245' },
  { title: 'A model that fits your Mac', body: 'Pick a speech model for dictation; the recommended one is marked.', tag: 'Downloads in the app', image: 'dictation-models.webp', ratio: '1440 / 1264' },
  { title: 'Volume and brightness', body: 'Level changes show in the notch as you press the keys.', tag: 'Notch display', icon: '🔊' },
  { title: 'Works with Claude', body: 'A built-in MCP server lets Claude add, start and finish your tasks.', tag: 'MCP server included', icon: '🧩' },
  { title: 'Calendar', body: 'Your next events in the notch, from the calendars on your Mac.', tag: 'Works with Apple Calendar', icon: '📅' },
  { title: 'Updates itself', body: 'New versions arrive in the app. It asks before installing, or installs quietly if you prefer.', tag: 'Signed updates', icon: '⬆️' },
];

const replaced: { name: string; job: string; icon?: string; emoji?: string }[] = [
  { name: 'Paste', job: 'Clipboard history', icon: 'paste.png' },
  { name: 'CleanMyMac', job: 'Cleaning and uninstalling', icon: 'cleanmymac.png' },
  { name: 'Raycast', job: 'Launcher and calculator', icon: 'raycast.svg' },
  { name: 'Magnet', job: 'Window snapping', icon: 'magnet.png' },
  { name: 'iStat Menus', job: 'System stats', icon: 'istat-menus.png' },
  { name: 'Session', job: 'Pomodoro timer', icon: 'session.png' },
  { name: 'Dictation apps', job: 'Voice typing', emoji: '🎙️' },
  { name: 'Notch apps', job: 'Music and calendar in the notch', emoji: '🏝️' },
];

const assurances = ['30 days free, no card', 'Apple Silicon and Intel', 'macOS 14 or later', 'Signed and notarized by Apple'];

const highlights = ['Notch panel', 'Task boards', 'Pomodoro', 'Clipboard history', 'iCloud clipboard sync', 'Launcher', 'Calculator',
  'On-device dictation', 'Mac cleaner', 'Claude and ChatGPT cleanup', 'Window snapping', 'System stats', 'Battery health', 'Claude MCP', 'Automatic updates'];

const personas: [string, string, string][] = [
  ['💻', 'Developers', "Claude Code and Codex usage in the notch, a launcher for everything, and a cleaner that clears Xcode, package caches and the Claude and ChatGPT apps' leftovers."],
  ['🎨', 'Designers', 'Copied colours, images and snippets in a visual shelf, pinboards for brand assets, and windows snapped side by side.'],
  ['🎓', 'Students', 'A Pomodoro timer that stays out of the way, task boards for every subject, and dictation for notes in about 100 languages.'],
  ['✍️', 'Writers', 'Talk and it types in any app, with your snippets and research one shortcut away.'],
  ['🚀', 'Founders', 'Tasks from Todoist, Asana, Linear and GitHub on one board, a timer on what you are doing now, and Claude able to add and finish tasks.'],
  ['🏡', 'Everyone', 'A tidier, faster Mac: free up space safely, keep an eye on battery health, and see music and your calendar at a glance.'],
];

const plans = [
  { name: 'Monthly', price: '$3.99', period: 'per month', note: 'Cancel any time' },
  { name: 'Yearly', price: '$29.99', period: 'per year', note: 'Save 37%', best: true },
  { name: 'Lifetime', price: '$49.99', period: 'once', note: 'Pay once, keep it' },
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
  ['How much does it cost?', 'Every feature is free for your first 30 days, no card needed. After that it is $3.99 a month, $29.99 a year, or $49.99 once for lifetime access.'],
  ['Can I use it on more than one Mac?', 'Yes. Sign in with the same account on each Mac. Switch on iCloud sync and your clipboard and pinboards follow you between them.'],
  ['Does it update itself?', 'Yes. OneBuddy checks for a new version once a day and asks before installing it. You can let it install updates on its own in Settings.'],
  ['I already use the OneBuddy extension. Is this the same thing?', 'Same Buddy, different home. The extension lives in your browser; the Mac app lives in the notch and works across every app.'],
];

/* -------------------------------------------------------------------- page */

export function MacLanding() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')), { threshold: 0.12 });
    document.querySelectorAll('.macp .reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="macp">
      <section className="hero">
        <div className="blob b1" /><div className="blob b2" /><div className="blob b3" />
        <div className="wrap">
          <img className="mascot" src={`${IMG}/buddy-hello.webp`} alt="Buddy, the OneBuddy mascot" width={118} height={118} />
          <div style={{ marginTop: 18 }}><span className="eyebrow"> OneBuddy for Mac</span></div>
          <h1>Your Mac&apos;s buddy.<br /><span className="serif-line">Lives in the notch.</span></h1>
          <p className="lead">Tasks, a Pomodoro timer, clipboard history, a launcher, voice dictation and a cleaner — one app, one hover away. No more drawer full of little utilities.</p>
          <div className="cta">
            <DownloadButton />
            <a className="btn ghost" href="#notch">See how it works</a>
          </div>
          <ul className="assurances">{assurances.map((item) => <li key={item}>{item}</li>)}</ul>
          <HeroStage />
          <div className="feature-cloud reveal">{highlights.map((item) => <span key={item}>{item}</span>)}</div>
        </div>
      </section>

      <section className="center" style={{ paddingTop: 40 }}>
        <div className="wrap reveal">
          <span className="eyebrow">One app instead of many</span>
          <h2 style={{ marginTop: 16 }}>Eight apps&apos; everyday jobs. <span className="serif-line">One buddy.</span></h2>
          <p className="lead">Most Macs collect a utility for every small job. OneBuddy covers the everyday part of each one, in one place, with one look and one set of shortcuts.</p>
          <div className="logo-wall">
            {replaced.map((app) => (
              <div className="logo-card" key={app.name}>
                {app.icon
                  ? <img src={`${IMG}/apps/${app.icon}`} alt={`${app.name} icon`} width={56} height={56} loading="lazy" className={app.icon.endsWith('.svg') ? 'mark' : ''} />
                  : <span className="emoji-icon" aria-hidden>{app.emoji}</span>}
                <b>{app.name}</b>
                <small>{app.job}</small>
              </div>
            ))}
          </div>
          <div className="arrow">↓ &nbsp;<img src={`${IMG}/icon.png`} alt="" width={40} height={40} /> All of it in OneBuddy</div>
          <p className="disclaimer">App names and icons belong to their owners. OneBuddy is not affiliated with them, and each of those apps does more than the everyday job shown here.</p>
          <nav className="jump" aria-label="Features">
            {rows.map((row) => <a key={row.id} href={`#${row.id}`}>{row.eyebrow}</a>)}
            <a href="#tools">More tools</a>
            <a href="#pricing">Pricing</a>
          </nav>
        </div>
      </section>

      <div id="features">
        {rows.map((row, index) => (
          <section key={row.id} id={row.id} className={`feature ${index % 2 ? 'flip' : ''}`}>
            <div className="wrap row">
              <div className="copy reveal">
                <span className="eyebrow">{row.eyebrow}</span>
                <h2>{row.title}</h2>
                <p className="lead">{row.body}</p>
                <ul>{row.points.map((point) => <li key={point}>{point}</li>)}</ul>
                {row.buddy && <img className="row-buddy" src={`${IMG}/${row.buddy}`} alt="" width={84} height={84} loading="lazy" />}
              </div>
              <div className="demo reveal">{row.demo}</div>
            </div>
          </section>
        ))}
      </div>

      <section id="tools" className="tools-section">
        <div className="wrap">
          <div className="center reveal">
            <span className="eyebrow">And there is more</span>
            <h2 style={{ marginTop: 16 }}>Tools. <span className="gradient-text">Around your notch and across your day.</span></h2>
          </div>
          <div className="tools">
            {tools.map((tool) => (
              <article key={tool.title} className="tool reveal">
                {tool.image
                  ? <div className={`tool-shot ${tool.notch ? 'notch-frame' : ''}`} style={{ aspectRatio: tool.ratio }}><img src={`${IMG}/${tool.image}`} alt={`${tool.title} in OneBuddy`} loading="lazy" /></div>
                  : <div className="tool-shot icon-shot"><span>{tool.icon}</span></div>}
                <h3>{tool.title}</h3>
                <p>{tool.body}</p>
                <span className="tag">{tool.tag}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="who" className="personas-section">
        <div className="wrap">
          <div className="center reveal">
            <span className="eyebrow">Built for how you work</span>
            <h2 style={{ marginTop: 16 }}>One buddy, <span className="serif-line small">whatever your day looks like.</span></h2>
          </div>
          <div className="personas">
            {personas.map(([icon, title, body]) => (
              <article key={title} className="persona reveal"><span aria-hidden>{icon}</span><h3>{title}</h3><p>{body}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing">
        <div className="wrap">
          <div className="center reveal">
            <span className="eyebrow">Pricing</span>
            <h2 style={{ marginTop: 16 }}>Try everything free <span className="serif-line small">for a month.</span></h2>
            <p className="lead">Every feature, no card. Then pick the plan that suits you, or pay once and keep it.</p>
          </div>
          <div className="plans reveal">
            {plans.map((plan) => (
              <div key={plan.name} className={`plan ${plan.best ? 'best' : ''}`}>
                {plan.best && <span className="ribbon">Best value</span>}
                <h3>{plan.name}</h3>
                <div className="price">{plan.price}<small> {plan.period}</small></div>
                <p>{plan.note}</p>
                <ul>
                  <li>Every feature unlocked</li>
                  <li>Updates included</li>
                  <li>Your data stays on your Mac</li>
                </ul>
              </div>
            ))}
          </div>
          <div className="cta" style={{ marginTop: 28 }}><DownloadButton /></div>
          <p className="fine center">Payments are handled by Stripe. Manage or cancel any time from the app.</p>
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
            <img src={`${IMG}/buddy-hello.webp`} alt="" width={92} height={92} style={{ width: 92, margin: '0 auto 14px', filter: 'drop-shadow(0 14px 24px rgba(124,58,237,.6))' }} />
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
