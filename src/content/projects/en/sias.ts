import image0 from "../../../assets/images/projects/sias/sias-0.png";
import type { ProjectContent } from "../../types";

export default {
  title: "SIAS — Institutional Platform",
  theme: "dark",
  tags: ["angular", "typescript", "node", "sql"],
  videoBorder: false,
  live: "https://sias.stjdigitalcolima.gob.mx/adquisiciones",
  description:
    "Institutional procurement system developed for the Supreme Court of Justice of Colima, Mexico. Streamlines administrative workflows including supplier registration, court notices publishing, and comprehensive government acquisitions tracking.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: image0,
        alt: "SIAS platform dashboard",
        caption: "SIAS platform dashboard",
      },
    },
  ],
} as const satisfies ProjectContent;
