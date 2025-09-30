import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">
      <header className="bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="text-white hover:text-purple-300 transition-colors">
            ← Back to Store
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 text-white">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
            Terms &amp; Conditions
          </h1>

          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">1. General Terms</h2>
              <p>
                These terms and conditions apply to all purchases made from Flash Sale Oy (Business ID: 1234567-8).
                By placing an order, you agree to these terms in their entirety.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">2. Prices and Payment</h2>
              <p className="mb-2">
                All prices are displayed in USD and include Finnish VAT (24%). We accept the following payment methods:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Credit and debit cards (Visa, Mastercard)</li>
                <li>Bank transfer</li>
                <li>Mobile Pay</li>
              </ul>
              <p className="mt-2">
                Payment is processed securely through our payment service provider. We do not store your payment card details.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">3. Delivery</h2>
              <p className="mb-2">Shipping costs:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Finland: €4.90 (Free for orders over €50)</li>
                <li>EU countries: €9.90</li>
              </ul>
              <p className="mt-2">
                Estimated delivery time is 3-7 business days within Finland and 7-14 business days for EU countries.
                You will receive a tracking number once your order has been shipped.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">4. Right of Withdrawal (14-Day Return Policy)</h2>
              <p className="mb-2">
                According to Finnish Consumer Protection Act, you have the right to cancel your purchase within 14 days
                without giving any reason. The withdrawal period expires 14 days after the day on which you receive the goods.
              </p>
              <p className="mb-2">
                To exercise your right of withdrawal, you must inform us of your decision by a clear statement.
                You can contact us at:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Email: returns@flashsale.fi</li>
                <li>Phone: +358 9 1234 5678</li>
                <li>Mail: Flash Sale Oy, Mannerheimintie 1, 00100 Helsinki</li>
              </ul>
              <p className="mt-2">
                You must return the goods within 14 days from the day you notify us of the cancellation.
                The goods must be returned in their original condition and packaging.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">5. Warranty</h2>
              <p>
                All products come with a standard manufacturer&apos;s warranty. The warranty period and terms vary by product.
                Detailed warranty information is provided with each product. Consumer rights under Finnish law remain unaffected.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">6. Limitation of Liability</h2>
              <p>
                We are not liable for any indirect, special, or consequential damages arising from the use of our products
                or services, except where prohibited by applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">7. Dispute Resolution</h2>
              <p className="mb-2">
                These terms are governed by Finnish law. Any disputes will be resolved in accordance with Finnish legislation.
                Consumers may also contact the Consumer Disputes Board (kuluttajariita) for dispute resolution.
              </p>
              <p>
                Consumer Advisory Services: <a href="https://www.kkv.fi" className="text-purple-400 hover:text-purple-300">www.kkv.fi</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">8. Contact Information</h2>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="font-semibold">Flash Sale Oy</p>
                <p>Mannerheimintie 1</p>
                <p>00100 Helsinki, Finland</p>
                <p>Business ID: 1234567-8</p>
                <p>VAT: FI12345678</p>
                <p className="mt-2">Email: info@flashsale.fi</p>
                <p>Phone: +358 9 1234 5678</p>
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