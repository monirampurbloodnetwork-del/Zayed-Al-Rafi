import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  PORTFOLIO_CONFIG,
  ReelId,
  SectionId,
  VideoReelConfig,
} from '../config/portfolioConfig';

export type PlaybackPhase = 'IDLE' | 'SCROLLING' | 'SECTION_CHANGE' | 'SCROLL_STOPPED';

const SECTION_ORDER: SectionId[] = [
  'home',
  'about',
  'education',
  'skills',
  'goals',
  'contact',
];

export interface ScrollVideoControllerState {
  activeSection: SectionId;
  activeReel: VideoReelConfig;
  activeReelId: ReelId;
  playbackPhase: PlaybackPhase;
  prefersReducedMotion: boolean;
  loadedReels: Record<ReelId, boolean>;
  registerVideoRef: (reelId: ReelId, el: HTMLVideoElement | null) => void;
  handleVideoLoadedMetadata: (reel: VideoReelConfig, el: HTMLVideoElement) => void;
  handleVideoCanPlay: (reel: VideoReelConfig, el: HTMLVideoElement) => void;
  handleVideoTimeUpdate: (reel: VideoReelConfig, el: HTMLVideoElement) => void;
  handleVideoError: (reelId: ReelId) => void;
  failedReels: Record<string, boolean>;
  progressBarRef: React.RefObject<HTMLDivElement>;
}

