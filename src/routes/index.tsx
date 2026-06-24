import { createFileRoute } from "@tanstack/react-router";
import { HeroApp } from "@/components/hero/HeroApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HERO AI — Client-Side Intelligence Console" },
      {
        name: "description",
        content:
          "HERO AI: a fully interactive client-side AI command console for scanning data, neural chat, and automating workplace tasks.",
      },
      { property: "og:title", content: "HERO AI — Client-Side Intelligence Console" },
      { property: "og:description", content: "Fully interactive client-side AI command console." },
    ],
  }),
  component: HeroApp,
});
