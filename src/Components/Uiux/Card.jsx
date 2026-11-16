export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-[#FFFFFF] border border-[#E5E7EB] p-6 rounded-xl shadow-sm ${className}`}>
      {children}
    </div>
  );
}