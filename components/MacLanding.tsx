'use client';

import { useEffect } from 'react';
import { MacBook3D } from './MacBook3D';
import { Code1, ColorSwatch, Teacher, Edit2, LampCharge, Home2, type Icon } from 'iconsax-react';
import { siteConfig } from '@/lib/site-config';

const IMG = '/images/mac';

/* ------------------------------------------------------------------ data */

const stats: { value: string; sup?: string; label: string }[] = [
  { value: '400', label: 'copies remembered' },
  { value: '13', label: 'window layouts' },
  { value: '100', sup: '≈', label: 'dictation languages' },
  { value: '11', label: 'tools for Claude' },
];

const replaced: { name: string; job: string; icon?: string; emoji?: string }[] = [
  { name: 'Paste', job: 'Clipboard history', icon: 'paste.png' },
  { name: 'CleanMyMac', job: 'Cleaning', icon: 'cleanmymac.png' },
  { name: 'Raycast', job: 'Launcher', icon: 'raycast.svg' },
  { name: 'Magnet', job: 'Window snapping', icon: 'magnet.png' },
  { name: 'iStat Menus', job: 'System stats', icon: 'istat-menus.png' },
  { name: 'Session', job: 'Pomodoro', icon: 'session.png' },
  { name: 'Wispr Flow', job: 'Voice typing', icon: 'wispr-flow.png' },
  { name: 'Notch apps', job: 'Music and calendar', emoji: '🏝️' },
];

const integrations = ['todoist', 'asana', 'linear', 'github', 'notion', 'trello', 'clickup', 'google-calendar', 'microsoft-calendar'];

const steps: { title: string; body: string; keys?: string }[] = [
  { title: 'Download and open', body: 'Drag OneBuddy to Applications and open it. It is signed and notarized by Apple, so it opens without warnings, and it starts with your Mac from then on.' },
  { title: 'Hover the notch', body: 'Move the pointer to the top of the screen. The notch opens with your music, your calendar, the task you are timing, system stats and timers.' },
  { title: 'Paste anything you copied', body: 'Press the shortcut in any app and your clipboard history slides up from the bottom. Arrow to a clip and press Return, or ⌘1 to ⌘9.', keys: '⇧⌘V' },
  { title: 'Open, find and calculate', body: 'One bar for apps, files, commands, quick maths and currency. Type “100 usd to lkr” and press Return to copy the answer.', keys: '⌥Space' },
  { title: 'Start focus', body: 'Pick today’s task and press Start focus. The app steps aside, a slim task list stays at the edge of the screen, and the timer lives in the notch.' },
];

const personas: { icon: Icon; tint: string; title: string; body: string }[] = [
  { icon: Code1, tint: 'linear-gradient(135deg,#3B82F6,#6366F1)', title: 'Developers', body: 'Claude Code and Codex usage in the notch, a launcher for everything, and a cleaner for Xcode, package caches and AI app leftovers.' },
  { icon: ColorSwatch, tint: 'linear-gradient(135deg,#F472B6,#D946EF)', title: 'Designers', body: 'Colours, images and snippets in a visual shelf, pinboards for brand assets, windows side by side.' },
  { icon: Teacher, tint: 'linear-gradient(135deg,#F59E0B,#F87171)', title: 'Students', body: 'A Pomodoro timer that stays out of the way, boards for every subject, dictation for notes.' },
  { icon: Edit2, tint: 'linear-gradient(135deg,#10B981,#0EA5E9)', title: 'Writers', body: 'Talk and it types in any app, with your snippets and research one shortcut away.' },
  { icon: LampCharge, tint: 'linear-gradient(135deg,#8B5CF6,#3B82F6)', title: 'Founders', body: 'Tasks from Todoist, Asana, Linear and GitHub on one board, and Claude able to add and finish them.' },
  { icon: Home2, tint: 'linear-gradient(135deg,#22D3EE,#34D399)', title: 'Everyone', body: 'A tidier Mac: free space safely, watch battery health, see music and your calendar at a glance.' },
];

const plans = [
  { name: 'Monthly', price: '$3.99', period: 'per month', note: 'Cancel any time' },
  { name: 'Yearly', price: '$29.99', period: 'per year', note: 'Save 37%', best: true },
  { name: 'Lifetime', price: '$49.99', period: 'once', note: 'Pay once, keep it' },
];

