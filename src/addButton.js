import React from "react";

const AddButton = props => {
  let buttonStyle = {};
  buttonStyle.top = props.top - 8 + "px";
  return (
    <button
      className="addButton"
      style={buttonStyle}
      onClick={e => props.addFunction(e)}
    >
      <div className="buttonPlus">+</div>
    </button>
  );
};

export default AddButton;
