'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Chrome, Apple, Star1 } from 'iconsax-react';
import { siteConfig } from '@/lib/site-config';
import { featureClusters } from '@/lib/features-data';
import { ComparisonTable } from './ComparisonTable';

const MAC = '/images/mac';

/* ------------------------------------------------------------------ data */

const extStats: { value: string; sup?: string; label: string }[] = [
  { value: '4.9', sup: '★', label: 'from 2,480+ reviews' },
  { value: '10k', sup: '+', label: 'people use it' },
  { value: '20', sup: '+', label: 'tools in one panel' },
  { value: '40', sup: '+', label: 'languages' },
];

const suiteLook: Record<string, { tint: string; icon: string }> = {
  productivity: { tint: 'linear-gradient(135deg,#3B82F6,#8B5CF6)', icon: '/new/focus timer.png' },
  health: { tint: 'linear-gradient(135deg,#10B981,#22D3EE)', icon: '/new/remiders.png' },
  privacy: { tint: 'linear-gradient(135deg,#8B5CF6,#D946EF)', icon: '/new/privet.png' },
  capture: { tint: 'linear-gradient(135deg,#F87171,#F59E0B)', icon: '/new/videos.png' },
};

const extIcons = ['focus timer', 'ad block', 'clipboard', 'screenshot', 'videos', 'remiders', 'note', 'privet'];

const extSteps = [
  { title: 'Add to Chrome', body: 'One click from the Chrome Web Store. No sign-up and no email to start.' },
  { title: 'Pick your tools', body: 'Turn on what you need and skip the rest. Change it whenever you like.' },
  { title: 'Work from the side panel', body: 'Timer, notes, clipboard, blockers and capture, one click away on every tab.' },
];

const macReplaces = [
  { name: 'Paste', icon: 'paste.png' }, { name: 'CleanMyMac', icon: 'cleanmymac.png' }, { name: 'Raycast', icon: 'raycast.svg' },
  { name: 'Magnet', icon: 'magnet.png' }, { name: 'iStat Menus', icon: 'istat-menus.png' }, { name: 'Session', icon: 'session.png' },
  { name: 'Wispr Flow', icon: 'wispr-flow.png' },
];
const extReplaces = ['Loom', 'Momentum', 'Forest', 'Ghostery', 'uBlock Origin', 'Raindrop', 'Stretchly', 'Clipboard History'];

const extPlans = [
  { name: 'Free', price: '£0', period: 'forever', note: 'The basics, for good', items: ['Pomodoro timer', 'Notes', 'Health reminders', 'Tab screenshots', 'Basic ad blocking'] },
  { name: 'Monthly', price: '£2.99', period: 'per month', note: '30 days free', items: ['Everything in Pro', 'Cancel any time'] },
  { name: 'Yearly', price: '£29.99', period: 'per year', note: 'Save 16%', best: true, items: ['Everything in Pro', 'Just £2.50 a month'] },
  { name: 'Lifetime', price: '£49.99', period: 'once', note: 'Pay once, keep it', items: ['Everything in Pro', 'All future updates'] },
];
const macPlans = [
  { name: 'Monthly', price: '$3.99', period: 'per month', note: 'Cancel any time', items: ['Every feature unlocked', 'Updates included'] },
  { name: 'Yearly', price: '$29.99', period: 'per year', note: 'Save 37%', best: true, items: ['Every feature unlocked', 'Updates included'] },
  { name: 'Lifetime', price: '$49.99', period: 'once', note: 'Pay once, keep it', items: ['Every feature unlocked', 'Updates included'] },
];

