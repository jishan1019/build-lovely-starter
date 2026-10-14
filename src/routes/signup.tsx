import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AuthField, AuthLayout, AuthNotice, SocialButtons } from "@/components/upfounder/auth-layout";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your account — Upfounder" },
      { name: "description", content: "Create a free Upfounder account and start building your ideas." },
      { property: "og:title", content: "Create your account — Upfounder" },
      { property: "og:description", content: "Start building with Upfounder for free." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Signup,
});

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [notice, setNotice] = useState("");
  const msg = (m: string) => setNotice(`${m} isn’t connected yet — this is a design preview.`);
  const strength = Math.min(4, [pw.length >= 8, /[A-Z]/.test(pw), /\d/.test(pw), /[^A-Za-z0-9]/.test(pw)].filter(Boolean).length);
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start free — no credit card needed."
      footer={<>Already have an account? <Link to="/login">Log in</Link></>}
    >
      <SocialButtons onClick={(p) => msg(`${p} sign up`)} />
      <form className="auth-fields" onSubmit={(e) => { e.preventDefault(); msg("Account creation"); }}>
        <AuthField label="Name" icon="user" placeholder="Your name" value={name} onChange={setName} />
        <AuthField label="Email" icon="mail" type="email" placeholder="you@example.com" value={email} onChange={setEmail} />
        <AuthField label="Password" icon="lock" type="password" placeholder="At least 8 characters" value={pw} onChange={setPw} />
        {pw && (
          <div className="auth-strength" data-level={strength}>
            {[1, 2, 3, 4].map((i) => <span key={i} className={i <= strength ? "on" : ""} />)}
            <small>{["Too weak", "Weak", "Okay", "Good", "Strong"][strength]}</small>
          </div>
        )}
        {notice && <AuthNotice>{notice}</AuthNotice>}
        <Button type="submit" className="auth-submit" disabled={!name || !email || pw.length < 8}>Create account</Button>
        <p className="auth-terms">By continuing, you agree to our Terms of Service and Privacy Policy.</p>
      </form>
    </AuthLayout>
  );
}
