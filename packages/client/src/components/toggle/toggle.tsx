import React from "react";
import "./switch.css";

interface ToggleProps {
  onText?: string;
  offText?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  disabled?: boolean;
  label?: string;
}
const Toggle = () => {
  return (
    //   <div className="switch" >
    <label className="switch__wrapper">
      <input className="switch__input" type="checkbox" />
      <span className="switch__slider">label for the switch</span>
      {/* <div className="switch__track"></div> */}
    </label>
  );
};

export default Toggle;
