'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Experience', href: '#experience' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const rafId = useRef<number>(0);
  const pendingScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      pendingScrollY.current = window.scrollY;
      if (rafId.current === 0) {
        rafId.current = requestAnimationFrame(() => {
          setIsScrolled(pendingScrollY.current > 50);
          rafId.current = 0;
        });
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );

    window.addEventListener('scroll', handleScroll, { passive: true });

    const timer = setTimeout(() => {
      document.querySelectorAll('section[id]').forEach((section) => {
        observer.observe(section);
      });
    }, 100);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // Body scroll lock when mobile drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      document.body.classList.add('scroll-locked');

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        document.body.classList.remove('scroll-locked');
        window.scrollTo(0, scrollY);
      };
    }
  }, [isMobileOpen]);

  const handleNavClick = useCallback((href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-[9997] transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border'
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 font-bold text-lg min-h-[44px] items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Faruk Islam — Home"
            >
              <Terminal className="h-5 w-5 text-indigo-500" aria-hidden="true" />
              <span>
                faruk<span className="text-indigo-500">.</span>dev
              </span>
            </motion.a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1 xl:gap-2" role="menubar">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  role="menuitem"
                  className={`relative px-3 py-2 min-h-[44px] text-sm font-medium rounded-lg transition-colors 2xl:text-[15px] focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    activeSection === item.href
                      ? 'text-indigo-400'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {activeSection === item.href && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-indigo-500/10 rounded-lg"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <motion.a
                href="mailto:farukislamyt@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:inline-flex items-center px-4 py-2 min-h-[44px] text-sm font-medium rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white btn-ripple focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Hire Me
              </motion.a>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden p-2.5 w-11 h-11 rounded-lg hover:bg-muted transition-colors flex items-center justify-center active:scale-90 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileOpen}
              >
                {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9996] md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-background/95 backdrop-blur-xl border-l border-border"
            >
              <div className="p-6 pt-20 space-y-2">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.href}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(item.href)}
                    className={`block w-full text-left px-4 py-3 min-h-[44px] rounded-xl text-base font-medium transition-colors active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                      activeSection === item.href
                        ? 'text-indigo-400 bg-indigo-500/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.a
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navItems.length * 0.05 }}
                  href="mailto:farukislamyt@gmail.com"
                  className="block w-full text-center mt-4 px-4 py-3 min-h-[44px] rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Hire Me
                </motion.a>

                {/* Swipe hint */}
                <div className="pt-6 text-center" aria-hidden="true">
                  <p className="text-xs text-muted-foreground/50">
                    ← Swipe or tap outside to close
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
