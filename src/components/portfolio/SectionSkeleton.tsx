'use client';

import { motion } from 'framer-motion';

export default function SectionSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24" aria-hidden="true">
      {/* Section header skeleton */}
      <div className="mb-16 space-y-3">
        <div className="skeleton-shimmer h-4 w-32 rounded-lg" />
        <div className="skeleton-shimmer h-10 sm:h-12 w-64 rounded-lg" />
      </div>

      {/* Content skeleton grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl p-6 space-y-4"
            style={{ transform: 'none' }}
          >
            <div className="skeleton-shimmer h-5 w-3/4 rounded" />
            <div className="space-y-2">
              <div className="skeleton-shimmer h-3 w-full rounded" />
              <div className="skeleton-shimmer h-3 w-5/6 rounded" />
              <div className="skeleton-shimmer h-3 w-4/6 rounded" />
            </div>
            <div className="flex gap-2 pt-2">
              <div className="skeleton-shimmer h-6 w-16 rounded-md" />
              <div className="skeleton-shimmer h-6 w-20 rounded-md" />
              <div className="skeleton-shimmer h-6 w-14 rounded-md" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
