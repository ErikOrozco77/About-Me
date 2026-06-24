<script setup lang="ts">
import Layout from "../../../components/Layout.vue";
import Hero from "./Hero.vue";
import About from "./About.vue";
import CurriculumHero from "../../curriculum/CurriculumHero.vue";
import CurriculumAbout from "../../curriculum/CurriculumAbout.vue";
import CurriculumTech from "../../curriculum/CurriculumTech.vue";
import CurriculumExperience from "../../curriculum/CurriculumExperience.vue";
import CurriculumEducation from "../../curriculum/CurriculumEducation.vue";
import CurriculumObjective from "../../curriculum/CurriculumObjective.vue";
import CurriculumNav from "../../curriculum/CurriculumNav.vue";
import CurriculumProjects from "../../curriculum/CurriculumProjects.vue";
import Contact from "./Contact.vue";
import { ref, onMounted, onUnmounted, watchEffect, computed, watch } from "vue";
import { three } from "../../../three";
import { animations } from "../../../animations";
import { preloaderVisible } from "../../../composables/usePreloader";
import ScrollIcon from "../../../components/ScrollIcon.vue";
import { raycast } from "../../../three/utils/raycast";
import gsap from "gsap";
import { useAgent } from "../../../composables/useAgent";
import { projectId, projectVisible } from "../../../composables/useRouteObserver";
import { isTransitioning } from "../../../composables/useProjectTransition";
import { renderer } from "../../../three/core/renderer";

const introRef = ref<HTMLElement | null>(null);
const stickyObserver = ref<IntersectionObserver | null>(null);
const scrolledPastIntro = ref(false);
const projectsLoaded = ref(true);
const aboutSpacerRef = ref<HTMLElement | null>(null);
const isHoveringObject3D = ref<boolean>(false);
const threeCanvasRef = ref<HTMLCanvasElement | null>(null);
const threeInitialized = ref<boolean>(false);
const { isTouch } = useAgent();

const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  scrolledPastIntro.value = entries[0]?.isIntersecting ?? false;
};

const isStickyVisible = computed(() => {
  return scrolledPastIntro.value || !projectsLoaded.value;
});

const updateCursor = () => {
  if (isTouch.value) return;
  const hoveringBox = raycast.getHoveringBox();
  const shouldBePointer = !!hoveringBox;

  if (shouldBePointer !== isHoveringObject3D.value) {
    isHoveringObject3D.value = shouldBePointer;
    document.documentElement.style.cursor = shouldBePointer ? "pointer" : "";
  }
};

onMounted(() => {
  stickyObserver.value = new IntersectionObserver(handleIntersection);
  stickyObserver.value.observe(introRef.value as HTMLElement);

  if (threeCanvasRef.value && !threeInitialized.value) {
    three.init(threeCanvasRef.value);
    threeInitialized.value = true;
  }

  gsap.ticker.add(updateCursor);
});

onUnmounted(() => {
  stickyObserver.value?.disconnect();
  stickyObserver.value = null;

  three.destroy();

  document.documentElement.style.cursor = "";

  gsap.ticker.remove(updateCursor);
  animations.destroy();
});


watchEffect((onInvalidate) => {
  if (
    projectsLoaded &&
    threeInitialized &&
    //(projectId.value === null || isTransitioning.value) &&
    !preloaderVisible.value
  ) {
    animations.init();
  }

  onInvalidate(() => {
    animations.destroy();
  });
});

watch(
  projectVisible,
  (newVal) => {
    renderer.setIsActive(!newVal);
  },
  { immediate: true },
);
</script>

<template>
  <div
    :class="[
      'home-wrapper',
      typeof projectId === 'string' && isTransitioning && `home-wrapper-out`,
      typeof projectId !== 'string' && isTransitioning && `home-wrapper-in`,
    ]"
  >
    <CurriculumNav v-show="!preloaderVisible" />
    <CurriculumHero />
    <ScrollIcon />
    <Layout>
      <div class="intro-wrapper" ref="introRef">
        <div
          class="intro-sticky"
          :class="{ 'intro-sticky-visible': isStickyVisible }"
        >
          <canvas class="three-canvas" ref="threeCanvasRef"></canvas>
          <div :class="{ 'intro-about-hidden': !isStickyVisible }">
            <About :spacer-ref="aboutSpacerRef" />
          </div>
        </div>
        <Hero class="intro-hero" id="hero" />
        <div class="intro-wrapper-spacer"></div>
        <div class="about-spacer" ref="aboutSpacerRef"></div>
      </div>
      <CurriculumAbout />
      <CurriculumTech />
      <CurriculumExperience />
      <CurriculumProjects />
      <CurriculumEducation />
      <CurriculumObjective />
      <Contact />
    </Layout>
  </div>
</template>

<style scoped lang="scss">
.three-canvas {
  width: calc(var(--svw) * 100);
  height: calc(var(--lvh) * 100);
  max-height: calc(var(--lvh) * 100);
  position: relative;
  overflow: hidden;
}

.home {
  &-wrapper {
    transform-origin: center center;

    &-out {
      animation: home-wrapper-out var(--transition-route-duration) var(--transition-route-ease);
    }

    &-in {
      animation: home-wrapper-in var(--transition-route-duration) var(--transition-route-ease);
    }

    @keyframes home-wrapper-out {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(0.95);
      }
    }

    @keyframes home-wrapper-in {
      0% {
        transform: scale(0.95);
      }
      100% {
        transform: scale(1);
      }
    }
  }

}

.about-spacer {
  max-height: calc(var(--lvh) * 100);
  min-height: calc(var(--lvh) * 100);
}

.intro-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;

  &-spacer {
    display: none;

    @include mixins.mq("md") {
      display: block;
      height: 200px;
    }
  }
}

.intro-hero {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-height: calc(var(--lvh) * 100);
  min-height: calc(var(--lvh) * 100);
  overflow: hidden;
}

.intro-about-hidden {
  visibility: hidden;
}

.intro-sticky {
  top: 0;
  left: 0;
  width: 100%;
  max-height: calc(var(--lvh) * 100);
  min-height: calc(var(--lvh) * 100);
  overflow: hidden;
  z-index: -1;
  display: flex;
  align-items: flex-end;

  &-visible {
    position: sticky;
  }
}

</style>
