/* ═══════════════════════════════════════════════════════════════════════
   ERIK OROZCO — PORTFOLIO  |  script.js
   Partículas · Matrix Rain · Code Tokens · GSAP Animations · Boot Screen
   ═══════════════════════════════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────────────────────────────────────
   0. IDIOMA (inglés por defecto, toggle a español)
   ────────────────────────────────────────────────────────────────────── */
let currentLang = localStorage.getItem('lang') || 'en';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-es]').forEach(el => {
    if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
    el.innerHTML = lang === 'es' ? el.dataset.es : el.dataset.en;
  });

  document.querySelectorAll('[data-es-placeholder]').forEach(el => {
    if (el.dataset.enPlaceholder === undefined) el.dataset.enPlaceholder = el.getAttribute('placeholder');
    el.setAttribute('placeholder', lang === 'es' ? el.dataset.esPlaceholder : el.dataset.enPlaceholder);
  });

  // Invalida el caché del efecto scramble para que use el texto nuevo
  document.querySelectorAll('.section-title').forEach(t => { delete t.dataset.text; });

  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = lang === 'es' ? 'EN' : 'ES';
}

function initLang() {
  const btn = document.getElementById('langToggle');
  if (currentLang === 'es') applyLang('es');
  else if (btn) btn.textContent = 'ES';
  if (btn) btn.addEventListener('click', () => applyLang(currentLang === 'es' ? 'en' : 'es'));
}

/* ──────────────────────────────────────────────────────────────────────
   1. HERO PARTICLES (fondo de nodos + líneas)
   ────────────────────────────────────────────────────────────────────── */
const heroCanvas = document.getElementById('particles');
const hCtx = heroCanvas.getContext('2d');
let heroParticles = [];
let heroRaf = null;

function resizeHeroCanvas() {
  heroCanvas.width  = window.innerWidth;
  heroCanvas.height = window.innerHeight;
}

class HeroParticle {
  constructor() { this.reset(true); }
  reset(randomY = false) {
    this.x  = Math.random() * heroCanvas.width;
    this.y  = randomY ? Math.random() * heroCanvas.height : Math.random() * heroCanvas.height;
    this.r  = Math.random() * 1.3 + 0.2;
    this.vx = (Math.random() - .5) * .3;
    this.vy = (Math.random() - .5) * .3;
    this.a  = Math.random() * .45 + .08;
    this.ta = Math.random() * .01  + .003;
    this.td = 1;
    this.col = Math.random() > .88 ? '#6366f1' : '#8899bb';
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    this.a += this.ta * this.td;
    if (this.a > .55 || this.a < .04) this.td *= -1;
    if (this.x < -2 || this.x > heroCanvas.width + 2 ||
        this.y < -2 || this.y > heroCanvas.height + 2) this.reset();
  }
  draw() {
    hCtx.globalAlpha = this.a;
    hCtx.fillStyle   = this.col;
    hCtx.beginPath();
    hCtx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    hCtx.fill();
  }
}

function initHeroParticles() {
  resizeHeroCanvas();
  const n = Math.min(Math.floor((heroCanvas.width * heroCanvas.height) / 9000), 160);
  heroParticles = Array.from({ length: n }, () => new HeroParticle());
}

function drawHeroLines() {
  const MAX = 110, MAX2 = MAX * MAX;
  for (let i = 0; i < heroParticles.length; i++) {
    for (let j = i + 1; j < heroParticles.length; j++) {
      const dx = heroParticles[i].x - heroParticles[j].x;
      const dy = heroParticles[i].y - heroParticles[j].y;
      const d2 = dx * dx + dy * dy;
      if (d2 < MAX2) {
        hCtx.globalAlpha = (1 - Math.sqrt(d2) / MAX) * .07;
        hCtx.strokeStyle = '#6366f1';
        hCtx.lineWidth   = .5;
        hCtx.beginPath();
        hCtx.moveTo(heroParticles[i].x, heroParticles[i].y);
        hCtx.lineTo(heroParticles[j].x, heroParticles[j].y);
        hCtx.stroke();
      }
    }
  }
}

function heroTick() {
  hCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
  hCtx.globalAlpha = 1;
  heroParticles.forEach(p => { p.update(); p.draw(); });
  drawHeroLines();
  hCtx.globalAlpha = 1;
  heroRaf = requestAnimationFrame(heroTick);
}

