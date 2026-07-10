import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import GlassCard from "../components/ui/GlassCard";
import { checkout, verifyPayment } from "../services/cricketApi";
import { useAuth } from "../context/AuthContext";

const plans = [
  { name: "Free", price: 0, features: ["Live matches", "Upcoming matches", "Completed matches", "Player & team details"] },
  {
    name: "Pro",
    price: 299,
    highlight: true,
    features: ["Everything in Free", "AI match analyst", "Win probability", "Fantasy suggestions", "Notifications", "Predictions"],
  },
  {
    name: "Premium",
    price: 799,
    features: ["Everything in Pro", "Historical analytics", "Personal dashboard", "Advanced AI reports", "Data export"],
  },
];

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function Subscription() {
  const { user } = useAuth();
  const [status, setStatus] = useState("");
  const [busyPlan, setBusyPlan] = useState(null);

  const subscribe = async (plan) => {
    if (plan === "Free") return;
    setBusyPlan(plan);
    setStatus("");
    try {
      const { data } = await checkout(plan);
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        setStatus("Couldn't load the payment widget. Check your connection and try again.");
        return;
      }

      const rzp = new window.Razorpay({
        key: data.keyId,
        amount: data.data.amount,
        currency: data.data.currency,
        name: "CricLive",
        description: `${plan} plan subscription`,
        order_id: data.data.id,
        theme: { color: "#00e5ff" },
        handler: async (response) => {
          await verifyPayment({ ...response, plan });
          setStatus(`You're now on the ${plan} plan 🎉`);
        },
      });
      rzp.open();
    } catch (err) {
      setStatus(err.response?.data?.message || "Payments aren't configured yet — add Razorpay keys to the server .env.");
    } finally {
      setBusyPlan(null);
    }
  };

  return (
    <div className="stadium-backdrop min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="font-display text-2xl font-bold">Subscription</h1>
        <p className="mt-1 text-sm text-slate-400">
          {user ? `Currently on the ${user.plan} plan.` : "Sign in to manage your subscription."}
        </p>

        {status && <GlassCard className="mt-4 p-4 text-sm">{status}</GlassCard>}

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <GlassCard key={p.name} glow={p.highlight} className={`flex flex-col p-8 ${p.highlight ? "border-[var(--color-cyan)]/40" : ""}`}>
              <h3 className="font-display text-xl font-bold">{p.name}</h3>
              <p className="mt-2 font-display text-3xl font-bold">
                ₹{p.price} <span className="text-sm font-normal text-slate-500">/month</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-300">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--color-cyan)" }} />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => subscribe(p.name)}
                disabled={busyPlan === p.name || user?.plan === p.name}
                className={`mt-8 rounded-full py-3 text-center text-sm font-semibold disabled:opacity-60 ${
                  p.highlight ? "text-[#081120]" : "border border-white/10 text-white"
                }`}
                style={p.highlight ? { background: "var(--color-cyan)" } : {}}
              >
                {user?.plan === p.name ? "Current plan" : busyPlan === p.name ? "Opening checkout…" : `Choose ${p.name}`}
              </button>
            </GlassCard>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
