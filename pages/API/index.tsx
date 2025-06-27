import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// Dynamically import react-markdown (for SSR safety)
const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });

// List your supported languages and their display names
const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
  { code: 'de', label: 'Deutsch' },
  { code: 'ar', label: 'العربية' },
  // Add more as needed, matching your markdown files.
];

export default function Home() {
  const [language, setLanguage] = useState('en');
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMarkdown(language);
  }, [language]);

  const fetchMarkdown = async (lang: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/pdf_content.${lang}.md`);
      if (res.ok) {
        setMarkdown(await res.text());
      } else {
        setMarkdown('Sorry, content is not available in this language.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    const res = await fetch('/api/checkout', { method: 'POST' });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert('Error connecting to payment.');
    }
  };

  return (
    <>
      <Head>
        <title>The Slavery Hack</title>
      </Head>
      <main style={{ maxWidth: 700, margin: '2rem auto', padding: 20 }}>
        <h1>The Slavery Hack</h1>
        <p>Select your language:</p>
        <select value={language} onChange={e => setLanguage(e.target.value)}>
          {LANGUAGES.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
        <div style={{
          margin: '2rem 0',
          minHeight: 200,
          background: '#f9f9f9',
          borderRadius: 6,
          padding: 16
        }}>
          {loading ? <p>Loading…</p> : <ReactMarkdown>{markdown}</ReactMarkdown>}
        </div>
        <button
          onClick={handleCheckout}
          style={{
            fontSize: 18,
            padding: '10px 30px',
            borderRadius: 5,
            background: '#222',
            color: '#fff',
            border: 'none',
            cursor: 'pointer'
          }}>
          Buy PDF ($5)
        </button>
      </main>
    </>
  );
}
