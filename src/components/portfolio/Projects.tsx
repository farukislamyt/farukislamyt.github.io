'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Star, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import TextScramble from './TextScramble';
import StaggerContainer, { StaggerItem } from './StaggerContainer';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  featured?: boolean;
  stats?: { label: string; value: string }[];
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    title: 'Multi-Vendor E-Commerce Platform',
    description: 'A comprehensive marketplace connecting vendors and customers with real-time inventory, payment processing, and order management.',
    image: '/projects/ecommerce.png',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe', 'AWS S3', 'Docker'],
    category: 'Full Stack',
    featured: true,
    stats: [
      { label: 'Users', value: '50k+' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'Response', value: '120ms' },
      { label: 'APIs', value: '300+' },
    ],
    link: '#',
    github: 'https://github.com/farukislamyt',
  },
  {
    title: 'Real-Time Analytics Dashboard',
    description: 'Interactive analytics platform with live data visualization, custom chart builders, and automated reporting.',
    image: '/projects/analytics.png',
    tags: ['React', 'D3.js', 'WebSockets', 'MongoDB'],
    category: 'Frontend',
    link: '#',
  },
  {
    title: 'High-Performance Task API',
    description: 'Distributed task processing system with queue management, retry logic, and real-time monitoring.',
    image: '/projects/api.png',
    tags: ['Express', 'Redis', 'RabbitMQ', 'Docker'],
    category: 'Backend',
    link: '#',
  },
  {
    title: 'Real-Time Chat Application',
    description: 'Enterprise chat platform with channels, threads, file sharing, and end-to-end encryption.',
    image: '/projects/chat.png',
    tags: ['Next.js', 'Socket.io', 'PostgreSQL', 'AWS'],
    category: 'Full Stack',
    link: '#',
  },
  {
    title: 'Design System & UI Kit',
    description: 'Comprehensive component library with 50+ components, accessibility support, and Storybook documentation.',
    image: '/projects/design-system.png',
    tags: ['React', 'TypeScript', 'Storybook', 'Figma'],
    category: 'Frontend',
    github: 'https://github.com/farukislamyt',
  },
  {
    title: 'Auth Microservice',
    description: 'Scalable authentication service with OAuth2, JWT, multi-factor auth, and rate limiting.',
    image: '/projects/auth.png',
    tags: ['Node.js', 'PostgreSQL', 'Redis', 'OAuth2'],
    category: 'Backend',
    link: '#',
  },
  {
    title: 'SaaS Landing Pages',
    description: 'Collection of high-converting landing pages with stunning animations and responsive design.',
    image: '/projects/saas-landing.png',
    tags: ['Next.js', 'Framer Motion', 'Tailwind'],
    category: 'Frontend',
    link: '#',
  },
];

const filters = ['All', 'Full Stack', 'Frontend', 'Backend'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section-gradient" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-sm font-mono text-indigo-400 mb-2 block">{'// 02 · Projects'}</span>
          <TextScramble text="Featured Work" className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold" />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
          role="radiogroup"
          aria-label="Filter projects by category"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              role="radio"
              aria-checked={activeFilter === filter}
              className={`px-4 py-2.5 min-h-[40px] rounded-xl text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                activeFilter === filter
                  ? 'filter-active shadow-lg shadow-indigo-500/25'
                  : 'glass-card text-muted-foreground hover:text-foreground'
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <motion.div layout className="grid md:grid-cols-2 xl:grid-cols-3 2xl:gap-8 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`glass-card rounded-2xl overflow-hidden group ${
                  project.featured && activeFilter === 'All' ? 'md:col-span-2 xl:col-span-2' : ''
                }`}
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-video">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" aria-hidden="true" />

                  {/* Overlay links */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.link && (
                      <motion.a
                        href={project.link}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
                        aria-label={`Live demo of ${project.title}`}
                      >
                        <ExternalLink className="h-5 w-5" />
                      </motion.a>
                    )}
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
                        aria-label={`View source of ${project.title}`}
                      >
                        <Github className="h-5 w-5" />
                      </motion.a>
                    )}
                  </div>

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground shrink-0 group-hover:text-indigo-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  {/* Stats for featured */}
                  {project.stats && (
                    <div className="flex flex-wrap gap-3">
                      {project.stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                          <div className="text-sm font-bold text-indigo-400">{stat.value}</div>
                          <div className="text-xs text-muted-foreground">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded-md bg-muted/50 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
