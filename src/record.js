import React from "react";
import List from "./list";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Record = props => {
  return (
    <div>
      <div>
        <h1>{props.title}</h1>
        <div className="year">
          <div>Released:</div>
          <div>{props.year}</div>
        </div>
      </div>

      <div className="column3">
        <h2>By:</h2>
        {/* List Module */}
      </div>
      <div className="column3">
        <h2>Labels:</h2>
        {/* List Module */}
      </div>
      <div className="column3">
        <h2>Formats:</h2>
        {/* List Module */}
      </div>
    </div>
  );
};

export default Record;
