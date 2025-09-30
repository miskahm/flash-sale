import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-08-27.basil',
    timeout: 10000,
    maxNetworkRetries: 3,
  });
};

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    const { items, shipping } = await req.json() as {
      items: CartItem[];
      shipping: number;
    };

    // Calculate total amount
    const itemsTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = itemsTotal + shipping;
    const amountInCents = Math.round(total * 100);

    const stripe = getStripe();

    // Create Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        items: JSON.stringify(items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        }))),
        shipping: shipping.toString(),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (err) {
    const error = err as Error;
    console.error('Payment Intent error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}