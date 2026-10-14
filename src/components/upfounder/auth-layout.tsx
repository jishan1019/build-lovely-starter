import { useState, type ReactNode } from "react";
import { Check, Eye, EyeOff, Github, Info, Lock, Mail, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Brand } from "@/components/upfounder/workspace";
import interior from "@/assets/interior.jpg";

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
        <div className="auth-show-head">
          <span className="auth-pill"><Sparkles size={13} /> AI website builder</span>
          <h2>Describe it. <span>Watch it come to life.</span></h2>
          <p>Turn a single sentence into a polished, ready-to-share website.</p>
        </div>
        <div className="auth-mock">
          <div className="auth-browser">
            <div className="auth-browser-bar"><i /><i /><i /><span>ceramics-studio.site</span></div>
            <div className="auth-browser-body">
              <img src={interior} alt="" />
              <div>
                <small>STUDIO CLAY</small>
                <b>Handmade pieces for slow mornings.</b>
                <span className="auth-fake-btn">Shop the collection</span>
              </div>
            </div>
          </div>
          <div className="auth-float prompt">
            <span className="auth-avatar">LA</span>
            <p>Build a calm site for my ceramics studio</p>
          </div>
          <div className="auth-float done">
            <span className="auth-ai-icon"><Check size={15} /></span>
            <div><b>Draft ready</b><p>3 pages · 12 seconds</p></div>
          </div>
        </div>
        <div className="auth-proof">
          <div className="auth-faces"><span>AM</span><span>JR</span><span>KS</span></div>
          <p><b>Loved by builders</b> shipping their ideas every day</p>
        </div>
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
