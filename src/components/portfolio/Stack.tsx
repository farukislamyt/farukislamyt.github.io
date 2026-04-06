'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
}

interface Category {
  title: string;
  color: string;
  skills: Skill[];
}

const categories: Category[] = [
  {
    title: 'Frontend',
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Vue.js', level: 70 },
    ],
  },
  {
    title: 'Backend',
    color: 'from-indigo-500 to-violet-500',
    skills: [
      { name: 'Node.js', level: 93 },
      { name: 'Express / Fastify', level: 88 },
      { name: 'Python / Django', level: 75 },
      { name: 'GraphQL', level: 80 },
    ],
  },
  {
    title: 'Database',
    color: 'from-violet-500 to-purple-500',
    skills: [
      { name: 'PostgreSQL', level: 90 },
      { name: 'MongoDB', level: 85 },
      { name: 'Redis', level: 78 },
      { name: 'MySQL', level: 82 },
    ],
  },
  {
    title: 'DevOps & Cloud',
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'AWS', level: 80 },
      { name: 'Docker / K8s', level: 76 },
      { name: 'CI/CD Pipelines', level: 84 },
      { name: 'Git / GitHub', level: 96 },
    ],
  },
];

const alsoWith = [
  'Prisma', 'Socket.io', 'Stripe', 'Firebase', 'Nginx', 'Linux',
  'Jest/Vitest', 'Figma', 'Vercel', 'Supabase', 'Cloudflare', 'Terraform',
  'RabbitMQ', 'Elasticsearch', 'WebSockets',
];

function SkillBar({ skill, delay, color, isInView }: { skill: Skill; delay: number; color: string; isInView: boolean }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{skill.name}</span>
        <span className="text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </div>
  );
}

export default function Stack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="stack" className="py-24 section-gradient" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-sm font-mono text-indigo-400 mb-2 block">{'// 01 · Stack'}</span>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Tech <span className="text-gradient">Stack</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIdx * 0.1 }}
              className="glass-card rounded-2xl p-6 space-y-4"
            >
              <h3 className="text-lg font-bold flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`} />
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIdx) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    delay={catIdx * 0.1 + skillIdx * 0.05}
                    color={category.color}
                    isInView={isInView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Also with */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 glass-card rounded-2xl p-6"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-4">
            Also familiar with
          </h3>
          <div className="flex flex-wrap gap-2">
            {alsoWith.map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.03 }}
                className="px-3 py-1.5 text-sm rounded-lg border border-border hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-colors text-muted-foreground hover:text-foreground"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
