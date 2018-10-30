import React from "react";

const AddButton = props => {
  return (
    <button className="addButton" onClick={e => props.addFunction(e)}>
      <div className="buttonX">x</div>
    </button>
  );
};

export default AddButton;
