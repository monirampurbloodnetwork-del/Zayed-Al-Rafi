import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Compass } from 'lucide-react';
import { LanguageCode, PORTFOLIO_CONFIG } from '../config/portfolioConfig';

interface FutureGoalsSectionProps {
  lang: LanguageCode;
}

export const FutureGoalsSection: React.FC<FutureGoalsSectionProps> = ({ lang }) => {
  const shouldReduceMotion = useReducedMotion();
  const { futureGoals } = PORTFOLIO_CONFIG;

  return (
    <section
      id="goals"
      aria-labelledby="goals-heading"
      className="relative py-24 sm:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="cinema-glass-strong rounded-[2rem] p-6 sm:p-10 lg:p-14"
        >
          <div className="max-w-3xl mb-10">
            <div className="eyebrow-pill mb-5">
              <Compass className="w-3.5 h-3.5 text-[#77D9FF]" />
              <span>{futureGoals.eyebrow[lang]}</span>
            </div>

            <h2
              id="goals-heading"
              className="font-sans font-bold tracking-[-0.03em] text-[#F5F7FC] text-[clamp(2rem,4.6vw,3.65rem)] leading-[1.08] mb-6"
            >
              {futureGoals.headingLead[lang]}{' '}
              <span
                className={
                  lang === 'en'
                    ? 'font-serif italic font-normal text-[1.12em] text-[#77D9FF]'
                    : 'text-[#77D9FF]'
                }
              >
                {futureGoals.headingAccent[lang]}
              </span>
            </h2>

            <p className="text-[16px] sm:text-[18px] leading-[1.82] text-[#A7B1C4]">
              {futureGoals.lead[lang]}
            </p>
          </div>

          {/* Three Horizon Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {futureGoals.pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.55,
                  delay: shouldReduceMotion ? 0 : idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="rounded-2xl bg-[#080D18]/70 border border-white/[0.08] p-6"
              >
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-7 rounded-full bg-gradient-to-r from-[#77D9FF] to-[#4D8DFF] mb-4"
                />
                <h3 className="font-sans text-lg font-bold text-[#F5F7FC] mb-2">
                  {pillar.title[lang]}
                </h3>
                <p className="text-sm leading-[1.75] text-[#A7B1C4]">
                  {pillar.description[lang]}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Reflective Pull Quote */}
          <blockquote className="relative rounded-2xl bg-gradient-to-r from-[#4D8DFF]/15 via-[#0B1020]/70 to-transparent border-l-2 border-[#77D9FF] p-6 sm:p-8">
            <p
              className={`text-lg sm:text-xl leading-relaxed text-[#F5F7FC] ${
                lang === 'en' ? 'font-serif italic text-xl sm:text-2xl' : 'font-medium'
              }`}
            >
              {futureGoals.quote[lang]}
            </p>
            <footer className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-[#77D9FF]">
              — {PORTFOLIO_CONFIG.identity.fullName}
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};
