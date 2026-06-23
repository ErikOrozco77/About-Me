import thumbnailColimaEventos from "../../../assets/thumbnails/colima-eventos.png";
import thumbnailSias from "../../../assets/thumbnails/sias.png";
import thumbnailNevParfums from "../../../assets/thumbnails/nev-parfums.png";

import type { ProjectPreview } from "../../types";

export default [
  {
    title: "Colima Eventos y Banquetes",
    slug: "colima-eventos",
    thumbnail: thumbnailColimaEventos,
    description: "Sitio web elegante para eventos y banquetes",
  },
  {
    title: "SIAS — Plataforma Institucional",
    slug: "sias",
    thumbnail: thumbnailSias,
    description: "Sistema institucional de adquisiciones",
  },
  {
    title: "NEV Parfums — Tienda en Línea",
    slug: "nev-parfums",
    thumbnail: thumbnailNevParfums,
    description: "E-commerce de perfumería de alta gama",
  },
] as const satisfies ProjectPreview[];
