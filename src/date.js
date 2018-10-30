import React from "react";

const DateCard = props => {
  if (props.year) {
    return (
      <div className="year">
        <div>Released:</div>
        <div>{props.year}</div>
      </div>
    );
  } else {
    return null;
  }
};

export default DateCard;
