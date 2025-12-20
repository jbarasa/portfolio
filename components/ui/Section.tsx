import React from "react";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  background?: "white" | "gray" | "dark";
  padding?: "sm" | "md" | "lg";
}

const Section: React.FC<SectionProps> = ({
  children,
  id,
  className = "",
  background = "white",
  padding = "lg",
}) => {
  const backgrounds = {
    white: "bg-white",
    gray: "bg-gray-50",
    dark: "bg-gray-900 text-white",
  };

  const paddings = {
    sm: "py-6 sm:py-8 md:py-12",
    md: "py-8 sm:py-12 md:py-16",
    lg: "py-10 sm:py-14 md:py-20 lg:py-24",
  };

  return (
    <section
      id={id}
      className={`${backgrounds[background]} ${paddings[padding]} ${className}`}
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};

export default Section;
