'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import TextScramble from './TextScramble';
import MagneticButton from './MagneticButton';
import SplitText from './SplitText';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'farukislamyt@gmail.com', href: 'mailto:farukislamyt@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+880 1XXX-XXXXXX', href: 'tel:+8801XXXXXXXXX' },
  { icon: MapPin, label: 'Location', value: 'Dhaka, Bangladesh', href: '#' },
  { icon: Clock, label: 'Availability', value: 'Open to work · Full-time', href: '#' },
];

const serviceTypes = ['Web App', 'API', 'Mobile', 'Consulting', 'Other'];
const budgetRanges = ['Under $1k', '$1k - $5k', '$5k - $10k', '$10k+'];

interface FormData {
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
}

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    service: '',
    budget: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setForm({ name: '', email: '', service: '', budget: '', message: '' });
    }
  };

  return (
    <section id="contact" className="section-gradient" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-sm font-mono text-indigo-400 mb-2 block">{'// 08 · Contact'}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold">
            <SplitText text="Let's Build Something Amazing" />
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 xl:gap-20">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            <p className="text-muted-foreground leading-relaxed mb-6">
              Have a project in mind? Let&apos;s discuss how I can help bring your ideas to life.
            </p>

            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="glass-card rounded-xl p-4 flex items-center gap-3 hover:border-indigo-500/30 transition-all block min-h-[44px] focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
              >
                <div className="p-2 rounded-lg bg-indigo-500/10" aria-hidden="true">
                  <Icon className="h-4 w-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium">{value}</p>
                </div>
              </a>
            ))}

            {/* Availability indicator */}
            <div className="glass-card rounded-xl p-4 flex items-center gap-3 min-h-[44px]" aria-label="Currently available for new projects">
              <span className="relative flex h-3 w-3" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              <span className="text-sm text-green-400 font-medium">
                Currently available for new projects
              </span>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="gradient-border">
              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-2xl p-6 space-y-5"
                noValidate
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium mb-1.5">Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => {
                        setForm({ ...form, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl bg-muted/50 border text-sm placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all ${
                        errors.name ? 'border-destructive' : 'border-border focus:border-indigo-500/50'
                      }`}
                      placeholder="John Doe"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-xs text-destructive mt-1 flex items-center gap-1" role="alert">
                        <AlertCircle className="h-3 w-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium mb-1.5">Email *</label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => {
                        setForm({ ...form, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl bg-muted/50 border text-sm placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all ${
                        errors.email ? 'border-destructive' : 'border-border focus:border-indigo-500/50'
                      }`}
                      placeholder="john@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-xs text-destructive mt-1 flex items-center gap-1" role="alert">
                        <AlertCircle className="h-3 w-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-service" className="block text-sm font-medium mb-1.5">Service Type</label>
                    <select
                      id="contact-service"
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus:border-indigo-500/50 transition-all appearance-none min-h-[44px]"
                    >
                      <option value="">Select service</option>
                      {serviceTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-budget" className="block text-sm font-medium mb-1.5">Budget Range</label>
                    <select
                      id="contact-budget"
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus:border-indigo-500/50 transition-all appearance-none min-h-[44px]"
                    >
                      <option value="">Select budget</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium mb-1.5">Message *</label>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(e) => {
                      setForm({ ...form, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    rows={5}
                    className={`w-full px-4 py-2.5 rounded-xl bg-muted/50 border text-sm placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all resize-none ${
                      errors.message ? 'border-destructive' : 'border-border focus:border-indigo-500/50'
                    }`}
                    placeholder="Tell me about your project..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-xs text-destructive mt-1 flex items-center gap-1" role="alert">
                      <AlertCircle className="h-3 w-3" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <MagneticButton className="w-full">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-4 min-h-[44px] rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 btn-ripple focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {submitted ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Message Sent Successfully!
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </MagneticButton>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
