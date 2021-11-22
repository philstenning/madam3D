import React from "react";
import "./dialog.css";
const Dialog = () => {
  return (
    <div className="dialog">
      <div className="dialog__container">
        <h4 className="dialog__title">Title</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quas,
          nulla aliquam fugit itaque ducimus enim eligendi, illo, labore
          praesentium error recusandae consectetur minima numquam qui non
          provident molestiae laudantium.
        </p>
        <div className="dialog__buttons">
          <button className="btn dialog__btn">Disagree</button>
          <button className="btn dialog__btn">AGREE</button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
