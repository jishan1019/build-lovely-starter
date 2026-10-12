import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { type SettingsTab } from "@/components/upfounder/settings-page";
import { Workspace } from "@/components/upfounder/workspace";

const tabs: SettingsTab[] = ["workspace", "plans", "profile", "accounts"];

export const Route = createFileRoute("/settings")({
  validateSearch: (search: Record<string, unknown>): { tab: SettingsTab } => ({
    tab: tabs.includes(search["tab"] as SettingsTab) ? (search["tab"] as SettingsTab) : "profile",
  }),
  head: () => ({
    meta: [
      { title: "Settings — Upfounder" },
      { name: "description", content: "Manage your Upfounder profile, workspace, plan and connected accounts." },
      { property: "og:title", content: "Settings — Upfounder" },
      { property: "og:description", content: "Profile, workspace, plans and connected accounts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SettingsRoute,
});

function SettingsRoute() {
  const { tab } = Route.useSearch();
  const navigate = useNavigate();
  return <Workspace settings={{ tab, onTabChange: (t) => navigate({ to: "/settings", search: { tab: t } }) }} />;
}
