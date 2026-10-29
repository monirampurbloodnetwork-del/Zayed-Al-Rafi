import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { LanguageCode, PORTFOLIO_CONFIG } from '../config/portfolioConfig';

interface AboutSectionProps {
  lang: LanguageCode;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const shouldReduceMotion = useReducedMotion();
  const { about, identity } = PORTFOLIO_CONFIG;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative py-24 sm:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Choreographed left-weighted editorial layout so Video 02 (Portrait Reveal) shines on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8"
          >
            <div className="eyebrow-pill mb-5">
              <span>{about.eyebrow[lang]}</span>
            </div>

            <h2
              id="about-heading"
              className="font-sans font-bold tracking-[-0.03em] text-[#F5F7FC] text-[clamp(2rem,4.6vw,3.65rem)] leading-[1.08] mb-8"
            >
              {about.headingLead[lang]}{' '}
              <span
                className={
                  lang === 'en'
                    ? 'font-serif italic font-normal text-[1.12em] text-[#77D9FF]'
                    : 'text-[#77D9FF]'
                }
              >
                {about.headingAccent[lang]}
              </span>
            </h2>

            {/* Main Biography Glass Card */}
            <div className="cinema-glass rounded-3xl p-6 sm:p-9 lg:p-10 space-y-5">
              <p className="text-lg sm:text-[22px] font-medium leading-[1.6] text-[#F5F7FC]">
                {about.leadParagraph[lang]}
              </p>

              <div className="h-px w-full bg-gradient-to-r from-[#77D9FF]/30 via-white/10 to-transparent" />

              {about.bodyParagraphs[lang].map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-[15.5px] sm:text-[17px] leading-[1.82] text-[#A7B1C4]"
                >
                  {paragraph}
                </p>
              ))}

              {/* Core Identity Pillars */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {about.pillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-[#080D18]/65 border border-white/[0.08] p-4"
                  >
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#77D9FF] mb-1.5">
                      {pillar.label[lang]}
                    </p>
                    <p className="text-sm font-semibold text-[#F5F7FC] leading-snug">
                      {pillar.value[lang]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Companion Column: Editorial Portrait Card + Open Atmospheric Window for Reel 02 */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 lg:mt-20"
          >
            <div className="cinema-glass rounded-3xl p-5 sm:p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={identity.portraitSrc}
                  alt={identity.portraitAlt}
                  loading="lazy"
                  decoding="async"
                  className="h-16 w-16 rounded-2xl object-cover object-[50%_18%] border border-[#77D9FF]/30 shrink-0"
                />
                <div className="min-w-0">
                  <p className="font-sans text-base font-bold text-[#F5F7FC] truncate">
                    {identity.fullName}
                  </p>
                  <p className="text-xs text-[#A7B1C4] mt-0.5">
                    {identity.roleBadge[lang]}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-[13px] leading-relaxed text-[#A7B1C4] border-t border-white/[0.08] pt-4">
                {lang === 'en'
                  ? 'Every section of this portfolio reflects real interests and ongoing learning — crafted to grow alongside new studies, creative works, and life chapters.'
                  : 'এই পোর্টফোলিওর প্রতিটি অংশ বাস্তব আগ্রহ ও চলমান শেখার প্রতিফলন—নতুন শিক্ষা, কাজ ও সময়ের সাথে সহজেই পরিমার্জনযোগ্য।'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
