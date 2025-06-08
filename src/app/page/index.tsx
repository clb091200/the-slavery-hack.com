import Head from 'next/head';
import { useState } from 'react';
import { LANGUAGES } from '../utils/languages';

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  return (
    <>
      <Head>
        <title>The Slavery Hack App</title>
        <meta name="description" content="Multilingual PDF checkout app" />
      </Head>
      <main>
        <h1>The Slavery Hack App</h1>
        <form>
          <label htmlFor="lang">Select your language:</label>
          <select
            id="lang"
            value={selectedLanguage}
            onChange={e => setSelectedLanguage(e.target.value)}
          >
            {LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.native}
              </option>
            ))}
          </select>
        </form>
        {/* Add checkout and PDF delivery UI below */}
      </main>
    </>
  );
}
