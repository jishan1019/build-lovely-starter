import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthField, AuthLayout } from "@/components/upfounder/auth-layout";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — Upfounder" },
      { name: "description", content: "Get a link to reset your Upfounder password." },
      { property: "og:title", content: "Reset your password — Upfounder" },
      { property: "og:description", content: "Recover access to your Upfounder account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Forgot,
});

function Forgot() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <AuthLayout
      title={sent ? "Check your inbox" : "Forgot your password?"}
      subtitle={sent ? `If an account exists for ${email}, a reset link would be on its way.` : "Enter your email and we’ll send you a reset link."}
      footer={<Link to="/login" className="auth-back"><ArrowLeft size={14} /> Back to log in</Link>}
    >
      {sent ? (
        <div className="auth-sent">
          <span><MailCheck size={22} /></span>
          <p>This is a design preview, so no email is actually sent yet.</p>
          <Button variant="outline" className="auth-submit" onClick={() => setSent(false)}>Use a different email</Button>
        </div>
      ) : (
        <form className="auth-fields" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <AuthField label="Email" icon="mail" type="email" placeholder="you@example.com" value={email} onChange={setEmail} />
          <Button type="submit" className="auth-submit" disabled={!email.includes("@")}>Send reset link</Button>
        </form>
      )}
    </AuthLayout>
  );
}
