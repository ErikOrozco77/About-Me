<script setup lang="ts">
import { t } from "../../i18n/utils/translate";
</script>

<template>
  <section class="curriculum-section curriculum-projects" id="projects">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">{{ "// projects" }}</span>
        <h2 class="section-title">{{ t("featured-projects") }}</h2>
        <p class="section-description">{{ t("projects-desc") }}</p>
      </div>

      <div class="projects-grid">

        <article class="project-card">
          <div class="project-image">
            <img src="/projects/colima-eventos.jpg" alt="Colima Eventos y Banquetes" class="project-preview" loading="lazy" />
            <div class="project-overlay">
              <a href="https://www.colimaeventosybanquetes.com" target="_blank" rel="noopener noreferrer" class="project-link-overlay">
                <i class="fas fa-external-link-alt"></i> {{ t("view-project") }}
              </a>
            </div>
          </div>
          <div class="project-info">
            <span class="project-number">01</span>
            <h3 class="project-title">{{ t("project-1-title") }}</h3>
            <p class="project-description">{{ t("project-1-desc") }}</p>
            <div class="project-tags">
              <span class="tag">HTML</span>
              <span class="tag">CSS</span>
              <span class="tag">JavaScript</span>
              <span class="tag">Web Design</span>
            </div>
            <a href="https://www.colimaeventosybanquetes.com" target="_blank" rel="noopener noreferrer" class="project-btn">
              {{ t("view-project") }} <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </article>

        <article class="project-card">
          <div class="project-image">
            <img src="/projects/sias.jpg" alt="SIAS — Institutional Platform" class="project-preview" loading="lazy" />
            <div class="project-overlay">
              <a href="https://sias.stjdigitalcolima.gob.mx/adquisiciones" target="_blank" rel="noopener noreferrer" class="project-link-overlay">
                <i class="fas fa-external-link-alt"></i> {{ t("view-project") }}
              </a>
            </div>
          </div>
          <div class="project-info">
            <span class="project-number">02</span>
            <h3 class="project-title">{{ t("project-2-title") }}</h3>
            <p class="project-description">{{ t("project-2-desc") }}</p>
            <div class="project-tags">
              <span class="tag">Angular</span>
              <span class="tag">TypeScript</span>
              <span class="tag">Node.js</span>
              <span class="tag">SQL</span>
            </div>
            <a href="https://sias.stjdigitalcolima.gob.mx/adquisiciones" target="_blank" rel="noopener noreferrer" class="project-btn">
              {{ t("view-project") }} <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </article>

        <article class="project-card">
          <div class="project-image">
            <img src="/projects/nev-parfums.jpg" alt="NEV Parfums — Online Store" class="project-preview" loading="lazy" />
            <div class="project-overlay">
              <a href="https://nevparfums.com" target="_blank" rel="noopener noreferrer" class="project-link-overlay">
                <i class="fas fa-external-link-alt"></i> {{ t("view-project") }}
              </a>
            </div>
          </div>
          <div class="project-info">
            <span class="project-number">03</span>
            <h3 class="project-title">{{ t("project-3-title") }}</h3>
            <p class="project-description">{{ t("project-3-desc") }}</p>
            <div class="project-tags">
              <span class="tag">E-Commerce</span>
              <span class="tag">PHP</span>
              <span class="tag">JavaScript</span>
              <span class="tag">MySQL</span>
            </div>
            <a href="https://nevparfums.com" target="_blank" rel="noopener noreferrer" class="project-btn">
              {{ t("view-project") }} <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </article>

      </div>
    </div>
  </section>
</template>

<style scoped>
.curriculum-projects {
  background: var(--bg-0, #030305);
  padding: 96px 0;
  color: var(--t-1, #f1f5f9);
  width: 100%;
}

:global(.curriculum-section) {
  --bg-0: #030305;
  --bg-1: #080812;
  --accent: #6366f1;
  --accent-2: #8b5cf6;
  --accent-3: #06b6d4;
  --accent-bg: rgba(99,102,241,.1);
  --accent-b: rgba(99,102,241,.22);
  --t-1: #f1f5f9;
  --t-2: #94a3b8;
  --t-3: #475569;
  --glass: rgba(255,255,255,.04);
  --glass-b: rgba(255,255,255,.07);
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;
  --font-display: 'Chakra Petch', 'Inter', system-ui, sans-serif;
  --ease: all .3s cubic-bezier(.4,0,.2,1);
}

.container {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
}

.section-header {
  text-align: center;
  margin-bottom: 56px;
}

.section-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: .1em;
  text-transform: uppercase;
  margin-bottom: 10px;
  font-family: var(--font-mono);
}
.section-tag::before { content: '[ '; color: var(--accent-3); }
.section-tag::after  { content: ' ]'; color: var(--accent-3); }

.section-title {
  font-size: clamp(26px, 3.8vw, 40px);
  font-weight: 700;
  letter-spacing: -.02em;
  margin-bottom: 12px;
  font-family: var(--font-display);
  color: var(--t-1);
}

.section-description {
  color: var(--t-2);
  font-size: 15px;
  max-width: 480px;
  margin: 0 auto;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.project-card {
  background: var(--glass);
  border: 1px solid var(--glass-b);
  border-radius: 16px;
  overflow: hidden;
  transition: var(--ease);
  backdrop-filter: blur(12px);
}

.project-card:hover {
  border-color: rgba(99,102,241,.28);
  background: rgba(255,255,255,.055);
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0,0,0,.3);
}

.project-image {
  position: relative;
  width: 100%;
  aspect-ratio: 16/10;
  overflow: hidden;
}

.project-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.project-overlay {
  position: absolute;
  inset: 0;
  background: rgba(3,3,5,.75);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--ease);
  backdrop-filter: blur(4px);
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-link-overlay {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: 1px solid rgba(255,255,255,.15);
  border-radius: 8px;
  color: var(--t-1);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: var(--ease);
  background: rgba(99,102,241,.15);
}

.project-link-overlay:hover {
  background: rgba(99,102,241,.3);
  border-color: var(--accent);
}

.project-info {
  padding: 22px;
}

.project-number {
  font-size: 11px;
  font-weight: 700;
  color: var(--accent);
  font-family: var(--font-mono);
  display: block;
  margin-bottom: 8px;
}

.project-title {
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--t-1);
  letter-spacing: -.01em;
}

.project-description {
  font-size: 13px;
  color: var(--t-2);
  margin-bottom: 16px;
  line-height: 1.6;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 18px;
}

.tag {
  padding: 3px 10px;
  background: var(--accent-bg);
  border: 1px solid var(--accent-b);
  border-radius: 100px;
  font-size: 11px;
  font-weight: 600;
  color: #a5b4fc;
}

.project-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
  transition: var(--ease);
}

.project-btn:hover {
  gap: 10px;
  color: #fff;
}

@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
