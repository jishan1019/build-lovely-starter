import { createFileRoute } from "@tanstack/react-router";
import { Workspace } from "@/components/upfounder/workspace";
export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "My projects — Upfounder" },
      {
        name: "description",
        content: "Browse your Upfounder projects and pick up where you left off.",
      },
      { property: "og:title", content: "My projects — Upfounder" },
      { property: "og:description", content: "Your ideas, brought to life in one workspace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <Workspace library />,
});
