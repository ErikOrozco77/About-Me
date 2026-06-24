<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { t } from "../../i18n/utils/translate";
import { locale } from "../../i18n/store";

const typeText = ref("");
const typeLines: { en: string[]; es: string[] } = {
  en: [
    "Computer Engineer",
    "Full Stack Developer",
    "Angular · Node.js · PHP",
    "AI-Assisted Development",
    "Claude · Codex · Antigravity",
    "IT Infrastructure",
    "Networks & Telecom",
  ],
  es: [
    "Ingeniero Informático",
    "Full Stack Developer",
    "Angular · Node.js · PHP",
    "Desarrollo Asistido por IA",
    "Claude · Codex · Antigravity",
    "Infraestructura TI",
    "Redes & Telecomunicaciones",
  ],
};

const photoError = ref(false);
const particlesCanvasRef = ref<HTMLCanvasElement | null>(null);
const tokenLayerRef = ref<HTMLDivElement | null>(null);

let rafId: number | null = null;
let typeTimer: ReturnType<typeof setTimeout> | null = null;
let tokenTimers: ReturnType<typeof setTimeout>[] = [];

interface HeroParticle {
  x: number; y: number; r: number;
  vx: number; vy: number;
  a: number; ta: number; td: number;
  col: string;
}

let heroParticles: HeroParticle[] = [];

function resizeCanvas(canvas: HTMLCanvasElement) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initParticles(canvas: HTMLCanvasElement) {
  resizeCanvas(canvas);
  const n = Math.min(Math.floor((canvas.width * canvas.height) / 9000), 160);
  heroParticles = Array.from({ length: n }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.3 + 0.2,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    a: Math.random() * 0.45 + 0.08,
    ta: Math.random() * 0.01 + 0.003,
    td: 1,
    col: Math.random() > 0.88 ? "#6366f1" : "#8899bb",
  }));
}

function drawParticles(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  heroParticles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    p.a += p.ta * p.td;
    if (p.a > 0.55 || p.a < 0.04) p.td *= -1;
    if (p.x < -2 || p.x > canvas.width + 2 || p.y < -2 || p.y > canvas.height + 2) {
      p.x = Math.random() * canvas.width;
      p.y = Math.random() * canvas.height;
    }
    ctx.globalAlpha = p.a;
    ctx.fillStyle = p.col;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
  const MAX = 110;
  for (let i = 0; i < heroParticles.length; i++) {
    for (let j = i + 1; j < heroParticles.length; j++) {
      const pi = heroParticles[i]!;
      const pj = heroParticles[j]!;
      const dx = pi.x - pj.x;
      const dy = pi.y - pj.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < MAX * MAX) {
        ctx.globalAlpha = (1 - Math.sqrt(d2) / MAX) * 0.07;
        ctx.strokeStyle = "#6366f1";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(pi.x, pi.y);
        ctx.lineTo(pj.x, pj.y);
        ctx.stroke();
      }
    }
  }
}

function startParticles(canvas: HTMLCanvasElement) {
  initParticles(canvas);
  function tick() {
    drawParticles(canvas);
    rafId = requestAnimationFrame(tick);
  }
  tick();
}

/* ── Floating Code Tokens ── */
const TOKEN_POOL = [
  { t: "<div>", c: "cyan" },
  { t: "</div>", c: "cyan" },
  { t: "const", c: "" },
  { t: "async/await", c: "" },
  { t: "import Angular", c: "purple" },
  { t: "function()", c: "" },
  { t: "=> {}", c: "" },
  { t: "SELECT *", c: "green" },
  { t: "JOIN ON id", c: "green" },
  { t: "npm install", c: "green" },
  { t: "git push", c: "green" },
  { t: "ng build", c: "purple" },
  { t: "node server.js", c: "green" },
  { t: "192.168.1.1", c: "cyan" },
  { t: "ssh root@", c: "cyan" },
  { t: "sudo systemctl", c: "cyan" },
  { t: "ping 8.8.8.8", c: "cyan" },
  { t: "<?php", c: "purple" },
  { t: "$query->get()", c: "purple" },
  { t: "200 OK", c: "green" },
  { t: "404 Not Found", c: "" },
  { t: "localhost:4200", c: "cyan" },
  { t: "mikrotik>", c: "cyan" },
  { t: "/api/v1/", c: "" },
  { t: "0xDEADBEEF", c: "purple" },
  { t: "01001000", c: "" },
  { t: "git commit -m", c: "green" },
  { t: "interface eth0", c: "cyan" },
  { t: "new Promise()", c: "" },
  { t: "try { catch }", c: "" },
  { t: "claude code", c: "purple" },
  { t: "codex exec", c: "green" },
  { t: "antigravity", c: "cyan" },
  { t: "gsap.to()", c: "green" },
];

