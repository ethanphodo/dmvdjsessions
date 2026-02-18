import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black pt-28 pb-20">
      <SEO
        title="Privacy Policy | DMV DJ Sessions"
        description="Privacy Policy for DMV DJ Sessions. Learn how we collect, use, and protect your personal information."
        keywords="privacy policy, data protection, GDPR, cookies, DMV DJ Sessions"
      />

      <div className="container-narrow px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs tracking-widest text-gray-500 uppercase mb-4">Legal</p>
          <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-500">
            Last updated: February 17, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-gray max-w-none space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">1. Introduction</h2>
            <p className="text-gray-400 leading-relaxed">
              DMV DJ Sessions ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website dmvdjsessions.com (the "Site").
            </p>
            <p className="text-gray-400 leading-relaxed mt-4">
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the Site.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">2. Information We Collect</h2>

            <h3 className="text-lg font-medium text-white mb-2">Personal Data</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li>Submit a DJ application or partnership inquiry</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact us via email</li>
              <li>Interact with our social media accounts</li>
            </ul>
            <p className="text-gray-400 leading-relaxed mt-4">
              This information may include your name, email address, social media handles, music samples/links, and any other information you choose to provide.
            </p>

            <h3 className="text-lg font-medium text-white mb-2 mt-6">Automatically Collected Data</h3>
            <p className="text-gray-400 leading-relaxed">
              When you visit our Site, we may automatically collect certain information, including:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4 mt-2">
              <li>Device and browser information</li>
              <li>IP address (anonymized)</li>
              <li>Pages visited and time spent</li>
              <li>Referring website</li>
              <li>General geographic location (country/region level)</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li>To review and respond to DJ applications and partnership inquiries</li>
              <li>To send newsletters and updates about events and sessions (with your consent)</li>
              <li>To improve our website and user experience</li>
              <li>To analyze site traffic and usage patterns</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">4. Cookies and Tracking Technologies</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to collect and track information about your browsing activity. You can manage your cookie preferences through our cookie consent banner.
            </p>

            <h3 className="text-lg font-medium text-white mb-2">Types of Cookies We Use</h3>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li><strong>Essential Cookies:</strong> Necessary for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our Site (requires consent)</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            </ul>

            <h3 className="text-lg font-medium text-white mb-2 mt-6">Third-Party Analytics</h3>
            <p className="text-gray-400 leading-relaxed">
              With your consent, we may use privacy-focused analytics services to understand Site usage. These services collect anonymized data and do not track you across other websites.
            </p>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">5. Data Sharing and Disclosure</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li><strong>Service Providers:</strong> With trusted third-party services that assist in operating our Site (e.g., email services, hosting)</li>
              <li><strong>Legal Requirements:</strong> If required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>With Your Consent:</strong> For any other purpose with your explicit consent</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">6. Data Retention</h2>
            <p className="text-gray-400 leading-relaxed">
              We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, or as required by law. DJ applications are retained for up to 2 years. Newsletter subscriptions are retained until you unsubscribe. Analytics data is anonymized and aggregated.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">7. Your Rights</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li><strong>Access:</strong> Request a copy of the data we hold about you</li>
              <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
              <li><strong>Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
              <li><strong>Restriction:</strong> Request limitation of processing</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent</li>
            </ul>
            <p className="text-gray-400 leading-relaxed mt-4">
              To exercise these rights, contact us at{' '}
              <a href="mailto:hello@dmvdjsessions.com" className="text-[#D6A756] hover:underline">
                hello@dmvdjsessions.com
              </a>
            </p>
          </section>

          {/* GDPR Compliance */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">8. GDPR Compliance (EU Visitors)</h2>
            <p className="text-gray-400 leading-relaxed">
              If you are located in the European Economic Area (EEA), you have additional rights under the General Data Protection Regulation (GDPR). We process your data based on one or more of the following legal bases: your consent, performance of a contract, compliance with legal obligations, or our legitimate interests.
            </p>
          </section>

          {/* CCPA Compliance */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">9. CCPA Compliance (California Residents)</h2>
            <p className="text-gray-400 leading-relaxed">
              If you are a California resident, you have the right to know what personal information we collect, request deletion of your data, and opt-out of the sale of personal information. We do not sell personal information.
            </p>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">10. Data Security</h2>
            <p className="text-gray-400 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">11. Third-Party Links</h2>
            <p className="text-gray-400 leading-relaxed">
              Our Site may contain links to third-party websites (e.g., YouTube, Instagram, SoundCloud). We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">12. Children's Privacy</h2>
            <p className="text-gray-400 leading-relaxed">
              Our Site is not intended for children under 16 years of age. We do not knowingly collect personal information from children. If you believe we have collected data from a child, please contact us immediately.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">13. Changes to This Policy</h2>
            <p className="text-gray-400 leading-relaxed">
              We may update this privacy policy from time to time. The updated version will be indicated by an updated "Last updated" date. We encourage you to review this policy periodically.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">14. Contact Us</h2>
            <p className="text-gray-400 leading-relaxed">
              If you have questions or concerns about this privacy policy or our data practices, please contact us at:
            </p>
            <div className="mt-4 p-6 bg-white/5 border border-white/10 rounded-lg">
              <p className="text-white font-medium">DMV DJ Sessions</p>
              <p className="text-gray-400 mt-2">
                Email:{' '}
                <a href="mailto:hello@dmvdjsessions.com" className="text-[#D6A756] hover:underline">
                  hello@dmvdjsessions.com
                </a>
              </p>
              <p className="text-gray-400">
                Washington DC, Maryland, Virginia
              </p>
            </div>
          </section>
        </div>

        {/* Back Link */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
