import { createFileRoute } from "@tanstack/react-router";
import { Workspace } from "@/components/upfounder/workspace";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Upfounder — Your creation workspace" },
      {
        name: "description",
        content: "Turn your next idea into a beautiful website or app with Upfounder.",
      },
      { property: "og:title", content: "Upfounder — Your creation workspace" },
      { property: "og:description", content: "A focused workspace for your next big idea." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <Workspace />,
});