/* ──────────────────────────────────────────────────────────────────────
   2. FLOATING CODE TOKENS (hero layer)
   ────────────────────────────────────────────────────────────────────── */
const TOKEN_POOL = [
  { t:'<div>',          c:'cyan'   },
  { t:'</div>',         c:'cyan'   },
  { t:'const',          c:''       },
  { t:'async/await',    c:''       },
  { t:'import Angular', c:'purple' },
  { t:'function()',     c:''       },
  { t:'=> {}',          c:''       },
  { t:'SELECT *',       c:'green'  },
  { t:'JOIN ON id',     c:'green'  },
  { t:'npm install',    c:'green'  },
  { t:'git push',       c:'green'  },
  { t:'ng build',       c:'purple' },
  { t:'node server.js', c:'green'  },
  { t:'192.168.1.1',    c:'cyan'   },
  { t:'ssh root@',      c:'cyan'   },
  { t:'sudo systemctl', c:'cyan'   },
  { t:'ping 8.8.8.8',   c:'cyan'   },
  { t:'<?php',          c:'purple' },
  { t:'$query->get()',  c:'purple' },
  { t:'200 OK',         c:'green'  },
  { t:'404 Not Found',  c:''       },
  { t:'localhost:4200', c:'cyan'   },
  { t:'mikrotik>',      c:'cyan'   },
  { t:'/api/v1/',       c:''       },
  { t:'0xDEADBEEF',     c:'purple' },
  { t:'01001000',       c:''       },
  { t:'git commit -m',  c:'green'  },
  { t:'interface eth0', c:'cyan'   },
  { t:'new Promise()',  c:''       },
  { t:'try { catch }',  c:''       },
  { t:'claude code',    c:'purple' },
  { t:'codex exec',     c:'green'  },
  { t:'antigravity',    c:'cyan'   },
  { t:'gsap.to()',      c:'green'  },
];

const tokenLayer = document.getElementById('codeTokensLayer');
let activeTokens = 0;
const MAX_TOKENS = 18;

function spawnToken() {
  if (!tokenLayer || activeTokens >= MAX_TOKENS) return;
  const item = TOKEN_POOL[Math.floor(Math.random() * TOKEN_POOL.length)];
  const el   = document.createElement('span');
  el.className = 'code-token-float' + (item.c ? ' ' + item.c : '');
  el.textContent = item.t;
  el.style.left             = `${5 + Math.random() * 88}%`;
  el.style.animationDuration = `${5 + Math.random() * 7}s`;
  el.style.animationDelay   = `${Math.random() * 1.5}s`;
  el.style.fontSize         = `${9 + Math.random() * 5}px`;
  el.style.opacity          = (Math.random() * 0.3 + 0.12).toString();
  tokenLayer.appendChild(el);
  activeTokens++;

  el.addEventListener('animationend', () => {
    el.remove();
    activeTokens--;
    setTimeout(spawnToken, Math.random() * 800);
  });
}

function initCodeTokens() {
  for (let i = 0; i < MAX_TOKENS; i++) {
    setTimeout(spawnToken, i * 350 + Math.random() * 400);
  }
}

/* ──────────────────────────────────────────────────────────────────────
   3. MATRIX CODE RAIN (tech section background)
   ────────────────────────────────────────────────────────────────────── */
const matrixCanvas = document.getElementById('matrixCanvas');
let matrixRaf = null;