let activeTokens = 0;
const MAX_TOKENS = 18;

function spawnToken() {
  if (!tokenLayerRef.value || activeTokens >= MAX_TOKENS) return;
  const item = TOKEN_POOL[Math.floor(Math.random() * TOKEN_POOL.length)]!;
  const el = document.createElement("span");
  el.className = "code-token-float" + (item.c ? " " + item.c : "");
  el.textContent = item.t;
  el.style.left = `${5 + Math.random() * 88}%`;
  el.style.animationDuration = `${5 + Math.random() * 7}s`;
  el.style.animationDelay = `${Math.random() * 1.5}s`;
  el.style.fontSize = `${9 + Math.random() * 5}px`;
  el.style.opacity = String(Math.random() * 0.3 + 0.12);
  tokenLayerRef.value.appendChild(el);
  activeTokens++;

  const onEnd = () => {
    el.remove();
    activeTokens--;
    const t = setTimeout(spawnToken, Math.random() * 800);
    tokenTimers.push(t);
  };
  el.addEventListener("animationend", onEnd, { once: true });
}

function initCodeTokens() {
  for (let i = 0; i < MAX_TOKENS; i++) {
    const t = setTimeout(spawnToken, i * 350 + Math.random() * 400);
    tokenTimers.push(t);
  }
}

/* ── Typewriter ── */
function startTypewriter() {
  if (typeTimer) clearTimeout(typeTimer);
  const lang = locale.value || "en";
  const lines = (typeLines[lang] || typeLines.en)!;
  let li = 0, ci = 0, deleting = false;
  function tick() {
    li %= lines.length;
    const cur = lines[li]!;
    if (!deleting) {
      typeText.value = cur.slice(0, ci + 1);
      ci++;
      if (ci >= cur.length) {
        ci = cur.length;
        deleting = true;
        typeTimer = setTimeout(tick, 1900);
        return;
      }
      typeTimer = setTimeout(tick, 68);
    } else {
      ci = Math.min(ci, cur.length);
      typeText.value = cur.slice(0, ci - 1);
      ci--;
      if (ci <= 0) {
        ci = 0;
        deleting = false;
        li = (li + 1) % lines.length;
        typeTimer = setTimeout(tick, 320);
        return;
      }
      typeTimer = setTimeout(tick, 34);
    }
  }
  typeTimer = setTimeout(tick, 900);
}

watch(locale, () => { startTypewriter(); });

onMounted(() => {
  if (particlesCanvasRef.value) startParticles(particlesCanvasRef.value);
  startTypewriter();
  initCodeTokens();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId);
  if (typeTimer) clearTimeout(typeTimer);
  tokenTimers.forEach(t => clearTimeout(t));
  window.removeEventListener("resize", handleResize);
});

function handleResize() {
  if (particlesCanvasRef.value) resizeCanvas(particlesCanvasRef.value);
}
</script>

<template>
  <section class="curriculum-hero" id="hero">
    <canvas ref="particlesCanvasRef" class="hero-particles-canvas"></canvas>
    <div class="hero-glow hero-glow-1"></div>
    <div class="hero-glow hero-glow-2"></div>

    <div class="hero-container">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          <span>{{ t("available-projects") }}</span>
        </div>
        <h1 class="hero-name">
          Erik Alejandro<br>
          <span class="gradient-text">Orozco Alcaraz</span>
        </h1>
        <p class="hero-title">
          <span>{{ typeText }}</span><span class="type-cursor">|</span>
        </p>
        <p class="hero-subtitle">{{ t("about-tagline") }}</p>
        <div class="hero-actions">
          <a href="/CV.pdf" class="hero-btn hero-btn-primary" download>
            <i class="fas fa-download"></i> {{ t("download-cv") }}
          </a>
          <a href="#contact" class="hero-btn hero-btn-secondary">
            <i class="fas fa-paper-plane"></i> {{ t("contact-me") }}
          </a>
        </div>
        <div class="hero-social">
          <a href="https://wa.me/523121336288" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="WhatsApp">
            <i class="fab fa-whatsapp"></i>
          </a>
          <a href="mailto:orozcoalcarazerik@gmail.com" class="social-icon" aria-label="Email">
            <i class="fas fa-envelope"></i>
          </a>
        </div>
      </div>

      <div class="hero-image-wrapper">
        <div class="hero-image-container">
          <div class="image-ring image-ring-1"></div>
          <div class="image-ring image-ring-2"></div>
          <div class="image-ring image-ring-3"></div>
          <img src="/ERIK.jpeg" alt="Erik Alejandro Orozco Alcaraz" class="hero-photo" @error="photoError = true" v-if="!photoError" />
          <div class="hero-photo-fallback" v-else><i class="fas fa-user"></i></div>
        </div>
        <div class="floating-card card-1">
          <i class="fas fa-code"></i><span>Full Stack</span>
        </div>
        <div class="floating-card card-2">
          <i class="fas fa-server"></i><span>Infrastructure</span>
        </div>
      </div>
    </div>

    <div class="code-tokens-layer" ref="tokenLayerRef"></div>

    <div class="scroll-indicator">
      <div class="scroll-line"></div>
      <span>Scroll</span>
    </div>
  </section>
