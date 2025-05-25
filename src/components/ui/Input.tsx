import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, style, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        style={{
          backgroundColor: "var(--color-background)",
          color: "var(--color-text)",
          border: `2px solid ${error ? "#ef4444" : "var(--color-grid)"}`,
          padding: "8px 12px",
          borderRadius: "8px",
          outline: "none",
          fontFamily: "inherit",
          fontSize: "16px",
          width: "100%",
          boxSizing: "border-box",
          transition: "border-color 0.2s ease",
          ...style
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--color-accent)";
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? "#ef4444" : "var(--color-grid)";
          props.onBlur?.(e);
        }}
      />
    );
  }
);

Input.displayName = "Input";
