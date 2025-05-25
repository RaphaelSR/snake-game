import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children
}: ModalProps): JSX.Element | null {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div
        className="relative rounded-lg shadow-xl max-w-md w-full mx-4 p-6"
        style={{
          backgroundColor: "var(--color-background)",
          border: `2px solid var(--color-accent)`
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-xl font-semibold"
            style={{ color: "var(--color-text)" }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-2xl"
            style={{
              color: "var(--color-text)",
              background: "transparent",
              border: "none",
              cursor: "pointer"
            }}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
