import image0 from "../../../assets/images/projects/colima-eventos/colima-eventos-0.png";
import type { ProjectContent } from "../../types";

export default {
  title: "Colima Eventos y Banquetes",
  theme: "dark",
  tags: ["html", "css", "javascript"],
  videoBorder: false,
  live: "https://www.colimaeventosybanquetes.com",
  description:
    "Sitio web profesional para una destacada empresa de banquetes y eventos en Colima, México. Presenta un diseño visual refinado, secciones de galería estilizadas, catálogos detallados de servicios y un formulario integrado para consultas de reservas.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: image0,
        alt: "Página de inicio de Colima Eventos y Banquetes",
        caption: "Página de inicio de Colima Eventos y Banquetes",
      },
    },
  ],
} as const satisfies ProjectContent;
