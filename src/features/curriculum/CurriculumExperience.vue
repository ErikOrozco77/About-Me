<script setup lang="ts">
import { t } from "../../i18n/utils/translate";

interface Experience {
  icon: string;
  roleKey: string;
  companyKey: string;
  periodKey: string;
  duties: string[];
  tags: string[];
}

const experiences: Experience[] = [
  {
    icon: "fa-landmark",
    roleKey: "stj-role",
    companyKey: "stj-company",
    periodKey: "stj-period",
    duties: ["stj-duty-1", "stj-duty-2", "stj-duty-3", "stj-duty-4", "stj-duty-5", "stj-duty-6", "stj-duty-7"],
    tags: ["Angular", "TypeScript", "Node.js", "PHP", "SQL"],
  },
  {
    icon: "fa-laptop-code",
    roleKey: "freelance-role",
    companyKey: "freelance-company",
    periodKey: "freelance-period",
    duties: ["freelance-duty-1", "freelance-duty-2", "freelance-duty-3", "freelance-duty-4", "freelance-duty-5"],
    tags: ["JavaScript", "PHP", "REST API", "Hosting"],
  },
  {
    icon: "fa-bolt",
    roleKey: "tech-role",
    companyKey: "tech-company",
    periodKey: "tech-period",
    duties: ["tech-duty-1", "tech-duty-2", "tech-duty-3", "tech-duty-4"],
    tags: ["tech-support", "infrastructure"],
  },
  {
    icon: "fa-tower-broadcast",
    roleKey: "network-role",
    companyKey: "network-company",
    periodKey: "network-period",
    duties: ["network-duty-1", "network-duty-2", "network-duty-3", "network-duty-4"],
    tags: ["MikroTik", "Ubiquiti", "WISP", "LAN"],
  },
];
</script>

<template>
  <section class="curriculum-section curriculum-experience" id="experience">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">{{ t("experience") }}</span>
        <h2 class="section-title">{{ t("professional-journey") }}</h2>
      </div>

      <div class="timeline">
        <div class="timeline-item" v-for="(exp, i) in experiences" :key="i">
          <div class="timeline-marker">
            <div class="marker-dot"></div>
            <div class="marker-line" v-if="i < experiences.length - 1"></div>
          </div>
          <div class="timeline-card">
            <div class="timeline-header">
              <div class="timeline-company-info">
                <div class="company-icon"><i :class="'fas ' + exp.icon"></i></div>
                <div>
                  <h3 class="timeline-role">{{ t(exp.roleKey) }}</h3>
                  <p class="timeline-company-name">{{ t(exp.companyKey) }}</p>
                </div>
              </div>
              <span class="period-badge">{{ t(exp.periodKey) }}</span>
            </div>
            <ul class="timeline-duties">
              <li v-for="(duty, j) in exp.duties" :key="j">{{ t(duty) }}</li>
            </ul>
            <div class="timeline-tags">
              <span class="tag" v-for="(tag, j) in exp.tags" :key="j">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
