import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Code2,
  Globe,
  ImagePlus,
  Monitor,
  Smartphone,
  Sparkles,
  Undo2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Brand } from "@/components/upfounder/workspace";
import { projects } from "@/components/upfounder/project-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
function Editor() {
  const search = Route.useSearch();
  const project = projects.find((p) => p.id === search.project) ?? projects[0];
  const [mobile, setMobile] = useState(false);
  const [code, setCode] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [modal, setModal] = useState("");
  if (!project) return null;
  const title = search.project === "new" ? "Untitled project" : project.name;
  const isCat = project.kind === "cat";
  const submit = () => {
    if (message.trim()) {
      setMessages((m) => [...m, message.trim()]);
      setMessage("");
    }
  };
  return (
    <div className="editor">
      <header className="editor-header">
        <div>
          <Brand />
          <span className="editor-project-name">{title}</span>
        </div>
        <div>
          <span className="editor-toast">
            <Check size={13} />
          </span>
          <Button variant="outline" size="sm" onClick={() => setModal("Share project")}>
            Share
            <ArrowUpRight />
          </Button>
          <Button size="sm" onClick={() => setModal("Publish project")}>
            <Globe />
            Publish
          </Button>
          <span className="user-avatar small">LA</span>
        </div>
      </header>
      <div className="editor-body">
        <aside className="editor-chat">
          <div className="chat-heading">
            <Sparkles size={17} />
            Your creative partner
          </div>
          <div className="chat-messages">
            <div className="user-message">
              {search.prompt ??
                `Create a beautiful ${project.category.toLowerCase()} for ${project.name.split(" · ")[0]}.`}
            </div>
            <div className="assistant-message">
              <Sparkles size={17} />
              <div>
                <p>
                  {search.project === "new"
                    ? "Here’s a sample design to explore your idea."
                    : "Your project is ready for its next chapter."}{" "}
                  I’ve put together a clean layout with thoughtful typography and room for your
                  content.
                </p>
                <div className="change-status">
                  <Check size={14} />
                  Design preview ready
                </div>
                <p>What would you like to change?</p>
              </div>
            </div>
            {messages.map((m, i) => (
              <div key={i}>
                <div className="user-message">{m}</div>
                <div className="assistant-message">
                  <Sparkles size={17} />
                  <p>“{m}” is noted for this preview. Live AI editing isn’t connected yet.</p>
                </div>
              </div>
            ))}
          </div>
          <div className="editor-composer">
            <textarea
              aria-label="Request a change"
              placeholder="What would you like to change?"
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
              <span>Design preview</span>
              <Button
                size="icon"
                aria-label="Send change"
                disabled={!message.trim()}
                onClick={submit}
              >
                <ArrowUp />
              </Button>
            </div>
          </div>
        </aside>
        <section className="editor-canvas">
          <div className="canvas-toolbar">
            <div>
              <Button
                variant={code ? "ghost" : "secondary"}
                size="sm"
                onClick={() => setCode(false)}
              >
                <Globe />
                Preview
              </Button>
              <Button
                variant={code ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setCode(true)}
              >
                <Code2 />
                Code
              </Button>
            </div>
            <span className="preview-address">
              {(project.name.split(" · ")[0] ?? "project").toLowerCase()} /
            </span>
            <div>
              <Button
                variant={!mobile ? "secondary" : "ghost"}
                size="icon"
                title="Desktop preview"
                aria-label="Desktop preview"
                onClick={() => setMobile(false)}
              >
                <Monitor />
              </Button>
              <Button
                variant={mobile ? "secondary" : "ghost"}
                size="icon"
                title="Mobile preview"
                aria-label="Mobile preview"
                onClick={() => setMobile(true)}
              >
                <Smartphone />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                title="Reset changes"
                aria-label="Reset changes"
                onClick={() => setMessages([])}
              >
                <Undo2 />
              </Button>
            </div>
          </div>
          <div className={`canvas-preview ${mobile ? "mobile-preview" : ""}`}>
            {code ? (
              <pre className="code-preview">{`// Read-only design preview\n\nexport default function Website() {\n  return (\n    <main>\n      <Navigation />\n      <Cover title="${isCat ? "Meet Mochi." : project.name.split(" · ")[0]}" />\n      <About />\n    </main>\n  );\n}`}</pre>
            ) : (
              <div className="editor-site">
                <nav className="preview-site-nav">
                  <b>
                    {isCat ? "mochi." : (project.name.split(" · ")[0] ?? "project").toLowerCase()}
                  </b>
                  <span>About &nbsp; · &nbsp; Gallery &nbsp; · &nbsp; Contact</span>
                </nav>
                <div className="editor-site-cover">
                  <img
                    src={project.image || projects[1]?.image || projects[0]?.image}
                    alt={isCat ? "Mochi the orange tabby cat" : project.name}
                    width={1024}
                    height={640}
                  />
                  <div>
                    <h1>
                      {isCat
                        ? "A little cat. A lot of personality."
                        : project.kind === "coast"
                          ? "Go somewhere that stays with you."
                          : "Considered design. Everyday living."}
                    </h1>
                    <p>
                      {isCat
                        ? "Meet Mochi, your daily dose of happy."
                        : "A space for the things that inspire you."}
                    </p>
                  </div>
                </div>
                <div className="editor-site-intro">
                  <h2>{isCat ? "Small paws. Big adventures." : "Made with intention."}</h2>
                  <p>
                    {isCat
                      ? "Sunbeam enthusiast. Professional napper. Your new favorite friend."
                      : "Beautiful moments, thoughtfully brought together."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
      <Dialog
        open={!!modal}
        onOpenChange={(o) => {
          if (!o) setModal("");
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{modal}</DialogTitle>
            <DialogDescription>
              This editor is a design preview. Live project sharing and publishing aren’t connected
              yet.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
