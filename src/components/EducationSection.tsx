import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { BookOpen } from 'lucide-react';
import { LanguageCode, PORTFOLIO_CONFIG } from '../config/portfolioConfig';

interface EducationSectionProps {
  lang: LanguageCode;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ lang }) => {
  const shouldReduceMotion = useReducedMotion();
  const { education } = PORTFOLIO_CONFIG;

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
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
            <BookOpen className="w-3.5 h-3.5 text-[#77D9FF]" />
            <span>{education.eyebrow[lang]}</span>
          </div>

          <h2
            id="education-heading"
            className="font-sans font-bold tracking-[-0.03em] text-[#F5F7FC] text-[clamp(2rem,4.6vw,3.65rem)] leading-[1.08] mb-5"
          >
            {education.headingLead[lang]}{' '}
            <span
              className={
                lang === 'en'
                  ? 'font-serif italic font-normal text-[1.12em] text-[#77D9FF]'
                  : 'text-[#77D9FF]'
              }
            >
              {education.headingAccent[lang]}
            </span>
          </h2>

          <p className="text-[15.5px] sm:text-[17px] leading-[1.78] text-[#A7B1C4]">
            {education.intro[lang]}
          </p>
        </motion.div>

        {/* Illuminated Vertical Architectural Timeline */}
        <div className="relative max-w-4xl">
          {/* Vertical Spine */}
          <div
            aria-hidden="true"
            className="absolute left-[15px] sm:left-[23px] top-3 bottom-3 w-px bg-gradient-to-b from-[#77D9FF]/65 via-[#4D8DFF]/30 to-transparent"
          />

          <div className="space-y-6">
            {education.milestones.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.6,
                  delay: shouldReduceMotion ? 0 : idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative pl-11 sm:pl-16"
              >
                {/* Node Indicator */}
                <span
                  aria-hidden="true"
                  className={`absolute left-[8px] sm:left-[16px] top-7 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 ${
                    item.isCurrent
                      ? 'border-[#77D9FF] bg-[#4D8DFF] shadow-[0_0_16px_#77D9FF]'
                      : 'border-[#4D8DFF]/70 bg-[#080D18]'
                  }`}
                />

                <div
                  className={`cinema-glass cinema-card-hover rounded-2xl sm:rounded-3xl p-5 sm:p-7 ${
                    item.isCurrent ? 'border-[#77D9FF]/30' : ''
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium ${
                        item.isCurrent
                          ? 'bg-[#4D8DFF]/25 text-[#F5F7FC] border border-[#77D9FF]/40'
                          : 'bg-white/[0.04] text-[#A7B1C4] border border-white/10'
                      }`}
                    >
                      {item.isCurrent && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#77D9FF]" />
                      )}
                      {item.statusBadge[lang]}
                    </span>
                  </div>

                  <h3 className="font-sans text-lg sm:text-xl font-bold text-[#F5F7FC] mb-2">
                    {item.title[lang]}
                  </h3>

                  {item.institution && (
                    <p className="text-xs font-mono text-[#77D9FF]/90 mb-2">
                      {item.institution[lang]}
                    </p>
                  )}

                  <p className="text-sm sm:text-[15.5px] leading-[1.75] text-[#A7B1C4]">
                    {item.description[lang]}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
