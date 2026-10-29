import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight, Mail, Sparkles } from 'lucide-react';
import { LanguageCode, PORTFOLIO_CONFIG } from '../config/portfolioConfig';

interface HeroSectionProps {
  lang: LanguageCode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang }) => {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || e.pointerType === 'touch' || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: Number((-y * 7).toFixed(2)),
      rotateY: Number((x * 7).toFixed(2)),
    });
  };

  const handlePointerLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const { identity, hero } = PORTFOLIO_CONFIG;

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative min-h-[100svh] pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 flex flex-col justify-between"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Editorial Copy Column */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 order-2 lg:order-1"
          >
            <div className="eyebrow-pill mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#77D9FF] shadow-[0_0_8px_#77D9FF]" />
              <span>{hero.eyebrow[lang]}</span>
            </div>

            <h1 className="font-sans font-extrabold tracking-[-0.04em] text-[#F5F7FC] text-[clamp(2.55rem,7.2vw,5.5rem)] leading-[0.98] mb-5">
              <span className="block">{identity.firstName}</span>
              <span className="block bg-gradient-to-r from-[#F5F7FC] via-[#77D9FF] to-[#4D8DFF] bg-clip-text text-transparent pb-1">
                {identity.lastName}
              </span>
            </h1>

            <p className="text-lg sm:text-2xl font-medium text-[#F5F7FC]/95 tracking-tight mb-5">
              {hero.taglinePrefix[lang]}{' '}
              <span
                className={
                  lang === 'en'
                    ? 'font-serif italic font-normal text-[1.22em] text-[#77D9FF]'
                    : 'font-bold text-[#77D9FF]'
                }
              >
                {hero.taglineAccent[lang]}
              </span>
            </p>

            <p className="max-w-xl text-[15.5px] sm:text-[17px] leading-[1.78] text-[#A7B1C4] mb-8">
              {hero.intro[lang]}
            </p>

            {/* Optional DOB rendering (strictly private / hidden by default per configuration) */}
            {identity.displayDateOfBirth && (
              <p className="text-xs font-mono text-[#A7B1C4] mb-6">
                Born: {identity.privateDateOfBirth}
              </p>
            )}

            {/* Primary & Secondary Actions */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
              <a
                href="#about"
                onClick={(e) => scrollTo(e, 'about')}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#F5F7FC] text-[#080D18] hover:bg-[#77D9FF] px-6 sm:px-7 py-3.5 text-sm sm:text-[15px] font-bold tracking-tight transition-all duration-300 shadow-[0_12px_36px_rgba(77,141,255,0.28)] hover:-translate-y-0.5 min-h-[48px]"
              >
                <span>{hero.primaryCta[lang]}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#contact"
                onClick={(e) => scrollTo(e, 'contact')}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full cinema-glass hover:border-[#77D9FF]/45 px-6 sm:px-7 py-3.5 text-sm sm:text-[15px] font-semibold text-[#F5F7FC] transition-all duration-300 hover:-translate-y-0.5 min-h-[48px]"
              >
                <Mail className="w-4 h-4 text-[#77D9FF]" />
                <span>{hero.secondaryCta[lang]}</span>
              </a>
            </div>
          </motion.div>

          {/* Authentic Portrait Architectural Frame */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div
              ref={cardRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              style={{
                transform: shouldReduceMotion
                  ? undefined
                  : `perspective(1100px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                transition: 'transform 260ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              className="relative w-full max-w-[330px] sm:max-w-[380px] lg:max-w-[410px]"
            >
              {/* Soft electric-blue ambient halo behind portrait */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-[#4D8DFF]/20 via-[#77D9FF]/12 to-transparent blur-2xl pointer-events-none"
              />

              {/* Tilted metallic wireframe accent ring */}
              <div
                aria-hidden="true"
                className="absolute -inset-1.5 rounded-[2rem] border border-[#77D9FF]/20 rotate-[2deg] pointer-events-none"
              />

              {/* Portrait Card */}
              <div className="relative overflow-hidden rounded-[1.75rem] cinema-glass-strong p-2.5 sm:p-3">
                <div className="relative aspect-[4/4.5] w-full overflow-hidden rounded-[1.25rem] bg-[#0B1020]">
                  <img
                    src={identity.portraitSrc}
                    alt={identity.portraitAlt}
                    fetchPriority="high"
                    decoding="async"
                    className="h-full w-full object-cover object-[50%_20%] transition-transform duration-700 ease-out hover:scale-[1.03]"
                  />

                  {/* Subtle bottom gradient for caption legibility */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#080D18]/90 via-[#080D18]/35 to-transparent"
                  />

                  {/* Top-left authentic role badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#080D18]/75 backdrop-blur-md border border-white/15 px-3 py-1 text-[11px] font-medium text-[#F5F7FC]">
                      <Sparkles className="w-3 h-3 text-[#77D9FF] shrink-0" />
                      <span className="truncate">{identity.roleBadge[lang]}</span>
                    </span>
                  </div>

                  {/* Bottom identity plate */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                    <div>
                      <p className="text-sm sm:text-base font-bold text-[#F5F7FC] leading-tight">
                        {hero.portraitCaption.title[lang]}
                      </p>
                      <p className="text-[11px] sm:text-xs text-[#A7B1C4] mt-0.5">
                        {hero.portraitCaption.subtitle[lang]}
                      </p>
                    </div>
                    <span className="rounded-lg bg-[#4D8DFF]/20 border border-[#77D9FF]/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[#77D9FF] shrink-0">
                      {identity.locationLabel[lang]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle Scroll Cue */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        <a
          href="#about"
          onClick={(e) => scrollTo(e, 'about')}
          className="group inline-flex items-center gap-3 text-xs font-mono tracking-[0.14em] uppercase text-[#A7B1C4] hover:text-[#77D9FF] transition-colors py-1"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-[#0B1020]/70 group-hover:border-[#77D9FF]/50 transition-colors">
            <ArrowDown className="w-3.5 h-3.5 text-[#77D9FF] motion-safe:animate-bounce" />
          </span>
          <span>{hero.scrollHint[lang]}</span>
        </a>
      </div>
    </section>
  );
};
