# Portfolio Website

A dynamic, fully responsive, and highly polished portfolio built with **React**, **Vite**, and **TypeScript**. Designed with premium aesthetics, rich animations, and an interactive Hexagonal Navigation system.

## 🌟 Features

- **Component-Driven Architecture:** Modular React components for easy maintenance.
- **Dynamic Content via JSON:** All core content (Projects, Skills, Education, etc.) is powered by JSON data files. No hardcoded text in components.
- **Glassmorphism & Rich Styling:** Premium UI built with Tailwind CSS, featuring glow effects, frosted glass overlays, and polished transitions.
- **Framer Motion Animations:** Staggered entrances, full-screen slideshows, and micro-interactions throughout the site.
- **Interactive Skills Graph:** A physics-based D3.js force-directed graph to visualize technical, logical, and communication skills.
- **Theme Support:** Fully configurable light & dark modes with theme-aware static backgrounds.
- **Responsive Design:** Mobile-first approach ensuring perfect display on phones, tablets, and desktops.

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS 3 / 4, raw CSS for advanced effects
- **Animations:** Framer Motion
- **Data Visualization:** D3.js
- **Linting:** Oxlint + ESLint (Type-aware)

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/TY_Portfolio.git
cd TY_Portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

## 📂 Project Structure

```
TY_Portfolio/
├── public/                 # Static assets (images, background layers, etc.)
│   └── assets/             # Global assets like project screenshots, company logos
│       └── bg/             # Theme backgrounds (used dynamically via settings)
├── src/
│   ├── components/         # Reusable UI controls (HexNav, Modal, PageTransition)
│   ├── data/               # ⚡ DATA HUB: Edit these JSONs to update site content
│   │   ├── _achievements.json
│   │   ├── _contacts.json
│   │   ├── _education.json
│   │   ├── _extracurriculars.json
│   │   ├── _intro.json
│   │   ├── _projects.json
│   │   ├── _settings.json  # Background routing configs
│   │   └── _skills.json
│   ├── hooks/              # Custom React hooks (useTheme)
│   ├── pages/              # Section layouts (HomePage, ProjectsPage, etc.)
│   ├── types/              # strict TypeScript interfaces mapping to data models
│   ├── App.tsx             # Main routing shell
│   ├── index.css           # Global theme variables, animations, components
│   └── main.tsx            # Vite Entry
```

## 📝 How to Update Content

You never need to edit React components to update your information! Just modify the files in `src/data/`:

- **Projects:** Add a new JSON object to `src/data/projects.json`. Include your image in `public/assets/` and link its path.
- **Skills:** Add a skill to `src/data/skills.json`. Specify its `proficiency` (1-100) and `type` (technical, communication, logical) to automatically render it in the D3 Graph.
- **Backgrounds:** Change backgrounds per page by modifying `src/data/settings.json`.

## 🌐 Deployment

This site is statically generated and optimized for immediate deployment on platforms like Vercel, Netlify, or GitHub Pages.

1. Connect your Github Repo to **Vercel**
2. Set Build Command to `npm run build`
3. Set Output directory to `dist`
4. Deploy!

## 📜 License

MIT License. See [LICENSE](LICENSE) for more information.
