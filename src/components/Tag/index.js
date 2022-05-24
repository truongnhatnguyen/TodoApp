import React from "react";
import "./style.scss";
function Tag({ children, onClick, isActive }) {
  return (
    <div onClick={onClick} className={`tag-name ${isActive ? "active" : ""}`}>
      {children}
    </div>
  );
}

export default Tag;
