# John Francis | Full-Stack Portfolio

A macOS-inspired interactive portfolio built with modern web technologies, featuring a desktop-like UI with draggable windows, a Finder-style file browser, and smooth animations.
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/jonnfrancis/portfolio-v2)
---

## Tech Stack

- **Frontend**: React.js, Next.js, TypeScript, Vanilla.js
- **Styling**: Tailwind CSS, Sass, CSS
- **UI/UX Design**: Figma, Canva, Dribbble
- **Backend**: Django, Node.js, Flask, Jaclang
- **Motion & 3D**: GSAP, Framer Motion, Lottie, Three.js
- **Database**: MongoDB, PostgreSQL, Prisma
- **Dev Tools**: Git, GitHub, Docker, Coolify [1](#0-0) 

---

## Featured Projects

### 🌱 BioafriSolns Ecommerce Web App
- Clean, modern platform showcasing sustainable bioenergy solutions with motion-driven storytelling.
- Built with Next.js and Tailwind CSS; optimized for performance and accessibility.
- [Live site](https://www.bioafrisolns.org/) • [Design](https://www.figma.com/design/3lKcEXUsZHXXY5NQF3rH3B/BioAfri-Soln?m=auto&t=cAkLq3YaBKAZZeEw-1) [2](#0-1) 

### 🛍️ UrbanKikapu Ecommerce Web App
- Premium e-commerce for electronics in Kenya with Pay on Delivery, WhatsApp ordering, and M-Pesa/Airtel Money.
- Mobile-first, SEO-optimized, and scalable for multi-category expansion.
- [Design](https://www.figma.com/design/rLH4RFycdhekb76vg5MtOv/Urban-Kikapu?m=auto&t=cAkLq3YaBKAZZeEw-6) [3](#0-2) 

### ☁️ StoreIt Cloud Storage App
- Secure cloud storage with OTP-based authentication via Appwrite; 2GB free storage per user.
- Supports multi-format file previews and email-based sharing.
- [Live app](https://storage-management-sigma.vercel.app/) • [GitHub](https://github.com/jonnfrancis/storage-management) [4](#0-3) 

---

## Architecture Highlights

- **Finder & File System**: Simulated hierarchical file browser with location state managed by Zustand + Immer (`useLocationStore`). Supports folders, text, images, PDFs, URLs, and Figma links.
- **Window Management**: Draggable windows with `WindowWrapper` and mobile slides with `SlideWrapper`.
- **State Management**: Zustand for location and window state; Immer for immutable updates. [5](#0-4) [6](#0-5) 

---

## Contact & Links

- **GitHub**: https://github.com/jonnfrancis
- **LinkedIn**: https://linkedin.com/in/john-francis-732259211
- **Twitter/X**: https://x.com/jonnfrancis7
- **Instagram**: https://instagram.com/johnfrancis.dev [7](#0-6) 

---

## Notes

- The portfolio UI mimics macOS with a dock, draggable windows, and a Finder-style navigation system.
- Projects are represented as folders containing `.txt` descriptions, live URLs, images, and Figma design files.
- The same codebase supports both desktop (windowed) and mobile (slide-based) layouts.

## SEO, Social & Testing Notes

- Structured data: JSON-LD for `Person`, `WebSite`, and `WebPage` is injected in `index.html` to improve search visibility.
- Open Graph / Twitter meta tags added to `index.html` and a social preview image placed at `public/images/og-image.png` (generated from `og-image.svg`).
- `public/sitemap.xml` and `public/robots.txt` were added. If your production domain differs from `https://jonnfrancis.dev/`, update those files accordingly.
- Testing: see `TESTING.md` for a manual QA checklist and recommended automated test setup (Vitest + Testing Library).

If you want CI automation, consider adding a build step to run `npm run generate:og` (generates the PNG) and to run Lighthouse during deploy.

Wiki pages you might want to explore:
- [Finder & File System Navigation (jonnfrancis/portfolio-v2)](/wiki/jonnfrancis/portfolio-v2#6.1)
