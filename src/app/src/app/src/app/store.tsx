import React from "react";
import Link from "next/link";

export default function StorePage() {
  return (
    <main>
      <h2>Store</h2>
      <ul>
        <li>PDF: $3.00 <Link href="/checkout?product=pdf">Buy PDF</Link></li>
        <li>The Walking Papers App: $6.00 <Link href="/checkout?product=app">Buy App</Link></li>
        <li>Bundle (PDF + App): $7.50 <Link href="/checkout?product=bundle">Buy Bundle</Link></li>
      </ul>
    </main>
  );
}
