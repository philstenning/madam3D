import React from "react";
import "./stack.css";

// The Stack component is used to group related elements together
// stack heading is optional
// stack content is required
// It uses flexbox to layout its children
interface StackProps {
  heading?: string;
  children: React.ReactNode;
}

const Stack = ({ children, heading }: StackProps) => {
  return (
    <div className="stack">
      {heading && <h3 className="stack__heading">{heading}</h3>}
      <div className="stack__content">{children}</div>
    </div>
  );
};

export default Stack;
