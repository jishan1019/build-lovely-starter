import { useState } from "react";
import { CreditCard, Crown, Github, Gitlab, Info, Link2, User, Zap, Check, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export type SettingsTab = "workspace" | "plans" | "profile" | "accounts";

const field =
  "w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary";

export function SettingsDialog({
  open,
  tab,
  onTabChange,
  onOpenChange,
}: {
  open: boolean;
  tab: SettingsTab;
  onTabChange: (t: SettingsTab) => void;
  onOpenChange: (o: boolean) => void;
}) {
  const [notice, setNotice] = useState("");
  const nav = (id: SettingsTab, label: string, Icon: typeof User) => (
    <Button
      variant={tab === id ? "secondary" : "ghost"}
      size="sm"
      className="w-full justify-start"
      onClick={() => {
        setNotice("");
        onTabChange(id);
      }}
    >
      <Icon /> {label}
    </Button>
  );
  const preview = (msg: string) => setNotice(`${msg} — this is a design preview, nothing is saved yet.`);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">Workspace and account settings</DialogDescription>
        <div className="grid md:grid-cols-[200px_1fr] h-[80vh] max-h-[680px]">
          <nav className="border-r border-border p-4 space-y-1 overflow-y-auto">
            <p className="px-2 pb-1 text-[11px] font-semibold tracking-wider text-muted-foreground">WORKSPACE</p>
            {nav("workspace", "Lamar’s Builder", Box)}
            {nav("plans", "Plans & credits", CreditCard)}
            <div className="my-3 border-t border-border" />
            <p className="px-2 pb-1 text-[11px] font-semibold tracking-wider text-muted-foreground">ACCOUNT</p>
            {nav("profile", "Profile", User)}
            {nav("accounts", "Connected accounts", Link2)}
          </nav>
          <div className="overflow-y-auto p-6">
            {notice && (
              <div className="mb-4 rounded-lg bg-accent px-3 py-2 text-sm">{notice}</div>
            )}
            {(tab === "profile" || tab === "workspace") && (
              <div>
                <h2 className="text-lg font-semibold">{tab === "profile" ? "Profile" : "Workspace"}</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {tab === "profile" ? "How you appear across Upfounder." : "Manage your workspace details."}
                </p>
                {(tab === "profile"
                  ? [
                      ["Username", "", "lamaraustin"],
                      ["Email", "Your email address associated with your account.", "lamar@example.com"],
                      ["Name", "Your full name, as visible to others.", "Lamar Austin"],
                      ["Description", "A short description of yourself or your work.", ""],
                      ["Location", "Where you’re based.", ""],
                      ["Link", "Add a link to your website or portfolio.", ""],
                    ]
                  : [
                      ["Workspace name", "Visible to everyone in your workspace.", "Lamar’s Builder"],
                      ["Workspace URL", "Used for sharing links.", "lamars-builder"],
                    ]
                ).map(([label, hint, value]) => (
                  <div key={label} className="grid sm:grid-cols-[1fr_1.4fr] gap-3 border-b border-border py-4">
                    <div>
                      <p className="text-sm font-medium">{label}</p>
                      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
                    </div>
                    {label === "Description" ? (
                      <textarea className={field} rows={3} defaultValue={value} placeholder="Enter a short description" />
                    ) : (
                      <input className={field} defaultValue={value} placeholder={label === "Link" ? "https://example.com" : `Enter your ${label.toLowerCase()}`} />
                    )}
                  </div>
                ))}
                <div className="flex justify-end pt-4">
                  <Button onClick={() => preview("Changes ready")}>Save changes</Button>
                </div>
              </div>
            )}
            {tab === "accounts" && (
              <div>
                <h2 className="text-lg font-semibold">Connected accounts</h2>
                <p className="text-sm text-muted-foreground mb-4">Connect services to sync code and deploy faster.</p>
                <div className="flex gap-3 rounded-lg border border-border bg-accent/40 p-4 mb-5 text-sm">
                  <Info className="size-4 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Why connect accounts?</p>
                    <p className="text-muted-foreground">Push code to repositories, manage deployments and collaborate with your team.</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    ["GitHub", Github],
                    ["GitLab", Gitlab],
                    ["Bitbucket", Box],
                  ].map(([name, Icon]) => {
                    const I = Icon as typeof Github;
                    return (
                      <div key={name as string} className="flex items-start gap-4 rounded-lg border border-border p-4">
                        <span className="grid size-10 place-items-center rounded-lg border border-border"><I className="size-5" /></span>
                        <div className="flex-1">
                          <p className="font-medium">{name as string}</p>
                          <p className="text-sm text-muted-foreground">Sync repositories and manage your code from Upfounder.</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => preview(`${name} connection`)}>Connect</Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {tab === "plans" && (
              <div>
                <h2 className="text-lg font-semibold">Plans & credits</h2>
                <p className="text-sm text-muted-foreground mb-4">Manage your subscription and credits.</p>
                <div className="rounded-xl border border-border p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3"><Zap className="size-5 text-primary" /><div><p className="font-medium">Your credits</p><p className="text-xs text-muted-foreground">Daily allocation</p></div></div>
                    <div className="text-right"><p className="text-2xl font-semibold">5</p><p className="text-xs text-muted-foreground">Credits balance</p></div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-accent p-3">
                    <div className="flex items-center gap-3"><Crown className="size-5 text-primary" /><div><p className="text-xs text-muted-foreground">CURRENT PLAN</p><p className="text-sm font-semibold">Free</p></div></div>
                    <Button size="sm" onClick={() => preview("Upgrade")}>Upgrade plan</Button>
                  </div>
                </div>
                <h3 className="font-semibold mt-6 mb-3">Available plans</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: "Free", price: "$0", desc: "Perfect for getting started.", feats: ["5 daily credits", "Basic features"], current: true },
                    { name: "Pro", price: "$29", desc: "For fast-moving builders and teams.", feats: ["400+ monthly credits", "Code pushes to GitHub", "Custom domains", "Advanced analytics"], current: false },
                  ].map((p) => (
                    <div key={p.name} className="rounded-xl border border-border p-5">
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-sm text-muted-foreground">{p.desc}</p>
                      <p className="my-3"><span className="text-2xl font-semibold">{p.price}</span> <span className="text-sm text-muted-foreground">/ month</span></p>
                      <Button className="w-full" variant={p.current ? "outline" : "default"} disabled={p.current} onClick={() => preview("Upgrade")}>
                        {p.current ? "Current plan" : "Upgrade plan"}
                      </Button>
                      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                        {p.feats.map((f) => <li key={f} className="flex gap-2"><Check className="size-4 text-primary" />{f}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
