import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { GiCricketBat } from "react-icons/gi";
import GlassCard from "../components/ui/GlassCard";
import Input from "../components/ui/Input";
import api from "../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/forgot-password", { email });
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="stadium-backdrop flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <Link to="/" className="mb-8 flex items-center gap-2">
        <GiCricketBat className="h-8 w-8 rotate-45" style={{ color: "var(--color-cyan)" }} />
        <p className="font-display text-2xl font-bold">
          CRIC<span style={{ color: "var(--color-cyan)" }}>LIVE</span>
        </p>
      </Link>

      <GlassCard glow className="w-full max-w-md p-8">
        {sent ? (
          <div className="text-center">
            <h1 className="font-display text-xl font-bold">Check your email</h1>
            <p className="mt-2 text-sm text-slate-400">
              If an account exists for <span className="text-white">{email}</span>, a reset link is on its way.
            </p>
            <Link to="/login" className="mt-6 inline-block text-sm font-semibold" style={{ color: "var(--color-cyan)" }}>
              Back to login
            </Link>
          </div>
        ) : (
          <>
            <h1 className="font-display text-xl font-bold">Forgot your password?</h1>
            <p className="mt-1 text-sm text-slate-400">Enter your email and we'll send you a reset link.</p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <Input
                icon={FiMail}
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <p className="text-sm text-red-400">{error}</p>}
              <button
                type="submit"
                className="w-full rounded-xl py-3.5 text-sm font-semibold text-[#081120]"
                style={{ background: "linear-gradient(135deg, var(--color-cyan), #6ee7f2)" }}
              >
                Send reset link
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-slate-400">
              <Link to="/login" style={{ color: "var(--color-cyan)" }}>Back to login</Link>
            </p>
          </>
        )}
      </GlassCard>
    </div>
  );
}
