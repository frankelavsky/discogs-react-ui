import React from "react";

const DeleteButton = props => {
  return (
    <button
      className="deleteButton"
      onClick={e => props.deleteFunction(e, props.deleteId)}
    >
      <div className="buttonX">x</div>
    </button>
  );
};

export default DeleteButton;