function initMatrix() {
  if (!matrixCanvas) return;
  const mCtx    = matrixCanvas.getContext('2d');
  const section = document.getElementById('tech');

  function resize() {
    matrixCanvas.width  = section.offsetWidth;
    matrixCanvas.height = section.offsetHeight;
  }
  resize();

  const CHARS = '01アイウエオ</>{}[]()#$%&=+-*ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghij';
  const FONT_SIZE = 13;
  const cols  = Math.floor(matrixCanvas.width / FONT_SIZE);
  const drops = Array.from({ length: cols }, () => Math.random() * -50);

  function drawMatrix() {
    mCtx.fillStyle = 'rgba(3,3,5,.06)';
    mCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

    mCtx.font      = `${FONT_SIZE}px 'Courier New', monospace`;
    mCtx.fillStyle = '#6366f1';

    for (let i = 0; i < drops.length; i++) {
      const char = CHARS[Math.floor(Math.random() * CHARS.length)];
      const x    = i * FONT_SIZE;
      const y    = drops[i] * FONT_SIZE;

      // Head glow
      mCtx.fillStyle = '#a5b4fc';
      mCtx.fillText(char, x, y);

      // Body
      mCtx.fillStyle = '#6366f1';
      const prevChar = CHARS[Math.floor(Math.random() * CHARS.length)];
      mCtx.fillText(prevChar, x, y - FONT_SIZE);

      if (y > matrixCanvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i] += .45;
    }
    matrixRaf = requestAnimationFrame(drawMatrix);
  }
  drawMatrix();

  // Only run when section is visible
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { if (!matrixRaf) drawMatrix(); }
    else { cancelAnimationFrame(matrixRaf); matrixRaf = null; }
  }, { threshold: 0.05 });
  obs.observe(section);

  window.addEventListener('resize', () => {
    resize();
    drops.length = 0;
    const newCols = Math.floor(matrixCanvas.width / FONT_SIZE);
    for (let i = 0; i < newCols; i++) drops.push(0);
  }, { passive: true });
}

/* ──────────────────────────────────────────────────────────────────────
   4. NAVIGATION
   ────────────────────────────────────────────────────────────────────── */
const nav        = document.getElementById('nav');
const navToggle  = document.getElementById('navToggle');
const navLinks   = document.getElementById('navLinks');
const allNavLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const offset   = window.scrollY + window.innerHeight * .35;
  sections.forEach(sec => {
    const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
    if (link) link.classList.toggle('active', offset >= sec.offsetTop && offset < sec.offsetTop + sec.offsetHeight);
  });
}

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  setActiveLink();
}, { passive: true });

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
});

allNavLinks.forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  navToggle.classList.remove('open');
}));

/* ──────────────────────────────────────────────────────────────────────
   5. STATS COUNTER
   ────────────────────────────────────────────────────────────────────── */
function animCount(el) {
  const target = +el.dataset.target;
  const start  = performance.now();
  const dur    = 1900;
  const run = t => {
    const pct = Math.min((t - start) / dur, 1);
    el.textContent = Math.floor((1 - Math.pow(1 - pct, 3)) * target);
    if (pct < 1) requestAnimationFrame(run);
    else el.textContent = target;
  };
  requestAnimationFrame(run);
}

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) {
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      statsGrid.querySelectorAll('[data-target]').forEach(animCount);
    }
  }, { threshold: .4 }).observe(statsGrid);
}

/* ──────────────────────────────────────────────────────────────────────
   6. CONTACT FORM → WhatsApp
   ────────────────────────────────────────────────────────────────────── */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const n = form.name.value.trim();
    const m = form.email.value.trim();
    const s = form.subject.value.trim();
    const b = form.message.value.trim();
    if (!n || !m || !b) return;

    const text = encodeURIComponent(
      `Hola Erik! Te contacto desde tu portafolio.\nNombre: ${n}\nEmail: ${m}` +
      (s ? `\nAsunto: ${s}` : '') + `\nMensaje: ${b}`
    );
    window.open(`https://wa.me/523121336288?text=${text}`, '_blank', 'noopener');

    const btn = form.querySelector('[type=submit]');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> ' + (currentLang === 'es' ? '¡Enviado!' : 'Sent!');
    btn.style.cssText += ';background:linear-gradient(135deg,#22c55e,#16a34a);box-shadow:0 4px 18px rgba(34,197,94,.4);';
    btn.disabled = true;
    setTimeout(() => { btn.innerHTML = orig; btn.style.cssText = ''; btn.disabled = false; form.reset(); }, 3200);
  });
}

/* ──────────────────────────────────────────────────────────────────────
   7. FOOTER YEAR
   ────────────────────────────────────────────────────────────────────── */
const yearEl = document.getElementById('currentYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ──────────────────────────────────────────────────────────────────────
   8. RESIZE (debounced)
   ────────────────────────────────────────────────────────────────────── */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    cancelAnimationFrame(heroRaf);
    initHeroParticles();
    heroTick();
  }, 220);
}, { passive: true });

/* ──────────────────────────────────────────────────────────────────────
   9. TYPEWRITER
   ────────────────────────────────────────────────────────────────────── */
