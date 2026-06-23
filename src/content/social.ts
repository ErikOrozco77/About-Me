export const social = [
  { url: "mailto:orozcoalcarazerik@gmail.com", name: "mail" },
  { url: "https://wa.me/523121336288", name: "whatsapp" },
] as const satisfies { url: string; name: "mail" | "github" | "instagram" | "linkedin" | "x" | "whatsapp" }[];
