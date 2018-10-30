import React, { Component } from "react";
import importer from "./importer";
import Shelf from "./shelf";
import { DragDropContext } from "react-beautiful-dnd";

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

const pages_override = 3;
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
    console.log(this.state);
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

  render() {
    return (
      <div>
        <DragDropContext
          onDragEnd={this.onDragEnd}
          onDragUpdate={this.onDragUpdate}
        >
          {this.state.pages.map(page => {
            return (
              <Shelf
                key={page.pagination.page}
                id={"shelf_" + page.pagination.page}
                page_number={page.pagination.page}
                releases={this.state["shelf" + page.pagination.page]}
                height={this.state.height}
                title={this.state["shelfTitle" + page.pagination.page]}
                handler={this.handleChange}
              />
            );
          })}
        </DragDropContext>
      </div>
    );
  }
}

export default App;
