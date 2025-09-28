// src/components/ui/Spinner.jsx
export default function Spinner({ size = 48, className = "" }) {
  const px = typeof size === "number" ? `${size}px` : size;
  const border = Math.max(3, Math.floor((typeof size === 'number' ? size : 48) / 12));
  return (
    <div
      className={`inline-block animate-spin drop-shadow-[0_0_12px_rgba(168,85,247,0.35)] ${className}`}
      style={{ width: px, height: px }}
      aria-label="Loading"
      role="status"
    >
      <span className="sr-only">Loading...</span>
      <div
        className="w-full h-full rounded-full"
        style={{
          borderStyle: 'solid',
          borderWidth: border,
          borderColor: 'rgba(255,255,255,0.15)',
          borderTopColor: '#f0abfc', // fuchsia-300
          borderRightColor: '#60a5fa', // blue-400
        }}
      />
    </div>
  );
}
