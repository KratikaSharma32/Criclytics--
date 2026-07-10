import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import { GiCricketBat } from "react-icons/gi";
import GlassCard from "../components/ui/GlassCard";
import Input from "../components/ui/Input";
import api from "../services/api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setError("");
    try {
      await api.post("/auth/reset-password", { token, password });
      setDone(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "That reset link is invalid or has expired.");
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
        {done ? (
          <p className="text-center text-sm text-slate-300">
            Password updated. Redirecting you to login…
          </p>
        ) : (
          <>
            <h1 className="font-display text-xl font-bold">Set a new password</h1>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <Input icon={FiLock} type="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Input icon={FiLock} type="password" placeholder="Confirm new password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
              {error && <p className="text-sm text-red-400">{error}</p>}
              <button
                type="submit"
                className="w-full rounded-xl py-3.5 text-sm font-semibold text-[#081120]"
                style={{ background: "linear-gradient(135deg, var(--color-cyan), #6ee7f2)" }}
              >
                Reset password
              </button>
            </form>
          </>
        )}
      </GlassCard>
    </div>
  );
}
