# Zayed Al Rafi — Cinematic Personal Portfolio

Official personal portfolio website for **Zayed Al Rafi**, engineered with **React 18, TypeScript, Vite, Tailwind CSS, and Motion**, featuring a full-viewport **scroll-activated background cinema system**.

---

## Key Architecture Highlights

1. **Scroll-Activated Background Cinema (`src/hooks/useScrollVideoController.ts` & `src/components/BackgroundVideoStage.tsx`)**
   - Five full-viewport (`100% × 100dvh`) background videos mapped to sections:
     - `01-hero-intro.mp4` (`Website_hero_animation_creation_e74ddf56.mp4`) → **Hero (`#home`)**
     - `02-portrait-reveal.mp4` (`minimax-h3-max_a_Create_an_exactly_8-.mp4`) → **About Me (`#about`)**
     - `03-3d-architecture.mp4` (`3D_motion_design_clip_eac0fee3.mp4`) → **Education (`#education`) & Skills/Interests (`#skills`)**
     - `04-project-showcase.mp4` (`Create_3D_motion_graphics_clip_5e39a886.mp4`) → **Future Goals (`#goals`)**
     - `05-signature-outro.mp4` (`Creating_website_portfolio_outro…_f2328ef4.mp4`) → **Contact (`#contact`) & Footer**
   - **Idle by default**: Shows crisp static poster frames on load without autoplaying all videos.
   - **Scroll-reactive playback**: Plays only the active section's video when scrolling begins, resets a `600ms` debounced timer while scrolling continues, and pauses ~600ms after scrolling stops while preserving the rendered frame.
   - **Bidirectional section transitions**: Smooth `720ms` crossfade in both downward and upward scroll directions, immediately pausing inactive videos.
   - **Lazy loading & accessibility**: Only the initial hero video metadata loads on mount; below-the-fold videos attach lazily as reached. Automatically pauses on hidden tabs (`visibilitychange`) and falls back to static posters when `prefers-reduced-motion: reduce` is enabled.

2. **Single Editable Configuration (`src/config/portfolioConfig.ts`)**
   - Update personal info, bilingual English/Bangla copy, educational milestones, skills, interests, future goals, and social links in one place.
   - Privacy control: `displayDateOfBirth` is set to `false` by default so your date of birth remains private.

---

## Local Development & Build

```bash
npm install
npm run dev      # Starts dev server on http://localhost:5173
npm run build    # Type-checks and outputs production static site to ./gh-pages-site
npm run preview  # Previews production build on http://localhost:4173
```

---

## Deploying to GitHub Pages

Vite is configured with `base: './'`, so every asset (`./assets/*`, `./videos/*`, `./posters/*`, `./images/*`) works seamlessly both at a root domain (`https://<username>.github.io/`) and under any repository subpath (such as `https://zarif5193.github.io/zarifhasann.github.io/`).

### Option A — Instant Static Upload (Zero CLI Needed, Works Directly on Existing GitHub Pages Repo)
The complete, pre-built static website is already compiled inside the **`gh-pages-site/`** directory:
1. Open your target GitHub Pages repository (e.g., `zarif5193/zarifhasann.github.io` or your own `<username>.github.io` repository).
2. Replace the root static files on the `main` branch with the contents of **`gh-pages-site/`** (`index.html`, `.nojekyll`, `favicon.svg`, `assets/`, `images/`, `posters/`, `videos/`).
3. Commit to `main` — GitHub Pages will publish the live site within ~60 seconds.

### Option B — Full Source Repository + Automated GitHub Actions
1. Push this entire project directory (`zayed-portfolio/`) to the `main` branch of your GitHub repository.
2. In GitHub, go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
3. The included `.github/workflows/deploy.yml` workflow will automatically run `npm ci && npm run build` and deploy `./gh-pages-site` on every push to `main`.
