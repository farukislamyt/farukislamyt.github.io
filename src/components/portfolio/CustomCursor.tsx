'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorState = 'default' | 'link' | 'text' | 'image' | 'code';

const TRAIL_COUNT = 7;

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isClicking, setIsClicking] = useState(false);
  const [clickRipples, setClickRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  // Trail positions stored in refs for performance
  const trailPositions = useRef<{ x: number; y: number }[]>(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 }))
  );
  const mouseX = useRef(-100);
  const mouseY = useRef(-100);

  // Inner dot (fast spring)
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const dotSpringConfig = { damping: 35, stiffness: 500, mass: 0.4 };
  const dotXSpring = useSpring(dotX, dotSpringConfig);
  const dotYSpring = useSpring(dotY, dotSpringConfig);

  // Outer ring (slower spring)
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  const ringSpringConfig = { damping: 25, stiffness: 200, mass: 0.8 };
  const ringXSpring = useSpring(ringX, ringSpringConfig);
  const ringYSpring = useSpring(ringY, ringSpringConfig);

  const rafId = useRef<number>(0);
  const rippleId = useRef(0);

  const updateCursor = useCallback(() => {
    dotX.set(mouseX.current);
    dotY.set(mouseY.current);
    ringX.set(mouseX.current);
    ringY.set(mouseY.current);

    // Update trail with lerp
    let tx = mouseX.current;
    let ty = mouseY.current;
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const pos = trailPositions.current[i];
      pos.x += (tx - pos.x) * (0.35 - i * 0.03);
      pos.y += (ty - pos.y) * (0.35 - i * 0.03);
      tx = pos.x;
      ty = pos.y;
    }

    // Update trail dot transforms directly for performance
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const el = document.getElementById(`cursor-trail-${i}`);
      if (el) {
        el.style.transform = `translate3d(${trailPositions.current[i].x}px, ${trailPositions.current[i].y}px, 0)`;
      }
    }

    rafId.current = 0;
  }, [dotX, dotY, ringX, ringY]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      setIsVisible(true);
      if (rafId.current === 0) {
        rafId.current = requestAnimationFrame(updateCursor);
      }
    };

    const detectCursorState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for link/button hover
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-magnetic]') ||
        target.classList.contains('magnetic')
      ) {
        setCursorState('link');
        return;
      }

      // Check for image hover
      if (
        target.tagName === 'IMG' ||
        target.closest('.group')?.querySelector('img')
      ) {
        setCursorState('image');
        return;
      }

      // Check for code/terminal hover
      if (
        target.tagName === 'CODE' ||
        target.closest('pre') ||
        target.closest('code') ||
        target.closest('[class*="terminal"]') ||
        target.closest('[class*="font-mono"]')
      ) {
        setCursorState('code');
        return;
      }

      // Check for text/paragraph hover
      if (
        target.tagName === 'P' ||
        target.tagName === 'SPAN' ||
        target.tagName === 'H1' ||
        target.tagName === 'H2' ||
        target.tagName === 'H3' ||
        target.tagName === 'H4' ||
        target.tagName === 'H5' ||
        target.tagName === 'H6' ||
        target.tagName === 'LI' ||
        target.tagName === 'LABEL' ||
        target.tagName === 'BLOCKQUOTE'
      ) {
        setCursorState('text');
        return;
      }

      setCursorState('default');
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      const id = ++rippleId.current;
      setClickRipples((prev) => [...prev.slice(-2), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setClickRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', detectCursorState, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.documentElement.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', detectCursorState);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMobile, updateCursor]);

  if (isMobile) return null;

  // Dynamic styles based on cursor state
  const getDotSize = () => {
    if (cursorState === 'link') return 12;
    if (cursorState === 'text') return 4;
    if (cursorState === 'image') return 8;
    if (cursorState === 'code') return 6;
    return 8;
  };

  const getRingSize = () => {
    if (cursorState === 'link') return 60;
    if (cursorState === 'image') return 80;
    if (cursorState === 'code') return 44;
    if (cursorState === 'text') return 28;
    return 40;
  };

  const getRingRadius = () => {
    if (cursorState === 'code') return '10px';
    return '50%';
  };

  const getRingBorder = () => {
    if (cursorState === 'code') return '2px solid rgba(255,255,255,0.6)';
    return '1.5px solid rgba(255,255,255,0.5)';
  };

  const getRingFill = () => {
    if (cursorState === 'link') return 'rgba(255,255,255,0.08)';
    return 'transparent';
  };

  const dotSize = getDotSize();
  const ringSize = getRingSize();
  const halfDot = dotSize / 2;
  const halfRing = ringSize / 2;

  return (
    <>
      {/* Trail dots */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => {
        const opacity = 0.5 - i * 0.065;
        const size = 6 - i * 0.57;
        return (
          <div
            key={i}
            id={`cursor-trail-${i}`}
            className="fixed top-0 left-0 pointer-events-none z-[99998] cursor-trail-dot"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              backgroundColor: `rgba(255, 255, 255, ${opacity})`,
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.3s ease',
              willChange: 'transform',
              transform: `translate3d(-100px, -100px, 0)`,
            }}
          />
        );
      })}

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          x: dotXSpring,
          y: dotYSpring,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
          willChange: 'transform',
        }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: dotSize,
            height: dotSize,
            x: -halfDot,
            y: -halfDot,
          }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998]"
        style={{
          x: ringXSpring,
          y: ringYSpring,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      >
        <motion.div
          animate={{
            width: ringSize,
            height: cursorState === 'text' ? 24 : ringSize,
            x: -halfRing,
            y: cursorState === 'text' ? -12 : -halfRing,
            borderRadius: getRingRadius(),
            backgroundColor: getRingFill(),
          }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            border: getRingBorder(),
          }}
        >
          {/* "View" text for image hover */}
          {cursorState === 'image' && (
            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white opacity-70">
              View
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* Click ripple effects */}
      {clickRipples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="fixed top-0 left-0 pointer-events-none z-[99997]"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '2px solid rgba(99, 102, 241, 0.6)',
            x: ripple.x - 20,
            y: ripple.y - 20,
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </>
  );
}
