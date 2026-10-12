import { useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowUp,
  ArrowUpRight,
  ChevronDown,
  ChevronsUpDown,
  Code2,
  Folder,
  Globe,
  Heart,
  Home,
  ImagePlus,
  LayoutGrid,
  List,
  MoreHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Star,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { projects, type Project } from "./project-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SettingsPage, type SettingsTab } from "./settings-page";
import { LogOut, User, CreditCard, Link2 } from "lucide-react";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="brand">
      <span className="brand-symbol">
        <ArrowUpRight size={22} strokeWidth={3} />
      </span>
      {!compact && (
        <span>
          upfounder<span className="brand-dot">.</span>
        </span>
      )}
    </Link>
  );
}
export function ProjectPreview({ project }: { project: Project }) {
  if (project.kind === "app" || project.kind === "finance")
    return (
      <div className={`site-preview ${project.kind}`}>
        <div className="mini-app-sidebar">
          <span className="mini-logo">{project.kind === "app" ? "◈" : "m"}</span>
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="mini-app-content">
          <div className="mini-app-top">
            {project.kind === "app" ? "My workspace" : "Overview"}
            <span>↗</span>
          </div>
          <h4>{project.kind === "app" ? "A little more focus." : "Your money, in balance."}</h4>
          <div className="mini-stats">
            <div>
              <small>{project.kind === "app" ? "In progress" : "Total balance"}</small>
              <b>{project.kind === "app" ? "12" : "$24,680"}</b>
            </div>
            <div>
              <small>{project.kind === "app" ? "Completed" : "Monthly income"}</small>
              <b>{project.kind === "app" ? "48" : "$8,250"}</b>
            </div>
          </div>
          <div className="mini-chart">
            {[35, 60, 45, 75, 55, 90, 70, 100, 80, 120, 95, 135].map((h, i) => (
              <i key={i} style={{ height: h / 2 }} />
            ))}
          </div>
        </div>
      </div>
    );
  if (project.kind === "folio")
    return (
      <div className="site-preview folio">
        <div className="mini-nav">
          alex morgan<span>Selected work ↗</span>
        </div>
        <div className="folio-title">
          Making digital
          <br />
          feel human<span>✳</span>
        </div>
        <div className="folio-bottom">
          <span>Independent designer & creative developer</span>
          <span>2026</span>
        </div>
      </div>
    );
  return (
    <div className={`site-preview ${project.kind}`}>
      <div className="mini-nav">
        {project.kind === "cat" ? "mochi." : project.kind === "interior" ? "FORMA" : "somewhere"}
        <span>
          {project.kind === "cat" ? "About  ·  Gallery" : "About  ·  Discover  ·  Contact"}
        </span>
      </div>
      {project.kind === "coast" ? (
        <div className="travel-cover">
          <img src={project.image} alt="Amalfi coast" width={1024} height={640} loading="lazy" />
          <div>
            Go somewhere
            <br />
            <em>that stays with you.</em>
          </div>
          <span>THE JOURNAL / ITALY</span>
        </div>
      ) : (
        <div className="mini-split">
          <div>
            <small>
              {project.kind === "cat" ? "A LITTLE CAT. A LOT OF PERSONALITY." : "SPACES WITH SOUL"}
            </small>
            <h4>
              {project.kind === "cat" ? (
                <>
                  Meet Mochi.
                  <br />
                  <em>
                    Your daily dose
                    <br />
                    of happy.
                  </em>
                </>
              ) : (
                <>
                  Considered design.
                  <br />
                  <em>Everyday living.</em>
                </>
              )}
            </h4>
            <span className="mini-cta">
              {project.kind === "cat" ? "Get to know me ↗" : "Explore our spaces ↗"}
            </span>
          </div>
          <img
            src={project.image}
            alt={project.kind === "cat" ? "Orange tabby cat" : "Contemporary interior"}
            width={1024}
            height={640}
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
export function Workspace({
  library = false,
  settings,
}: {
  library?: boolean;
  settings?: { tab: SettingsTab; onTabChange: (t: SettingsTab) => void };
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All projects");
  const [prompt, setPrompt] = useState("");
  const [layout, setLayout] = useState("grid");
  const [dialog, setDialog] = useState("");
  const [sort, setSort] = useState("recent");
  const [attachment, setAttachment] = useState("");
  const setSettingsTab = (tab: "workspace" | "plans" | "profile" | "accounts") =>
    navigate({ to: "/settings", search: { tab } });
  const upload = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const visible = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) && (tab !== "Favorites" || p.favorite),
  );
  if (sort === "name") visible.sort((a, b) => a.name.localeCompare(b.name));
  function create() {
    if (prompt.trim())
      navigate({ to: "/editor", search: { project: "new", prompt: prompt.trim() } });
  }
  return (
    <div className={`workspace ${collapsed ? "is-collapsed" : ""}`}>
      <aside className="workspace-sidebar">
        <div className="sidebar-brand">
          <Brand compact={collapsed} />
        </div>
        <Button
          variant="outline"
          className="workspace-switch"
          onClick={() => setSettingsTab("workspace")}
        >
          <span className="workspace-avatar">LA</span>
          {!collapsed && (
            <>
              <span>
                Lamar’s workspace<small>Personal workspace</small>
              </span>
              <ChevronsUpDown size={14} />
            </>
          )}
        </Button>
        <div className="sidebar-nav">
          <Button
            variant="default"
            className="new-project"
            onClick={() => {
              setPrompt("");
              navigate({ to: "/" });
              document.getElementById("create-prompt")?.focus();
            }}
          >
            <Plus />
            {!collapsed && "New project"}
          </Button>
          <Button
            asChild
            variant="ghost"
            className={!library && !settings ? "nav-item active" : "nav-item"}
            title="Home"
          >
            <Link to="/">
              <Home />
              {!collapsed && "Home"}
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className={library ? "nav-item active" : "nav-item"}
            title="My projects"
          >
            <Link to="/projects">
              <Folder />
              {!collapsed && (
                <>
                  <span>My projects</span>
                  <span className="nav-count">6</span>
                </>
              )}
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="nav-item"
            title="Favorites"
            onClick={() => setTab(tab === "Favorites" ? "All projects" : "Favorites")}
          >
            <Star />
            {!collapsed && "Favorites"}
          </Button>
        </div>
        {!collapsed && (
          <div className="sidebar-recents">
            <p>PROJECTS</p>
            {projects.map((p, i) => (
              <Link key={p.id} to="/editor" search={{ project: p.id }}>
                <span className={`project-dot dot-${i % 3}`} />
                <span>{p.name.split(" · ")[0]}</span>
              </Link>
            ))}
            <Link to="/projects" className="text-muted-foreground">
              <Plus size={13} />
              <span>View all projects</span>
            </Link>
          </div>
        )}
        <div className="sidebar-bottom">
          {!collapsed && (
            <div className="credits">
              <div>
                <Zap size={15} />
                <span>A little idea. A big beginning.</span>
              </div>
              <p>You have 5 daily credits</p>
              <div className="credit-track">
                <span />
              </div>
              <Button variant="outline" className="w-full" onClick={() => setSettingsTab("plans")}>
                Explore plans <ArrowUpRight />
              </Button>
            </div>
          )}
          <Button
            variant="ghost"
            className={settings ? "nav-item active" : "nav-item"}
            onClick={() => setSettingsTab("profile")}
            title="Settings"
          >
            <Settings2 />
            {!collapsed && "Settings"}
          </Button>
          <div className="profile cursor-pointer" role="button" tabIndex={0} onClick={() => setSettingsTab("profile")}>
            <span className="user-avatar">LA</span>
            {!collapsed && (
              <>
                <div>
                  Lamar Austin<small>Personal account</small>
                </div>
                <ChevronsUpDown size={14} />
              </>
            )}
          </div>
        </div>
      </aside>
      <div className="workspace-main">
        <header className="workspace-header">
          <div>
            <Button
              variant="ghost"
              size="icon"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
            </Button>
            <span>{settings ? "Settings" : library ? "My projects" : "Workspace"}</span>
          </div>
          <div>
            <span className="header-status">
              <span />
              All systems operational
            </span>
            <Button variant="ghost" size="sm" onClick={() => setDialog("What’s new")}>
              <Sparkles />
              What’s new
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="Account menu">
                  <span className="user-avatar small">LA</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  Lamar Austin
                  <p className="text-xs font-normal text-muted-foreground">lamar@example.com</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setSettingsTab("profile")}><User /> Profile</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSettingsTab("plans")}><CreditCard /> Plans & credits</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSettingsTab("accounts")}><Link2 /> Connected accounts</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSettingsTab("workspace")}><Settings2 /> Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setDialog("Sign out")}><LogOut /> Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="workspace-content">
          {settings ? (
            <SettingsPage tab={settings.tab} onTabChange={settings.onTabChange} />
          ) : (
          <>
          {!library && (
            <section className="creation-section">
              <div className="powered-label">
                <span className="tiny-spark">✳</span> YOUR NEXT BIG THING STARTS HERE
              </div>
              <h1>
                What will you <span>create today?</span>
              </h1>
              <p className="creation-subtitle">An idea is all you need. Let’s make it real.</p>
              <div className="prompt-box">
                <textarea
                  id="create-prompt"
                  aria-label="Describe your project"
                  placeholder="Ask Upfounder to build something amazing…"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      create();
                    }
                  }}
                />
                {attachment && (
                  <div className="attachment-label">
                    {attachment}
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Remove attachment"
                      onClick={() => setAttachment("")}
                    >
                      <X />
                    </Button>
                  </div>
                )}
                <div className="prompt-toolbar">
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      ref={upload}
                      className="hidden"
                      onChange={(e) => setAttachment(e.target.files?.[0]?.name ?? "")}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Attach inspiration"
                      aria-label="Attach inspiration"
                      onClick={() => upload.current?.click()}
                    >
                      <ImagePlus />
                    </Button>
                    <span className="prompt-divider" />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="style-picker"
                      onClick={() => setDialog("Design style")}
                    >
                      <WandSparkles />
                      Design style
                      <ChevronDown size={12} />
                    </Button>
                  </div>
                  <div>
                    <span className="prompt-hint">Let your ideas do the talking</span>
                    <Button
                      size="icon"
                      className="send-button"
                      aria-label="Create project"
                      disabled={!prompt.trim()}
                      onClick={create}
                    >
                      <ArrowUp />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="suggestions">
                {[
                  {
                    icon: Globe,
                    label: "Business website",
                    text: "Build a modern website for my business",
                  },
                  {
                    icon: LayoutGrid,
                    label: "SaaS application",
                    text: "Build a clean SaaS application with a dashboard",
                  },
                  {
                    icon: Code2,
                    label: "Personal portfolio",
                    text: "Create a personal portfolio for a designer",
                  },
                  {
                    icon: Heart,
                    label: "Something fun",
                    text: "Create a playful portfolio for my cat Mochi",
                  },
                ].map((item) => (
                  <Button
                    key={item.label}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setPrompt(item.text);
                      document.getElementById("create-prompt")?.focus();
                    }}
                  >
                    <item.icon />
                    {item.label}
                  </Button>
                ))}
              </div>
            </section>
          )}
          <section className="projects-section">
            <div className="section-heading">
              <div>
                <h2>{library ? "My projects" : "Your ideas, brought to life"}</h2>
                <p>
                  {library
                    ? "Everything you’re building, all in one place."
                    : "Pick up where you left off, or start something new."}
                </p>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link to={library ? "/" : "/projects"}>
                  {library ? "New project" : "View all projects"}
                  <ArrowUpRight />
                </Link>
              </Button>
            </div>
            <div className="projects-toolbar">
              <div className="project-tabs">
                {["All projects", "Favorites"].map((t) => (
                  <Button
                    key={t}
                    variant="ghost"
                    className={tab === t ? "tab active" : "tab"}
                    onClick={() => setTab(t)}
                  >
                    {t}
                    {t === "All projects" && <span>6</span>}
                  </Button>
                ))}
              </div>
              <div className="project-filters">
                <label className="search-field">
                  <Search size={15} />
                  <input
                    aria-label="Search projects"
                    placeholder="Search projects…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </label>
                <select
                  aria-label="Sort projects"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="recent">Last edited</option>
                  <option value="name">Name A–Z</option>
                </select>
                <div className="view-toggle">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Grid view"
                    className={layout === "grid" ? "selected" : ""}
                    onClick={() => setLayout("grid")}
                  >
                    <LayoutGrid />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="List view"
                    className={layout === "list" ? "selected" : ""}
                    onClick={() => setLayout("list")}
                  >
                    <List />
                  </Button>
                </div>
              </div>
            </div>
            <div className={`project-grid ${layout === "list" ? "list-view" : ""}`}>
              {visible.map((project) => (
                <article className="project-card" key={project.id}>
                  <Link
                    to="/editor"
                    search={{ project: project.id }}
                    className="project-image-link"
                    aria-label={`Open ${project.name}`}
                  >
                    <ProjectPreview project={project} />
                    <span className="open-project">
                      <ArrowUpRight size={18} />
                    </span>
                  </Link>
                  <div className="project-details">
                    <Link to="/editor" search={{ project: project.id }}>
                      <h3>{project.name}</h3>
                      <p>
                        <span className="project-category">{project.category}</span>
                        <span>Edited {project.edited}</span>
                      </p>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Project details"
                      aria-label={`Details for ${project.name}`}
                      onClick={() => setDialog(project.name)}
                    >
                      <MoreHorizontal />
                    </Button>
                  </div>
                </article>
              ))}
            </div>
            {visible.length === 0 && (
              <div className="empty-state">
                <Search />
                <h3>No projects found</h3>
                <p>Try a different name or switch to all projects.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setQuery("");
                    setTab("All projects");
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </section>
          </>
          )}
          <footer className="workspace-footer">
            <span>Made for the ideas that won’t leave you alone.</span>
            <span>
              Powered by CoFoundersLab <ArrowUpRight size={12} />
            </span>
          </footer>
        </main>
      </div>
      <Dialog
        open={!!dialog}
        onOpenChange={(open) => {
          if (!open) setDialog("");
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialog}</DialogTitle>
            <DialogDescription>
              {dialog === "Design style"
                ? "Choose the look for your next project."
                : "This is a design preview of your Upfounder workspace. Account settings, plans, and saved projects aren’t connected yet."}
            </DialogDescription>
          </DialogHeader>
          {dialog === "Design style" && (
            <div className="grid grid-cols-2 gap-3">
              {["Modern minimal", "Editorial", "Bold & playful", "Classic"].map((style) => (
                <Button
                  variant="outline"
                  key={style}
                  onClick={() => {
                    setPrompt((p) => `${p}${p ? " — " : ""}${style} design`);
                    setDialog("");
                  }}
                >
                  {style}
                </Button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
