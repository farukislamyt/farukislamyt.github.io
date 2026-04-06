'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import StaggerContainer, { StaggerItem } from './StaggerContainer';
import MagneticButton from './MagneticButton';
import SplitText from './SplitText';

const processSteps = [
  { step: '01', title: 'Discovery', desc: 'Understanding your vision, goals & requirements' },
  { step: '02', title: 'Design', desc: 'Creating wireframes, UI/UX prototypes' },
  { step: '03', title: 'Build', desc: 'Development with clean, scalable code' },
  { step: '04', title: 'Launch', desc: 'Testing, deployment & ongoing support' },
];

const plans = [
  {
    name: 'Starter',
    price: '$800',
    period: '/project',
    description: 'Perfect for small businesses and personal projects',
    features: [
      '5 responsive pages',
      'Mobile-first design',
      'SEO optimization',
      'Contact form',
      '2-week delivery',
      '1 revision round',
    ],
    popular: false,
    cta: 'Get Started',
  },
  {
    name: 'Professional',
    price: '$2,500',
    period: '/project',
    description: 'Full stack solutions for growing businesses',
    features: [
      'Full stack application',
      'Database design & setup',
      'REST/GraphQL API',
      'Authentication system',
      'Deploy to production',
      '4-week delivery',
      '30-day support',
      '3 revision rounds',
    ],
    popular: true,
    cta: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '/month',
    description: 'For large-scale applications and ongoing development',
    features: [
      'Microservices architecture',
      'CI/CD pipelines',
      'Performance audits',
      'Team mentoring',
      'Dedicated Slack channel',
      'Priority SLA',
      'Custom integrations',
      '24/7 monitoring',
    ],
    popular: false,
    cta: 'Contact Me',
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="section-gradient" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-sm font-mono text-indigo-400 mb-2 block">{'// 03 · Services'}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold">
            <SplitText text="How I Work" />
          </h2>
        </motion.div>

        {/* Process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {processSteps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="glass-card rounded-xl p-5 text-center relative min-h-[44px]"
            >
              <div className="text-xs font-mono text-indigo-400 mb-2">{step.step}</div>
              <h3 className="font-bold mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
              {i < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-[2px] bg-gradient-to-r from-indigo-500 to-transparent" aria-hidden="true" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Pricing cards with StaggerContainer */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 xl:gap-8" staggerDelay={0.15}>
          {plans.map((plan) => (
            <StaggerItem key={plan.name}>
              <div className={`rounded-2xl overflow-hidden h-full ${plan.popular ? 'gradient-border' : ''}`}>
                <div
                  className={`glass-card rounded-2xl p-6 h-full flex flex-col ${
                    plan.popular ? 'relative' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-0 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 text-xs font-bold rounded-b-lg bg-gradient-to-r from-indigo-500 to-violet-600 text-white flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-lg font-bold">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-gradient">{plan.price}</span>
                      <span className="text-muted-foreground text-sm">{plan.period}</span>
                    </div>

                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <MagneticButton className="mt-6 w-full">
                    <motion.a
                      href="#contact"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`block w-full text-center py-3 rounded-xl font-medium text-sm transition-colors btn-ripple min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                        plan.popular
                          ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25'
                          : 'border border-border hover:border-indigo-500/30 hover:bg-indigo-500/5'
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight className="inline h-4 w-4 ml-1" />
                    </motion.a>
                  </MagneticButton>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
