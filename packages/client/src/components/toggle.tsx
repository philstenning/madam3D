import React from "react";
import "./toggle.css";

interface ToggleProps {
  onText?: string;
  offText?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked?: boolean;
  disabled?: boolean;
  label: string;
}
const Toggle = ({
  label = "label",
  disabled = false,
  isChecked = false,
}: ToggleProps) => {
  const isEnabled = disabled ? "toggle__slider--disabled" : "";
  const [checked, setChecked] = React.useState(isChecked);
  return (
    <label className="toggle">
      <span className={`toggle__text ${disabled?'toggle__text--disabled':''}`}>{label}</span>
      <input
        className={`toggle__input`}
        type="checkbox"
        defaultChecked={checked}
        onChange={() => setChecked(!checked)}
        disabled={disabled}
      />
      <span className={`toggle__slider ${isEnabled}`} />
    </label>
  );
};

export default Toggle;
