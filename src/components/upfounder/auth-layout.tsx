import { useState, type ReactNode } from "react";
import { ArrowRight, Eye, EyeOff, Github, Info, Lock, Mail, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Brand } from "@/components/upfounder/workspace";

export function AuthLayout({ title, subtitle, children, footer }: { title: string; subtitle: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="auth">
      <main className="auth-form-side">
        <div className="auth-top"><Brand /></div>
        <div className="auth-card">
          <h1>{title}</h1>
          <p className="auth-sub">{subtitle}</p>
          {children}
        </div>
        {footer && <div className="auth-footer">{footer}</div>}
      </main>
      <aside className="auth-showcase" aria-hidden="true">
        <div className="auth-glow" />
        <div className="auth-stack">
          <div className="auth-bubble user">
            <span className="auth-avatar">LA</span>
            <p>Build me a calm portfolio site for my ceramics studio</p>
          </div>
          <div className="auth-bubble ai">
            <span className="auth-ai-icon"><Sparkles size={16} /></span>
            <div>
              <b>On it — here’s your first draft.</b>
              <p>Warm palette, gallery grid and a contact page, ready to refine.</p>
              <div className="auth-progress"><span /></div>
            </div>
          </div>
          <div className="auth-bubble cta">
            <div>
              <b>Build anything.</b>
              <p>From idea to live site in minutes.</p>
            </div>
            <span className="auth-cta-icon"><ArrowRight size={18} /></span>
          </div>
        </div>
        <p className="auth-quote">“Your creative partner for every idea.”</p>
      </aside>
    </div>
  );
}

export function SocialButtons({ onClick }: { onClick: (p: string) => void }) {
  return (
    <>
      <div className="auth-social">
        <Button variant="outline" onClick={() => onClick("Google")}>
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M21.35 11.1H12v2.98h5.35c-.23 1.43-1.66 4.2-5.35 4.2-3.22 0-5.85-2.67-5.85-5.96S8.78 6.36 12 6.36c1.83 0 3.06.78 3.76 1.45l2.57-2.47C16.68 3.8 14.55 2.9 12 2.9 6.97 2.9 2.9 6.97 2.9 12s4.07 9.1 9.1 9.1c5.25 0 8.73-3.69 8.73-8.89 0-.6-.07-1.05-.15-1.51z" /></svg>
          Google
        </Button>
        <Button variant="outline" onClick={() => onClick("GitHub")}><Github /> GitHub</Button>
      </div>
      <div className="auth-divider"><span>or continue with email</span></div>
    </>
  );
}

export function AuthField({ label, icon, type = "text", placeholder, value, onChange, aside }: {
  label: string; icon: "user" | "mail" | "lock"; type?: string; placeholder: string; value: string; onChange: (v: string) => void; aside?: ReactNode;
}) {
  const [show, setShow] = useState(false);
  const Icon = icon === "user" ? User : icon === "mail" ? Mail : Lock;
  const isPw = type === "password";
  return (
    <label className="auth-field">
      <span className="auth-label">{label}{aside}</span>
      <span className="auth-input">
        <Icon size={16} />
        <input type={isPw && show ? "text" : type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
        {isPw && (
          <Button type="button" variant="ghost" size="icon" aria-label={show ? "Hide password" : "Show password"} onClick={() => setShow((s) => !s)}>
            {show ? <EyeOff /> : <Eye />}
          </Button>
        )}
      </span>
    </label>
  );
}

export function AuthNotice({ children }: { children: ReactNode }) {
  return <div className="auth-notice"><Info size={14} />{children}</div>;
}
