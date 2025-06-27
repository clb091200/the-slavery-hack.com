export default function CancelPage() {
  return (
    <main style={{ maxWidth: 700, margin: "2rem auto", padding: 20, textAlign: "center" }}>
      <h1>Payment Canceled</h1>
      <p>Your payment was not completed.</p>
      <p>
        If you wish to try again, please return to the home page and restart the checkout process.
      </p>
      <a href="/" style={{ color: "#222", textDecoration: "underline", fontWeight: "bold" }}>
        Return to home
      </a>
    </main>
  );
}
