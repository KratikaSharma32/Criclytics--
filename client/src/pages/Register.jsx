import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiGlobe, FiHeart } from "react-icons/fi";
import { GiCricketBat } from "react-icons/gi";
import GlassCard from "../components/ui/GlassCard";
import Input from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";

const countries = ["India", "Australia", "England", "Pakistan", "South Africa", "New Zealand", "Other"];
const teamsList = ["India", "Australia", "England", "Pakistan", "South Africa", "New Zealand"];

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    favoriteTeam: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.password) {
      setError("Fill in your name, email and password to continue.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    if (!agreed) {
      setError("Please accept the Terms & Conditions.");
      return;
    }
    setError("");
    try {
      await register(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't create your account. Please try again.");
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
        className="w-full max-w-xl"
      >
        <GlassCard glow className="p-8">
          <div className="mb-6 text-center">
            <h1 className="font-display text-2xl font-bold">Create Your Account</h1>
            <p className="mt-1 text-sm text-slate-400">Join CricLive today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input icon={FiUser} placeholder="Full name" value={form.fullName} onChange={update("fullName")} />
              <Input icon={FiUser} placeholder="Username" value={form.username} onChange={update("username")} />
            </div>

            <Input icon={FiMail} type="email" placeholder="Email" value={form.email} onChange={update("email")} />

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                icon={FiLock}
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={update("password")}
              />
              <Input
                icon={FiLock}
                type="password"
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={update("confirmPassword")}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative">
                <FiGlobe
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2"
                  style={{ color: "var(--color-cyan)" }}
                />
                <select
                  value={form.country}
                  onChange={update("country")}
                  className="w-full appearance-none rounded-xl border border-white/10 bg-white/[0.03] py-3.5 pl-12 pr-4 text-sm text-white outline-none focus:border-[var(--color-cyan)]"
                >
                  <option value="" className="bg-[#0c1830]">Select country</option>
                  {countries.map((c) => (
                    <option key={c} value={c} className="bg-[#0c1830]">{c}</option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <FiHeart
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2"
                  style={{ color: "var(--color-cyan)" }}
                />
                <select
                  value={form.favoriteTeam}
                  onChange={update("favoriteTeam")}
                  className="w-full appearance-none rounded-xl border border-white/10 bg-white/[0.03] py-3.5 pl-12 pr-4 text-sm text-white outline-none focus:border-[var(--color-cyan)]"
                >
                  <option value="" className="bg-[#0c1830]">Favorite team</option>
                  {teamsList.map((t) => (
                    <option key={t} value={t} className="bg-[#0c1830]">{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <label className="flex items-start gap-2 text-xs text-slate-400">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded accent-[var(--color-cyan)]"
              />
              I agree to the Terms & Conditions and Privacy Policy
            </label>

            <button
              type="submit"
              className="w-full rounded-xl py-3.5 text-sm font-semibold text-[#081120] transition-transform hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, var(--color-cyan), #6ee7f2)" }}
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold" style={{ color: "var(--color-cyan)" }}>
              Log in
            </Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
}
