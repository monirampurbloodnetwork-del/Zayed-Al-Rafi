import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Camera,
  Cpu,
  Film,
  Gamepad2,
  Layout,
  MessageSquare,
  Palette,
  PenTool,
  Sparkles,
  Terminal,
  Trophy,
} from 'lucide-react';
import {
  InterestEntry,
  LanguageCode,
  PORTFOLIO_CONFIG,
  SkillEntry,
} from '../config/portfolioConfig';

interface SkillsInterestsSectionProps {
  lang: LanguageCode;
}

const renderSkillIcon = (icon: SkillEntry['icon']) => {
  const cls = 'w-5 h-5 text-[#77D9FF]';
  switch (icon) {
    case 'cpu':
      return <Cpu className={cls} />;
    case 'layout':
      return <Layout className={cls} />;
    case 'palette':
      return <Palette className={cls} />;
    case 'film':
      return <Film className={cls} />;
    case 'message':
      return <MessageSquare className={cls} />;
  }
};

const renderInterestIcon = (icon: InterestEntry['icon']) => {
  const cls = 'w-4 h-4 text-[#77D9FF] shrink-0';
  switch (icon) {
    case 'trophy':
      return <Trophy className={cls} />;
    case 'gamepad':
      return <Gamepad2 className={cls} />;
    case 'camera':
      return <Camera className={cls} />;
    case 'pen':
      return <PenTool className={cls} />;
    case 'terminal':
      return <Terminal className={cls} />;
    case 'sparkles':
      return <Sparkles className={cls} />;
  }
};

export const SkillsInterestsSection: React.FC<SkillsInterestsSectionProps> = ({
  lang,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const { skillsAndInterests } = PORTFOLIO_CONFIG;

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative py-24 sm:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-14"
        >
          <div className="eyebrow-pill mb-5">
            <span>{skillsAndInterests.eyebrow[lang]}</span>
          </div>

          <h2
            id="skills-heading"
            className="font-sans font-bold tracking-[-0.03em] text-[#F5F7FC] text-[clamp(2rem,4.6vw,3.65rem)] leading-[1.08] mb-5"
          >
            {skillsAndInterests.headingLead[lang]}{' '}
            <span
              className={
                lang === 'en'
                  ? 'font-serif italic font-normal text-[1.12em] text-[#77D9FF]'
                  : 'text-[#77D9FF]'
              }
            >
              {skillsAndInterests.headingAccent[lang]}
            </span>
          </h2>

          <p className="text-[15.5px] sm:text-[17px] leading-[1.78] text-[#A7B1C4]">
            {skillsAndInterests.intro[lang]}
          </p>
        </motion.div>

        {/* Skills Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 mb-14">
          {skillsAndInterests.skills.map((skill, idx) => {
            // Top 3 span 2 cols each on lg; bottom 2 span 3 cols each on lg
            const colSpan =
              idx < 3 ? 'lg:col-span-2' : 'lg:col-span-3';
            return (
              <motion.article
                key={skill.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.6,
                  delay: shouldReduceMotion ? 0 : idx * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`${colSpan} cinema-glass cinema-card-hover rounded-3xl p-6 sm:p-7 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#4D8DFF]/15 border border-[#77D9FF]/25">
                      {renderSkillIcon(skill.icon)}
                    </span>
                    <span className="rounded-full bg-white/[0.04] border border-white/10 px-2.5 py-1 text-[11px] font-medium text-[#A7B1C4]">
                      {skill.focusTag[lang]}
                    </span>
                  </div>

                  <h3 className="font-sans text-lg sm:text-xl font-bold text-[#F5F7FC] mb-2.5">
                    {skill.title[lang]}
                  </h3>

                  <p className="text-sm sm:text-[15px] leading-[1.75] text-[#A7B1C4]">
                    {skill.description[lang]}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Personal Interests & Creative Pursuits */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="cinema-glass rounded-3xl p-6 sm:p-9 lg:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#77D9FF] mb-2">
                {lang === 'en' ? 'BEYOND THE DESK' : 'অবসর ও অনুপ্রেরণা'}
              </p>
              <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#F5F7FC] mb-3.5">
                {skillsAndInterests.interestsHeading[lang]}
              </h3>
              <p className="text-sm sm:text-[15.5px] leading-[1.8] text-[#A7B1C4]">
                {skillsAndInterests.interestsReflection[lang]}
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {skillsAndInterests.interests.map((interest) => (
                <div
                  key={interest.id}
                  className="group rounded-2xl bg-[#080D18]/65 border border-white/[0.08] hover:border-[#77D9FF]/35 p-4 transition-colors"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#4D8DFF]/15 border border-[#77D9FF]/20">
                      {renderInterestIcon(interest.icon)}
                    </span>
                    <span className="font-sans text-[15px] font-semibold text-[#F5F7FC]">
                      {interest.label[lang]}
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-[#A7B1C4] leading-relaxed pl-[42px]">
                    {interest.detail[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