</template>

<style scoped>
/* ── CSS Variables ── */
.curriculum-hero {
  --nav-h: 64px;
  --bg-0: #030305;
  --bg-1: #080812;
  --glass: rgba(255,255,255,.04);
  --glass-b: rgba(255,255,255,.07);
  --glass-b-hover: rgba(255,255,255,.14);
  --accent: #6366f1;
  --accent-2: #8b5cf6;
  --accent-3: #06b6d4;
  --t-1: #f1f5f9;
  --t-2: #94a3b8;
  --t-3: #475569;
  --r-md: 12px;
  --font-display: 'Chakra Petch','Inter',system-ui,sans-serif;
  --font-mono: 'JetBrains Mono','Courier New',monospace;

  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--bg-0);
  padding-top: var(--nav-h, 64px);
  color: var(--t-1);
  width: 100%;
}

.hero-particles-canvas {
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
}

.hero-glow {
  position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.12; z-index: 0; pointer-events: none;
}
.hero-glow-1 {
  width: 700px; height: 700px;
  background: radial-gradient(circle, var(--accent), transparent 70%);
  top: -250px; right: -150px;
  animation: float 9s ease-in-out infinite;
}
.hero-glow-2 {
  width: 450px; height: 450px;
  background: radial-gradient(circle, var(--accent-3), transparent 70%);
  bottom: -120px; left: -100px;
  animation: float 12s ease-in-out infinite reverse;
}

.hero-container {
  position: relative; z-index: 1;
  max-width: 1160px; margin: 0 auto; padding: 60px 24px;
  display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; width: 100%;
}

/* Badge */
.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 5px 14px; background: rgba(99,102,241,.1);
  border: 1px solid rgba(99,102,241,.25); border-radius: 100px;
  font-size: 12px; font-weight: 500; color: #a5b4fc; margin-bottom: 24px;
}
.badge-dot {
  width: 6px; height: 6px; background: #22c55e; border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

/* Text */
.hero-name {
  font-size: clamp(34px,5vw,62px); font-weight: 700; line-height: 1.08;
  letter-spacing: -.02em; margin-bottom: 16px; font-family: var(--font-display);
}
.hero-title {
  font-size: clamp(12px,1.5vw,15px); color: var(--t-2); font-weight: 500;
  margin-bottom: 14px; letter-spacing: .01em; font-family: var(--font-mono);
}
.type-cursor {
  display: inline-block; width: 2px; height: 1em;
  background: var(--accent); margin-left: 3px; vertical-align: text-bottom;
  animation: blink .72s step-end infinite;
}
.hero-subtitle {
  font-size: 15px; color: var(--t-3); margin-bottom: 36px; max-width: 420px;
}
.gradient-text {
  background: linear-gradient(135deg, var(--accent), var(--accent-2) 50%, var(--accent-3));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}

/* Buttons */
.hero-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 36px; }
.hero-btn {
  display: inline-flex; align-items: center; gap: 8px; padding: 11px 22px;
  border-radius: var(--r-md); font-size: 14px; font-weight: 600; cursor: pointer;
  border: none; transition: all .3s cubic-bezier(.4,0,.2,1);
  letter-spacing: .01em; white-space: nowrap; text-decoration: none;
}
.hero-btn-primary {
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: #fff; box-shadow: 0 4px 18px rgba(99,102,241,.35);
}
.hero-btn-primary:hover {
  transform: translateY(-2px); box-shadow: 0 8px 28px rgba(99,102,241,.5);
}
.hero-btn-secondary {
  background: var(--glass); color: var(--t-1);
  border: 1px solid var(--glass-b); backdrop-filter: blur(12px);
}
.hero-btn-secondary:hover {
  background: var(--glass-b); border-color: var(--glass-b-hover); transform: translateY(-2px);
}

/* Social */
.hero-social { display: flex; gap: 10px; }
.social-icon {
  width: 42px; height: 42px; display: flex; align-items: center; justify-content: center;
  background: var(--glass); border: 1px solid var(--glass-b);
  border-radius: var(--r-md); color: var(--t-2); font-size: 15px;
  transition: all .3s cubic-bezier(.4,0,.2,1); backdrop-filter: blur(12px); text-decoration: none;
}
.social-icon:hover { color: var(--t-1); border-color: var(--glass-b-hover); transform: translateY(-2px); }

