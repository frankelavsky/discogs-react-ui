import React from "react";
import Record from "./record";
import { Droppable } from "react-beautiful-dnd";

const grid = 4;
const getListStyle = (isDraggingOver, length) => ({
  position: "relative",
  background: isDraggingOver ? "lightblue" : "#f1f1f1",
  padding: length ? grid : `${grid}px ${grid}px 246px ${grid}px`,
  width: 250,
  margin: "0 0px 0px 40px"
});

const Shelf = props => {
  let shelfStyle = {};
  shelfStyle.maxHeight = props.height - 5 - grid * 2 + "px";
  return (
    <div className="shelf" style={shelfStyle}>
      <Droppable droppableId={"shelf" + props.page_number}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver, props.releases.length)}
          >
            <input
              type="text"
              value={props.title}
              onChange={props.handler.bind(props.title)}
              className="shelfTitle"
            />
            {props.releases.map((release, index) => {
              return (
                <Record
                  release={release}
                  index={index}
                  key={release.id}
                  draggableId={release.basic_information.title + release.id}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Shelf;
