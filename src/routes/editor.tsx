import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Code2,
  Copy,
  Crown,
  Download,
  FileCode2,
  FileText,
  Folder,
  Globe,
  ImagePlus,
  MessageSquareQuote,
  Mic,
  Monitor,
  PanelLeft,
  RotateCw,
  Share2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Upload,
  CircleCheck,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/components/upfounder/project-data";

export const Route = createFileRoute("/editor")({
  validateSearch: (search: Record<string, unknown>): { project: string; prompt?: string | undefined } => ({
    project: typeof search["project"] === "string" ? search["project"] : "mochi",
    prompt: typeof search["prompt"] === "string" ? search["prompt"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Project editor — Upfounder" },
      { name: "description", content: "Refine your next idea in the Upfounder project editor." },
      { property: "og:title", content: "Project editor — Upfounder" },
      { property: "og:description", content: "A focused space to create and refine your project." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Editor,
});

const files = ["Hero.tsx", "App.tsx", "index.css"] as const;
const suggestions = ["Add a newsletter signup", "Show a featured products row", "Add a testimonials strip"];

function Editor() {
  const search = Route.useSearch();
  const project = projects.find((p) => p.id === search.project) ?? projects[0];
  const [mobile, setMobile] = useState(false);
  const [code, setCode] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);
  const [changesOpen, setChangesOpen] = useState(false);
  const [file, setFile] = useState<string>("App.tsx");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [publishOpen, setPublishOpen] = useState(false);
  const [notice, setNotice] = useState("");
  if (!project) return null;
  const name = project.name.split(" · ")[0] ?? "Project";
  const title = search.project === "new" ? "Untitled project" : name;
  const prompt = search.prompt ?? `Create a simple hero section for ${name}`;
  const flash = (m: string) => {
    setNotice(`${m} — design preview only.`);
    setTimeout(() => setNotice(""), 2600);
  };
  const submit = (text = message) => {
    if (text.trim()) {
      setMessages((m) => [...m, text.trim()]);
      setMessage("");
    }
  };
  const source =
    file === "Hero.tsx"
      ? `export default function Hero() {\n  return (\n    <section className="hero">\n      <p className="eyebrow">${name.toUpperCase()}</p>\n      <h1>Considered design for everyday living</h1>\n      <a href="#collection">Explore collection</a>\n    </section>\n  );\n}`
      : file === "index.css"
        ? `:root {\n  --brand: #191919;\n  --paper: #faf8f5;\n}\n\nbody {\n  font-family: "Manrope", sans-serif;\n  background: var(--paper);\n}`
        : `import Hero from "./components/Hero";\n\nexport default function App() {\n  return (\n    <main>\n      <Hero />\n    </main>\n  );\n}`;

  return (
    <div className="gen">
      <header className="gen-header">
        <div className="gen-header-left">
          <Link to="/" className="gen-brand">
            <span className="gen-brand-mark">✳</span>
            <span>
              <b>
                {title} <ChevronDown size={13} />
              </b>
              <small>Generation mode</small>
            </span>
          </Link>
        </div>
        <div className="gen-header-mid">
          <Button variant="ghost" size="icon" aria-label="Toggle chat" onClick={() => setChatOpen((o) => !o)}>
            <PanelLeft />
          </Button>
          <div className="gen-segment">
            <Button variant={code ? "ghost" : "secondary"} size="sm" onClick={() => setCode(false)}>
              <Globe /> Preview
            </Button>
            <Button variant={code ? "secondary" : "ghost"} size="sm" onClick={() => setCode(true)}>
              <Code2 /> Code
            </Button>
          </div>
        </div>
        <div className="gen-address">
          <Button variant="ghost" size="icon" aria-label={mobile ? "Desktop preview" : "Mobile preview"} onClick={() => setMobile((m) => !m)}>
            {mobile ? <Smartphone /> : <Monitor />}
          </Button>
          <span>/{name.toLowerCase()}</span>
          <Button variant="ghost" size="icon" aria-label="Open in new tab" onClick={() => flash("Open in new tab")}>
            <ArrowUpRight />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Reload preview" onClick={() => setMessages([])}>
            <RotateCw />
          </Button>
        </div>
        <div className="gen-header-right">
          <Button variant="ghost" size="icon" aria-label="Share" onClick={() => flash("Sharing")}>
            <Share2 />
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/settings">
              <Crown /> Upgrade
            </Link>
          </Button>
          <Button size="sm" onClick={() => setPublishOpen((o) => !o)}>
            <Globe /> Publish
          </Button>
          <span className="user-avatar small">LA</span>
        </div>
      </header>

      <div className="gen-body">
        {chatOpen && (
          <aside className="gen-chat">
            <div className="gen-messages">
              <div className="gen-user">{prompt}</div>
              <p className="gen-ai">
                Design chosen for this site: <b>Modern Commerce</b> — Sora headings, Manrope body text and a warm
                neutral palette. Building the pages now.
              </p>
              <div className="gen-changes">
                <Button variant="ghost" className="gen-changes-toggle" onClick={() => setChangesOpen((o) => !o)}>
                  {changesOpen ? <ChevronDown /> : <ChevronRight />}
                  Explore changes
                  <span>{files.length + 2}</span>
                </Button>
                {changesOpen && (
                  <ul>
                    {["Hero.tsx", "App.tsx", "index.css", "index.html", "hero.jpg"].map((f) => (
                      <li key={f}>
                        <Check size={13} /> {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <p className="gen-label">Generated 1 image</p>
                <div className="gen-images">
                  <small>Generated images (1)</small>
                  <img src={project.image} alt="" width={64} height={64} />
                </div>
              </div>
              <p className="gen-ai">
                Your {name} hero section is ready in the preview, with a headline, supporting text and a call to
                action. Want any changes?
              </p>
              {messages.map((m, i) => (
                <div key={i} className="gen-messages-pair">
                  <div className="gen-user">{m}</div>
                  <p className="gen-ai">
                    <Sparkles size={14} /> “{m}” is noted. Live AI editing isn’t connected in this preview yet.
                  </p>
                </div>
              ))}
            </div>
            <div className="gen-suggestions">
              {suggestions.map((s) => (
                <Button key={s} variant="outline" size="sm" onClick={() => submit(s)}>
                  {s}
                </Button>
              ))}
            </div>
            <div className="gen-composer">
              <textarea
                aria-label="Ask AI to modify your app"
                placeholder="Ask AI to modify your app…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submit();
                  }
                }}
              />
              <div>
                <Button variant="ghost" size="icon" aria-label="Attach image" onClick={() => flash("Image upload")}>
                  <ImagePlus />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Voice input" onClick={() => flash("Voice input")}>
                  <Mic />
                </Button>
                <Button size="icon" className="ml-auto" aria-label="Send" disabled={!message.trim()} onClick={() => submit()}>
                  <ArrowUp />
                </Button>
              </div>
            </div>
          </aside>
        )}

        <section className="gen-canvas">
          {code ? (
            <div className="gen-code">
              <nav className="gen-explorer" aria-label="Files">
                <p>
                  <Folder size={14} /> Explorer
                </p>
                <span className="gen-dir">
                  <ChevronDown size={12} /> src
                </span>
                <span className="gen-dir nested">
                  <ChevronDown size={12} /> components
                </span>
                {files.map((f) => (
                  <Button
                    key={f}
                    variant="ghost"
                    className={`gen-file ${f === "Hero.tsx" ? "deep" : ""} ${file === f ? "active" : ""}`}
                    onClick={() => setFile(f)}
                  >
                    {f.endsWith(".css") ? <FileText /> : <FileCode2 />} {f}
                  </Button>
                ))}
              </nav>
              <div className="gen-editor">
                <div className="gen-tab">
                  <FileCode2 size={13} /> {file}
                </div>
                <div className="gen-editor-bar">
                  <span>src/{file === "Hero.tsx" ? "components/" : ""}{file}</span>
                  <div>
                    <Button variant="ghost" size="sm" onClick={() => setMessage(`In ${file}, `)}>
                      <MessageSquareQuote /> Reference in chat
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => { void navigator.clipboard?.writeText(source); flash("Copied"); }}>
                      <Copy /> Copy
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => flash("Download")}>
                      <Download /> Download
                    </Button>
                  </div>
                </div>
                <pre>
                  {source.split("\n").map((l, i) => (
                    <div key={i}>
                      <span>{i + 1}</span>
                      {l || " "}
                    </div>
                  ))}
                </pre>
              </div>
            </div>
          ) : (
            <div className={`gen-stage ${mobile ? "mobile" : ""}`}>
              <div className="gen-site">
                <div className="gen-site-copy">
                  <p className="gen-eyebrow">{name.toUpperCase()} STUDIO</p>
                  <h1>Considered goods designed for everyday living</h1>
                  <p>Explore a collection of understated objects and timeless essentials, made with enduring materials in mind.</p>
                  <div className="gen-site-cta">
                    <Button onClick={() => flash("Explore collection")}>
                      Explore collection <ArrowRight />
                    </Button>
                    <Button variant="outline" onClick={() => flash("Learn our story")}>Learn our story</Button>
                  </div>
                  <ul>
                    <li><Sparkles size={15} /> Thoughtful essentials</li>
                    <li><ShieldCheck size={15} /> Built to last</li>
                    <li><CircleCheck size={15} /> Consciously crafted</li>
                  </ul>
                </div>
                <img src={project.image} alt={project.name} width={1024} height={640} />
              </div>
            </div>
          )}

          {publishOpen && (
            <div className="gen-publish" role="dialog" aria-label="Confirm deployment">
              <header>
                <Button variant="ghost" size="icon" aria-label="Close" onClick={() => setPublishOpen(false)}>
                  <ArrowLeft />
                </Button>
                Confirm deployment
              </header>
              <div className="gen-publish-body">
                <span className="gen-publish-icon"><Globe /></span>
                <h3>Ready to publish?</h3>
                <p>Your project will be built and deployed to make it available online.</p>
                <label>
                  <b>Site title <i>*</i></b>
                  <input defaultValue={title} />
                </label>
                <label>
                  <b>Description <small>(optional)</small></b>
                  <textarea rows={2} placeholder="A brief description of your site" />
                </label>
                <div>
                  <b>Site icon <small>(optional)</small></b>
                  <Button variant="outline" className="gen-upload" onClick={() => flash("Icon upload")}>
                    <Upload /> Upload icon (PNG, JPG, SVG, ICO)
                  </Button>
                </div>
              </div>
              <footer>
                <Button variant="outline" onClick={() => setPublishOpen(false)}>Cancel</Button>
                <Button onClick={() => { setPublishOpen(false); flash("Deploy"); }}>
                  <Globe /> Deploy
                </Button>
              </footer>
            </div>
          )}
          {notice && <div className="gen-notice">{notice}</div>}
        </section>
      </div>
    </div>
  );
}
