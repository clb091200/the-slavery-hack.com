export default function SuccessPage() {
  return (
    <main style={{ maxWidth: 700, margin: "2rem auto", padding: 20, textAlign: "center" }}>
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      <p>
        Your payment has been processed. Please check your email for the PDF and further instructions.
      </p>
      <a href="/" style={{ color: "#222", textDecoration: "underline", fontWeight: "bold" }}>
        Return to home
      </a>
    </main>
  );
}