const quotes = [
  { quote: 'I was paying £15/month for Loom, plus Forest, plus Ghostery. OneBuddy Pro replaced all three for £2.99. My browser went from using 4GB RAM to under 1GB.', name: 'Sarah K.', role: 'Remote Product Designer' },
  { quote: 'The 30-day trial convinced me in 3 days. The clipboard history and screen recording alone are worth £2.99/month. The rest is a bonus.', name: 'Marcus T.', role: 'Full-Stack Developer' },
  { quote: 'I teach journalism students and recommended OneBuddy to my entire class. The free tier is genuinely useful, and I upgraded to Pro for the privacy blur.', name: 'Elena R.', role: 'Freelance Journalist' },
  { quote: 'Got the lifetime deal for £49.99. That\'s less than what I was paying PER MONTH for separate extensions. Best £50 I\'ve spent on productivity.', name: 'James W.', role: 'Startup Founder' },
];

const privacy = [
  ['Stored on your device', 'Notes, clips, captures and settings stay in your browser and on your Mac. There is no OneBuddy server holding them.'],
  ['No data selling', 'We earn from subscriptions, not from what you browse. There is no advertising code in either product.'],
  ['Speech stays on your Mac', 'Mac dictation runs on a speech model stored on your Mac. Your voice is not uploaded.'],
  ['Trash, not delete', 'The Mac cleaner moves files to the Trash, so you can always put them back.'],
  ['Manifest V3', 'The extension is built on Chrome’s current, stricter extension platform and asks only for what it uses.'],
  ['Keys in the Keychain', 'Mac integration tokens live in your Keychain and are only sent to their own service.'],
];

const faqs = [
  ['What is the difference between the extension and the Mac app?', 'The Chrome extension lives in your browser’s side panel: focus timer, notes, clipboard, ad and tracker blocking, privacy blur and screen capture. The Mac app lives in the notch and works across every app: tasks, clipboard history, a launcher, dictation, window snapping and a cleaner. Use either, or both.'],
  ['Is the free tier actually useful?', 'Yes. The extension’s Free plan keeps a real Pomodoro timer, notes, health reminders, tab screenshots and basic ad blocking, forever. Pro adds recording, clipboard history, the advanced blockers and more.'],
  ['What happens after the trial?', 'On Chrome you choose Pro or stay on Free, and we remind you three days before the 30-day trial ends. On Mac every feature is free for the first month, then you pick a plan or pay once.'],
  ['Does either one sell my data?', 'Never. Your data is stored on your own device, and we make money from subscriptions only.'],
  ['Will the extension slow my browser down?', 'It replaces several single-purpose extensions with one, so most people see Chrome use less memory, not more.'],
  ['Does the Mac app need a MacBook with a notch?', 'No. On a Mac without a notch it draws a small pill at the top of the screen that works the same way. It needs macOS 14 or later.'],
  ['Can I cancel any time?', 'Yes, with one click. Free extension features stay yours, and nothing you saved is removed.'],
  ['Is lifetime really lifetime?', 'Yes. Pay once and get every future update for that product.'],
];

/* ---------------------------------------------------------------- pieces */

function ChromeLink({ big, label = 'Add to Chrome' }: { big?: boolean; label?: string }) {
  return <a className={`link ${big ? 'big' : ''}`} href={siteConfig.extensionUrl} target="_blank" rel="noopener noreferrer">{label} <span aria-hidden>›</span></a>;
}
function MacLink({ big, label = 'Download for Mac' }: { big?: boolean; label?: string }) {
  return <a className={`link ${big ? 'big' : ''}`} href={siteConfig.macDownloadUrl || '/mac/'}>{label} <span aria-hidden>›</span></a>;
}