const TYPE_LINES = {
  en: [
    'Computer Engineer',
    'Full Stack Developer',
    'Angular · Node.js · PHP',
    'AI-Assisted Development',
    'Claude · Codex · Antigravity',
    'IT Infrastructure',
    'Networks & Telecom',
  ],
  es: [
    'Ingeniero Informático',
    'Full Stack Developer',
    'Angular · Node.js · PHP',
    'Desarrollo Asistido por IA',
    'Claude · Codex · Antigravity',
    'Infraestructura TI',
    'Redes & Telecomunicaciones',
  ],
};

function initTypewriter() {
  const el = document.getElementById('typeText');
  if (!el) return;

  let li = 0, ci = 0, deleting = false;

  function tick() {
    const lines = TYPE_LINES[currentLang] || TYPE_LINES.en;
    li %= lines.length;
    const cur = lines[li];
    if (!deleting) {
      el.textContent = cur.slice(0, ci + 1);
      ci++;
      if (ci >= cur.length) {
        ci = cur.length;
        deleting = true;
        setTimeout(tick, 1900);
        return;
      }
      setTimeout(tick, 68);
    } else {
      ci = Math.min(ci, cur.length);
      el.textContent = cur.slice(0, ci - 1);
      ci--;
      if (ci <= 0) {
        ci = 0;
        deleting = false;
        li = (li + 1) % lines.length;
        setTimeout(tick, 320);
        return;
      }
      setTimeout(tick, 34);
    }
  }
  setTimeout(tick, 900);
}

/* ──────────────────────────────────────────────────────────────────────
   10. SCROLL PROGRESS BAR
   ────────────────────────────────────────────────────────────────────── */
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : '0%';
  }, { passive: true });
}

/* ──────────────────────────────────────────────────────────────────────
   11. CUSTOM CURSOR + MAGNETIC BUTTONS
   ────────────────────────────────────────────────────────────────────── */
function initCursor() {
  if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;

  const dot  = document.createElement('div');
  const ring = document.createElement('div');
  dot.className  = 'cursor-dot';
  ring.className = 'cursor-ring';
  dot.setAttribute('aria-hidden', 'true');
  ring.setAttribute('aria-hidden', 'true');
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mx = -200, my = -200;
  let rx = -200, ry = -200;

  /* Dot follows instantly */
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  /* Ring follows with lerp */
  (function lerpRing() {
    rx += (mx - rx) * .13;
    ry += (my - ry) * .13;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(lerpRing);
  })();

  /* Hover state on interactive elements */
  const SEL = 'a,button,.btn,.social-icon,.tech-card,.project-card,.nav-link,.project-btn,.social-btn,.stat-card';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(SEL)) { dot.classList.add('hov'); ring.classList.add('hov'); }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(SEL)) { dot.classList.remove('hov'); ring.classList.remove('hov'); }
  });

  /* Click pulse */
  document.addEventListener('mousedown', () => { dot.classList.add('clk'); ring.classList.add('clk'); });
  document.addEventListener('mouseup',   () => { dot.classList.remove('clk'); ring.classList.remove('clk'); });

  /* ── Magnetic effect ── */
  const STRENGTH = 0.30;
  const RANGE    = 72;

  document.querySelectorAll('.btn, .social-icon, .social-btn, .project-btn').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r  = el.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      if (Math.hypot(dx, dy) < RANGE) {
        el.style.transition = 'transform .1s var(--ease)';
        el.style.transform  = `translate(${dx * STRENGTH}px,${dy * STRENGTH}px)`;
      }
    });
    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform .45s var(--ease)';
      el.style.transform  = '';
    });
  });
}

/* ──────────────────────────────────────────────────────────────────────
   12. 3D TILT CARDS
   ────────────────────────────────────────────────────────────────────── */
