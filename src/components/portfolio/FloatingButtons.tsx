'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, MessageCircle } from 'lucide-react';

export default function FloatingButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const rafId = useRef<number>(0);
  const pendingScrollY = useRef(0);

  const updateScroll = useCallback(() => {
    setShowBackToTop(pendingScrollY.current > 500);
    rafId.current = 0;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      pendingScrollY.current = window.scrollY;
      if (rafId.current === 0) {
        rafId.current = requestAnimationFrame(updateScroll);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateScroll]);

  return (
    <>
      {/* Back to top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-[9995] p-3 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25 btn-ripple min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp floating button */}
      <motion.a
        href="https://wa.me/8801XXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 left-6 z-[9995] p-3 rounded-full bg-green-500 text-white shadow-lg shadow-green-500/25 min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
      </motion.a>
    </>
  );
}
