import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./badge.css";
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
  return <span className={`badge ${type}`}>{children}</span>;
};

export default Badge;

export const MotionBadge = ({ children, type = "secondary" }: IBadgeProps) => {
  return (
    <AnimatePresence>
      <motion.span
        // style={{ overflow: "hidden" }}
        initial={{ opacity: 0, background: "var(--gray-50)", padding: 0 }}
        animate={{ opacity: 1, background: "var(--pink-50)", padding: '1rem' }}
        exit={{ opacity: 0, padding: 0 }}
        className={`badge ${type}`}
      >
        {children}
      </motion.span>
    </AnimatePresence>
  );
};