function initTilt() {
  if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;

  function addTilt(sel, maxDeg, persp) {
    document.querySelectorAll(sel).forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - .5;
        const y = (e.clientY - r.top)  / r.height - .5;
        card.style.transition = 'transform .05s linear';
        card.style.transform  = `perspective(${persp}px) rotateX(${-y * maxDeg}deg) rotateY(${x * maxDeg}deg) translateZ(6px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform .55s var(--ease)';
        card.style.transform  = '';
      });
    });
  }

  addTilt('.project-card',  10, 700);
  addTilt('.tech-card',      7, 550);
  addTilt('.timeline-card',  4, 900);
  addTilt('.stat-card',      6, 550);
  addTilt('.education-card', 4, 900);
}

/* ──────────────────────────────────────────────────────────────────────
   13. BOOT SCREEN (terminal de arranque)
   ────────────────────────────────────────────────────────────────────── */
let playHeroIntro = null; // asignada por initGsap()

function initBoot() {
  const boot = document.getElementById('bootScreen');
  const out  = document.getElementById('bootOutput');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const playIntro = () => { if (playHeroIntro) playHeroIntro(); };

  if (!boot || !out || reduced) {
    if (boot) boot.remove();
    document.body.classList.remove('boot-lock');
    playIntro();
    return;
  }

  document.body.classList.add('boot-lock');

  const BOOT_LINES = {
    en: [
      '> boot erik-orozco.system --v2.0',
      '> stack: angular · node · typescript · sql ... OK',
      '> ai.tools: claude · codex · antigravity ..... OK',
      '> networks: mikrotik · ubiquiti · wisp ....... OK',
      '> loading interface ▓▓▓▓▓▓▓▓▓▓ 100%',
    ],
    es: [
      '> boot erik-orozco.system --v2.0',
      '> stack: angular · node · typescript · sql ... OK',
      '> ia.tools: claude · codex · antigravity ..... OK',
      '> redes: mikrotik · ubiquiti · wisp .......... OK',
      '> iniciando interfaz ▓▓▓▓▓▓▓▓▓▓ 100%',
    ],
  };
  const lines = BOOT_LINES[currentLang] || BOOT_LINES.en;

  let closed = false;
  function closeBoot() {
    if (closed) return;
    closed = true;
    document.body.classList.remove('boot-lock');
    if (window.gsap) {
      gsap.to(boot, {
        yPercent: -100,
        duration: .75,
        ease: 'power4.inOut',
        onComplete: () => boot.remove(),
      });
    } else {
      boot.remove();
    }
    playIntro();
  }

  let i = 0;
  function typeLine() {
    if (closed) return;
    if (i >= lines.length) { setTimeout(closeBoot, 320); return; }
    const div = document.createElement('div');
    div.className = 'boot-line';
    out.appendChild(div);
    const text = lines[i++];
    let c = 0;
    (function ch() {
      if (closed) return;
      div.textContent = text.slice(0, ++c);
      if (c < text.length) setTimeout(ch, 7);
      else setTimeout(typeLine, 110);
    })();
  }

  boot.addEventListener('click', closeBoot);
  setTimeout(closeBoot, 5000); // seguridad: nunca bloquear más de 5s
  typeLine();
}

/* ──────────────────────────────────────────────────────────────────────
   14. GSAP — ANIMACIONES (intro hero, reveals, parallax, scramble)
   ────────────────────────────────────────────────────────────────────── */
function initGsap() {
  if (!window.gsap || !window.ScrollTrigger) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  /* ── Intro del hero (se reproduce al cerrar el boot screen) ── */
  const intro = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
  intro
    .from('.nav', { y: -70, autoAlpha: 0, duration: .6 })
    .from('.hero-badge', { y: 24, autoAlpha: 0, duration: .5 }, '-=.25')
    .from('.hero-name', { y: 44, autoAlpha: 0, duration: .7 }, '-=.3')
    .from('.hero-title', { y: 20, autoAlpha: 0, duration: .5 }, '-=.45')
    .from('.hero-subtitle', { y: 20, autoAlpha: 0, duration: .5 }, '-=.35')
    .from('.hero-actions .btn', { y: 18, autoAlpha: 0, stagger: .09, duration: .45 }, '-=.3')
    .from('.hero-social .social-icon', { y: 14, autoAlpha: 0, stagger: .06, duration: .4 }, '-=.3')
    .from('.hero-image-container', { scale: .8, autoAlpha: 0, duration: .9, ease: 'back.out(1.5)' }, .35)
    .from('.floating-card', { y: 24, autoAlpha: 0, stagger: .14, duration: .5 }, '-=.45')
    .set(['.nav', '.hero-badge', '.hero-name', '.hero-title', '.hero-subtitle',
          '.hero-actions .btn', '.hero-social .social-icon',
          '.hero-image-container', '.floating-card'], { clearProps: 'all' });

  playHeroIntro = () => intro.play();

  /* ── Parallax del hero con scrub ── */
  gsap.to('.hero-content', {
    yPercent: 22, ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
  });
  gsap.to('.hero-image-wrapper', {
    yPercent: 12, ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
  });

  /* ── Helper: reveal por lotes con stagger ── */
  function revealBatch(targets, vars = {}) {
    const els = gsap.utils.toArray(targets);
    if (!els.length) return;
    gsap.set(els, {
      autoAlpha: 0,
      y: vars.y !== undefined ? vars.y : 30,
      x: vars.x !== undefined ? vars.x : 0,
      scale: vars.scale !== undefined ? vars.scale : 1,
    });
    ScrollTrigger.batch(els, {
      start: 'top 90%',
      once: true,
      onEnter: batch => gsap.to(batch, {
        autoAlpha: 1, y: 0, x: 0, scale: 1,
        duration: vars.duration || .65,
        stagger: vars.stagger !== undefined ? vars.stagger : .08,
        ease: vars.ease || 'power3.out',
        clearProps: 'transform,opacity,visibility',
      }),
    });
  }

  revealBatch('.section-header',            { y: 38, duration: .75 });
  revealBatch('.about-text p',              { y: 24 });
  revealBatch('.highlight-item',            { x: -34, y: 0, stagger: .1 });
  revealBatch('.stat-card',                 { y: 0, scale: .82, stagger: .1, ease: 'back.out(1.6)' });
  revealBatch('.tech-cat-title',            { x: -26, y: 0 });
  revealBatch('.tech-card',                 { y: 22, scale: .88, stagger: .05, duration: .5, ease: 'back.out(1.7)' });
  revealBatch('.project-card',              { y: 56, stagger: .13, duration: .8 });
  revealBatch('.education-card',            { y: 44 });
  revealBatch('.objective-content',         { y: 44, scale: .96 });
  revealBatch('.contact-item',              { x: -34, y: 0, stagger: .1 });
  revealBatch('.contact-form-wrapper',      { y: 40 });
  revealBatch('.footer-content',            { y: 24 });

  /* ── Timeline: tarjetas desde la izquierda + línea que se dibuja ── */
  gsap.utils.toArray('.timeline-item').forEach(item => {
    gsap.from(item.querySelector('.timeline-card'), {
      x: -48, autoAlpha: 0, duration: .7, ease: 'power3.out',
      clearProps: 'transform,opacity,visibility',
      scrollTrigger: { trigger: item, start: 'top 85%', once: true },
    });
    const dot = item.querySelector('.marker-dot');
    if (dot) gsap.from(dot, {
      scale: 0, duration: .45, ease: 'back.out(2.5)',
      clearProps: 'transform',
      scrollTrigger: { trigger: item, start: 'top 85%', once: true },
    });
    const line = item.querySelector('.marker-line');
    if (line) gsap.from(line, {
      scaleY: 0, transformOrigin: 'top center', ease: 'none',
      scrollTrigger: { trigger: item, start: 'top 80%', end: 'bottom 55%', scrub: true },
    });
  });

  /* ── Scramble/decode en títulos de sección ── */
  const SCRAMBLE_CHARS = '<>/[]{}#$%&01';
  function scrambleTitle(el) {
    const original = el.dataset.text || (el.dataset.text = el.textContent);
    const total = 16;
    let frame = 0;
    const iv = setInterval(() => {
      frame++;
      const reveal = Math.floor((frame / total) * original.length);
      let outStr = original.slice(0, reveal);
      for (let k = reveal; k < original.length; k++) {
        outStr += original[k] === ' ' ? ' ' : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      el.textContent = outStr;
      if (frame >= total) { clearInterval(iv); el.textContent = original; }
    }, 36);
  }

  gsap.utils.toArray('.section-title').forEach(title => {
    ScrollTrigger.create({
      trigger: title,
      start: 'top 88%',
      once: true,
      onEnter: () => scrambleTitle(title),
    });
  });

  /* ── Glows del hero con leve drift ── */
  gsap.to('.hero-glow-1', { x: -60, y: 50, duration: 14, yoyo: true, repeat: -1, ease: 'sine.inOut' });
  gsap.to('.hero-glow-2', { x: 70, y: -40, duration: 17, yoyo: true, repeat: -1, ease: 'sine.inOut' });
}

/* ──────────────────────────────────────────────────────────────────────
   INIT
   ────────────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLang();
  initHeroParticles();
  heroTick();
  initCodeTokens();
  initMatrix();
  setActiveLink();

  initTypewriter();
  initScrollProgress();
  initCursor();
  initTilt();

  initGsap();
  initBoot();
});
