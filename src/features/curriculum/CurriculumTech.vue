<script setup lang="ts">
import { ref } from "vue";
import { t } from "../../i18n/utils/translate";

const DEVIcon = (path: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}`;

const categories = ref([
  {
    title: "ai-assisted-dev",
    icon: "fa-microchip",
    items: [
      { type: "custom", icon: "fa-star-of-life", color: "#d97757", bg: "rgba(217,119,87,.15)", label: "Claude" },
      { type: "custom", icon: "fa-terminal", color: "#10a37f", bg: "rgba(16,163,127,.15)", label: "Codex" },
      { type: "custom", icon: "fa-rocket", color: "#4285f4", bg: "rgba(66,133,244,.15)", label: "Antigravity" },
    ],
    ai: true,
  },
  {
    title: "frontend",
    icon: "fa-desktop",
    items: [
      { type: "img", src: DEVIcon("angularjs/angularjs-original.svg"), label: "Angular" },
      { type: "img", src: DEVIcon("typescript/typescript-original.svg"), label: "TypeScript" },
      { type: "img", src: DEVIcon("javascript/javascript-original.svg"), label: "JavaScript" },
      { type: "img", src: DEVIcon("html5/html5-original.svg"), label: "HTML5" },
      { type: "img", src: DEVIcon("css3/css3-original.svg"), label: "CSS3" },
    ],
  },
  {
    title: "backend",
    icon: "fa-server",
    items: [
      { type: "img", src: DEVIcon("nodejs/nodejs-original.svg"), label: "Node.js" },
      { type: "img", src: DEVIcon("php/php-original.svg"), label: "PHP" },
      { type: "custom", icon: "fa-plug", color: "#06b6d4", bg: "rgba(6,182,212,.15)", label: "REST API" },
    ],
  },
  {
    title: "databases",
    icon: "fa-database",
    items: [
      { type: "img", src: DEVIcon("mysql/mysql-original.svg"), label: "MySQL" },
      { type: "img", src: DEVIcon("microsoftsqlserver/microsoftsqlserver-plain.svg"), label: "SQL Server" },
    ],
  },
  {
    title: "infrastructure",
    icon: "fa-network-wired",
    items: [
      { type: "img", src: DEVIcon("linux/linux-original.svg"), label: "Linux" },
      { type: "img", src: DEVIcon("windows8/windows8-original.svg"), label: "Windows Server" },
      { type: "img", src: DEVIcon("git/git-original.svg"), label: "Git" },
      { type: "img", src: DEVIcon("github/github-original.svg"), label: "GitHub", invert: true },
      { type: "custom", icon: "fa-cloud", color: "#22c55e", bg: "rgba(34,197,94,.15)", label: "Hosting" },
      { type: "custom", icon: "fa-globe", color: "#f97316", bg: "rgba(249,115,22,.15)", label: "Networks" },
    ],
  },
  {
    title: "telecom",
    icon: "fa-tower-broadcast",
    items: [
      { type: "custom", icon: "fa-router", color: "#ef4444", bg: "rgba(239,68,68,.15)", label: "MikroTik" },
      { type: "custom", icon: "fa-wifi", color: "#3b82f6", bg: "rgba(59,130,246,.15)", label: "Ubiquiti" },
      { type: "custom", icon: "fa-network-wired", color: "#a855f7", bg: "rgba(168,85,247,.15)", label: "LAN" },
      { type: "custom", icon: "fa-satellite-dish", color: "#eab308", bg: "rgba(234,179,8,.15)", label: "WISP" },
    ],
  },
]);
</script>

<template>
  <section class="curriculum-section curriculum-tech" id="tech">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">{{ t("tech-stack-tag") }}</span>
        <h2 class="section-title">{{ t("tech-stack") }}</h2>
        <p class="section-description">{{ t("tech-stack-desc") }}</p>
      </div>

      <div class="tech-categories">
        <div class="tech-category" v-for="cat in categories" :key="cat.title">
          <h3 class="tech-cat-title"><i :class="'fas ' + cat.icon"></i> {{ t(cat.title) }}</h3>
          <div class="tech-cards">
            <div
              class="tech-card"
              :class="{ 'ai-card': cat.ai }"
              v-for="item in cat.items"
              :key="item.label"
            >
              <img
                v-if="(item as any).type === 'img'"
                :src="(item as any).src"
                :alt="item.label"
                loading="lazy"
                :class="{ 'invert-icon': (item as any).invert }"
              />
              <div
                v-else
                class="tech-icon-custom"
                :style="{ background: (item as any).bg, color: (item as any).color }"
              >
                <i :class="'fas ' + (item as any).icon"></i>
              </div>
              <span>{{ item.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
