import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function FavoriteButton({ type, refId, label, className = "" }) {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  const toggle = async (e) => {
    e.preventDefault();
    if (!user) {
      window.location.href = "/login";
      return;
    }
    setBusy(true);
    try {
      if (saved) {
        await api.delete(`/favorites/${type}/${refId}`);
        setSaved(false);
      } else {
        await api.post("/favorites", { type, refId, label });
        setSaved(true);
      }
    } catch {
      /* silently ignore — not critical to the main flow */
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={busy}
      aria-label={saved ? "Remove from favorites" : "Add to favorites"}
      className={className}
    >
      <FiHeart
        className="h-4 w-4"
        style={{
          color: saved ? "var(--color-gold)" : "#64748b",
          fill: saved ? "var(--color-gold)" : "none",
        }}
      />
    </button>
  );
}
