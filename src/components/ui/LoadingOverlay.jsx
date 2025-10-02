import Spinner from "./Spinner";

export default function LoadingOverlay({ show = false, label = "Loading..." }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-b from-black/70 via-black/60 to-black/70 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 text-white">
        <Spinner size={64} />
        <div className="text-sm sm:text-base text-white/90">{label}</div>
      </div>
    </div>
  );
}
