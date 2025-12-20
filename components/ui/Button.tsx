"use client";

import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: IconType;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  className = "",
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-500",
    outline:
      "border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
    ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-500",
  };

  const sizes = {
    sm: "px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm gap-1 sm:gap-1.5",
    md: "px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base gap-1.5 sm:gap-2",
    lg: "px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base md:text-lg gap-2 sm:gap-2.5",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    >
      {loading ? (
        <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
      ) : (
        <>
          {Icon && iconPosition === "left" && <Icon className="shrink-0" />}
          {children}
          {Icon && iconPosition === "right" && <Icon className="shrink-0" />}
        </>
      )}
    </button>
  );
};

export default Button;
