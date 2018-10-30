import React, { Component } from "react";
import importer from "./importer";
import Shelf from "./shelf";
import { DragDropContext } from "react-beautiful-dnd";
import AddButton from "./addButton";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const pages_override = 4;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, pages: [] };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    let per_page = 15;
    importer("blacklight", per_page, 1).then(discog => {
      let i = 2,
        pages = pages_override;
      if (!pages_override) {
        pages = discog.pagination.pages;
      }
      let promises = Array(pages);
      promises[0] = discog;
      for (i = 2; i <= pages; i++) {
        promises[i - 1] = importer("blacklight", per_page, i);
      }
      Promise.all(promises).then(pages => {
        const output = {};
        output.pages = pages;
        let x = 1;
        output.pages.forEach(d => {
          output["shelf" + x] = d.releases;
          x++;
        });
        this.setState(output);
      });
    });
  }

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  id2List = {
    droppable1: "items",
    droppable2: "selected"
  };

  getList = id => this.state[id];

  onDragUpdate = result => {
    console.log();
  };

  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    let srcId = source.droppableId;
    let destId = destination.droppableId;
    if (srcId === destId) {
      const items = reorder(this.state[srcId], source.index, destination.index);

      const output = {};
      output[srcId] = items;
      this.setState(output);
    } else {
      const result = move(
        this.getList(srcId),
        this.getList(destId),
        source,
        destination
      );

      this.setState(result);
    }
  };

  handleChange = (event, title) => {
    var output = {};
    output[title] = event.target.value;
    this.setState(output);
  };

  deleteShelf = (event, shelfId) => {
    console.log("deleting");
    let index = +shelfId.substring(5),
      i = 1,
      newArray = [];
    for (i = 1; i <= this.state.pages.length; i++) {
      let slice;
      if (index === i) {
        slice = null;
      } else {
        slice = this.state.pages[i - 1];
      }
      newArray.push(slice);
    }
    this.setState({ pages: newArray, shelfId: undefined });
  };

  addShelf = () => {
    let emptySlice = {};
    emptySlice.pagination = {};
    emptySlice.releases = [];
    emptySlice.pagination.page = this.state.pages.length + 1;
    let newState = {};
    newState["shelf" + (this.state.pages.length + 1)] = [];
    let i = 0,
      newArray = [];
    newArray.push(emptySlice);
    for (i = 0; i <= this.state.pages.length; i++) {
      let slice = this.state.pages[i];
      newArray.push(slice);
    }
    newState.pages = newArray;
    console.log(newState);
    console.log(this.state);
    this.setState(newState);
  };

  render() {
    return (
      <div>
        <AddButton addFunction={this.addShelf} top={this.state.height / 2} />
        <DragDropContext
          onDragEnd={this.onDragEnd}
          onDragUpdate={this.onDragUpdate}
        >
          {this.state.pages.map(page => {
            if (page) {
              return (
                <Shelf
                  key={page.pagination.page}
                  id={"shelf_" + page.pagination.page}
                  page_number={page.pagination.page}
                  releases={this.state["shelf" + page.pagination.page]}
                  height={this.state.height}
                  title={this.state["shelfTitle" + page.pagination.page]}
                  handler={this.handleChange}
                  deleteFunction={this.deleteShelf}
                />
              );
            }
          })}
        </DragDropContext>
      </div>
    );
  }
}

export default App;