const privacy = [
  ['speech', 'Speech stays on your Mac', 'Dictation runs on a speech model stored on your Mac. Your voice is not uploaded.'],
  ['keep', 'Trash, not delete', 'The cleaner moves files to the Trash. Change your mind and put them back.'],
  ['lock', 'Passwords skipped', 'Items that password managers mark as secret never enter your clipboard history.'],
  ['settings', 'Keys in the Keychain', 'Integration tokens are kept in your Mac’s Keychain and only sent to their own service.'],
  ['tag', 'No ads, no tracking', 'There is no analytics or advertising code in the app.'],
  ['device', 'Your own iCloud', 'Clipboard sync is off until you switch it on, and then it uses your own iCloud Drive.'],
];

const faqs = [
  ['Does it need a MacBook with a notch?', 'No. On a Mac without a notch, OneBuddy draws a small pill at the top of the screen that behaves the same way.'],
  ['Which permissions does it ask for?', 'Only what a feature needs, when you use it: Accessibility to paste and to move windows, Microphone for dictation, Calendar to show your events. Each one is optional.'],
  ['How much does it cost?', 'Every feature is free for your first month, no card needed. After that it is $3.99 a month, $29.99 a year, or $49.99 once for lifetime access.'],
  ['Will the cleaner delete something I need?', 'Items go to the Trash rather than being deleted, risky categories are never ticked for you, and each one is labelled Safe, Caution or Review.'],
  ['Do the task integrations sync both ways?', 'Not yet. OneBuddy imports the open tasks assigned to you from Todoist, Asana, ClickUp, Trello, Notion, Linear and GitHub. Finishing a task in OneBuddy doesn’t close it there.'],
  ['Does it keep running if I press ⌘Q?', 'Yes. OneBuddy stays in the notch so your shortcuts keep working. To quit it completely, use the menu bar icon.'],
  ['Does it update itself?', 'Yes. It checks for a new version once a day and asks before installing it.'],
  ['I already use the OneBuddy extension. Is this the same?', 'Same Buddy, different home. The extension lives in your browser; the Mac app lives in the notch and works across every app.'],
];

/* ---------------------------------------------------------------- pieces */

function DownloadLink({ big }: { big?: boolean }) {
  const url = siteConfig.macDownloadUrl;
  return url
    ? <a className={`link ${big ? 'big' : ''}`} href={url}>Download for Mac <span aria-hidden>›</span></a>
    : <a className={`link ${big ? 'big' : ''}`} href="#start">Coming soon to Mac <span aria-hidden>›</span></a>;
}

/* -------------------------------------------------------------------- page */

