import React from "react";
import "./dialog.css";

interface IDialogProps {
  title?: string;
  children: React.ReactNode;
  show: boolean;
  // type: "info" | "error" | "warning" | "success";
  // results:<T>()=>IDialogResult<T>;
}

// interface IDialogResult<T> {
//   data?: T;
//   accepted: boolean;
// }


const Dialog = ({ children, title ,show}: IDialogProps) => {
  return (
    <>
      {show && (
        <div className="dialog">
          <div className="dialog__container">
            <h4 className="dialog__title">{title}</h4>
            {children}
            {/* {children || <p>Dialog content goes here. 👍🚀</p>}
            {type === "info" && (
              <div className="dialog__buttons">
                <button className="btn dialog__btn">close</button>
                <button className="btn dialog__btn">ok</button>
              </div>
            )}
            {type === DialogType.error && (
              <div className="dialog__buttons">
                <button className="btn dialog__btn">ok</button>
              </div>
            )} */}


          </div>
        </div>
      )}
    </>
  );
};

export default Dialog;
