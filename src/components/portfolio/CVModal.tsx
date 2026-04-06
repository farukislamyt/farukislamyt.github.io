'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText } from 'lucide-react';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVModal({ isOpen, onClose }: CVModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }

    if (e.key === 'Tab' && modalRef.current) {
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      // Focus the close button when modal opens
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Curriculum Vitae"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
            className="relative z-10 glass-card rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Close CV modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Curriculum Vitae</h2>
                  <p className="text-sm text-muted-foreground">Faruk Islam — Full Stack Developer</p>
                </div>
              </div>

              <div className="border-t border-border pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Name</p>
                    <p className="font-medium">Faruk Islam</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Title</p>
                    <p className="font-medium">Full Stack Developer</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p className="font-medium">Dhaka, Bangladesh</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Experience</p>
                    <p className="font-medium">6+ Years</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium">farukislamyt@gmail.com</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Education</p>
                    <p className="font-medium">B.Sc. CSE, BUET</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-indigo-400">Summary</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Full Stack Developer with 6+ years of experience building high-performance web applications
                    for startups and global enterprises. Expert in React, Next.js, Node.js, TypeScript, and
                    cloud infrastructure. Led teams of 5+ engineers, delivered 40+ projects, and achieved
                    99% client satisfaction.
                  </p>
                </div>

                <div className="space-y-3 pt-4">
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-indigo-400">Core Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'GraphQL', 'Tailwind CSS', 'Redis', 'Python'].map(skill => (
                      <span key={skill} className="px-3 py-1 text-xs rounded-full border border-border bg-muted/50">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-indigo-400">Experience</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium">Senior Full Stack Developer — TechVentures Ltd.</p>
                      <p className="text-muted-foreground">2022 – Present · Led 5 engineers, 60% faster APIs</p>
                    </div>
                    <div>
                      <p className="font-medium">Full Stack Developer — Startup Studio</p>
                      <p className="text-muted-foreground">2020 – 2022 · Shipped 6+ products</p>
                    </div>
                    <div>
                      <p className="font-medium">Frontend Developer — Digital Agency</p>
                      <p className="text-muted-foreground">2018 – 2020 · 10+ enterprise clients</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-border">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium text-sm flex items-center justify-center gap-2"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '#';
                    link.download = 'Faruk_Islam_CV.pdf';
                  }}
                >
                  <FileText className="h-4 w-4" />
                  Download PDF
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
