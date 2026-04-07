import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service for OneBuddy — the productivity, wellness, and privacy Chrome extension by Extino Ltd.',
  alternates: { canonical: 'https://onebuddy.io/terms/' },
  openGraph: {
    title: 'Terms of Service | OneBuddy',
    description:
      'Terms of Service for OneBuddy — the productivity, wellness, and privacy Chrome extension by Extino Ltd.',
  },
};

export default function TermsOfServicePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 lg:pt-36 pb-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-500 text-sm">Effective Date: April 7, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate prose-lg max-w-none">
          <h2>1. Introduction</h2>
          <p>
            Welcome to OneBuddy (&quot;the Extension&quot;, &quot;we&quot;, &quot;our&quot;, or
            &quot;us&quot;), a Google Chrome browser extension developed and operated by{' '}
            <strong>Extino Ltd</strong>. These Terms of Service (&quot;Terms&quot;) govern your
            access to and use of the OneBuddy extension and any related services.
          </p>
          <p>
            By installing, accessing, or using OneBuddy, you agree to be bound by these Terms. If
            you do not agree, please uninstall the Extension and discontinue use.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            OneBuddy is a productivity, wellness, and privacy browser extension that provides the
            following tools:
          </p>
          <ul>
            <li>Pomodoro focus timer with guided breathing exercises</li>
            <li>Reminders, notes, habits, and todos</li>
            <li>Google Calendar integration (read-only)</li>
            <li>Clipboard history and bookmark management</li>
            <li>Eye care with blue light filter and 20-20-20 rule automation</li>
            <li>Ad blocker, tracker blocker, and privacy blur</li>
            <li>Screen capture and browser lock screen</li>
            <li>Dashboard and multi-language support</li>
          </ul>
          <p>Features may be added, modified, or removed at our discretion.</p>

          <h2>3. Eligibility</h2>
          <p>
            You must be at least 13 years old to use OneBuddy. By using the Extension, you represent
            that you meet this age requirement and have the legal capacity to enter into these
            Terms.
          </p>
          <p>
            If you are using OneBuddy on behalf of an organization, you represent that you have
            authority to bind that organization to these Terms.
          </p>

          <h2>4. Account and Authentication</h2>
          <p>
            Some features require signing in with an account provided by Extino Ltd or via Google
            OAuth (for Google Calendar integration). You are responsible for:
          </p>
          <ul>
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activity that occurs under your account</li>
            <li>Notifying us immediately of any unauthorized access</li>
          </ul>
          <p>
            We use industry-standard authentication protocols (JWT and OAuth 2.0). Passwords are
            never stored by the Extension.
          </p>

          <h2>5. Subscription and Payments</h2>
          <p>OneBuddy offers a tiered model:</p>
          <ul>
            <li>
              <strong>Core features</strong> are available without a subscription (reminders,
              notes, Google Calendar integration, clipboard history, bookmarks, dashboard).
            </li>
            <li>
              <strong>Additional features</strong> (Pomodoro timer, habit tracker, eye care, ad
              blocker, tracker blocker, privacy blur, screen capture) require an active
              subscription.
            </li>
          </ul>

          <h3>5.1 Billing</h3>
          <p>
            Subscription payments are processed by <strong>Stripe</strong> through{' '}
            <strong>Extino</strong>. By subscribing, you agree to Stripe&rsquo;s and Extino&rsquo;s
            terms and privacy policies. We do not handle or store credit card information directly.
          </p>

          <h3>5.2 Subscription Plans</h3>
          <p>
            Plans may include monthly, yearly, and lifetime options. Prices are displayed in the
            Extension at the time of purchase and may change with notice.
          </p>

          <h3>5.3 Trial Periods</h3>
          <p>
            We may offer a trial period for new users. At the end of the trial, access to paid
            features will require an active subscription unless otherwise stated.
          </p>

          <h3>5.4 Renewals and Cancellations</h3>
          <ul>
            <li>
              Monthly and yearly subscriptions automatically renew unless canceled before the
              renewal date.
            </li>
            <li>
              You can manage or cancel your subscription through the customer portal accessible
              from the Extension&rsquo;s account modal.
            </li>
            <li>Cancellation takes effect at the end of the current billing period.</li>
          </ul>

          <h3>5.5 Refunds</h3>
          <p>
            Refund requests are evaluated on a case-by-case basis. Contact{' '}
            <a href="mailto:extinoltd@gmail.com">extinoltd@gmail.com</a> with your refund request.
            Lifetime plans are non-refundable after 14 days of purchase.
          </p>

          <h2>6. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use OneBuddy for any unlawful purpose</li>
            <li>
              Attempt to reverse engineer, decompile, or extract source code except as permitted by
              law
            </li>
            <li>Circumvent subscription or authentication mechanisms</li>
            <li>Resell, redistribute, or sublicense the Extension without written permission</li>
            <li>Use the Extension to harass, harm, or violate the rights of others</li>
            <li>Interfere with or disrupt the Extension&rsquo;s servers or networks</li>
            <li>
              Automate or abuse the Extension&rsquo;s access to third-party APIs (such as Google
              Calendar)
            </li>
            <li>
              Use the Extension in a manner that violates the terms of any integrated service
              (Google, Stripe, etc.)
            </li>
          </ul>

          <h2>7. User Content</h2>
          <p>
            Content created or stored within OneBuddy (such as notes, reminders, habits, todos,
            clipboard history, and bookmarks) belongs to you. This content is stored locally on
            your device using Chrome&rsquo;s storage API and is not transmitted to our servers
            unless explicitly required by a feature.
          </p>
          <p>
            You are solely responsible for your content and for backing it up. We are not
            responsible for data loss resulting from browser uninstallation, device failure, or
            Chrome storage clearing.
          </p>

          <h2>8. Third-Party Services</h2>
          <p>OneBuddy integrates with the following third-party services:</p>
          <ul>
            <li>
              <strong>Google Calendar API</strong> — Read-only calendar and event sync. Governed by
              Google&rsquo;s Terms of Service and Privacy Policy.
            </li>
            <li>
              <strong>Extino Authentication and Subscription Platform</strong> — Account management
              and payment processing.
            </li>
            <li>
              <strong>Stripe</strong> — Payment processing for subscriptions. Governed by
              Stripe&rsquo;s Terms of Service.
            </li>
          </ul>
          <p>
            We are not responsible for the availability, accuracy, or conduct of these third-party
            services. Use of these services is subject to their respective terms.
          </p>

          <h2>9. Intellectual Property</h2>
          <p>
            All intellectual property rights in the Extension, including but not limited to code,
            design, graphics, branding, and documentation, are owned by Extino Ltd or its
            licensors. You are granted a limited, non-exclusive, non-transferable, revocable
            license to use the Extension for personal or internal business use.
          </p>
          <p>
            The OneBuddy name, logo, and related marks are trademarks of Extino Ltd. You may not
            use these without prior written permission.
          </p>

          <h2>10. Privacy</h2>
          <p>
            Your use of OneBuddy is also governed by our{' '}
            <a href="/privacy/">Privacy Policy</a>, which explains how we collect, use, and protect
            your information. By using the Extension, you consent to our data practices as
            described in the Privacy Policy.
          </p>

          <h2>11. Modifications to the Service</h2>
          <p>
            We reserve the right to modify, suspend, or discontinue any part of OneBuddy at any
            time, with or without notice. We are not liable for any modification, suspension, or
            discontinuation of the Extension or any feature.
          </p>

          <h2>12. Modifications to These Terms</h2>
          <p>
            We may update these Terms from time to time. When we do, we will update the
            &quot;Effective Date&quot; at the top of this document. Material changes will be
            announced through the Extension or via email where possible. Continued use of OneBuddy
            after changes take effect constitutes acceptance of the revised Terms.
          </p>

          <h2>13. Disclaimer of Warranties</h2>
          <p>
            OneBuddy is provided <strong>&quot;AS IS&quot;</strong> and{' '}
            <strong>&quot;AS AVAILABLE&quot;</strong> without warranties of any kind, express or
            implied, including but not limited to warranties of merchantability, fitness for a
            particular purpose, non-infringement, or availability.
          </p>
          <p>We do not warrant that:</p>
          <ul>
            <li>The Extension will be uninterrupted, error-free, or secure</li>
            <li>Defects will be corrected</li>
            <li>The Extension will meet your specific requirements</li>
            <li>Any data will be preserved or accessible at all times</li>
          </ul>

          <h2>14. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Extino Ltd and its affiliates, officers,
            employees, and agents shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages, including but not limited to loss of data, loss of
            profits, or business interruption, arising out of or related to your use of OneBuddy.
          </p>
          <p>
            Our total liability for any claim arising out of these Terms or your use of the
            Extension shall not exceed the amount you paid us in the 12 months preceding the claim,
            or USD $50, whichever is greater.
          </p>

          <h2>15. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Extino Ltd, its affiliates, officers,
            employees, and agents from any claims, damages, losses, liabilities, and expenses
            (including reasonable attorneys&rsquo; fees) arising from your use of OneBuddy or
            violation of these Terms.
          </p>

          <h2>16. Termination</h2>
          <p>
            We may suspend or terminate your access to OneBuddy at any time, with or without cause,
            with or without notice. Upon termination:
          </p>
          <ul>
            <li>Your right to use the Extension ceases immediately</li>
            <li>
              Any active paid subscription will continue through the end of the current billing
              period (no refunds)
            </li>
            <li>
              Sections that by their nature should survive termination will survive (including
              intellectual property, disclaimers, limitation of liability, and indemnification)
            </li>
          </ul>
          <p>
            You may terminate your use of OneBuddy at any time by uninstalling the Extension.
          </p>

          <h2>17. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of the
            jurisdiction in which Extino Ltd is incorporated, without regard to conflict of law
            principles. Any disputes arising under these Terms shall be resolved in the courts of
            that jurisdiction.
          </p>

          <h2>18. Severability</h2>
          <p>
            If any provision of these Terms is found to be unenforceable or invalid, that provision
            will be limited or eliminated to the minimum extent necessary, and the remaining
            provisions will remain in full force and effect.
          </p>

          <h2>19. Entire Agreement</h2>
          <p>
            These Terms, together with the Privacy Policy, constitute the entire agreement between
            you and Extino Ltd regarding your use of OneBuddy and supersede any prior agreements.
          </p>

          <h2>20. Contact</h2>
          <p>If you have questions about these Terms, please contact us at:</p>
          <p>
            <strong>Extino Ltd</strong>
            <br />
            Email: <a href="mailto:extinoltd@gmail.com">extinoltd@gmail.com</a>
          </p>
        </div>
      </section>
    </>
  );
}
