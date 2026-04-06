'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Briefcase, Globe, Languages, GraduationCap, Clock, Sparkles, Zap, Building2, Users } from 'lucide-react';
import TextScramble from './TextScramble';
import StaggerContainer, { StaggerItem } from './StaggerContainer';
import SplitText from './SplitText';

const highlights = [
  { icon: Zap, title: 'Performance First', emoji: '⚡' },
  { icon: Building2, title: 'Clean Architecture', emoji: '🏗️' },
  { icon: Sparkles, title: 'Ship Fast Ship Right', emoji: '🚀' },
  { icon: Users, title: 'Collaborative Spirit', emoji: '🤝' },
];

const infoItems = [
  { icon: MapPin, label: 'Dhaka, Bangladesh' },
  { icon: Briefcase, label: 'Available for work' },
  { icon: Globe, label: 'Remote worldwide' },
  { icon: Languages, label: 'English / Bengali' },
  { icon: GraduationCap, label: 'B.Sc. CSE, BUET' },
  { icon: Clock, label: 'Response within 24h' },
];

const exploring = [
  'AI/ML Integration',
  'Rust for WebAssembly',
  'Web3/Smart Contracts',
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-gradient" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-sm font-mono text-indigo-400 mb-2 block">{'// 00 · About'}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold">
            <SplitText text="Who I Am" />
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 xl:gap-20">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              I&apos;m a Full Stack Developer with 6+ years of experience building high-performance
              web applications for startups and global enterprises. Based in Dhaka, Bangladesh —
              working worldwide remotely.
            </p>

            {/* Highlights with StaggerContainer */}
            <StaggerContainer className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="glass-card rounded-xl p-4 flex items-center gap-3 min-h-[44px]">
                    <span className="text-2xl" aria-hidden="true">{item.emoji}</span>
                    <span className="font-medium text-sm">{item.title}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Currently exploring */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="glass-card rounded-xl p-6"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-3">
                Currently Exploring
              </h3>
              <div className="flex flex-wrap gap-2">
                {exploring.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-sm rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 min-h-[40px] flex items-center"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="gradient-border">
              <div className="glass-card rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xl font-bold text-white" aria-hidden="true">
                    FI
                  </div>
                  <div>
                    <p className="font-bold">Faruk Islam</p>
                    <p className="text-sm text-muted-foreground">Full Stack Developer</p>
                  </div>
                </div>
                <div className="border-t border-border pt-4 space-y-3">
                  {infoItems.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-3 text-sm min-h-[28px]">
                      <Icon className="h-4 w-4 text-indigo-400 shrink-0" aria-hidden="true" />
                      <span className="text-muted-foreground">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
