//reusable button UI and behavior
import React from "react";
import { colors, fonts } from "./design";

export default function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
}) {
  let baseStyles =
    "px-4 py-2 rounded font-primary text-sm transition-colors duration-200 focus:outline-none";

  let style = {};

  if (variant === "primary") {
    style = {
      backgroundColor: disabled ? "#A0A0A0" : colors.black,
      color: colors.white,
      fontFamily: fonts.primary,
      cursor: disabled ? "not-allowed" : "pointer",
    };
  } else if (variant === "secondary") {
    style = {
      backgroundColor: "transparent",
      border: `2px solid ${colors.black}`,
      color: colors.black,
      fontFamily: fonts.primary,
      cursor: disabled ? "not-allowed" : "pointer",
    };
  }

  return (
    <button
      style={style}
      className={baseStyles}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </button>
  );
}
