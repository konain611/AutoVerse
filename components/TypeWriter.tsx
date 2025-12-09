'use client';
import { useState, useEffect } from 'react';

export default function TypeWriter({ text, speed = 40 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className="bg-clip-text text-transparent bg-linear-to-b from-white to-purple-300">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}
