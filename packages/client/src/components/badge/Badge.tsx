import React from "react";

import './badge.css'
interface IBadgeProps {
  children: React.ReactNode;
  type?: LevelType;
}

export type LevelType =
  | "primary"
  | "secondary"
  | "tertiary"
  | "warning"
  | "info"
  | "success";

const Badge = ({ children, type = "secondary" }: IBadgeProps) => {
  return (
    
      <span
      
        className={`badge ${type}`}
      >
        {children}
      </span>
   
  );
};

export default Badge;
