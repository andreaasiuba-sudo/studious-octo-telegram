"use client";

import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-sans text-muted mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 bg-transparent border border-border text-foreground font-sans text-sm placeholder:text-muted/60 focus:outline-none focus:border-foreground transition-colors duration-300 ${
            error ? "border-red-500" : ""
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-2 text-xs text-red-500 font-sans">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;


