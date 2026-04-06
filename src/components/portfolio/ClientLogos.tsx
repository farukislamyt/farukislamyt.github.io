'use client';

import { motion } from 'framer-motion';

const logos = [
  'ShopBD',
  'DataPulse',
  'SwiftTask',
  'FinEdge',
  'CloudNest',
  'BuildFlow',
  'NextLayer',
];

export default function ClientLogos() {
  return (
    <section className="py-16 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground uppercase tracking-wider"
        >
          Trusted by companies worldwide
        </motion.p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Marquee */}
        <div className="flex animate-marquee whitespace-nowrap">
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div
              key={`${logo}-${i}`}
              className="mx-8 flex items-center justify-center"
            >
              <div className="px-8 py-3 rounded-xl glass-card flex items-center gap-2 text-muted-foreground font-medium text-sm hover:text-foreground hover:border-indigo-500/30 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-violet-600/20 flex items-center justify-center text-xs font-bold text-indigo-400">
                  {logo[0]}
                </div>
                {logo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
