import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Check, Copy, Mail, Phone } from 'lucide-react';
import { LanguageCode, PORTFOLIO_CONFIG } from '../config/portfolioConfig';

interface ContactSectionProps {
  lang: LanguageCode;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const shouldReduceMotion = useReducedMotion();
  const { contact, contactSection } = PORTFOLIO_CONFIG;

  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  const copyValue = async (value: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Fallback ignored gracefully if clipboard unavailable
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-24 sm:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-14"
        >
          <div className="eyebrow-pill mb-5">
            <Mail className="w-3.5 h-3.5 text-[#77D9FF]" />
            <span>{contactSection.eyebrow[lang]}</span>
          </div>

          <h2
            id="contact-heading"
            className="font-sans font-bold tracking-[-0.03em] text-[#F5F7FC] text-[clamp(2rem,4.6vw,3.65rem)] leading-[1.08] mb-5"
          >
            {contactSection.headingLead[lang]}{' '}
            <span
              className={
                lang === 'en'
                  ? 'font-serif italic font-normal text-[1.12em] text-[#77D9FF]'
                  : 'text-[#77D9FF]'
              }
            >
              {contactSection.headingAccent[lang]}
            </span>
          </h2>

          <p className="text-[15.5px] sm:text-[17px] leading-[1.78] text-[#A7B1C4]">
            {contactSection.intro[lang]}
          </p>
        </motion.div>

        {/* Direct Verified Contact Channels (Clean Balanced Bento Layout) */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email Card */}
            <div className="cinema-glass cinema-card-hover rounded-2xl p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
              <a
                href={contact.emailHref}
                className="flex items-center gap-4 min-w-0 flex-1 group"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4D8DFF]/15 border border-[#77D9FF]/30 shrink-0 group-hover:bg-[#4D8DFF]/25 transition-colors">
                  <Mail className="w-5 h-5 text-[#77D9FF]" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#A7B1C4]">
                    {lang === 'en' ? 'Email' : 'ইমেইল'}
                  </p>
                  <p className="font-sans text-base sm:text-lg font-bold text-[#F5F7FC] group-hover:text-[#77D9FF] transition-colors break-all">
                    {contact.email}
                  </p>
                </div>
              </a>
              <button
                type="button"
                onClick={() => copyValue(contact.email, 'email')}
                aria-label="Copy email address"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#080D18]/80 border border-white/10 hover:border-[#77D9FF]/40 px-3.5 py-2 text-xs font-mono text-[#A7B1C4] hover:text-[#F5F7FC] transition-colors min-h-[40px]"
              >
                {copiedField === 'email' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#77D9FF]" />
                    <span className="text-[#77D9FF]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Phone Card */}
            <div className="cinema-glass cinema-card-hover rounded-2xl p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
              <a
                href={contact.phoneHref}
                className="flex items-center gap-4 min-w-0 flex-1 group"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4D8DFF]/15 border border-[#77D9FF]/30 shrink-0 group-hover:bg-[#4D8DFF]/25 transition-colors">
                  <Phone className="w-5 h-5 text-[#77D9FF]" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#A7B1C4]">
                    {lang === 'en' ? 'Phone' : 'ফোন'} · {contact.phoneDisplay}
                  </p>
                  <p className="font-sans text-base sm:text-lg font-bold text-[#F5F7FC] group-hover:text-[#77D9FF] transition-colors">
                    {contact.phoneInternational}
                  </p>
                </div>
              </a>
              <button
                type="button"
                onClick={() => copyValue(contact.phoneDisplay, 'phone')}
                aria-label="Copy phone number"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#080D18]/80 border border-white/10 hover:border-[#77D9FF]/40 px-3.5 py-2 text-xs font-mono text-[#A7B1C4] hover:text-[#F5F7FC] transition-colors min-h-[40px]"
              >
                {copiedField === 'phone' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#77D9FF]" />
                    <span className="text-[#77D9FF]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social & Instant Messaging Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group cinema-glass cinema-card-hover rounded-2xl p-5 flex items-center justify-between gap-3 min-h-[72px]"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#77D9FF]">
                  {lang === 'en' ? 'Instant Chat' : 'সরাসরি মেসেজ'}
                </p>
                <p className="font-sans text-base font-bold text-[#F5F7FC] mt-0.5">
                  WhatsApp
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#A7B1C4] group-hover:text-[#77D9FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </a>

            <a
              href={contact.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group cinema-glass cinema-card-hover rounded-2xl p-5 flex items-center justify-between gap-3 min-h-[72px]"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#77D9FF]">
                  {lang === 'en' ? 'Social Profile' : 'সোশ্যাল প্রোফাইল'}
                </p>
                <p className="font-sans text-base font-bold text-[#F5F7FC] mt-0.5">
                  Facebook
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#A7B1C4] group-hover:text-[#77D9FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </a>

            <a
              href={contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group cinema-glass cinema-card-hover rounded-2xl p-5 flex items-center justify-between gap-3 min-h-[72px]"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#77D9FF]">
                  {lang === 'en' ? 'Visual Feed' : 'ভিজ্যুয়াল ফিড'}
                </p>
                <p className="font-sans text-base font-bold text-[#F5F7FC] mt-0.5">
                  Instagram
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#A7B1C4] group-hover:text-[#77D9FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
