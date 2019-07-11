import React, { Component } from "react";
import FlipMove from "react-flip-move";

class TodoItems extends Component {
    constructor(props){
        super(props);

        this.createTasks = this.createTasks.bind(this);
    }

    createTasks(item) {
        return <li key={item.id} className={`status-${item.status}`}>
                    {item.title}
                    <div className="card-buttons">
                        <button className="card-button" onClick={() => this.delete(item.key)}>
                            Finish
                        </button>
                        <button className="card-button" onClick={() => this.delete(item.key)}>
                            Archive
                        </button>
                    </div>
                </li>
    }

    delete(key) {
        this.props.delete(key);
    }

    render() {
        var todoEntries = this.props.entries;
        var listItems = todoEntries.map(this.createTasks);

        return (
            <ul className= "theList">
              <FlipMove duration={250} easing="ease-out">
                {listItems}
              </FlipMove>
            </ul>
        );
    }
} 

export default TodoItems;
