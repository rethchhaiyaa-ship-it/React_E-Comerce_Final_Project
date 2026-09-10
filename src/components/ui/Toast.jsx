import { useApp } from "../../context/AppContext";

export default function Toast() {
  const { toasts } = useApp();
  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-3 rounded-xl shadow-lg text-sm font-semibold text-white flex items-center gap-2 pointer-events-auto
            ${t.type === "success" ? "bg-success" : t.type === "error" ? "bg-danger" : "bg-stone-700"}`}
          style={{ animation: "slideUp 0.3s ease" }}
        >
          <span>{t.type === "success" ? "✓" : t.type === "error" ? "✕" : "ℹ"}</span>
          {t.message}
        </div>
      ))}
      <style>{`@keyframes slideUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}