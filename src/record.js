import React from "react";
import Details from "./details";
import { Draggable } from "react-beautiful-dnd";

const grid = 4;
const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: 0,
  margin: `0 0 ${grid}px 0`,
  height: 250 - grid * 2,
  background: isDragging ? "rgba(53, 53, 53, 0.75)" : "",

  ...draggableStyle
});

const Record = props => {
  return (
    <Draggable draggableId={props.draggableId} index={props.index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
          className="record"
        >
          <div>
            <div>
              <h1 className="recordTitle">
                {props.release.basic_information.title.toUpperCase()}
              </h1>
              <Details info={props.release} isDragging={snapshot.isDragging} />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Record;
