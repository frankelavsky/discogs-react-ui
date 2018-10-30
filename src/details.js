import React from "react";
import List from "./list";
import DateCard from "./date";

const Details = props => {
  if (!props.isDragging) {
    return (
      <div>
        <DateCard year={props.info.basic_information.year} />
        <div className="column3">
          <div>
            <b>
              <List items={props.info.basic_information.artists} lines={2} />
            </b>
          </div>
          <div className="row">
            <div className="detail">
              Labels:
              <List items={props.info.basic_information.labels} lines={4} />
            </div>

            <div className="detail">
              Formats:
              <List items={props.info.basic_information.formats} lines={3} />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Details;
