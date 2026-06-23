import image0 from "../../../assets/images/projects/colima-eventos/colima-eventos-0.png";
import type { ProjectContent } from "../../types";

export default {
  title: "Colima Eventos y Banquetes",
  theme: "dark",
  tags: ["html", "css", "javascript"],
  videoBorder: false,
  live: "https://www.colimaeventosybanquetes.com",
  description:
    "Professional landing page for a prominent banquets and events company in Colima, Mexico. Features a highly refined visual design, styled gallery sections, detailed service catalogs, and an integrated reservation inquiry form.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: image0,
        alt: "Colima Eventos y Banquetes landing page",
        caption: "Colima Eventos y Banquetes landing page",
      },
    },
  ],
} as const satisfies ProjectContent;
