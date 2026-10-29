import React from 'react';
import { PORTFOLIO_CONFIG } from '../config/portfolioConfig';
import { ScrollVideoControllerState } from '../hooks/useScrollVideoController';

interface BackgroundVideoStageProps {
  controller: ScrollVideoControllerState;
}

export const BackgroundVideoStage: React.FC<BackgroundVideoStageProps> = ({ controller }) => {
  const {
    activeSection,
    activeReel,
    activeReelId,
    playbackPhase,
    prefersReducedMotion,
    loadedReels,
    registerVideoRef,
    handleVideoLoadedMetadata,
    handleVideoCanPlay,
    handleVideoTimeUpdate,
    handleVideoError,
    failedReels,
  } = controller;

  const crossfadeMs = PORTFOLIO_CONFIG.videoController.crossfadeDurationMs;
  const isPlayingVisual =
    (playbackPhase === 'SCROLLING' || playbackPhase === 'SECTION_CHANGE') &&
    !prefersReducedMotion;

  return (
    <>
      <div
        id="cinema-background-stage"
        aria-hidden="true"
        data-active-section={activeSection}
        data-active-reel={activeReelId}
        data-playback-phase={playbackPhase}
        data-reduced-motion={String(prefersReducedMotion)}
        className="fixed inset-0 z-0 w-full h-screen h-[100dvh] overflow-hidden pointer-events-none select-none bg-[#080D18]"
      >
        {/* Base atmospheric navy ambient lighting fallback */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 76% 28%, rgba(77, 141, 255, 0.14) 0%, rgba(11, 16, 32, 0.6) 45%, #080D18 85%)',
          }}
        />

        {/* Five section-mapped background cinema layers */}
        {PORTFOLIO_CONFIG.videoReels.map((reel) => {
          const isActive = reel.id === activeReelId;
          const isLoaded = Boolean(loadedReels[reel.id]);
          const hasFailed = Boolean(failedReels[reel.id]);

          const posStyle = {
            '--reel-pos-desktop': reel.objectPosition,
            '--reel-pos-mobile': reel.mobileObjectPosition,
            transitionDuration: `${crossfadeMs}ms`,
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          } as React.CSSProperties;

          return (
            <div
              key={reel.id}
              data-reel-layer={reel.id}
              data-reel-active={String(isActive)}
              style={posStyle}
              className={`absolute inset-0 transition-opacity will-change-[opacity] ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Static poster layer guarantees instant visual frame & reduced-motion fallback */}
              <img
                src={reel.posterSrc}
                alt=""
                loading={reel.id === 'reel-01' ? 'eager' : 'lazy'}
                decoding="async"
                className="reel-media absolute inset-0"
              />

              {/* Scroll-activated HTML5 background video */}
              {!prefersReducedMotion && !hasFailed && (
                <video
                  ref={(el) => registerVideoRef(reel.id, el)}
                  data-reel-video={reel.id}
                  src={isLoaded ? reel.videoSrc : undefined}
                  poster={reel.posterSrc}
                  preload={isLoaded ? 'metadata' : 'none'}
                  muted
                  playsInline
                  disablePictureInPicture
                  tabIndex={-1}
                  onLoadedMetadata={(e) => handleVideoLoadedMetadata(reel, e.currentTarget)}
                  onCanPlay={(e) => handleVideoCanPlay(reel, e.currentTarget)}
                  onTimeUpdate={(e) => handleVideoTimeUpdate(reel, e.currentTarget)}
                  onError={() => handleVideoError(reel.id)}
                  className="reel-media absolute inset-0"
                />
              )}
            </div>
          );
        })}

        {/* Directional editorial readability scrim — preserves video clarity on right while keeping copy crisp */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(96deg, rgba(8, 13, 24, 0.84) 0%, rgba(8, 13, 24, 0.58) 46%, rgba(8, 13, 24, 0.22) 78%, rgba(8, 13, 24, 0.42) 100%)',
          }}
        />

        {/* Top & bottom cinema letterbox feathering */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(8, 13, 24, 0.74) 0%, rgba(8, 13, 24, 0.12) 20%, rgba(8, 13, 24, 0.16) 78%, rgba(8, 13, 24, 0.86) 100%)',
          }}
        />

        {/* Subtle architectural grid & soft cyan edge vignette */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 85%)',
          }}
        />
      </div>

      {/* Subtle non-interactive Cinema Reel HUD badge (widescreen outer gutter only — never overlaps content) */}
      <div
        aria-hidden="true"
        className="fixed bottom-5 right-5 z-20 hidden 2xl:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#080D18]/75 border border-white/10 backdrop-blur-md pointer-events-none select-none shadow-lg"
      >
        <span
          className={`h-2 w-2 rounded-full transition-all duration-300 ${
            prefersReducedMotion
              ? 'bg-[#A7B1C4]/60'
              : isPlayingVisual
              ? 'bg-[#77D9FF] shadow-[0_0_10px_#77D9FF] scale-110'
              : 'bg-[#4D8DFF]/55'
          }`}
        />
        <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#A7B1C4]">
          {activeReel.title}
        </span>
        <span className="text-white/20 text-[10px]">|</span>
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#77D9FF]/90">
          {prefersReducedMotion ? 'Static' : isPlayingVisual ? 'Motion' : 'Standby'}
        </span>
      </div>
    </>
  );
};
