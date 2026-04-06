'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';
import { GitFork, Star, GitCommitHorizontal, FolderGit2 } from 'lucide-react';
import SplitText from './SplitText';

const githubStats = [
  { icon: FolderGit2, label: 'Repositories', value: 150, suffix: '+' },
  { icon: Star, label: 'Stars', value: 2800, suffix: '+' },
  { icon: GitCommitHorizontal, label: 'Commits', value: 1200, suffix: '+' },
  { icon: GitFork, label: 'Forks', value: 85, suffix: '+' },
];

const topRepos = [
  { name: 'portfolio-react', stars: 420, lang: 'TypeScript', color: 'bg-blue-500' },
  { name: 'api-gateway', stars: 380, lang: 'Go', color: 'bg-cyan-500' },
  { name: 'chat-engine', stars: 290, lang: 'Rust', color: 'bg-orange-500' },
  { name: 'design-system', stars: 250, lang: 'TypeScript', color: 'bg-blue-500' },
];

function AnimatedCounter({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0);
  const springValue = useSpring(0, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 2000;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      springValue.set(easedProgress);

      const current = Math.floor(easedProgress * value);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    const rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, value, springValue]);

  const formatNumber = useCallback((num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    return num.toString();
  }, []);

  return (
    <span>
      {formatNumber(count)}
      {suffix}
    </span>
  );
}

export default function GitHubSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="github" className="section-gradient" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-sm font-mono text-indigo-400 mb-2 block">{'// 06 · GitHub'}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold">
            <SplitText text="Open Source Contributions" />
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {githubStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <stat.icon className="h-6 w-6 text-indigo-400 mx-auto mb-2" aria-hidden="true" />
              <div className="text-2xl font-bold text-gradient">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={isInView} />
              </div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Top repos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-4">
            Top Repositories
          </h3>
          <div className="space-y-3">
            {topRepos.map((repo, i) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/30 transition-colors min-h-[44px]"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${repo.color}`} aria-hidden="true" />
                  <span className="font-medium text-sm">{repo.name}</span>
                  <span className="text-xs text-muted-foreground">{repo.lang}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{repo.stars}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
