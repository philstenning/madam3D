import React from "react";
import "./dialog.css";

interface IDialogProps {
  title?: string;
  children: React.ReactNode;
  show: boolean;
  // type: "info" | "error" | "warning" | "success";
  // results:<T>()=>IDialogResult<T>;
}

const Dialog = ({ children, title ,show}: IDialogProps) => {
  return (
    <>
      {show && (
        <div className="dialog">
          <div className="dialog__container">
            <h4 className="dialog__title">{title}</h4>
            {children}


          </div>
        </div>
      )}
    </>
  );
};

export default Dialog;
