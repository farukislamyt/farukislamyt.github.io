'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Send, Terminal, Heart } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/farukislamyt', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/farukislamyt', label: 'LinkedIn' },
  { icon: Send, href: 'https://t.me/farukislam', label: 'Telegram' },
];

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2 font-bold text-lg focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
              aria-label="Faruk Islam — Home"
            >
              <Terminal className="h-5 w-5 text-indigo-500" aria-hidden="true" />
              faruk<span className="text-indigo-500">.</span>dev
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Full Stack Developer crafting digital products from Dhaka, Bangladesh.
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <h4 className="font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                    className="text-sm text-muted-foreground hover:text-indigo-400 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Web Application Development</li>
              <li>API Design & Development</li>
              <li>UI/UX Design</li>
              <li>Technical Consulting</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Connect</h4>
            <div className="flex gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 rounded-xl glass-card hover:border-indigo-500/30 text-muted-foreground hover:text-indigo-400 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            © {new Date().getFullYear()} Faruk Islam. Built with
            <Heart className="h-3.5 w-3.5 text-red-500 inline" aria-hidden="true" />
            and Next.js
          </p>
          <p className="text-xs text-muted-foreground">
            Designed & Developed by Faruk Islam
          </p>
        </div>
      </div>
    </footer>
  );
}
