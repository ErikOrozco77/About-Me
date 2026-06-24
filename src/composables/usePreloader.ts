import { ref, onMounted } from "vue";
import { resources } from "../utils/resources";
import gsap from "gsap";

export const preloaderVisible = ref(true);

const BOOT_LINES: Record<string, string[]> = {
  en: [
    "> boot erik-orozco.system --v2.0",
    "> stack: angular · node · typescript · sql ... OK",
    "> ai.tools: claude · codex · antigravity ..... OK",
    "> networks: mikrotik · ubiquiti · wisp ....... OK",
    "> loading interface ▓▓▓▓▓▓▓▓▓▓ 100%",
  ],
  es: [
    "> boot erik-orozco.system --v2.0",
    "> stack: angular · node · typescript · sql ... OK",
    "> ia.tools: claude · codex · antigravity ..... OK",
    "> redes: mikrotik · ubiquiti · wisp .......... OK",
    "> iniciando interfaz ▓▓▓▓▓▓▓▓▓▓ 100%",
  ],
};

export const usePreloader = () => {
  const resourcesLoaded = ref(false);
  let closed = false;

  onMounted(() => {
    resources.on("progress", (newProgress: number) => {
      if (newProgress >= 1 && !resourcesLoaded.value) {
        resourcesLoaded.value = true;
      }
    });
    initBoot();
  });

  function getLang(): string {
    return document.documentElement.lang === "es" ? "es" : "en";
  }

  function initBoot() {
    const boot = document.getElementById("bootScreen");
    const out = document.getElementById("bootOutput");

    if (!boot || !out) return;

    document.body.classList.add("boot-lock");

    const lines: string[] = BOOT_LINES[getLang()]! || BOOT_LINES.en;

    function closeBoot() {
      if (closed) return;
      closed = true;
      document.body.classList.remove("boot-lock");
      gsap.to(boot, {
        yPercent: -100,
        duration: 0.75,
        ease: "power4.inOut",
        onComplete: () => {
          boot!.remove();
          document.body.classList.remove("is-loading");
          preloaderVisible.value = false;
        },
      });
    }

    let i = 0;
    function typeLine() {
      if (closed) return;
      if (i >= lines.length) {
        setTimeout(closeBoot, 320);
        return;
      }
      const div = document.createElement("div");
      div.className = "boot-line";
      out!.appendChild(div);
      const text = lines[i++]!;
      let c = 0;
      (function ch() {
        if (closed) return;
        div.textContent = text.slice(0, ++c);
        if (c < text.length) setTimeout(ch, 7);
        else setTimeout(typeLine, 110);
      })();
    }

    boot.addEventListener("click", closeBoot);
    setTimeout(closeBoot, 5000);
    typeLine();
  }
};
