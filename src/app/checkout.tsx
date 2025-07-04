// pages/checkout.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function CheckoutPage() {
  const router = useRouter();
  const { product } = router.query;

  useEffect(() => {
    if (!product) return;

    const createCheckoutSession = async () => {
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product }),
        });

        const data = await res.json();

        if (data.url) {
          window.location.href = data.url;
        } else {
          alert("Stripe checkout session creation failed.");
        }
      } catch (error) {
        console.error("Stripe checkout error:", error);
        alert("Something went wrong. Please try again.");
      }
    };

    createCheckoutSession();
  }, [product]);

  return (
    <main style={{ textAlign: "center", marginTop: "4rem" }}>
      <h2>Redirecting to Stripe checkout...</h2>
      <p>Please wait a moment.</p>
    </main>
  );
}