export function useScrollVideoController(): ScrollVideoControllerState {
  const reels = PORTFOLIO_CONFIG.videoReels;
  const pauseDelayMs = PORTFOLIO_CONFIG.videoController.scrollPauseDelayMs;

  const sectionToReel = useMemo(() => {
    const map = {} as Record<SectionId, VideoReelConfig>;
    for (const reel of reels) {
      for (const sec of reel.sections) {
        map[sec] = reel;
      }
    }
    return map;
  }, [reels]);

  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [activeReelId, setActiveReelId] = useState<ReelId>('reel-01');
  const [playbackPhase, setPlaybackPhase] = useState<PlaybackPhase>('IDLE');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  // Only load the initial hero reel on mount; below-the-fold reels attach lazily
  const [loadedReels, setLoadedReels] = useState<Record<ReelId, boolean>>({
    'reel-01': true,
    'reel-02': false,
    'reel-03': false,
    'reel-04': false,
    'reel-05': false,
  });
  const [failedReels, setFailedReels] = useState<Record<string, boolean>>({});

  // Refs prevent per-pixel React re-renders and keep timers deterministic
  const videoRefs = useRef<Partial<Record<ReelId, HTMLVideoElement | null>>>({});
  const initializedTimeRef = useRef<Partial<Record<ReelId, boolean>>>({});
  const activeSectionRef = useRef<SectionId>('home');
  const activeReelIdRef = useRef<ReelId>('reel-01');
  const playbackPhaseRef = useRef<PlaybackPhase>('IDLE');
  const isScrollingRef = useRef<boolean>(false);
  const prefersReducedMotionRef = useRef<boolean>(prefersReducedMotion);

  const pauseTimerRef = useRef<number | null>(null);
  const phaseSettleTimerRef = useRef<number | null>(null);
  const sectionChangeTimerRef = useRef<number | null>(null);
  const progressRafRef = useRef<number | null>(null);
  const lastSectionCheckTsRef = useRef<number>(0);
  const mountTimestampRef = useRef<number>(Date.now());
  const lastKnownScrollYRef = useRef<number>(0);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const updatePhase = useCallback((next: PlaybackPhase) => {
    if (playbackPhaseRef.current !== next) {
      playbackPhaseRef.current = next;
      setPlaybackPhase(next);
    }
  }, []);

  const ensureReelLoaded = useCallback((reelId: ReelId, preloadNeighborDirection?: 1 | -1) => {
    setLoadedReels((prev) => {
      let changed = false;
      const next = { ...prev };
      if (!next[reelId]) {
        next[reelId] = true;
        changed = true;
      }
      if (preloadNeighborDirection) {
        const idx = reels.findIndex((r) => r.id === reelId);
        const neighbor = reels[idx + preloadNeighborDirection];
        if (neighbor && !next[neighbor.id]) {
          next[neighbor.id] = true;
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [reels]);

  const pauseAllVideos = useCallback(() => {
    for (const reel of reels) {
      const vid = videoRefs.current[reel.id];
      if (vid && !vid.paused) {
        vid.pause();
      }
    }
  }, [reels]);

  const pauseInactiveVideos = useCallback(
    (keepReelId: ReelId) => {
      for (const reel of reels) {
        if (reel.id !== keepReelId) {
          const vid = videoRefs.current[reel.id];
          if (vid && !vid.paused) {
            vid.pause();
          }
        }
      }
    },
    [reels]
  );

  const playActiveReelOnly = useCallback(
    (reelId: ReelId) => {
      if (prefersReducedMotionRef.current) return;
      if (typeof document !== 'undefined' && document.hidden) return;

      pauseInactiveVideos(reelId);

      const vid = videoRefs.current[reelId];
      const reelCfg = reels.find((r) => r.id === reelId);
      if (!vid || !reelCfg) return;

      if (vid.readyState >= 1) {
        if (vid.currentTime < reelCfg.loopStart || vid.currentTime >= reelCfg.loopEnd) {
          try {
            vid.currentTime = reelCfg.initialTime;
          } catch {
            // Ignore seek before metadata ready
          }
        }
      }

      if (vid.paused) {
        const playPromise = vid.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {
            // Autoplay or low-power mode blocked playback; static poster remains visible
          });
        }
      }
    },
    [pauseInactiveVideos, reels]
  );

  /**
   * Resolves whichever section spans the viewport's editorial focal line (38% from top),
   * working identically when scrolling downward or upward across any screen height.
   */
  const resolveSectionAtViewport = useCallback((): SectionId => {
    if (typeof window === 'undefined') return 'home';
    const scrollY = window.scrollY || window.pageYOffset || 0;
    if (scrollY <= 48) return 'home';

    const docHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    if (scrollY + viewportHeight >= docHeight - 40) {
      return 'contact';
    }

    const focalY = viewportHeight * 0.38;
    let bestSection: SectionId = activeSectionRef.current;
    let closestDistance = Number.POSITIVE_INFINITY;

    for (const secId of SECTION_ORDER) {
      const el = document.getElementById(secId);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= focalY && rect.bottom >= focalY) {
        return secId;
      }
      const center = (rect.top + rect.bottom) / 2;
      const dist = Math.abs(center - focalY);
      if (dist < closestDistance) {
        closestDistance = dist;
        bestSection = secId;
      }
    }

    return bestSection;
  }, []);

  const applySectionChange = useCallback(
    (nextSection: SectionId, scrollDirection: 1 | -1) => {
      if (nextSection === activeSectionRef.current) return;
      activeSectionRef.current = nextSection;
      setActiveSection(nextSection);

      const targetReel = sectionToReel[nextSection];
      if (!targetReel) return;

      ensureReelLoaded(targetReel.id, isScrollingRef.current ? scrollDirection : undefined);

      if (targetReel.id !== activeReelIdRef.current) {
        activeReelIdRef.current = targetReel.id;
        setActiveReelId(targetReel.id);

        // Immediately pause outgoing video(s); frozen frame crossfades cleanly via CSS opacity
        pauseInactiveVideos(targetReel.id);

        if (isScrollingRef.current && !prefersReducedMotionRef.current && !document.hidden) {
          updatePhase('SECTION_CHANGE');
          playActiveReelOnly(targetReel.id);
          if (sectionChangeTimerRef.current) {
            window.clearTimeout(sectionChangeTimerRef.current);
          }
          sectionChangeTimerRef.current = window.setTimeout(() => {
            if (isScrollingRef.current) {
              updatePhase('SCROLLING');
            }
          }, 320);
        }
      }
    },
    [ensureReelLoaded, pauseInactiveVideos, playActiveReelOnly, sectionToReel, updatePhase]
  );

  // Sync reduced-motion media query
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => {
      const matches = mq.matches;
      prefersReducedMotionRef.current = matches;
      setPrefersReducedMotion(matches);
      if (matches) {
        isScrollingRef.current = false;
        if (pauseTimerRef.current) window.clearTimeout(pauseTimerRef.current);
        pauseAllVideos();
        updatePhase('IDLE');
      }
    };
    handleChange();
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, [pauseAllVideos, updatePhase]);

  // Initial section sync on mount (without playing video)
  useEffect(() => {
    mountTimestampRef.current = Date.now();
    lastKnownScrollYRef.current = window.scrollY || 0;
    const initialSec = resolveSectionAtViewport();
    const initialReel = sectionToReel[initialSec];
    activeSectionRef.current = initialSec;
    setActiveSection(initialSec);
    if (initialReel) {
      activeReelIdRef.current = initialReel.id;
      setActiveReelId(initialReel.id);
      ensureReelLoaded(initialReel.id);
    }
    pauseAllVideos();
  }, [ensureReelLoaded, pauseAllVideos, resolveSectionAtViewport, sectionToReel]);

  // IntersectionObserver for section boundary transitions
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      () => {
        const currentY = window.scrollY || 0;
        const dir: 1 | -1 = currentY >= lastKnownScrollYRef.current ? 1 : -1;
        const nextSec = resolveSectionAtViewport();
        applySectionChange(nextSec, dir);
      },
      {
        root: null,
        rootMargin: '-28% 0px -45% 0px',
        threshold: [0, 0.2, 0.5],
      }
    );

    for (const secId of SECTION_ORDER) {
      const el = document.getElementById(secId);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [applySectionChange, resolveSectionAtViewport]);

  // Passive scroll listener + 600ms debounced pause controller + page visibility guard
  useEffect(() => {
    const updateScrollProgressBar = () => {
      progressRafRef.current = null;
      const bar = progressBarRef.current;
      if (!bar) return;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const ratio = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      bar.style.transform = `scaleX(${ratio})`;
    };

    const handleScroll = () => {
      const now = Date.now();
      const currentY = window.scrollY || 0;
      const delta = currentY - lastKnownScrollYRef.current;

      // Ignore browser's initial scroll restoration fire on mount if position did not move
      if (now - mountTimestampRef.current < 140 && Math.abs(delta) < 2) {
        return;
      }

      const direction: 1 | -1 = delta >= 0 ? 1 : -1;
      lastKnownScrollYRef.current = currentY;

      if (progressRafRef.current === null) {
        progressRafRef.current = window.requestAnimationFrame(updateScrollProgressBar);
      }

      // Throttled bidirectional section verification during continuous scrolling
      if (now - lastSectionCheckTsRef.current >= 90) {
        lastSectionCheckTsRef.current = now;
        const nextSec = resolveSectionAtViewport();
        applySectionChange(nextSec, direction);
      }

      // Pre-warm immediate next reel once scrolling has genuinely started
      ensureReelLoaded(activeReelIdRef.current, direction);

      if (prefersReducedMotionRef.current || document.hidden) {
        return;
      }

      isScrollingRef.current = true;

      if (pauseTimerRef.current !== null) {
        window.clearTimeout(pauseTimerRef.current);
        pauseTimerRef.current = null;
      }
      if (phaseSettleTimerRef.current !== null) {
        window.clearTimeout(phaseSettleTimerRef.current);
        phaseSettleTimerRef.current = null;
      }

      if (playbackPhaseRef.current !== 'SECTION_CHANGE') {
        updatePhase('SCROLLING');
      }

      playActiveReelOnly(activeReelIdRef.current);

      pauseTimerRef.current = window.setTimeout(() => {
        pauseTimerRef.current = null;
        isScrollingRef.current = false;
        pauseAllVideos();
        updatePhase('SCROLL_STOPPED');

        phaseSettleTimerRef.current = window.setTimeout(() => {
          phaseSettleTimerRef.current = null;
          if (!isScrollingRef.current) {
            updatePhase('IDLE');
          }
        }, 180);
      }, pauseDelayMs);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isScrollingRef.current = false;
        if (pauseTimerRef.current !== null) {
          window.clearTimeout(pauseTimerRef.current);
          pauseTimerRef.current = null;
        }
        pauseAllVideos();
        updatePhase('IDLE');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Sync initial progress bar position
    updateScrollProgressBar();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (pauseTimerRef.current !== null) window.clearTimeout(pauseTimerRef.current);
      if (phaseSettleTimerRef.current !== null) window.clearTimeout(phaseSettleTimerRef.current);
      if (sectionChangeTimerRef.current !== null)
        window.clearTimeout(sectionChangeTimerRef.current);
      if (progressRafRef.current !== null) window.cancelAnimationFrame(progressRafRef.current);
      pauseAllVideos();
    };
  }, [
    applySectionChange,
    ensureReelLoaded,
    pauseAllVideos,
    pauseDelayMs,
    playActiveReelOnly,
    resolveSectionAtViewport,
    updatePhase,
  ]);

  const registerVideoRef = useCallback((reelId: ReelId, el: HTMLVideoElement | null) => {
    videoRefs.current[reelId] = el;
  }, []);

  const handleVideoLoadedMetadata = useCallback(
    (reel: VideoReelConfig, el: HTMLVideoElement) => {
      if (!initializedTimeRef.current[reel.id]) {
        initializedTimeRef.current[reel.id] = true;
        try {
          el.currentTime = reel.initialTime;
        } catch {
          // Safe fallback if browser defers seek
        }
      }
      // Guarantee idle videos never autoplay upon metadata load
      if (!isScrollingRef.current || activeReelIdRef.current !== reel.id || prefersReducedMotionRef.current) {
        if (!el.paused) el.pause();
      }
    },
    []
  );

  const handleVideoCanPlay = useCallback(
    (reel: VideoReelConfig, el: HTMLVideoElement) => {
      if (
        isScrollingRef.current &&
        activeReelIdRef.current === reel.id &&
        !prefersReducedMotionRef.current &&
        !document.hidden
      ) {
        if (el.paused) {
          el.play().catch(() => {});
        }
      } else if (!el.paused) {
        el.pause();
      }
    },
    []
  );

  const handleVideoTimeUpdate = useCallback(
    (reel: VideoReelConfig, el: HTMLVideoElement) => {
      if (el.currentTime >= reel.loopEnd) {
        el.currentTime = reel.loopStart;
        if (
          isScrollingRef.current &&
          activeReelIdRef.current === reel.id &&
          !prefersReducedMotionRef.current &&
          !document.hidden &&
          el.paused
        ) {
          el.play().catch(() => {});
        }
      }
    },
    []
  );

  const handleVideoError = useCallback((reelId: ReelId) => {
    setFailedReels((prev) => ({ ...prev, [reelId]: true }));
  }, []);

  const activeReel = useMemo(
    () => reels.find((r) => r.id === activeReelId) || reels[0],
    [activeReelId, reels]
  );

  return {
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
    progressBarRef,
  };
}
