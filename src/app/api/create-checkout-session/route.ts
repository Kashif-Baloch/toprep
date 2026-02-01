import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { email, plan } = await req.json();

    // Define plan details
    const planDetails = {
      basic: {
        price: 1000, // $10.00 in cents
        name: "Basic Plan",
        description: "Monthly subscription for Basic plan",
      },
      pro: {
        price: 4900, // $49.00 in cents
        name: "Pro Plan",
        description: "One-time payment for 1-on-1 Consultation",
      },
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: planDetails[plan as keyof typeof planDetails].name,
              description:
                planDetails[plan as keyof typeof planDetails].description,
            },
            unit_amount: planDetails[plan as keyof typeof planDetails].price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
      customer_email: email,
      metadata: {
        plan,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error("Error creating checkout session:", err);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 },
    );
  }
}
