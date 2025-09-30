# Stripe Payment Integration Setup

This guide will help you set up Stripe payment integration for the Flash Sale application.

## Prerequisites

- A Stripe account (create one at [stripe.com](https://stripe.com))
- Node.js and npm installed
- Access to the project codebase

## Step 1: Get Your Stripe API Keys

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers** → **API keys**
3. Copy your **Publishable key** and **Secret key**
   - For testing, use the **Test mode** keys (they start with `pk_test_` and `sk_test_`)
   - For production, use **Live mode** keys (they start with `pk_live_` and `sk_live_`)

## Step 2: Set Up Environment Variables

1. Create a `.env.local` file in the project root (copy from `.env.local.example`):

```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` and add your Stripe keys:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

⚠️ **IMPORTANT**: Never commit `.env.local` to version control. It's already in `.gitignore`.

## Step 3: Install Dependencies

The Stripe dependencies are already installed via:

```bash
npm install stripe @stripe/stripe-js
```

If you need to reinstall:

```bash
npm install
```

## Step 4: Test the Integration

### Local Testing

1. Start the development server:

```bash
npm run dev
```

2. Navigate to `http://localhost:3000`
3. Add items to cart and proceed to checkout
4. Fill in the checkout form with your info
5. Click "Pay" - you'll be redirected to Stripe Checkout
6. Use Stripe test card numbers:
   - **Success**: `4242 4242 4242 4242`
   - **Declined**: `4000 0000 0000 0002`
   - **3D Secure**: `4000 0025 0000 3155`
   - Use any future expiry date (e.g., 12/34)
   - Use any 3-digit CVC (e.g., 123)
   - Use any billing ZIP code

7. After successful payment, you'll be redirected to `/success` page

### View Test Payments

- Go to [Stripe Dashboard](https://dashboard.stripe.com/test/payments) to see your test payments

## Step 5: Deploy to Vercel

### Configure Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_test_your_key (or pk_live_ for production)
STRIPE_SECRET_KEY = sk_test_your_key (or sk_live_ for production)
```

4. Set the environment to **Production**, **Preview**, and **Development** as needed
5. Redeploy your application

### Switch to Live Mode (Production)

1. In Stripe Dashboard, toggle from **Test mode** to **Live mode**
2. Copy your **Live** API keys
3. Update Vercel environment variables with live keys
4. Redeploy the application

⚠️ **Before going live**:
- Test thoroughly in test mode
- Set up proper error handling
- Configure webhook endpoints (optional but recommended)
- Review Stripe's [pre-launch checklist](https://stripe.com/docs/checklist)

## Step 6: Configure Webhooks (Optional but Recommended)

Webhooks allow Stripe to notify your application about payment events.

1. In Stripe Dashboard, go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Enter your webhook URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the **Signing secret** (starts with `whsec_`)
6. Add to environment variables:

```env
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## Features Included

✅ Stripe Checkout integration
✅ Dynamic line items from cart
✅ Shipping cost calculation (€4.90, free over €50)
✅ Customer email collection
✅ Billing address collection
✅ Shipping address collection (EU countries)
✅ Success page with order confirmation
✅ Test and production mode support

## Supported Countries

Shipping address collection is enabled for:
- Finland (FI)
- Sweden (SE)
- Norway (NO)
- Denmark (DK)
- Germany (DE)
- France (FR)
- Spain (ES)
- Italy (IT)
- Netherlands (NL)
- Belgium (BE)
- Austria (AT)
- Poland (PL)

## Currency

Currently set to **USD**. To change to EUR:

Edit `app/api/create-checkout-session/route.ts`:

```typescript
currency: 'eur', // Change from 'usd' to 'eur'
```

## Troubleshooting

### "Invalid API Key" Error

- Ensure your `.env.local` file exists and contains valid keys
- Check that keys start with `pk_test_` and `sk_test_` (test mode) or `pk_live_` and `sk_live_` (live mode)
- Restart the development server after adding environment variables

### Payments Not Showing in Dashboard

- Make sure you're checking the correct mode (Test vs Live)
- Verify the webhook is configured correctly
- Check Vercel logs for API errors

### Redirect Not Working

- Ensure `success_url` and `cancel_url` are using the correct domain
- For local testing, use `http://localhost:3000`
- For production, use your actual domain (e.g., `https://yourapp.vercel.app`)

## Security Best Practices

1. ✅ Never expose secret keys client-side
2. ✅ Use environment variables for all sensitive data
3. ✅ Validate webhook signatures in production
4. ✅ Use HTTPS in production
5. ✅ Implement rate limiting for API routes
6. ✅ Log and monitor payment errors

## Support

- **Stripe Documentation**: https://stripe.com/docs
- **Next.js + Stripe Guide**: https://stripe.com/docs/payments/checkout/integration-builder
- **Test Card Numbers**: https://stripe.com/docs/testing

## Additional Resources

- [Stripe Dashboard](https://dashboard.stripe.com)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Stripe Checkout Documentation](https://stripe.com/docs/payments/checkout)
- [Stripe Security](https://stripe.com/docs/security/stripe)