/* Photo */
.hero-image-wrapper { display: flex; align-items: center; justify-content: center; position: relative; }
.hero-image-container { position: relative; width: 300px; height: 300px; }
.image-ring {
  position: absolute; border-radius: 50%; border: 1px solid;
  animation: spin linear infinite; pointer-events: none;
}
.image-ring-1 { inset: -22px; border-color: rgba(99,102,241,.2); animation-duration: 22s; }
.image-ring-2 { inset: -44px; border-color: rgba(99,102,241,.1); animation-duration: 33s; animation-direction: reverse; }
.image-ring-3 { inset: -66px; border-color: rgba(139,92,246,.06); animation-duration: 44s; }
.hero-photo, .hero-photo-fallback {
  width: 100%; height: 100%; object-fit: cover; border-radius: 50%;
  border: 3px solid var(--glass-b); box-shadow: 0 0 60px rgba(99,102,241,.22), inset 0 0 40px rgba(99,102,241,.04);
}
.hero-photo-fallback { background: var(--bg-1); display: flex; align-items: center; justify-content: center; font-size: 72px; color: var(--t-3); }

/* Floating cards */
.floating-card {
  position: absolute; display: flex; align-items: center; gap: 8px;
  padding: 10px 14px; background: rgba(8,8,18,.85);
  border: 1px solid var(--glass-b); border-radius: var(--r-md);
  backdrop-filter: blur(20px); font-size: 13px; font-weight: 600;
  white-space: nowrap; pointer-events: none;
}
.floating-card i { color: var(--accent); font-size: 15px; }
.card-1 { bottom: 10px; left: -70px; animation: float 5s ease-in-out infinite; }
.card-2 { top: 10px; right: -70px; animation: float 6s ease-in-out infinite; animation-delay: -2.5s; }

/* Scroll indicator */
.scroll-indicator {
  position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  color: var(--t-3); font-size: 10px; letter-spacing: .12em;
  text-transform: uppercase; z-index: 1;
}
.scroll-line {
  width: 1px; height: 38px;
  background: linear-gradient(to bottom, var(--accent), transparent);
  animation: scrollLine 2s ease-in-out infinite;
}

/* ═══ FLOATING CODE TOKENS ═══ */
.code-tokens-layer {
  position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden;
}
:deep(.code-token-float) {
  position: absolute; bottom: -30px;
  font-family: 'Courier New', monospace;
  font-size: 11px; font-weight: 600;
  color: var(--accent); white-space: nowrap;
  pointer-events: none;
  animation: tokenRise linear forwards;
  text-shadow: 0 0 8px rgba(99,102,241,.6);
  letter-spacing: .04em;
}
:deep(.code-token-float.green)  { color: #22c55e; text-shadow: 0 0 8px rgba(34,197,94,.5); }
:deep(.code-token-float.cyan)   { color: var(--accent-3); text-shadow: 0 0 8px rgba(6,182,212,.5); }
:deep(.code-token-float.purple) { color: var(--accent-2); text-shadow: 0 0 8px rgba(139,92,246,.5); }

/* ═══ RESPONSIVE ═══ */
@media (max-width: 820px) {
  .hero-container { grid-template-columns: 1fr; text-align: center; gap: 36px; }
  .hero-image-wrapper { order: -1; }
  .hero-image-container { width: 220px; height: 220px; }
  .hero-actions, .hero-social { justify-content: center; }
  .hero-subtitle { margin: 0 auto 36px; }
  .card-1 { left: -10px; bottom: -10px; }
  .card-2 { right: -10px; top: -10px; }
}
@media (max-width: 480px) {
  .hero-name { font-size: 30px; }
  .hero-image-container { width: 180px; height: 180px; }
  .image-ring-1 { inset: -14px; }
  .image-ring-2 { inset: -28px; }
  .image-ring-3 { inset: -42px; }
  .floating-card { display: none; }
}

/* ═══ KEYFRAMES ═══ */
@keyframes float {
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(-14px); }
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes pulse {
  0%,100% { opacity: 1; transform: scale(1); }
  50%     { opacity: .5; transform: scale(.75); }
}
@keyframes scrollLine {
  0%   { transform: scaleY(0); transform-origin: top; }
  49%  { transform: scaleY(1); transform-origin: top; }
  51%  { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}
@keyframes blink {
  0%,100% { opacity: 1; }
  50%     { opacity: 0; }
}
@keyframes tokenRise {
  0%   { transform: translateY(0) translateX(0); opacity: 0; }
  8%   { opacity: 1; }
  88%  { opacity: .7; }
  100% { transform: translateY(-110vh) translateX(30px); opacity: 0; }
}
</style>
