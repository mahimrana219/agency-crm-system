export default function Button({ children, variant = "primary", className = "", ...props }) {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-[#6366F1] text-[#121212] hover:bg-[#4bc020]",
    secondary: "bg-[#202020] text-[#F8F8F8] border border-[#2E2E2E] hover:bg-[#2A2A2A]",
    danger: "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}