import image0 from "../../../assets/images/projects/nev-parfums/nev-parfums-0.png";
import type { ProjectContent } from "../../types";

export default {
  title: "NEV Parfums — Online Store",
  theme: "dark",
  tags: ["php", "javascript", "sql"],
  videoBorder: false,
  live: "https://nevparfums.com",
  description:
    "E-commerce storefront for a luxury perfume brand. Features an elegant product catalog, a seamless shopping cart, and a premium interactive user interface designed to maximize conversion rates.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: image0,
        alt: "NEV Parfums online storefront",
        caption: "NEV Parfums online storefront",
      },
    },
  ],
} as const satisfies ProjectContent;
