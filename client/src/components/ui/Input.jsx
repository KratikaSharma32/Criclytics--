export default function Input({ icon: Icon, className = "", ...props }) {
  return (
    <div className="relative">
      {Icon && (
        <Icon
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2"
          style={{ color: "var(--color-cyan)" }}
        />
      )}
      <input
        className={`w-full rounded-xl border border-white/10 bg-white/[0.03] py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-[var(--color-cyan)] ${
          Icon ? "pl-12" : "pl-4"
        } pr-4 ${className}`}
        {...props}
      />
    </div>
  );
}
