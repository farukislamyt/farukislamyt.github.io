'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  scrambleOnView?: boolean;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

export default function TextScramble({ text, className = '', as: Tag = 'h2', scrambleOnView = true }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [hasScrambled, setHasScrambled] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const scramble = useCallback(() => {
    setHasScrambled(true);
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split('').map((char, i) => {
        if (char === ' ') return ' ';
        if (i < iteration) return text[i];
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join(''));
      iteration += 1 / 3;
      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 30);
  }, [text]);

  useEffect(() => {
    if (!scrambleOnView || hasScrambled) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        scramble();
        observer.unobserve(el);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [scrambleOnView, hasScrambled, scramble]);

  return <Tag ref={ref as any} className={className}>{displayText}</Tag>;
}
