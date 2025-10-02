
import React from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-50 ring-offset-background";

const variantClasses = {
  default:
    "bg-fuchsia-600 text-white hover:bg-fuchsia-500 active:bg-fuchsia-700",
  secondary:
    "bg-white/10 text-white hover:bg-white/20 active:bg-white/25 border border-white/15",
  outline:
    "border border-white/20 bg-transparent text-white hover:bg-white/10",
  ghost: "bg-transparent text-white hover:bg-white/10",
  link: "text-fuchsia-300 underline-offset-4 hover:underline",
};

const sizeClasses = {
  sm: "h-9 px-3",
  md: "h-10 px-4",
  lg: "h-11 px-6 text-base",
  icon: "h-10 w-10",
};

export function Button({
  className,
  variant = "default",
  size = "md",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    />
  );
}

export default Button;