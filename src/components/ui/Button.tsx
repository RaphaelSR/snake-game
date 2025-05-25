import React, { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      className = "",
      style,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg"
    };

    const customStyle: React.CSSProperties = {
      backgroundColor:
        variant === "primary"
          ? "var(--color-background)"
          : "var(--color-background)",
      color: "var(--color-text)",
      border: `2px solid ${
        variant === "primary" ? "var(--color-accent)" : "var(--color-text)"
      }`,
      ...style
    };

    const classes = `${baseClasses} ${sizeClasses[size]} ${className}`;

    return (
      <button
        ref={ref}
        className={classes}
        style={{
          ...customStyle,
          outline: "none"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor =
            variant === "primary" ? "var(--color-accent)" : "var(--color-text)";
          e.currentTarget.style.color = "var(--color-background)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "var(--color-background)";
          e.currentTarget.style.color = "var(--color-text)";
        }}
        onFocus={(e) => {
          e.target.style.outline = `2px solid var(--color-accent)`;
          e.target.style.outlineOffset = "2px";
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          e.target.style.outline = "none";
          props.onBlur?.(e);
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);
