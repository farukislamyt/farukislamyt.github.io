'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, FileText, Download, Github, Linkedin, Send } from 'lucide-react';
import MagneticButton from './MagneticButton';
import SplitText from './SplitText';

const roles = [
  'Full Stack Developer',
  'React & Node.js Expert',
  'API Architect',
  'UI/UX Enthusiast',
  'Problem Solver',
  'Open Source Contributor',
];

interface HeroProps {
  onShowCV: () => void;
  lang: 'en' | 'bn';
}

export default function Hero({ onShowCV, lang }: HeroProps) {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const y3 = useTransform(scrollY, [0, 500], [0, 80]);
  const bgOpacity = useTransform(scrollY, [0, 400], [0.6, 0]);
  const grainY = useTransform(scrollY, [0, 1000], [0, -200]);

  const type = useCallback(() => {
    const role = roles[currentRole];
    if (!isDeleting) {
      setDisplayText(role.substring(0, displayText.length + 1));
      if (displayText === role) {
        setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      setDisplayText(role.substring(0, displayText.length - 1));
      if (displayText === '') {
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % roles.length);
      }
    }
  }, [displayText, isDeleting, currentRole]);

  useEffect(() => {
    const speed = isDeleting ? 30 : 60;
    const timer = setTimeout(type, speed);
    return () => clearTimeout(timer);
  }, [type, isDeleting]);

  const stats = [
    { value: '6+', label: 'Years Exp.' },
    { value: '40+', label: 'Projects' },
    { value: '15+', label: 'Clients' },
    { value: '99%', label: 'Satisfaction' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      {/* Gradient mesh background with parallax */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[120px]"
          style={{ y: y1, opacity: bgOpacity }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-violet-500/10 blur-[120px]"
          style={{ y: y2, opacity: bgOpacity }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-500/5 blur-[150px]"
          style={{ y: y3 }}
          aria-hidden="true"
        />

        {/* Morphing blob */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 morph-blob blur-3xl opacity-30"
          style={{ y: y2 }}
          aria-hidden="true"
        />

        {/* Scroll-linked grain/noise overlay */}
        <motion.div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ y: grainY }}
          aria-hidden="true"
        >
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '256px 256px',
          }} />
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-16 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 animate-pulse-glow" />
              </span>
              <span className="text-sm text-muted-foreground">
                Open to opportunities · Dhaka, Bangladesh
              </span>
            </motion.div>

            {/* Name with SplitText */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-bold tracking-tight leading-tight">
                Hi, I&apos;m{' '}
                <span className="text-gradient">
                  <SplitText text="Faruk" delay={0.3} />
                </span>{' '}
                <em className="text-gradient not-italic font-bold">
                  <SplitText text="Islam" delay={0.6} />
                </em>
              </h1>
            </motion.div>

            {/* Typing effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 text-xl sm:text-2xl"
              aria-label="Current role: Full Stack Developer"
            >
              <span className="text-muted-foreground">{`<`}</span>
              <span className="text-indigo-400 font-mono">{displayText}</span>
              <span className="animate-pulse text-indigo-400">|</span>
              <span className="text-muted-foreground">{`/>`}</span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              {lang === 'en'
                ? "I craft end-to-end digital products — from scalable backend architectures to pixel-perfect interfaces. 6+ years turning ambitious ideas into products people love."
                : 'আমি স্কেলযোগ্য ব্যাকএন্ড থেকে পিক্সেল-পারফেক্ট ইন্টারফেস পর্যন্ত সম্পূর্ণ ডিজিটাল পণ্য তৈরি করি। ৬+ বছরে উচ্চাভিলাষী ধারণাকে পণ্যে রূপ দিচ্ছি।'}
            </motion.p>

            {/* Buttons with MagneticButton */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton>
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium shadow-lg shadow-indigo-500/25 btn-ripple min-h-[44px]"
                >
                  View My Work
                  <ArrowRight className="h-4 w-4" />
                </motion.a>
              </MagneticButton>

              <MagneticButton>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onShowCV}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card font-medium hover:border-indigo-500/30 min-h-[44px]"
                >
                  <FileText className="h-4 w-4" />
                  View CV
                </motion.button>
              </MagneticButton>

              <MagneticButton>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-muted-foreground font-medium hover:text-foreground transition-colors min-h-[44px]"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </motion.a>
              </MagneticButton>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-4 pt-4"
            >
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Connect</span>
              {[
                { icon: Github, href: 'https://github.com/farukislamyt', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/farukislamyt', label: 'LinkedIn' },
                { icon: Send, href: 'https://t.me/farukislam', label: 'Telegram' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 w-11 h-11 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-indigo-400 transition-colors flex items-center justify-center"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Profile card with animated rings */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 xl:w-[450px] xl:h-[450px]">
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full border border-indigo-500/20 animate-ring-rotate" aria-hidden="true" />
              <div className="absolute inset-4 rounded-full border border-violet-500/15 animate-ring-rotate-reverse" aria-hidden="true" />
              <div className="absolute inset-8 rounded-full border border-purple-500/10 animate-ring-rotate" style={{ animationDuration: '25s' }} aria-hidden="true" />

              {/* Gradient glow behind */}
              <div className="absolute inset-12 rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-600/20 blur-xl" aria-hidden="true" />

              {/* Profile card */}
              <div className="absolute inset-12 rounded-full glass-card flex items-center justify-center overflow-hidden">
                <div className="text-center space-y-2">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-3xl sm:text-4xl font-bold text-white shadow-lg shadow-indigo-500/30">
                    FI
                  </div>
                  <div>
                    <p className="text-lg font-bold">Faruk Islam</p>
                    <p className="text-xs text-muted-foreground">Full Stack Developer</p>
                  </div>
                </div>
              </div>

              {/* Orbiting dots */}
              <div className="absolute inset-0 animate-ring-rotate" aria-hidden="true">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50" />
              </div>
              <div className="absolute inset-4 animate-ring-rotate-reverse" aria-hidden="true">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-violet-500 shadow-lg shadow-violet-500/50" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <div className="text-3xl font-bold text-gradient">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
