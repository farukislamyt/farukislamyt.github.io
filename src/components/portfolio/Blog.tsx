'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import StaggerContainer, { StaggerItem } from './StaggerContainer';
import SplitText from './SplitText';

const posts = [
  {
    title: 'Building Scalable APIs with Node.js and Redis',
    category: 'Backend',
    date: 'Mar 15, 2026',
    excerpt:
      'Learn how to build high-performance APIs using Node.js with Redis caching, achieving sub-50ms response times at scale.',
    readTime: '8 min read',
  },
  {
    title: 'React 19: What\'s New and Why It Matters',
    category: 'Frontend',
    date: 'Feb 28, 2026',
    excerpt:
      'Exploring the latest features in React 19 — server components, streaming SSR, and the new compiler.',
    readTime: '6 min read',
  },
  {
    title: 'My Journey from Junior to Senior Developer',
    category: 'Career',
    date: 'Jan 10, 2026',
    excerpt:
      'Reflections on the lessons learned, habits formed, and mindset shifts that helped me grow as a developer.',
    readTime: '10 min read',
  },
];

const categoryColors: Record<string, string> = {
  Backend: 'bg-violet-500/10 text-violet-400',
  Frontend: 'bg-blue-500/10 text-blue-400',
  Career: 'bg-emerald-500/10 text-emerald-400',
};

export default function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="blog" className="section-gradient" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <span className="text-sm font-mono text-indigo-400 mb-2 block">{'// 07 · Blog'}</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold">
              <SplitText text="Latest Articles" />
            </h2>
          </div>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300 transition-colors min-h-[44px] px-2 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </motion.div>

        <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.12}>
          {posts.map((post) => (
            <StaggerItem key={post.title}>
              <article className="glass-card rounded-2xl p-6 group cursor-pointer hover:border-indigo-500/30 transition-all h-full focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-2.5 py-1 text-xs rounded-full ${categoryColors[post.category]}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" aria-hidden="true" />
                    {post.date}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-400 transition-colors leading-tight">
                  {post.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" aria-hidden="true" />
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
