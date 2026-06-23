import image0 from "../../../assets/images/projects/sias/sias-0.png";
import type { ProjectContent } from "../../types";

export default {
  title: "SIAS — Plataforma Institucional",
  theme: "dark",
  tags: ["angular", "typescript", "node", "sql"],
  videoBorder: false,
  live: "https://sias.stjdigitalcolima.gob.mx/adquisiciones",
  description:
    "Sistema institucional de adquisiciones desarrollado para el Supremo Tribunal de Justicia del Estado de Colima, México. Optimiza los flujos administrativos, incluyendo el registro de proveedores, publicación de edictos judiciales y el seguimiento detallado de compras gubernamentales.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: image0,
        alt: "Panel de administración de SIAS",
        caption: "Panel de administración de SIAS",
      },
    },
  ],
} as const satisfies ProjectContent;
