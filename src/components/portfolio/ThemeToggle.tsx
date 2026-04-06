'use client';

import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useHydrated();
  if (!mounted) return null;

  const themes = [
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'light', icon: Sun, label: 'Light' },
  ] as const;

  return (
    <div className="flex items-center gap-1 glass-card rounded-full p-1">
      {themes.map(({ value, icon: Icon, label }) => (
        <motion.button
          key={value}
          onClick={() => setTheme(value)}
          className={`relative rounded-full p-2 transition-colors ${
            theme === value ? 'text-white' : 'text-muted-foreground hover:text-foreground'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Switch to ${label} theme`}
        >
          {theme === value && (
            <motion.div
              layoutId="theme-bg"
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <Icon className="relative z-10 h-4 w-4" />
        </motion.button>
      ))}
    </div>
  );
}