export function MacLanding() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')), { threshold: 0.15 });
    document.querySelectorAll('.mac2 .rv').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="mac2">
      {/* Hero */}
      <section className="hero">
        <div className="avatar rv"><div className="glow" /><img src={`${IMG}/buddy-hello.webp`} alt="Buddy, the OneBuddy mascot" width={200} height={200} /></div>
        <p className="byline rv">OneBuddy for Mac <svg viewBox="0 0 24 24" aria-label="verified"><path fill="#3B82F6" d="M12 2l2.4 1.8 3-.2.9 2.9 2.5 1.7-1 2.8 1 2.8-2.5 1.7-.9 2.9-3-.2L12 22l-2.4-1.8-3 .2-.9-2.9-2.5-1.7 1-2.8-1-2.8 2.5-1.7.9-2.9 3 .2z" /><path fill="#fff" d="M10.6 15.6l-3.2-3.2 1.4-1.4 1.8 1.8 4.6-4.6 1.4 1.4z" /></svg></p>
        <h1 className="rv">Your notch, put to work.</h1>
        <div className="links rv"><DownloadLink big /><a className="link big" href="#features">See what it does <span aria-hidden>›</span></a></div>
        <p className="fine rv">Free for a month · macOS 14 or later · Apple Silicon and Intel</p>
      </section>

      <MacBook3D image={`${IMG}/ui/desktop-home.webp`} alt="OneBuddy for Mac on a MacBook Pro: the main window with tasks, the clipboard and a running timer in the notch" />

      {/* Statement */}
      <section className="statement">
        <h2 className="grad rv">Seven little apps.<br />One buddy<br />in the notch.</h2>
      </section>

      {/* Benefits */}
      <section className="alt" id="features">
        <div className="wrap">
          <p className="label rv">Why OneBuddy</p>
          <h2 className="title rv">Your Mac’s new<br />best buddy.</h2>
          <div className="bento stats">
            <article className="card intro rv">
              <h3>Tasks, timers, clipboard, launcher, dictation and a cleaner, behind the notch you already have.</h3>
              <p>Most Macs collect a small app for every job, each with its own shortcut, menu bar icon and renewal. OneBuddy does the everyday part of each one in a single, quiet place. Hover the notch to see what is going on, press one shortcut to reach what you need, and get back to work.</p>
              <DownloadLink />
            </article>
            {stats.map((s) => (
              <article className="card stat rv" key={s.label}>
                <div className="num">{s.sup && <sup>{s.sup}</sup>}{s.value}</div>
                <p>{s.label}</p>
              </article>
            ))}
          </div>

          <div className="bento features">
            <article className="card wide sunset rv">
              <div className="copy"><h3>The notch,<br />reimagined.</h3><p>Hover and it opens: music, calendar, the task you are timing, system stats, AI usage, a Pomodoro and timers. Closed, it shows a running clock beside the camera.</p></div>
              <img src={`${IMG}/ui/notch-home.webp`} alt="The open notch with now playing, calendar and a running focus timer" loading="lazy" width={872} height={296} />
            </article>

            <article className="card rv">
              <h3>Copy once.<br />Find it for good.</h3>
              <p>Everything you copy is kept: text, links, images, colours. Pinboards hold what you reuse, and iCloud keeps your Macs in step.</p>
              <img className="shot" src={`${IMG}/ui/shelf.webp`} alt="The clipboard shelf sliding up from the bottom of the screen" loading="lazy" width={1440} height={360} />
            </article>

            <article className="card rv">
              <h3>One bar for<br />everything.</h3>
              <p>Apps, files, commands, quick maths and currency, with aliases and global hotkeys.</p>
              <img className="shot" src={`${IMG}/ui/launcher-fx.webp`} alt="The launcher converting 100 US dollars to Sri Lankan rupees" loading="lazy" width={720} height={130} />
              <img className="shot" src={`${IMG}/ui/launcher.webp`} alt="The launcher listing commands and apps" loading="lazy" width={720} height={452} />
            </article>

            <article className="card grid-card rv">
              <h3>Dictation that never<br />leaves your Mac.</h3>
              <p>Hold ⌃⇧Space and talk; the words type into any app. A speech model on your Mac does the work, in about 100 languages.</p>
              <div className="pill" aria-hidden><span className="mic">●</span>{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ animationDelay: `${i * 0.07}s` }} />)}</div>
            </article>

            <article className="card rv">
              <h3>Focus, with a clock<br />in the notch.</h3>
              <p>Boards with Backlog, Today and Done, a Pomodoro that runs itself, and Start focus for a slim task list at the edge of the screen.</p>
              <div className="duo"><img className="shot" src={`${IMG}/ui/notch-pomodoro.webp`} alt="The Pomodoro timer in the notch" loading="lazy" width={872} height={296} /><img className="shot tall" src={`${IMG}/ui/focus.webp`} alt="The floating task list" loading="lazy" width={360} height={620} /></div>
            </article>

            <article className="card rv">
              <h3>Get your disk back,<br />without the fear.</h3>
              <p>Junk, duplicates, large files, uninstalls and the caches the Claude and ChatGPT apps leave behind. Safe, Caution or Review on everything, and it all goes to the Trash.</p>
              <div className="chart" aria-hidden>{[22, 36, 48, 64, 88].map((h, i) => <i key={i} style={{ height: `${h}%`, transitionDelay: `${i * 0.12}s` }} />)}</div>
            </article>

            <article className="card cloud rv">
              <h3>Works with the<br />tools you use.</h3>
              <p>Pull the tasks assigned to you from Todoist, Asana, Linear, GitHub and more, and let Claude add, start and finish tasks for you.</p>
              <div className="logos" aria-hidden>
                {integrations.map((name, i) => <span key={name} style={{ animationDelay: `${(i % 5) * 0.5}s` }}><img src={`${IMG}/integrations/${name}.svg`} alt="" width={30} height={30} /></span>)}
                <span className="claude">Claude</span>
              </div>
            </article>

            <article className="card wide ocean rv">
              <div className="copy"><h3>Everything,<br />one window.</h3><p>Home, tasks, reminders, clipboard, cleaner, AI usage, system and integrations, in a calm dark window with a sidebar you can reach with ⌘1 to ⌘9.</p></div>
              <img src={`${IMG}/ui/cleaner.webp`} alt="The Cleaner overview in the OneBuddy window" loading="lazy" width={1240} height={810} />
            </article>
          </div>
        </div>
      </section>

      {/* Apps it replaces */}
      <section>
        <div className="wrap center">
          <p className="label rv">One app instead of many</p>
          <h2 className="title rv">Eight apps’ everyday jobs.<br /><span className="grad">One buddy.</span></h2>
          <div className="apps rv">
            {replaced.map((app) => (
              <div className="app" key={app.name}>
                {app.icon
                  ? <img src={`${IMG}/apps/${app.icon}`} alt={`${app.name} icon`} width={56} height={56} className={app.icon.endsWith('.svg') ? 'mark' : ''} loading="lazy" />
                  : <span className="emoji" aria-hidden>{app.emoji}</span>}
                <b>{app.name}</b><small>{app.job}</small>
              </div>
            ))}
          </div>
          <p className="disclaimer">App names and icons belong to their owners. OneBuddy is not affiliated with them, and each does more than the everyday job shown here.</p>
        </div>
      </section>

      {/* Steps */}
      <section className="alt">
        <div className="wrap narrow">
          <p className="label rv">How it works</p>
          <h2 className="title rv">From download<br />to done.</h2>
          <div className="steps">
            {steps.map((step, i) => (
              <article className="step" key={step.title} style={{ top: `${96 + i * 18}px` }}>
                <p className="label blue">Step {i + 1}</p>
                <h3>{step.title}{step.keys && <kbd>{step.keys}</kbd>}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Personas */}
      <section>
        <div className="wrap">
          <p className="label rv">Built for how you work</p>
          <h2 className="title rv">One buddy, whatever<br />your day looks like.</h2>
          <div className="people">
            {personas.map(({ icon: PersonaIcon, tint, title, body }) => <article className="card rv" key={title}><span className="picon" style={{ background: tint }} aria-hidden><PersonaIcon size={28} color="#fff" variant="Bold" /></span><h3>{title}</h3><p>{body}</p></article>)}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="alt" id="pricing">
        <div className="wrap center">
          <p className="label rv">Pricing</p>
          <h2 className="title rv">Try everything free<br /><span className="grad">for a month.</span></h2>
          <p className="lead rv">Every feature, no card. Then pick a plan, or pay once and keep it.</p>
          <div className="plans">
            {plans.map((plan) => (
              <article key={plan.name} className={`card plan rv ${plan.best ? 'best' : ''}`}>
                {plan.best && <span className="ribbon">Best value</span>}
                <h3>{plan.name}</h3>
                <div className="price">{plan.price}<small> {plan.period}</small></div>
                <p className="note">{plan.note}</p>
                <ul><li>Every feature unlocked</li><li>Updates included</li><li>Your data stays on your Mac</li></ul>
              </article>
            ))}
          </div>
          <p className="links rv" style={{ marginTop: 28 }}><DownloadLink big /></p>
          <p className="fine">Payments are handled by Stripe. Manage or cancel any time from the app.</p>
        </div>
      </section>

      {/* Privacy */}
      <section>
        <div className="wrap">
          <p className="label rv">Local first</p>
          <h2 className="title rv">It runs on your Mac.<br /><span className="grad">So do your files.</span></h2>
          <div className="privacy">
            {privacy.map(([icon, title, body]) => <div className="rv" key={title}><img className="glass-icon" src={`/images/icons/${icon}.webp`} alt="" width={64} height={64} loading="lazy" /><h3>{title}</h3><p>{body}</p></div>)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="alt" id="faq">
        <div className="wrap narrow">
          <p className="label rv">FAQ</p>
          <h2 className="title rv">Questions,<br />answered straight.</h2>
          <div className="faq rv">
            {faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      {/* Final */}
      <section className="final" id="start">
        <img className="rv" src={`${IMG}/icon.png`} alt="" width={96} height={96} />
        <h2 className="grad rv">Give your notch a job.</h2>
        <div className="links rv"><DownloadLink big /><a className="link big" href={siteConfig.extensionUrl} target="_blank" rel="noopener noreferrer">Get the Chrome extension <span aria-hidden>›</span></a></div>
        <p className="fine">macOS 14 or later · free for a month, no card</p>
      </section>
    </div>
  );
}
