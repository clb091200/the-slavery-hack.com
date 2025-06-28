import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

const PRICE_MAP: Record<string, string> = {
  pdf: "price_1RN01qCEuZYY1FhVi8k1jjXu",           // replace with your Stripe Price ID for PDF
  app: "price_1RN005CEuZYY1FhVcbGDwh3G ",           // replace with your Stripe Price ID for App
  bundle: "price_1RN04RCEuZYY1FhVNPcUIcYu",     // replace with your Stripe Price ID for Bundle
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const { product } = req.body;
  const priceId = PRICE_MAP[product];

  if (!priceId) {
    return res.status(400).json({ error: "Invalid product" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
    });
    return res.status(200).json({ url: session.url });
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
}
