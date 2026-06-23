import image0 from "../../../assets/images/projects/nev-parfums/nev-parfums-0.png";
import type { ProjectContent } from "../../types";

export default {
  title: "NEV Parfums — Tienda en Línea",
  theme: "dark",
  tags: ["php", "javascript", "sql"],
  videoBorder: false,
  live: "https://nevparfums.com",
  description:
    "Tienda en línea para una marca de perfumes de lujo. Cuenta con un catálogo de productos elegante, un carrito de compras fluido y una interfaz de usuario premium diseñada para potenciar las conversiones.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: image0,
        alt: "Página principal de NEV Parfums",
        caption: "Página principal de NEV Parfums",
      },
    },
  ],
} as const satisfies ProjectContent;
