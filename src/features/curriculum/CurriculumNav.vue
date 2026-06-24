<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { locale } from "../../i18n/store";

const scrolled = ref(false);
const mobileOpen = ref(false);
const activeSection = ref("");
const progressWidth = ref("0%");

const sections = ["hero", "about", "tech", "experience", "projects", "education", "contact"];

const labels = {
  en: ["Home", "About Me", "Tech Stack", "Experience", "Projects", "Education", "Contact"],
  es: ["Inicio", "Sobre Mí", "Tecnologías", "Experiencia", "Proyectos", "Educación", "Contacto"],
};

function currentLabels() {
  return locale.value === "es" ? labels.es : labels.en;
}

function updateScrollState() {
  scrolled.value = window.scrollY > 20;

  const scrollY = window.scrollY + window.innerHeight * 0.35;
  let best = "hero";
  for (const id of sections) {
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const bottom = top + rect.height;
    if (scrollY >= top && scrollY < bottom) {
      best = id;
      break;
    }
  }
  activeSection.value = best;
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth" });
  mobileOpen.value = false;
}

let ticking = false;
function onScroll() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(() => {
      updateScrollState();
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressWidth.value = max > 0 ? `${(window.scrollY / max) * 100}%` : "0%";
      ticking = false;
    });
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") mobileOpen.value = false;
}

onMounted(() => {
  updateScrollState();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <nav class="curriculum-nav" :class="{ scrolled }">
    <div class="scroll-progress" :style="{ width: progressWidth }" aria-hidden="true"></div>
    <div class="nav-container">
      <a href="#hero" class="nav-logo" @click.prevent="scrollTo('hero')">
        EO<span class="accent-dot">.</span>
      </a>
      <ul class="nav-links" :class="{ open: mobileOpen }">
        <li v-for="(id, i) in sections" :key="id">
          <a
            :href="`#${id}`"
            class="nav-link"
            :class="{ active: activeSection === id }"
            @click.prevent="scrollTo(id)"
          >{{ currentLabels()[i] }}</a>
        </li>
      </ul>
      <div class="nav-actions">
        <button
          class="lang-toggle"
          @click="locale = locale === 'es' ? 'en' : 'es'"
          aria-label="Switch language / Cambiar idioma"
        >{{ locale === 'es' ? 'EN' : 'ES' }}</button>
        <button
          class="nav-toggle"
          :class="{ open: mobileOpen }"
          @click="mobileOpen = !mobileOpen"
          aria-label="Open menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.curriculum-nav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 1000;
  height: var(--nav-h, 64px);
  border-bottom: 1px solid transparent;
  transition: all .35s cubic-bezier(.4,0,.2,1);
  --nav-h: 64px;
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
  --r-sm: 6px;
  --r-md: 12px;
  --font-display: 'Chakra Petch', 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;
  --tx: all .3s cubic-bezier(.4,0,.2,1);
}

.scroll-progress {
  position: fixed;
  top: 0; left: 0;
  height: 2px;
  width: 0%;
  background: linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3));
  z-index: 9999;
  box-shadow: 0 0 10px rgba(99,102,241,.7);
  pointer-events: none;
  transition: width .05s linear;
}

.curriculum-nav.scrolled {
  background: rgba(3,3,5,.88);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom-color: var(--glass-b);
}

.nav-container {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 24px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -.02em;
  font-family: var(--font-display);
  color: var(--t-1);
  text-decoration: none;
  cursor: pointer;
}

.accent-dot {
  color: var(--accent);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  padding: 6px 13px;
  border-radius: var(--r-sm);
  font-size: 13px;
  font-weight: 500;
  color: var(--t-2);
  transition: var(--tx);
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
}

.nav-link:hover,
.nav-link.active {
  color: var(--t-1);
  background: var(--glass);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.lang-toggle {
  padding: 6px 13px;
  background: var(--accent-bg);
  border: 1px solid var(--accent-b);
  border-radius: var(--r-sm);
  color: #a5b4fc;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .1em;
  cursor: pointer;
  transition: var(--tx);
}

.lang-toggle:hover {
  background: rgba(99,102,241,.22);
  border-color: rgba(99,102,241,.45);
  color: #fff;
  transform: translateY(-1px);
}

.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.nav-toggle span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--t-1);
  border-radius: 2px;
  transition: var(--tx);
}

.nav-toggle.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.nav-toggle.open span:nth-child(2) { opacity: 0; }
.nav-toggle.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

@media (max-width: 820px) {
  .nav-links {
    position: fixed;
    top: var(--nav-h, 64px);
    left: 0;
    right: 0;
    flex-direction: column;
    background: rgba(3,3,5,.96);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    padding: 16px;
    gap: 4px;
    transform: translateY(-8px);
    opacity: 0;
    pointer-events: none;
    transition: var(--tx);
    border-bottom: 1px solid var(--glass-b);
  }

  .nav-links.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }

  .nav-link {
    padding: 13px 16px;
    font-size: 15px;
    border-radius: var(--r-md);
  }

  .nav-toggle {
    display: flex;
  }
}
</style>
