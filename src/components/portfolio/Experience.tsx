'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SplitText from './SplitText';

const experiences = [
  {
    title: 'Senior Full Stack Developer',
    company: 'TechVentures Ltd.',
    period: '2022 – Present',
    description:
      'Leading a team of 5 engineers to build scalable web platforms. Achieved 60% faster API response times and 80% reduction in deployment time. Grew product from 0 to 50k+ active users.',
    tags: ['React', 'Node.js', 'AWS', 'PostgreSQL', 'Docker', 'Team Lead'],
  },
  {
    title: 'Full Stack Developer',
    company: 'Startup Studio',
    period: '2020 – 2022',
    description:
      'Shipped 6+ products from concept to production. Built a reusable component library used across all projects. Mentored junior developers and established coding standards.',
    tags: ['Next.js', 'TypeScript', 'MongoDB', 'CI/CD', 'Mentor'],
  },
  {
    title: 'Frontend Developer',
    company: 'Digital Agency',
    period: '2018 – 2020',
    description:
      'Delivered projects for 10+ enterprise clients with consistent 95+ Lighthouse scores. Specialized in responsive, accessible web applications following Agile methodology.',
    tags: ['React', 'Vue.js', 'SCSS', 'REST APIs', 'Agile'],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="section-gradient" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-sm font-mono text-indigo-400 mb-2 block">{'// 04 · Experience'}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold">
            <SplitText text="Work History" />
          </h2>
        </motion.div>

        <div className="relative">
          {/* Desktop: centered vertical line (hidden on mobile) */}
          <div className="hidden sm:block absolute left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-violet-500 to-transparent" aria-hidden="true" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.title + exp.company}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.15 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Desktop: centered dot */}
                <div className="absolute left-0 sm:left-1/2 -translate-x-1/2 sm:-translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 border-4 border-background z-10 top-6 sm:top-8" aria-hidden="true" />

                {/* Mobile: left-border line */}
                <div className="sm:hidden absolute left-[7px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-violet-500 to-transparent" aria-hidden="true" />

                {/* Spacer for desktop (hidden on mobile) */}
                <div className="hidden md:block md:w-1/2" />

                {/* Card */}
                <div className="md:w-1/2 pl-12 sm:pl-0">
                  <div className="glass-card rounded-2xl p-6 hover:border-indigo-500/30 transition-all min-h-[44px]">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-bold">{exp.title}</h3>
                        <p className="text-indigo-400 font-medium text-sm">{exp.company}</p>
                      </div>
                      <span className="px-3 py-1 text-xs rounded-full bg-indigo-500/10 text-indigo-400 whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs rounded-md bg-muted/50 text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
