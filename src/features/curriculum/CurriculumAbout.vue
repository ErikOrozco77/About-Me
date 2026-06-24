<script setup lang="ts">
import { ref, onMounted } from "vue";
import { t } from "../../i18n/utils/translate";

const stats = [
  { target: 3, suffix: "+", label: "years-experience", icon: null },
  { target: 20, suffix: "+", label: "projects-developed", icon: null },
  { target: null, suffix: null, label: "fullstack-dev", icon: "fa-layer-group" },
  { target: null, suffix: null, label: "networks-infra", icon: "fa-network-wired" },
];

const statsGridRef = ref<HTMLElement | null>(null);

function animCount(el: HTMLElement, target: number) {
  const start = performance.now();
  const dur = 1900;
  function run(t: number) {
    const pct = Math.min((t - start) / dur, 1);
    el.textContent = String(Math.floor((1 - Math.pow(1 - pct, 3)) * target));
    if (pct < 1) requestAnimationFrame(run);
    else el.textContent = String(target);
  }
  requestAnimationFrame(run);
}

onMounted(() => {
  if (!statsGridRef.value) return;
  const obs = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry && entry.isIntersecting) {
        const els = statsGridRef.value?.querySelectorAll('.stat-number');
        if (els) {
          els.forEach((el) => {
            const htmlEl = el as HTMLElement;
            const idx = parseInt(htmlEl.dataset.index || '0', 10);
            const stat = stats[idx];
            if (stat && stat.target) {
              animCount(htmlEl, stat.target);
            }
          });
        }
        obs.disconnect();
      }
    },
    { threshold: 0.4 }
  );
  obs.observe(statsGridRef.value);
});
</script>

<template>
  <section class="curriculum-section curriculum-about" id="about">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">{{ t("about-me") }}</span>
        <h2 class="section-title">{{ t("who-i-am") }}</h2>
      </div>
      <div class="about-grid">
        <div class="about-text">
          <p>{{ t("about-intro") }}</p>
          <p>{{ t("about-intro-2") }}</p>
          <p v-html="t('about-intro-3')"></p>
          <div class="about-highlights">
            <div class="highlight-item">
              <div class="highlight-icon"><i class="fas fa-graduation-cap"></i></div>
              <div>
                <strong>{{ t("institution") }}</strong>
                <span>{{ t("degree-holder") }}</span>
              </div>
            </div>
            <div class="highlight-item">
              <div class="highlight-icon"><i class="fas fa-map-marker-alt"></i></div>
              <div>
                <strong>{{ t("germany") }}</strong>
                <span>{{ t("remote") }}</span>
              </div>
            </div>
            <div class="highlight-item">
              <div class="highlight-icon"><i class="fas fa-certificate"></i></div>
              <div>
                <strong>{{ t("professional-license") }}</strong>
                <span>{{ t("computer-engineering") }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="stats-grid" ref="statsGridRef">
          <div class="stat-card" v-for="(stat, i) in stats.filter(s => s.target)" :key="i">
            <div class="stat-top">
              <span class="stat-number" :data-index="i">0</span>
              <span class="stat-suffix">{{ stat.suffix }}</span>
            </div>
            <p class="stat-label" v-html="t(stat.label)"></p>
          </div>
          <div class="stat-card stat-icon-card" v-for="(stat, i) in stats.filter(s => !s.target)" :key="'icon-' + i">
            <i :class="'fas ' + stat.icon + ' stat-icon'"></i>
            <p class="stat-label-icon" v-html="t(stat.label)"></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
