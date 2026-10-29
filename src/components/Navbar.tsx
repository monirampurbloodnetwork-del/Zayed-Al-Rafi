import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import {
  LanguageCode,
  PORTFOLIO_CONFIG,
  SectionId,
} from '../config/portfolioConfig';

interface NavbarProps {
  activeSection: SectionId;
  lang: LanguageCode;
  onToggleLang: () => void;
  progressBarRef: React.RefObject<HTMLDivElement>;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  lang,
  onToggleLang,
  progressBarRef,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 24;
      setScrolled((prev) => (prev !== next ? next : prev));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'bg-[#080D18]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_40px_rgba(2,6,18,0.55)]'
          : 'bg-gradient-to-b from-[#080D18]/75 to-transparent border-b border-white/[0.04]'
      }`}
    >
      {/* Top Scroll Progress Hairline */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[2px] bg-white/[0.04] overflow-hidden"
      >
        <div
          ref={progressBarRef}
          className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-[#4D8DFF] via-[#77D9FF] to-[#F5F7FC] transition-transform duration-75 ease-out"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-3">
        {/* Brand Monogram & Name */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, 'home')}
          aria-label={`${PORTFOLIO_CONFIG.identity.fullName} — Home`}
          className="group inline-flex items-center gap-2.5 shrink-0 py-1.5"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[#0B1020]/90 border border-white/15 group-hover:border-[#77D9FF]/50 transition-colors shadow-inner">
            <span className="font-sans text-sm font-extrabold tracking-tight text-[#F5F7FC]">
              {PORTFOLIO_CONFIG.identity.monogram}
            </span>
            <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#77D9FF] shadow-[0_0_8px_#77D9FF]" />
          </span>
          <span className="font-sans text-[15px] sm:text-base font-bold tracking-tight text-[#F5F7FC] group-hover:text-white transition-colors">
            {PORTFOLIO_CONFIG.identity.firstName}{' '}
            <span className="text-[#A7B1C4] font-medium group-hover:text-[#77D9FF] transition-colors">
              {PORTFOLIO_CONFIG.identity.lastName}
            </span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-0.5 rounded-full bg-[#0B1020]/65 border border-white/[0.08] p-1 backdrop-blur-md"
        >
          {PORTFOLIO_CONFIG.navigation.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative px-3 xl:px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-[#F5F7FC]'
                    : 'text-[#A7B1C4] hover:text-[#F5F7FC]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavCapsule"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4D8DFF]/25 to-[#77D9FF]/15 border border-[#77D9FF]/30 shadow-[0_0_20px_rgba(77,141,255,0.2)]"
                  />
                )}
                <span className="relative z-10">{item.label[lang]}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Controls: Language Toggle + Desktop Contact Quick Button + Mobile Drawer Trigger */}
        <div className="flex items-center gap-2 shrink-0">
          {PORTFOLIO_CONFIG.identity.enableLanguageToggle && (
            <button
              type="button"
              onClick={onToggleLang}
              aria-label={
                lang === 'en' ? 'Switch language to Bangla' : 'Switch language to English'
              }
              className="inline-flex items-center gap-1 rounded-full bg-[#0B1020]/80 border border-white/10 hover:border-[#77D9FF]/40 px-2.5 py-1.5 text-xs font-mono tracking-wider text-[#A7B1C4] hover:text-[#F5F7FC] transition-colors min-h-[38px]"
            >
              <span className={lang === 'en' ? 'text-[#77D9FF] font-semibold' : ''}>EN</span>
              <span className="text-white/20">/</span>
              <span className={lang === 'bn' ? 'text-[#77D9FF] font-semibold font-bangla' : 'font-bangla'}>
                বাং
              </span>
            </button>
          )}

          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, 'contact')}
            className="hidden sm:inline-flex lg:hidden xl:inline-flex items-center gap-1.5 rounded-full bg-[#F5F7FC] text-[#080D18] hover:bg-[#77D9FF] px-4 py-2 text-xs font-bold tracking-wide transition-all duration-200 shadow-sm min-h-[38px]"
          >
            <span>{lang === 'en' ? 'Let’s Talk' : 'যোগাযোগ'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center h-11 w-11 rounded-xl bg-[#0B1020]/85 border border-white/10 text-[#F5F7FC] hover:border-[#77D9FF]/40 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-navigation-drawer"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-[#080D18]/95 backdrop-blur-2xl border-b border-white/10"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex flex-col gap-1">
              {PORTFOLIO_CONFIG.navigation.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-medium transition-colors min-h-[46px] ${
                      isActive
                        ? 'bg-[#4D8DFF]/15 text-[#F5F7FC] border border-[#77D9FF]/30'
                        : 'text-[#A7B1C4] hover:text-[#F5F7FC] hover:bg-white/[0.04]'
                    }`}
                  >
                    <span>{item.label[lang]}</span>
                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-[#77D9FF] shadow-[0_0_8px_#77D9FF]" />
                    )}
                  </a>
                );
              })}

              <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 px-2">
                <a
                  href={PORTFOLIO_CONFIG.contact.emailHref}
                  className="text-xs font-mono text-[#A7B1C4] hover:text-[#77D9FF] break-all"
                >
                  {PORTFOLIO_CONFIG.contact.email}
                </a>
                <a
                  href={PORTFOLIO_CONFIG.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#4D8DFF]/20 border border-[#77D9FF]/35 px-3.5 py-1.5 text-xs font-semibold text-[#F5F7FC]"
                >
                  WhatsApp <ArrowUpRight className="w-3.5 h-3.5 text-[#77D9FF]" />
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
