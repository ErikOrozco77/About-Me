<script setup lang="ts">
import { t } from "../../i18n/utils/translate";
</script>

<template>
  <section class="curriculum-section curriculum-objective" id="objective">
    <div class="container">
      <div class="objective-content">
        <div class="objective-icon"><i class="fas fa-rocket" style="width:58px;height:58px;display:flex;align-items:center;justify-content:center;background:var(--accent-bg);border-radius:var(--r-lg);color:var(--accent);font-size:22px;margin:0 auto 22px;"></i></div>
        <h2 class="objective-title">{{ t("professional-goal") }}</h2>
        <p class="objective-text">{{ t("goal-text") }}</p>
        <a href="#contact" class="btn btn-primary">
          <i class="fas fa-paper-plane"></i> {{ t("talk") }}
        </a>
      </div>
    </div>
  </section>
</template>
