export default function GlassCard({ children, className = "", glow = false }) {
  return (
    <div className={`glass rounded-2xl ${glow ? "glow-cyan" : ""} ${className}`}>
      {children}
    </div>
  );
}
