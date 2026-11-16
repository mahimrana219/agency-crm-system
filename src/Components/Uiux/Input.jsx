export default function Input({ label, error, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-medium text-[#9A9A9A]">{label}</label>}
      <input
        className={`bg-[#181818] border border-[#2E2E2E] text-[#F8F8F8] px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#5DD62C] transition-colors ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}