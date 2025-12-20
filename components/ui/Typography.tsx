import React from "react";

interface HeadingProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4";
  size?: "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  className?: string;
  centered?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  as: Tag = "h2",
  size = "3xl",
  className = "",
  centered = false,
}) => {
  const sizes = {
    xl: "text-lg sm:text-xl md:text-2xl",
    "2xl": "text-xl sm:text-2xl md:text-3xl",
    "3xl": "text-2xl sm:text-3xl md:text-4xl",
    "4xl": "text-3xl sm:text-4xl md:text-5xl",
    "5xl": "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
  };

  return (
    <Tag
      className={`font-heading font-bold text-gray-900 tracking-tight ${
        sizes[size]
      } ${centered ? "text-center" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
};

interface TextProps {
  children: React.ReactNode;
  size?: "sm" | "base" | "lg" | "xl";
  className?: string;
  muted?: boolean;
}

export const Text: React.FC<TextProps> = ({
  children,
  size = "base",
  className = "",
  muted = false,
}) => {
  const sizes = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  return (
    <p
      className={`${sizes[size]} ${
        muted ? "text-gray-500" : "text-gray-600"
      } ${className}`}
    >
      {children}
    </p>
  );
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "info";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    info: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
};
