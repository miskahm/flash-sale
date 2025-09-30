export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">
      <header className="bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <a href="/" className="text-white hover:text-purple-300 transition-colors">
            ← Back to Store
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 text-white">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
            Privacy Policy
          </h1>

          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">1. Data Controller</h2>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="font-semibold">Flash Sale Oy</p>
                <p>Mannerheimintie 1</p>
                <p>00100 Helsinki, Finland</p>
                <p>Business ID: 1234567-8</p>
                <p className="mt-2">Email: privacy@flashsale.fi</p>
                <p>Phone: +358 9 1234 5678</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">2. Personal Data We Collect</h2>
              <p className="mb-2">We collect and process the following personal data:</p>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Customer Information:</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Name (first and last name)</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Delivery address</li>
                <li>Billing address</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Order Information:</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Order history</li>
                <li>Products purchased</li>
                <li>Payment information (processed by payment provider)</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Technical Data:</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Cookies and similar technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">3. Purpose of Data Processing</h2>
              <p className="mb-2">We process your personal data for the following purposes:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Processing and fulfilling orders</li>
                <li>Customer service and communication</li>
                <li>Payment processing</li>
                <li>Delivery of products</li>
                <li>Handling returns and complaints</li>
                <li>Legal obligations (accounting, consumer protection)</li>
                <li>Marketing (with your consent)</li>
                <li>Improving our services and website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">4. Legal Basis for Processing</h2>
              <p className="mb-2">We process your personal data based on:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Contract:</strong> Processing necessary for fulfilling purchase agreements</li>
                <li><strong>Legal obligation:</strong> Compliance with accounting and consumer protection laws</li>
                <li><strong>Consent:</strong> Marketing communications and optional cookies</li>
                <li><strong>Legitimate interest:</strong> Fraud prevention and service improvement</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">5. Data Sharing and Recipients</h2>
              <p className="mb-2">We may share your personal data with:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Payment processors:</strong> For secure payment processing</li>
                <li><strong>Delivery services:</strong> For shipping products</li>
                <li><strong>IT service providers:</strong> For hosting and maintenance</li>
                <li><strong>Authorities:</strong> When required by law</li>
              </ul>
              <p className="mt-2">
                We do not sell your personal data to third parties. All data processors are bound by
                data processing agreements ensuring GDPR compliance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">6. Data Retention</h2>
              <p className="mb-2">We retain your personal data:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Order data:</strong> 6 years (accounting legislation requirement)</li>
                <li><strong>Customer account:</strong> Until account deletion or 3 years of inactivity</li>
                <li><strong>Marketing data:</strong> Until consent is withdrawn</li>
                <li><strong>Technical logs:</strong> 12 months</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">7. Your Rights (GDPR)</h2>
              <p className="mb-2">You have the following rights regarding your personal data:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Right of access:</strong> Request a copy of your personal data</li>
                <li><strong>Right to rectification:</strong> Correct inaccurate information</li>
                <li><strong>Right to erasure:</strong> Request deletion of your data</li>
                <li><strong>Right to restriction:</strong> Limit processing of your data</li>
                <li><strong>Right to data portability:</strong> Receive your data in a structured format</li>
                <li><strong>Right to object:</strong> Object to processing based on legitimate interests</li>
                <li><strong>Right to withdraw consent:</strong> For consent-based processing</li>
              </ul>
              <p className="mt-2">
                To exercise your rights, contact us at privacy@flashsale.fi
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">8. Cookies</h2>
              <p>
                We use cookies and similar technologies to improve user experience, analyze website traffic,
                and for marketing purposes. You can manage cookie preferences through your browser settings.
                Essential cookies necessary for website functionality cannot be disabled.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">9. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal data
                against unauthorized access, loss, or misuse. These include encryption, access controls,
                regular security assessments, and staff training.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">10. International Data Transfers</h2>
              <p>
                Your personal data is primarily processed within the EU/EEA. If data is transferred outside
                the EU/EEA, we ensure adequate protection through standard contractual clauses or other
                approved mechanisms under GDPR.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">11. Changes to Privacy Policy</h2>
              <p>
                We may update this privacy policy from time to time. Changes will be posted on this page
                with an updated revision date. Significant changes will be communicated via email.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">12. Supervisory Authority</h2>
              <p className="mb-2">
                If you believe your data protection rights have been violated, you have the right to lodge
                a complaint with the Finnish Data Protection Ombudsman:
              </p>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="font-semibold">Office of the Data Protection Ombudsman</p>
                <p>Website: <a href="https://tietosuoja.fi" className="text-purple-400 hover:text-purple-300">www.tietosuoja.fi</a></p>
                <p>Email: tietosuoja@om.fi</p>
              </div>
            </section>

            <p className="text-sm text-gray-400 mt-8">
              Last updated: {new Date().toLocaleDateString('en-FI')}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}