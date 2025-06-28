"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import react-markdown (for SSR compatibility)
const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false });

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "de", label: "Deutsch" },
  { code: "ar", label: "العربية" },
  { code: "af", label: "Afrikaans" },
  { code: "am", label: "Amharic" },
  { code: "bg", label: "Български" },
  { code: "cs", label: "Čeština" },
  { code: "da", label: "Dansk" },
  { code: "el", label: "Ελληνικά" },
  { code: "et", label: "Eesti" },
  { code: "fi", label: "Suomi" },
  { code: "hr", label: "Hrvatski" },
  { code: "hu", label: "Magyar" },
  { code: "ig", label: "Igbo" },
  { code: "it", label: "Italiano" },
  { code: "kk", label: "Қазақша" },
  { code: "ku", label: "Kurdî" },
  { code: "lt", label: "Lietuvių" },
  { code: "lv", label: "Latviešu" },
  { code: "mg", label: "Malagasy" },
  { code: "nl", label: "Nederlands" },
  { code: "ny", label: "Nyanja" },
  { code: "pl", label: "Polski" },
  { code: "ps", label: "پښتو" },
  { code: "pt", label: "Português" },
  { code: "ro", label: "Română" },
  { code: "sk", label: "Slovenčina" },
  { code: "sl", label: "Slovenščina" },
  { code: "sn", label: "Shona" },
  { code: "so", label: "Soomaali" },
  { code: "st", label: "Sesotho" },
  { code: "sw", label: "Kiswahili" },
  { code: "tn", label: "Setswana" },
  { code: "tr", label: "Türkçe" },
  { code: "uz", label: "Oʻzbekcha" },
  { code: "wo", label: "Wolof" },
  { code: "xh", label: "isiXhosa" },
  { code: "yo", label: "Yorùbá" },
  { code: "zh", label: "中文" },
];

export default function Page() {
  const [language, setLanguage] = useState("en");
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMarkdown(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const fetchMarkdown = async (lang: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/pdf_content.${lang}.md`);
      if (res.ok) {
        setMarkdown(await res.text());
      } else {
        setMarkdown("Sorry, content is not available in this language.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Error connecting to payment.");
    }
  };

  return (
    <main style={{ maxWidth: 700, margin: "2rem auto", padding: 20 }}>
      <h1>The Slavery Hack</h1>
      <p style={{ fontSize: "1.2rem" }}>Select your language:</p>
      <select
        value={language}
        onChange={e => setLanguage(e.target.value)}
        style={{
          fontSize: "1.1rem",
          padding: "6px 16px",
          borderRadius: 4,
          marginBottom: 20,
          marginTop: 4,
        }}
      >
        {LANGUAGES.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
      <div
        style={{
          margin: "2rem 0",
          minHeight: 200,
          background: "#f9f9f9",
          borderRadius: 6,
          padding: 16,
          fontSize: "1.1rem",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
        {loading ? <p>Loading…</p> : <ReactMarkdown>{markdown}</ReactMarkdown>}
      </div>
      <button
        onClick={handleCheckout}
        style={{
          fontSize: 18,
          padding: "10px 30px",
          borderRadius: 5,
          background: "#222",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          marginTop: 12,
        }}
      >
        Buy PDF ($5)
      </button>
    </main>
  );
}
