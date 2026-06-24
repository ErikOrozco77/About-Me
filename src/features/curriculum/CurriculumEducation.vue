<script setup lang="ts">
import { t } from "../../i18n/utils/translate";
</script>

<template>
  <section class="curriculum-section curriculum-education" id="education">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">{{ t("education") }}</span>
        <h2 class="section-title">{{ t("academic-bg") }}</h2>
      </div>
      <div class="education-card">
        <div class="edu-icon"><i class="fas fa-university"></i></div>
        <div class="edu-content">
          <div class="edu-header">
            <div>
              <h3 class="edu-degree">{{ t("computer-engineering") }}</h3>
              <p class="edu-institution">{{ t("institution") }}</p>
              <p class="edu-specialty">{{ t("specialty") }}</p>
            </div>
            <div class="edu-meta">
              <span class="edu-period">{{ t("period") }}</span>
              <span class="edu-status">{{ t("graduate") }}</span>
            </div>
          </div>
          <div class="edu-details">
            <div class="edu-detail-item">
              <i class="fas fa-id-card"></i>
              <span v-html="t('professional-license')"></span>
            </div>
            <div class="edu-detail-item">
              <i class="fas fa-star"></i>
              <span>{{ t("graduate-with-specialty") }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
