import React from "react";
import { IconType } from "react-icons";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "bordered" | "elevated";
  padding?: "sm" | "md" | "lg";
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "default",
  padding = "md",
}) => {
  const variants = {
    default: "bg-white",
    bordered: "bg-white border border-gray-200",
    elevated: "bg-white shadow-lg",
  };

  const paddings = {
    sm: "p-3 sm:p-4",
    md: "p-4 sm:p-5 md:p-6",
    lg: "p-5 sm:p-6 md:p-8",
  };

  return (
    <div
      className={`rounded-xl ${variants[variant]} ${paddings[padding]} ${className}`}
    >
      {children}
    </div>
  );
};

interface ServiceCardProps {
  icon: IconType;
  title: string;
  description: string;
  features?: string[];
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  features = [],
}) => {
  return (
    <Card
      variant="bordered"
      className="hover:border-blue-300 hover:shadow-md transition-all duration-200"
    >
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
        <div className="p-2.5 sm:p-3 bg-blue-50 rounded-lg text-blue-600 shrink-0">
          <Icon size={20} className="sm:w-6 sm:h-6" />
        </div>
        <div>
          <h3 className="font-heading text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1.5 sm:mb-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">
            {description}
          </p>
          {features.length > 0 && (
            <ul className="space-y-1">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="text-xs sm:text-sm text-gray-500 flex items-center gap-1.5 sm:gap-2"
                >
                  <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-blue-500 rounded-full shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Card>
  );
};

interface StepCardProps {
  step: number;
  title: string;
  description: string;
}

export const StepCard: React.FC<StepCardProps> = ({
  step,
  title,
  description,
}) => {
  return (
    <div className="flex gap-3 sm:gap-4">
      <div className="shrink-0 w-8 sm:w-10 h-8 sm:h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-heading font-bold text-sm sm:text-base">
        {step}
      </div>
      <div>
        <h3 className="font-heading text-base sm:text-lg font-semibold text-gray-900 mb-0.5 sm:mb-1">
          {title}
        </h3>
        <p className="text-gray-600 text-sm sm:text-base">{description}</p>
      </div>
    </div>
  );
};

export default Card;
