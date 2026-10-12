import { useState, type ReactNode } from "react";
import { Box, Check, CreditCard, Crown, Github, Gitlab, Info, Link2, User, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export type SettingsTab = "workspace" | "plans" | "profile" | "accounts";

const tabs: { id: SettingsTab; label: string; hint: string; icon: typeof User; group: string }[] = [
  { id: "profile", label: "Profile", hint: "How others see you", icon: User, group: "ACCOUNT" },
  { id: "accounts", label: "Connected accounts", hint: "GitHub, GitLab & more", icon: Link2, group: "ACCOUNT" },
  { id: "workspace", label: "Workspace", hint: "Name and URL", icon: Box, group: "WORKSPACE" },
  { id: "plans", label: "Plans & credits", hint: "Usage and billing", icon: CreditCard, group: "WORKSPACE" },
];

function Card({ title, desc, children, footer }: { title: string; desc?: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <section className="settings-card">
      <header>
        <h3>{title}</h3>
        {desc && <p>{desc}</p>}
      </header>
      <div className="settings-card-body">{children}</div>
      {footer && <footer>{footer}</footer>}
    </section>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="settings-field">
      <span>
        <b>{label}</b>
        {hint && <small>{hint}</small>}
      </span>
      {children}
    </label>
  );
}

export function SettingsPage({ tab, onTabChange }: { tab: SettingsTab; onTabChange: (t: SettingsTab) => void }) {
  const [notice, setNotice] = useState("");
  const preview = (msg: string) => setNotice(`${msg} — this is a design preview, nothing is saved yet.`);
  const current = tabs.find((t) => t.id === tab)!;
  const save = (
    <>
      <Button variant="ghost" size="sm" onClick={() => setNotice("")}>Cancel</Button>
      <Button size="sm" onClick={() => preview("Changes ready")}>Save changes</Button>
    </>
  );

  return (
    <div className="settings-page">
      <div className="settings-hero">
        <div className="powered-label justify-start">
          <span className="tiny-spark">✳</span> SETTINGS
        </div>
        <h1>
          Make this space <span>feel like yours.</span>
        </h1>
        <p>Manage your profile, workspace and plan — all in one place.</p>
      </div>

      <div className="settings-layout">
        <nav className="settings-nav" aria-label="Settings sections">
          {["ACCOUNT", "WORKSPACE"].map((g) => (
            <div key={g}>
              <p>{g}</p>
              {tabs
                .filter((t) => t.group === g)
                .map((t) => (
                  <Button
                    key={t.id}
                    variant="ghost"
                    className={tab === t.id ? "settings-tab active" : "settings-tab"}
                    onClick={() => {
                      setNotice("");
                      onTabChange(t.id);
                    }}
                  >
                    <span className="settings-tab-icon"><t.icon /></span>
                    <span>
                      {t.label}
                      <small>{t.hint}</small>
                    </span>
                  </Button>
                ))}
            </div>
          ))}
        </nav>

        <div className="settings-content">
          <div className="section-heading">
            <div>
              <h2>{current.label}</h2>
              <p>{current.hint}</p>
            </div>
          </div>
          {notice && <div className="settings-notice"><Info size={14} />{notice}</div>}

          {tab === "profile" && (
            <>
              <Card title="Your avatar" desc="Shown next to your projects and comments.">
                <div className="flex items-center gap-4">
                  <span className="settings-avatar">LA</span>
                  <Button variant="outline" size="sm" onClick={() => preview("Avatar upload")}>Upload new</Button>
                  <Button variant="ghost" size="sm" onClick={() => preview("Avatar removed")}>Remove</Button>
                </div>
              </Card>
              <Card title="Personal details" desc="Visible to people you collaborate with." footer={save}>
                <Field label="Name" hint="Your full name"><input defaultValue="Lamar Austin" /></Field>
                <Field label="Username"><input defaultValue="lamaraustin" /></Field>
                <Field label="Email" hint="Used for sign in"><input type="email" defaultValue="lamar@example.com" /></Field>
                <Field label="Location"><input placeholder="Where you’re based" /></Field>
                <Field label="Link"><input placeholder="https://example.com" /></Field>
                <Field label="Description" hint="A short bio"><textarea rows={3} placeholder="Tell people about yourself or your work" /></Field>
              </Card>
            </>
          )}

          {tab === "workspace" && (
            <Card title="Workspace details" desc="Everyone in your workspace sees these." footer={save}>
              <Field label="Workspace name"><input defaultValue="Lamar’s Builder" /></Field>
              <Field label="Workspace URL" hint="Used in share links"><input defaultValue="lamars-builder" /></Field>
            </Card>
          )}

          {tab === "accounts" && (
            <Card title="Available integrations" desc="Push code to repositories, manage deployments and collaborate with your team.">
              <div className="space-y-3">
                {([
                  ["GitHub", Github, "Sync repositories and deploy straight from Upfounder."],
                  ["GitLab", Gitlab, "Keep your projects in sync with GitLab."],
                  ["Bitbucket", Box, "Connect Bitbucket for version control."],
                ] as const).map(([name, I, desc]) => (
                  <div key={name} className="settings-integration">
                    <span className="settings-tab-icon"><I /></span>
                    <div>
                      <b>{name}</b>
                      <small>{desc}</small>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => preview(`${name} connection`)}>Connect</Button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {tab === "plans" && (
            <>
              <div className="settings-credits">
                <div>
                  <span className="settings-tab-icon"><Zap /></span>
                  <div>
                    <small>CURRENT PLAN</small>
                    <b>Free · 5 daily credits</b>
                  </div>
                </div>
                <div className="credit-track"><span /></div>
                <Button size="sm" onClick={() => preview("Upgrade")}><Crown /> Upgrade plan</Button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: "Free", price: "$0", desc: "Perfect for getting started.", feats: ["5 daily credits", "Basic features"], current: true },
                  { name: "Pro", price: "$29", desc: "For fast-moving builders and teams.", feats: ["400+ monthly credits", "Code pushes to GitHub", "Custom domains", "Advanced analytics"], current: false },
                ].map((p) => (
                  <div key={p.name} className={p.current ? "settings-plan" : "settings-plan featured"}>
                    <div className="flex items-center justify-between">
                      <b>{p.name}</b>
                      {!p.current && <span className="settings-badge">Popular</span>}
                    </div>
                    <small>{p.desc}</small>
                    <p className="settings-price">{p.price}<span> / month</span></p>
                    <Button className="w-full" variant={p.current ? "outline" : "default"} disabled={p.current} onClick={() => preview("Upgrade")}>
                      {p.current ? "Current plan" : "Upgrade to Pro"}
                    </Button>
                    <ul>
                      {p.feats.map((f) => <li key={f}><Check size={14} />{f}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
