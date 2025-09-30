export default function ReturnsPage() {
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
            Returns &amp; Cancellation Policy
          </h1>

          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">14-Day Right of Withdrawal</h2>
              <p className="mb-2">
                As a consumer purchasing from Flash Sale Oy, you have the right to cancel your purchase
                within 14 days without giving any reason. This right is guaranteed by the Finnish Consumer
                Protection Act (Kuluttajansuojalaki 38/1978).
              </p>
              <p>
                The withdrawal period expires 14 days after the day on which you, or a third party other than
                the carrier indicated by you, acquires physical possession of the goods.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">How to Exercise Your Right of Withdrawal</h2>
              <p className="mb-3">
                To exercise your right of withdrawal, you must inform us of your decision by a clear statement.
                You can do this by:
              </p>

              <div className="bg-gray-800 rounded-lg p-4 space-y-2">
                <p className="font-semibold">Contact Methods:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Email: returns@flashsale.fi</li>
                  <li>Phone: +358 9 1234 5678 (Mon-Fri 9:00-17:00 EET)</li>
                  <li>Mail: Flash Sale Oy, Mannerheimintie 1, 00100 Helsinki, Finland</li>
                </ul>
              </div>

              <p className="mt-3">
                Please include your order number, name, and address in your cancellation notice.
                You may use the cancellation form below, but it is not mandatory.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Returning the Products</h2>
              <p className="mb-2">
                If you cancel your order, you must return the goods to us without undue delay and in any
                event not later than 14 days from the day you notify us of the cancellation.
              </p>

              <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4 my-4">
                <p className="font-semibold text-purple-300 mb-2">Return Address:</p>
                <p>Flash Sale Oy - Returns Department</p>
                <p>Mannerheimintie 1</p>
                <p>00100 Helsinki, Finland</p>
              </div>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Return Conditions:</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Products must be in their original condition and packaging</li>
                <li>Products must be unused and undamaged</li>
                <li>All original accessories, manuals, and packaging must be included</li>
                <li>The product must not show signs of use or installation</li>
              </ul>

              <p className="mt-3 text-yellow-400">
                ⚠️ We cannot accept returns of products that have been unsealed if they are hygiene-sensitive
                or if unsealing affects the product&apos;s functionality (e.g., software licenses, sealed electronics).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Return Shipping Costs</h2>
              <p className="mb-2">
                You will bear the direct cost of returning the goods unless:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>The product is defective or damaged upon arrival</li>
                <li>We sent you the wrong product</li>
                <li>The product does not match the description</li>
              </ul>
              <p className="mt-2">
                In these cases, we will provide a prepaid return label and reimburse your return shipping costs.
              </p>
              <p className="mt-2">
                For standard returns, we recommend using a trackable shipping method. We are not responsible
                for items lost in transit during return shipping.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Refunds</h2>
              <p className="mb-2">
                We will reimburse all payments received from you, including the original delivery costs
                (except for any extra costs resulting from your choice of a delivery method other than
                the standard delivery we offer).
              </p>
              <p className="mb-2">
                Refunds will be processed within 14 days from the day we receive the returned goods or
                proof that you have sent back the goods, whichever is earlier.
              </p>
              <p>
                We will use the same payment method you used for the original transaction unless you
                expressly agree otherwise. You will not incur any fees as a result of the refund.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Damaged or Defective Products</h2>
              <p className="mb-2">
                If you receive a damaged or defective product:
              </p>
              <ol className="list-decimal list-inside ml-4 space-y-2">
                <li>Contact us immediately at returns@flashsale.fi with photos of the damage</li>
                <li>Do not discard the original packaging</li>
                <li>We will arrange a free return pickup or provide a prepaid shipping label</li>
                <li>We will send you a replacement or issue a full refund, including shipping costs</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Warranty Claims</h2>
              <p className="mb-2">
                All products are covered by the manufacturer&apos;s warranty. Warranty periods vary by product
                and are stated in the product documentation.
              </p>
              <p>
                For warranty claims, please contact our customer service with:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                <li>Order number and purchase date</li>
                <li>Description of the defect</li>
                <li>Photos or video of the issue (if applicable)</li>
              </ul>
              <p className="mt-2">
                Consumer rights under Finnish law remain unaffected by the manufacturer&apos;s warranty.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Cancellation Form (Optional)</h2>
              <div className="bg-gray-800 rounded-lg p-6">
                <p className="mb-4 italic">
                  To: Flash Sale Oy, Mannerheimintie 1, 00100 Helsinki, Finland<br />
                  Email: returns@flashsale.fi
                </p>
                <p className="mb-2">I hereby give notice that I cancel my contract for the following goods:</p>
                <ul className="list-disc list-inside ml-4 space-y-1 my-3">
                  <li>Order number: _________________</li>
                  <li>Ordered on: _________________</li>
                  <li>Received on: _________________</li>
                  <li>Customer name: _________________</li>
                  <li>Customer address: _________________</li>
                  <li>Date: _________________</li>
                </ul>
                <p className="text-sm text-gray-400 mt-4">
                  Copy this form and send it to us via email or mail if you wish to use it.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Exceptions to Right of Withdrawal</h2>
              <p className="mb-2">
                The right of withdrawal does not apply to:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Products that have been unsealed and cannot be returned for hygiene reasons</li>
                <li>Digital content that has been downloaded or accessed</li>
                <li>Personalized or custom-made products</li>
                <li>Products sealed for health protection or hygiene purposes that have been unsealed</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Contact Customer Service</h2>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="font-semibold mb-2">Flash Sale Oy Customer Service</p>
                <p>Email: returns@flashsale.fi</p>
                <p>Phone: +358 9 1234 5678</p>
                <p>Opening hours: Mon-Fri 9:00-17:00 EET</p>
                <p className="mt-2 text-sm text-gray-400">
                  We typically respond to return requests within 1-2 business days.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Dispute Resolution</h2>
              <p className="mb-2">
                If you have a complaint that we cannot resolve, you can contact:
              </p>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="font-semibold">Consumer Disputes Board</p>
                <p>Website: <a href="https://www.kuluttajariita.fi" className="text-purple-400 hover:text-purple-300">www.kuluttajariita.fi</a></p>
                <p className="mt-2 font-semibold">Consumer Advisory Services</p>
                <p>Website: <a href="https://www.kkv.fi" className="text-purple-400 hover:text-purple-300">www.kkv.fi</a></p>
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