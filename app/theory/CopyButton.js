'use client';

import { useState } from 'react';

export default function CopyButton({ text, label }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch {
      setDone(false);
    }
  };
  return (
    <button type="button" className="btn-ghost" onClick={copy} aria-live="polite">
      {done ? 'COPIED' : label.toUpperCase()}
    </button>
  );
}
