import React from "react";

type AvatarProps = {
  name?: string;            // "Alice Baker"
  letter?: string;          // overrides name initials
  size?: number;            // px, default 48
  bg?: string;              // background color (can be rgba or tailwind color)
  color?: string;           // text color
  className?: string;
  ariaLabel?: string;
};

export default function UserAvatar({
  name,
  letter,
  size = 48,
  bg = "rgba(59,130,246,0.18)",
  color = "#0f172a",
  className = "",
  ariaLabel,
}: AvatarProps) {
  const computeInitial = () => {
    if (letter) return letter.slice(0, 1).toUpperCase();
    if (!name) return "?";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0,1).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const initial = computeInitial();

  const style: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: "50%",
    background: bg,
    color,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: Math.round(size * 0.45),
    userSelect: "none",
  };

  return (
    <div
      role="img"
      aria-label={ariaLabel ?? `Avatar của ${name ?? initial}`}
      style={style}
      className={className}
    >
      {initial}
    </div>
  );
}
