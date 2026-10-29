import React from 'react';
import { ArrowUp } from 'lucide-react';
import { LanguageCode, PORTFOLIO_CONFIG } from '../config/portfolioConfig';

interface FooterProps {
  lang: LanguageCode;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const { identity, contact, footer } = PORTFOLIO_CONFIG;
  const year = new Date().getFullYear();

  const handleBackToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.replaceState(null, '', '#home');
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#080D18]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-9 pb-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#0B1020] border border-white/15 font-sans text-xs font-extrabold text-[#F5F7FC]">
            {identity.monogram}
          </span>
          <div>
            <p className="font-sans text-sm font-semibold text-[#F5F7FC]">
              {identity.fullName}
            </p>
            <p className="text-xs text-[#A7B1C4]">
              © {year} {identity.fullName}.{' '}
              {lang === 'en' ? 'All rights reserved.' : 'সর্বস্বত্ব সংরক্ষিত।'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-medium text-[#A7B1C4]">
          <a
            href={contact.emailHref}
            className="hover:text-[#77D9FF] transition-colors py-1"
          >
            Email
          </a>
          <a
            href={contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#77D9FF] transition-colors py-1"
          >
            WhatsApp
          </a>
          <a
            href={contact.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#77D9FF] transition-colors py-1"
          >
            Facebook
          </a>
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#77D9FF] transition-colors py-1"
          >
            Instagram
          </a>

          <a
            href="#home"
            onClick={handleBackToTop}
            aria-label="Back to top"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#0B1020] border border-white/15 hover:border-[#77D9FF]/45 px-3.5 py-2 text-xs font-semibold text-[#F5F7FC] transition-colors min-h-[36px]"
          >
            <span>{lang === 'en' ? 'Top' : 'উপরে'}</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#77D9FF]" />
          </a>
        </div>
      </div>

      {/* Very bottom developer signature line */}
      <div className="border-t border-white/[0.06] py-4 px-4 text-center">
        <p className="font-mono text-xs tracking-[0.14em] text-[#A7B1C4]">
          {footer.creditPrefix}{' '}
          <span className="font-semibold text-[#77D9FF]">{footer.creditAuthor}</span>
        </p>
      </div>
    </footer>
  );
};
