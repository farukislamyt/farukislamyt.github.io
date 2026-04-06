'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, ExternalLink, Quote } from 'lucide-react';
import StaggerContainer, { StaggerItem } from './StaggerContainer';
import SplitText from './SplitText';

const certifications = [
  {
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    year: '2023',
  },
  {
    title: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Meta',
    year: '2022',
  },
  {
    title: 'Google UX Design Certificate',
    issuer: 'Google',
    year: '2021',
  },
];

const testimonials = [
  {
    quote:
      "Faruk transformed our vision into a stunning product. His attention to detail and technical expertise exceeded all expectations.",
    author: 'Sarah Chen',
    role: 'CEO at TechVentures',
  },
  {
    quote:
      "Working with Faruk was a game-changer. He delivered a complex platform in record time without compromising quality.",
    author: 'Marcus Rodriguez',
    role: 'CTO at DataPulse',
  },
  {
    quote:
      "The best developer I've ever hired. His code is clean, well-documented, and performs flawlessly under heavy load.",
    author: 'Aisha Khan',
    role: 'Founder at SwiftTask',
  },
];

export default function CertificationsAndTestimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <>
      {/* Certifications */}
      <section className="section-gradient" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="text-sm font-mono text-indigo-400 mb-2 block">{'// 05 · Certifications'}</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold">
              <SplitText text="Certifications & Awards" />
            </h2>
          </motion.div>

          <StaggerContainer className="grid sm:grid-cols-3 gap-6" staggerDelay={0.12}>
            {certifications.map((cert) => (
              <StaggerItem key={cert.title}>
                <div className="glass-card rounded-2xl p-6 group hover:border-indigo-500/30 transition-all min-h-[44px]">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-600/20 group-hover:from-indigo-500/30 group-hover:to-violet-600/30 transition-colors">
                      <Award className="h-5 w-5 text-indigo-400" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm leading-tight">{cert.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{cert.issuer}</p>
                      <p className="text-xs text-indigo-400 mt-2">{cert.year}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="text-sm font-mono text-indigo-400 mb-2 block">{'// Testimonials'}</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold">
              <SplitText text="Client Testimonials" />
            </h2>
          </motion.div>

          <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.12}>
            {testimonials.map((testimonial) => (
              <StaggerItem key={testimonial.author}>
                <div className="glass-card rounded-2xl p-6 h-full">
                  <Quote className="h-8 w-8 text-indigo-500/30 mb-4" aria-hidden="true" />
                  <blockquote className="text-sm text-muted-foreground leading-relaxed mb-6">
                    <p>&ldquo;{testimonial.quote}&rdquo;</p>
                  </blockquote>
                  <footer className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm font-bold text-white" aria-hidden="true">
                      {testimonial.author
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <cite className="text-sm font-bold not-italic">{testimonial.author}</cite>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </footer>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
