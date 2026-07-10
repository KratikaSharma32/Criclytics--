import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import { GiCricketBat } from "react-icons/gi";
import GlassCard from "../components/ui/GlassCard";
import Input from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Enter both email and password to continue.");
      return;
    }
    setError("");
    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't sign in. Check your details and try again.");
    }
  };

  return (
    <div className="stadium-backdrop flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <Link to="/" className="mb-8 flex items-center gap-2">
        <GiCricketBat className="h-8 w-8 rotate-45" style={{ color: "var(--color-cyan)" }} />
        <div>
          <p className="font-display text-2xl font-bold leading-none">
            CRIC<span style={{ color: "var(--color-cyan)" }}>LIVE</span>
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
            Real-Time Cricket Intelligence
          </p>
        </div>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <GlassCard glow className="p-8">
          <div className="mb-6 text-center">
            <div
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border"
              style={{ borderColor: "var(--color-cyan)", color: "var(--color-cyan)" }}
            >
              🏆
            </div>
            <h1 className="font-display text-2xl font-bold">
              Welcome <span style={{ color: "var(--color-cyan)" }}>Back!</span>
            </h1>
            <p className="mt-1 text-sm text-slate-400">Sign in to continue to CricLive</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              icon={FiMail}
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <div className="relative">
              <Input
                icon={FiLock}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-400">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded accent-[var(--color-cyan)]"
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="hover:text-white" style={{ color: "var(--color-cyan)" }}>
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl py-3.5 text-sm font-semibold text-[#081120] transition-transform hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, var(--color-cyan), #6ee7f2)" }}
            >
              Login
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-slate-500">
            <div className="h-px flex-1 bg-white/10" />
            or continue with
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button className="flex items-center justify-center gap-2 rounded-xl border border-white/10 py-2.5 text-sm hover:border-white/25">
              <FcGoogle className="h-4 w-4" /> <span className="hidden sm:inline">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 rounded-xl border border-white/10 py-2.5 text-sm hover:border-white/25">
              <FaFacebook className="h-4 w-4 text-blue-500" /> <span className="hidden sm:inline">Facebook</span>
            </button>
            <button className="flex items-center justify-center gap-2 rounded-xl border border-white/10 py-2.5 text-sm hover:border-white/25">
              <FaApple className="h-4 w-4" /> <span className="hidden sm:inline">Apple</span>
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold" style={{ color: "var(--color-cyan)" }}>
              Sign up
            </Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
}