function Plans({ plans, cols }: { plans: typeof extPlans; cols: number }) {
  return (
    <div className={`plans ${cols === 4 ? 'plans4' : ''}`}>
      {plans.map((plan) => (
        <article key={plan.name} className={`card plan rv ${plan.best ? 'best' : ''}`}>
          {plan.best && <span className="ribbon">Most popular</span>}
          <h3>{plan.name}</h3>
          <div className="price">{plan.price}<small> {plan.period}</small></div>
          <p className="note">{plan.note}</p>
          <ul>{plan.items.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------- page */

export function HomeLanding() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')), { threshold: 0.12 });
    document.querySelectorAll('.mac2 .rv').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="mac2 home">
      {/* Hero */}
      <section className="hero">
        <div className="avatar rv"><div className="glow" /><img src={`${MAC}/buddy-hello.webp`} alt="Buddy, the OneBuddy mascot" width={200} height={200} /></div>
        <p className="byline rv">OneBuddy</p>
        <h1 className="rv">One buddy.<br /><span className="grad">Browser and Mac.</span></h1>
        <p className="lead hero-lead rv">Twenty tools in your Chrome side panel, and a whole toolkit behind your Mac’s notch. Made to replace the little apps and extensions you pay for one by one.</p>
        <div className="links rv"><ChromeLink big /><MacLink big /></div>
        <p className="trust rv">
          <span><span className="stars" aria-hidden>{Array.from({ length: 5 }, (_, i) => <Star1 key={i} size={14} color="#F59E0B" variant="Bold" />)}</span><b>4.9</b> from 2,480+ reviews</span>
          <span><b>10,000+</b> people</span>
          <span><b>30 days</b> free, no card</span>
        </p>
      </section>

      {/* The two products */}
      <section className="products-sec">
        <div className="wrap">
          <div className="products">
            <article className="card product sunset rv" id="extension-card">
              <p className="label light"><Chrome size={18} color="#fff" variant="Bold" /> OneBuddy for Chrome</p>
              <h3>Twenty tools.<br />One side panel.</h3>
              <p>Focus timer, notes, clipboard, ad and tracker blocking, privacy blur, health reminders and screen recording, on every tab.</p>
              <div className="links left"><ChromeLink label="Add to Chrome, free" /><Link className="link" href="/features/">All features <span aria-hidden>›</span></Link></div>
              <div className="icon-grid" aria-hidden>{extIcons.map((n, i) => <img key={n} src={`/new/${n}.png`} alt="" width={72} height={72} style={{ animationDelay: `${i * 0.35}s` }} />)}</div>
            </article>
            <article className="card product night rv">
              <p className="label light"><Apple size={18} color="#fff" variant="Bold" /> OneBuddy for Mac</p>
              <h3>Your notch,<br />put to work.</h3>
              <p>Tasks, a Pomodoro, clipboard history, a launcher, on-device dictation and a cleaner, behind the notch you already have.</p>
              <div className="links left"><MacLink /><Link className="link" href="/mac/">Learn more <span aria-hidden>›</span></Link></div>
              <img className="product-shot" src={`${MAC}/ui/desktop-home.webp`} alt="The OneBuddy for Mac window with tasks, the clipboard and system stats" width={1440} height={900} loading="lazy" />
            </article>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="statement">
        <h2 className="grad rv">Fewer extensions.<br />Fewer apps.<br />One buddy.</h2>
      </section>

      {/* Chrome extension */}
      <section className="alt" id="extension">
        <div className="wrap">
          <p className="label rv">OneBuddy for Chrome</p>
          <h2 className="title rv">Your browser’s new<br />best buddy.</h2>
          <div className="bento stats">
            <article className="card intro rv">
              <h3>Everything you install one extension at a time, in a single side panel.</h3>
              <p>Most browsers pick up an extension for every job, each one using memory, asking for permissions and sometimes selling what it sees. OneBuddy does those jobs in one place, stores what you make on your device, and keeps Chrome lighter.</p>
              <ChromeLink />
            </article>
            {extStats.map((s) => (
              <article className="card stat rv" key={s.label}>
                <div className="num">{s.sup && s.sup !== '+' && <sup>{s.sup}</sup>}{s.value}{s.sup === '+' && <sup>+</sup>}</div>
                <p>{s.label}</p>
              </article>
            ))}
          </div>

          <div className="bento suites">
            {featureClusters.map((cluster) => {
              const look = suiteLook[cluster.id] ?? suiteLook.productivity;
              return (
                <article className="card suite rv" key={cluster.id} id={cluster.id}>
                  <div className="suite-head">
                    <span className="suite-icon" style={{ background: look.tint }}><img src={look.icon} alt="" width={44} height={44} /></span>
                    <div><h3>{cluster.label}</h3>{cluster.tagline && <p className="tag">{cluster.tagline}</p>}</div>
                  </div>
                  <ul>
                    {cluster.features.map((f) => (
                      <li key={f.title}><span>{f.title}</span>{f.tier && <em className={f.tier}>{f.tier === 'free' ? 'Free' : 'Pro'}</em>}</li>
                    ))}
                  </ul>
                  {cluster.costComparison && <p className="fine">Instead of paying about {cluster.costComparison} for separate extensions.</p>}
                </article>
              );
            })}
          </div>

          <div className="mini-steps">
            {extSteps.map((s, i) => (
              <div className="rv" key={s.title}><p className="label blue">Step {i + 1}</p><h3>{s.title}</h3><p>{s.body}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Mac app */}
      <section id="mac">
        <div className="wrap">
          <p className="label rv">OneBuddy for Mac</p>
          <h2 className="title rv">Your Mac’s new<br />best buddy.</h2>
          <div className="bento features">
            <article className="card wide sunset rv">
              <div className="copy"><h3>The notch,<br />reimagined.</h3><p>Hover and it opens: music, calendar, the task you are timing, system stats, AI usage, a Pomodoro and timers.</p></div>
              <img src={`${MAC}/ui/notch-home.webp`} alt="The open notch with now playing, calendar and a running focus timer" loading="lazy" width={872} height={296} />
            </article>
            <article className="card rv">
              <h3>Copy once.<br />Find it for good.</h3>
              <p>Text, links, images and colours, kept and searchable, with pinboards and iCloud sync between your Macs.</p>
              <img className="shot" src={`${MAC}/ui/shelf.webp`} alt="The clipboard shelf sliding up from the bottom of the screen" loading="lazy" width={1440} height={360} />
            </article>
            <article className="card rv">
              <h3>One bar for<br />everything.</h3>
              <p>Apps, files, commands, quick maths and currency. Type “100 usd to lkr” and press Return.</p>
              <img className="shot" src={`${MAC}/ui/launcher-fx.webp`} alt="The launcher converting 100 US dollars to Sri Lankan rupees" loading="lazy" width={720} height={130} />
            </article>
            <article className="card grid-card rv">
              <h3>Dictation that never<br />leaves your Mac.</h3>
              <p>Hold ⌃⇧Space and talk; the words type into any app, in about 100 languages.</p>
              <div className="pill" aria-hidden><span className="mic">●</span>{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ animationDelay: `${i * 0.07}s` }} />)}</div>
            </article>
            <article className="card rv">
              <h3>Focus, with a clock<br />in the notch.</h3>
              <p>Boards with Backlog, Today and Done, and a slim task list at the edge of the screen while you work.</p>
              <div className="duo"><img className="shot" src={`${MAC}/ui/notch-pomodoro.webp`} alt="The Pomodoro timer in the notch" loading="lazy" width={872} height={296} /><img className="shot tall" src={`${MAC}/ui/focus.webp`} alt="The floating task list" loading="lazy" width={360} height={620} /></div>
            </article>
            <article className="card wide ocean rv">
              <div className="copy"><h3>Get your disk back,<br />without the fear.</h3><p>Junk, duplicates, large files, uninstalls and the caches AI apps leave behind, labelled Safe, Caution or Review, and moved to the Trash.</p></div>
              <img src={`${MAC}/ui/cleaner.webp`} alt="The Cleaner overview in the OneBuddy window" loading="lazy" width={1240} height={810} />
            </article>
          </div>
          <p className="links rv" style={{ marginTop: 40 }}><Link className="link big" href="/mac/">Explore OneBuddy for Mac <span aria-hidden>›</span></Link><MacLink big /></p>
        </div>
      </section>

      {/* What it replaces */}
      <section className="alt">
        <div className="wrap center">
          <p className="label rv">One buddy instead of many</p>
          <h2 className="title rv">Stop paying for<br /><span className="grad">a dozen little tools.</span></h2>
          <div className="replace rv">
            <div>
              <p className="label"><Chrome size={18} color="currentColor" variant="Bold" /> In Chrome</p>
              <div className="chips">{extReplaces.map((n) => <span key={n}>{n}</span>)}</div>
            </div>
            <div>
              <p className="label"><Apple size={18} color="currentColor" variant="Bold" /> On your Mac</p>
              <div className="app-row">{macReplaces.map((a) => <img key={a.name} src={`${MAC}/apps/${a.icon}`} alt={a.name} title={a.name} width={52} height={52} className={a.icon.endsWith('.svg') ? 'mark' : ''} loading="lazy" />)}</div>
            </div>
          </div>
          <div className="savings rv">
            <div><small>Separate extensions</small><b className="was">£34.00</b><small>a month, for Loom, Momentum, Forest, Ghostery, Raindrop and more</small></div>
            <div><small>OneBuddy Pro</small><b>£2.99</b><small>a month, or £49.99 once</small></div>
          </div>
          <p className="disclaimer">Names and icons belong to their owners. OneBuddy is not affiliated with them, and each does more than the everyday job OneBuddy covers.</p>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing">
        <div className="wrap center">
          <p className="label rv">Pricing</p>
          <h2 className="title rv">Try everything free.<br /><span className="grad">Then keep what you love.</span></h2>
          <h3 className="plans-title rv"><Chrome size={22} color="currentColor" variant="Bold" /> Chrome extension <small>30-day free trial</small></h3>
          <Plans plans={extPlans} cols={4} />
          <p className="fine">30-day money-back guarantee · no card for the trial · downgrade any time and keep the free features</p>
          <h3 className="plans-title rv" style={{ marginTop: 70 }}><Apple size={22} color="currentColor" variant="Bold" /> Mac app <small>every feature free for a month</small></h3>
          <Plans plans={macPlans} cols={3} />
          <p className="fine">macOS 14 or later · Apple Silicon and Intel · payments by Stripe</p>
          <div className="links rv" style={{ marginTop: 30 }}><ChromeLink big /><MacLink big /></div>
        </div>
      </section>

      <ComparisonTable />

      {/* Reviews */}
      <section>
        <div className="wrap">
          <p className="label rv">Reviews</p>
          <h2 className="title rv">10,000+ people,<br /><span className="grad">fewer tabs of tools.</span></h2>
          <div className="quotes">
            {quotes.map((q) => (
              <figure className="card rv" key={q.name}>
                <div className="stars" aria-label="5 stars">{Array.from({ length: 5 }, (_, i) => <Star1 key={i} size={15} color="#F59E0B" variant="Bold" />)}</div>
                <blockquote>“{q.quote}”</blockquote>
                <figcaption><b>{q.name}</b><span>{q.role}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="alt">
        <div className="wrap">
          <p className="label rv">Local first</p>
          <h2 className="title rv">Your data stays<br /><span className="grad">on your device.</span></h2>
          <div className="privacy">
            {privacy.map(([title, body]) => <div className="rv" key={title}><h3>{title}</h3><p>{body}</p></div>)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="wrap narrow">
          <p className="label rv">FAQ</p>
          <h2 className="title rv">Questions,<br />answered straight.</h2>
          <div className="faq rv">
            {faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      {/* Final */}
      <section className="final alt">
        <img className="rv" src="/logo.png" alt="" width={96} height={96} />
        <h2 className="grad rv">Meet your buddy.</h2>
        <div className="links rv"><ChromeLink big /><MacLink big /></div>
        <p className="fine">Free to try on both · no card needed</p>
      </section>
    </div>
  );
}
