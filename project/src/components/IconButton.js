import React from "react";

const IconButton = ({ imgSrc, altText, onClick }) => (
  <div className="icon">
    <button onClick={onClick}>
      <img src={imgSrc} alt={altText} />
    </button>
  </div>
);

export default IconButton;
