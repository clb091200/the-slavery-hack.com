import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>The Slavery Hack</h1>
      <p>Welcome! Purchase our educational PDF or bundle with The Walking Papers app.</p>
      <Link href="/store">Go to Store</Link>
    </main>
  );
}
