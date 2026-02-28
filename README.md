# Gohar Hany - AI Business Automation Portfolio

![Portfolio Preview](./public/Hero.jpg)

## 🚀 Overview

A modern, high-performance web portfolio showcasing enterprise-grade AI automation systems. Built with React and tailored with a bespoke "V2 Deep Space Neon" dark theme, this portfolio highlights technical skills, professional experience, and in-depth case studies of agentic workflows and AI operations.

## ✨ Key Features

- **V2 Deep Space Neon Theme:** A striking dark UI aesthetic featuring neon blue (`#00c8ff`) and green (`#00ff96`) accents, glassmorphic backgrounds, and dynamic gradient text.
- **Interactive Projects Gallery:** A responsive CSS grid showcasing AI projects. Clicking a project opens a detailed, two-column split-layout modal featuring:
  - Sticky project info card with icons and technologies.
  - Tabbed interface (Overview, Features, Technical, Workflow) with scrolling content.
- **Dynamic Skills & Experience:** Structured layout with animated progress bars, detailed stat numbers, and hover-triggered glows.
- **Modern Tech Stack:** Leveraging the latest ecosystem tools for optimal performance and developer experience.

## 🛠️ Built With

- **Framework:** React + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom CSS Variables
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [lucide-react](https://lucide.dev/)

## 💻 Getting Started (Local Development)

To run this project locally, ensure you have Node.js and npm installed.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Gohar-Hany/Gohar-Hany-Portfolio.git
   ```

2. **Navigate to the directory:**
   ```bash
   cd Gohar-Hany-Portfolio
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will become available at `http://localhost:8080` (or another port output in your terminal).

## 🎨 Design System

The layout architecture relies heavily on custom CSS classes specifically formulated for the "V2" design iteration, housed within `src/index.css`:
- `.section-tag` & `.section-title`: Cohesive typography with Syne and DM Sans fonts.
- `.project-card` & `.skill-card`: Border hover states, glow shadows, and translateY transitions.
- `.stat-num` & `.stat-label`: Custom gradient text styles for metrics.
