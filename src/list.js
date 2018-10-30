import React from "react";

const List = props => {
  let joined = props.items.map(item => {
    return item.name;
  });
  joined = joined.join(", ");
  return <div className="list">{joined}</div>;
};

export default List;
