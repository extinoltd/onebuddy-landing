import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Learn how OneBuddy collects, uses, and safeguards your information. All productivity data is stored locally and never sold.',
  alternates: { canonical: 'https://onebuddy.io/privacy/' },
  openGraph: {
    title: 'Privacy Policy | OneBuddy',
    description:
      'Learn how OneBuddy collects, uses, and safeguards your information. All productivity data is stored locally and never sold.',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 lg:pt-36 pb-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-500 text-sm">Effective Date: April 2, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate prose-lg max-w-none">
          {/* Introduction */}
          <h2>Introduction</h2>
          <p>
            This Privacy Policy describes how OneBuddy (&quot;we&quot;, &quot;our&quot;, or
            &quot;us&quot;) collects, uses, and safeguards information when you install and use our
            Google Chrome extension. We are committed to protecting user privacy and ensuring
            transparency about how data is handled.
          </p>
          <p>
            OneBuddy is designed to operate primarily on the user&rsquo;s device. All productivity
            data (reminders, notes, habits, todos, timer state, clipboard history, and settings) is
            stored locally using Chrome&rsquo;s storage API and never transmitted to external servers
            unless explicitly required by a feature.
          </p>

          {/* Information We Collect */}
          <h2>Information We Collect</h2>
          <p>
            The extension does not collect or sell personal data for advertising or tracking
            purposes. Depending on the features enabled by the user, the extension may process the
            following categories of information:
          </p>

          <h3>Authentication Information</h3>
          <ul>
            <li>
              <strong>Extino Account:</strong> When you sign in, the extension stores a JSON Web
              Token (JWT) locally to maintain your session. Your email, display name, and profile
              photo are retrieved from the Extino API solely to display your account information and
              manage your subscription. Passwords are never handled or stored by the extension.
            </li>
            <li>
              <strong>Google Calendar:</strong> If you choose to connect Google Calendar, the
              extension uses Chrome&rsquo;s Identity API to obtain a read-only OAuth token. This
              token is stored locally and used exclusively to fetch your calendar list and upcoming
              events. The extension requests only <code>calendar.readonly</code> and{' '}
              <code>calendar.calendarlist.readonly</code> scopes and cannot create, edit, or delete
              your calendar events.
            </li>
          </ul>

          <h3>Locally Stored User Data</h3>
          <p>
            All of the following data is stored locally on your device using{' '}
            <code>chrome.storage.local</code> and is never sent to external servers:
          </p>
          <ul>
            <li>Reminders (custom and calendar-synced)</li>
            <li>Notes</li>
            <li>Clipboard history entries</li>
            <li>Pomodoro timer state and session history</li>
            <li>Habit and todo data</li>
            <li>Bookmark interactions</li>
            <li>Eye care, ad blocker, tracker blocker, and privacy blur settings and statistics</li>
            <li>Extension preferences (theme, language, sound, volume)</li>
          </ul>

          <h3>User Activity Data</h3>
          <p>
            The extension processes limited user interactions only when you explicitly initiate an
            action, such as:
          </p>
          <ul>
            <li>Clicking buttons within the extension interface</li>
            <li>Starting or stopping the Pomodoro timer</li>
            <li>Creating or editing reminders and notes</li>
            <li>Toggling features on or off</li>
          </ul>
          <p>
            The extension does not perform background monitoring, keystroke logging, mouse tracking,
            or behavioral profiling.
          </p>

          <h3>Website Content</h3>
          <p>
            When required for core functionality, the extension may access content on the active web
            page:
          </p>
          <ul>
            <li>
              <strong>Reminders and Pomodoro overlays:</strong> Injected into the active tab to
              display in-page notification banners and timer overlays.
            </li>
            <li>
              <strong>Ad Blocker:</strong> Applies CSS rules to hide known advertising elements.
            </li>
            <li>
              <strong>Tracker Blocker:</strong> Blocks requests to known tracking domains.
            </li>
            <li>
              <strong>Privacy Blur:</strong> Blurs user-selected page elements on demand.
            </li>
            <li>
              <strong>Screen Capture:</strong> Captures the visible tab content only when the user
              explicitly initiates a recording or screenshot via the Chrome media picker.
            </li>
          </ul>
          <p>
            This access occurs only on pages you visit and only after explicit user interaction or
            based on features you have enabled. Website content is not stored or transmitted
            externally.
          </p>

          <h3>Technical Data</h3>
          <p>
            The extension may process non-identifying technical information such as:
          </p>
          <ul>
            <li>Browser type and version (for compatibility)</li>
            <li>Extension error logs (local only, for diagnostics)</li>
          </ul>
          <p>This information is used solely to ensure reliable operation.</p>

          {/* How We Use Information */}
          <h2>How We Use Information</h2>
          <p>Collected information is used only to:</p>
          <ul>
            <li>Provide and operate extension features as described above</li>
            <li>Maintain your sign-in session and subscription status</li>
            <li>Sync your Google Calendar events to display reminders</li>
            <li>Play notification sounds for reminders and timer alerts</li>
            <li>Improve performance and diagnose technical issues</li>
          </ul>
          <p>
            We do not use collected data for advertising, profiling, or tracking users across
            websites.
          </p>

          {/* Data Sharing */}
          <h2>Data Sharing and Disclosure</h2>
          <p>We do not sell, rent, or trade user data.</p>
          <p>
            Information may be shared only in the following limited circumstances:
          </p>
          <ul>
            <li>
              <strong>Extino API</strong> (<code>api.extino.net</code>): Your authentication token
              is sent to verify your account and subscription status. No other user data is
              transmitted.
            </li>
            <li>
              <strong>Google Calendar API</strong> (<code>googleapis.com</code>): Your OAuth token
              is sent to retrieve calendar and event data. No other user data is transmitted.
            </li>
            <li>
              <strong>Stripe</strong> (via Extino): If you choose to subscribe, payment processing
              is handled by Stripe through Extino. The extension does not handle or store credit card
              or payment information.
            </li>
            <li>
              <strong>Legal Compliance:</strong> When required by law or legal process.
            </li>
            <li>
              <strong>Security:</strong> To protect our rights, users, or systems from abuse or
              harm.
            </li>
          </ul>
          <p>
            All third-party services are expected to comply with applicable data protection
            standards.
          </p>

          {/* Data Retention */}
          <h2>Data Retention</h2>
          <ul>
            <li>
              <strong>Local data</strong> (reminders, notes, settings, clipboard history, timer
              state) is retained on your device until you clear it or uninstall the extension.
            </li>
            <li>
              <strong>Authentication tokens</strong> are retained locally until you log out or they
              expire.
            </li>
            <li>
              <strong>Google Calendar tokens</strong> are retained locally until you disconnect
              Google Calendar or uninstall the extension.
            </li>
            <li>
              No user data is retained on our servers beyond what is necessary for account
              authentication.
            </li>
          </ul>

          {/* Data Security */}
          <h2>Data Security</h2>
          <p>
            We implement reasonable technical and organizational safeguards to protect information:
          </p>
          <ul>
            <li>
              Authentication tokens are stored in Chrome&rsquo;s local storage, isolated
              per-extension by the browser.
            </li>
            <li>API communication uses HTTPS encryption.</li>
            <li>Google Calendar access uses OAuth 2.0 with minimal read-only scopes.</li>
            <li>
              The extension never requests or stores passwords, credit card numbers, or government
              identification.
            </li>
          </ul>

          {/* Third-Party Services */}
          <h2>Third-Party Services</h2>
          <p>The extension interacts with the following third-party services:</p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Purpose</th>
                  <th>Data Sent</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Extino API</td>
                  <td>Authentication and subscription management</td>
                  <td>Auth token, email (for checkout)</td>
                </tr>
                <tr>
                  <td>Google Calendar API</td>
                  <td>Read-only calendar and event sync</td>
                  <td>OAuth token</td>
                </tr>
                <tr>
                  <td>Stripe (via Extino)</td>
                  <td>Payment processing</td>
                  <td>Handled by Extino/Stripe, not the extension</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            These services operate under their own privacy policies. Users are encouraged to review
            them separately.
          </p>

          {/* Permissions */}
          <h2>Permissions Explained</h2>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Permission</th>
                  <th>Why It Is Needed</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>sidePanel</code></td>
                  <td>Displays the productivity dashboard in the browser side panel</td>
                </tr>
                <tr>
                  <td><code>alarms</code></td>
                  <td>Schedules reminders, timer phases, calendar alerts, and eye care breaks</td>
                </tr>
                <tr>
                  <td><code>storage</code></td>
                  <td>Stores all user data locally (settings, reminders, notes, timer state)</td>
                </tr>
                <tr>
                  <td><code>tabs</code></td>
                  <td>Displays in-page notifications on the active tab and opens external links</td>
                </tr>
                <tr>
                  <td><code>scripting</code></td>
                  <td>Injects the lock-screen overlay and runs scroll scripts for screen capture</td>
                </tr>
                <tr>
                  <td><code>identity</code></td>
                  <td>Google Calendar OAuth and Extino authentication flows</td>
                </tr>
                <tr>
                  <td><code>contextMenus</code></td>
                  <td>Adds a &quot;Lock Browser&quot; right-click menu item</td>
                </tr>
                <tr>
                  <td><code>offscreen</code></td>
                  <td>Plays notification sounds (required in Manifest V3)</td>
                </tr>
                <tr>
                  <td><code>bookmarks</code></td>
                  <td>Provides the integrated bookmark manager</td>
                </tr>
                <tr>
                  <td><code>desktopCapture</code></td>
                  <td>Lets users select and capture a tab for screen recording</td>
                </tr>
                <tr>
                  <td><code>tabCapture</code></td>
                  <td>Obtains the media stream from the user-selected tab</td>
                </tr>
                <tr>
                  <td><code>activeTab</code></td>
                  <td>Accesses the focused tab for in-page overlays</td>
                </tr>
                <tr>
                  <td><code>&lt;all_urls&gt;</code></td>
                  <td>
                    Injects content scripts for reminders, ad blocking, tracker blocking, and
                    privacy blur
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* User Controls */}
          <h2>User Controls and Choices</h2>
          <p>You can:</p>
          <ul>
            <li>
              Control all extension permissions via <code>chrome://extensions</code>
            </li>
            <li>
              Enable or disable individual features (ad blocker, tracker blocker, eye care, etc.) at
              any time
            </li>
            <li>Disconnect Google Calendar to remove all calendar data</li>
            <li>Log out of your Extino account to clear authentication data</li>
            <li>
              Uninstall the extension to stop all data processing and remove all locally stored data
              immediately
            </li>
          </ul>

          {/* Children's Privacy */}
          <h2>Children&rsquo;s Privacy</h2>
          <p>
            The extension is not intended for use by children under the age of 13. We do not
            knowingly collect personal information from children.
          </p>

          {/* Changes */}
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be reflected on this
            page, and the &quot;Effective Date&quot; will be updated accordingly. Continued use of
            the extension constitutes acceptance of the updated policy.
          </p>

          {/* Contact */}
          <h2>Contact Information</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <p>
            <strong>Email:</strong>{' '}
            <a href="mailto:extinoltd@gmail.com">extinoltd@gmail.com</a>
          </p>
        </div>
      </section>
    </>
  );
}
