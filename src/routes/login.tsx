import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AuthField, AuthLayout, AuthNotice, SocialButtons } from "@/components/upfounder/auth-layout";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — Upfounder" },
      { name: "description", content: "Log in to your Upfounder workspace and keep building." },
      { property: "og:title", content: "Log in — Upfounder" },
      { property: "og:description", content: "Welcome back to your Upfounder workspace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Login,
});

function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [notice, setNotice] = useState("");
  const msg = (m: string) => setNotice(`${m} isn’t connected yet — this is a design preview.`);
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to pick up where you left off."
      footer={<>Don’t have an account? <Link to="/signup">Create one</Link></>}
    >
      <SocialButtons onClick={(p) => msg(`${p} sign in`)} />
      <form className="auth-fields" onSubmit={(e) => { e.preventDefault(); msg("Signing in"); }}>
        <AuthField label="Email" icon="mail" type="email" placeholder="you@example.com" value={email} onChange={setEmail} />
        <AuthField label="Password" icon="lock" type="password" placeholder="Your password" value={pw} onChange={setPw}
          aside={<Link to="/forgot-password" className="auth-link-sm">Forgot password?</Link>} />
        {notice && <AuthNotice>{notice}</AuthNotice>}
        <Button type="submit" className="auth-submit" disabled={!email || !pw}>Log in</Button>
      </form>
    </AuthLayout>
  );
}
