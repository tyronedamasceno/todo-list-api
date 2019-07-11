import React, { Component } from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css";

class TodoList extends Component {
    static baseUrl = 'http://localhost:5000/api/v1';
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    componentDidMount() {
        fetch(TodoList.baseUrl+'/tasks').then((response) => {
          return response.json();  
        }).then((responseData) => {
            this.setState({ items: responseData.data.sort(function(a, b) {return a.status-b.status})});
        }).catch(console.error);
    }

    addItem(e) {
        if (this._inputElement.value !== "") {
            var newItem = {
                text: this._inputElement.value,
                key: Date.now()
            };

            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };
            });
        }

        this._inputElement.value = "";
        console.log(this.state.items);

        e.preventDefault();
    }

    deleteItem(key) {
      var filteredItems = this.state.items.filter(function (item) {
        return (item.key !== key);
      });

      this.setState({
          items: filteredItems
      });
    }

    render() {
        return (
            <div className="todoListMain">
              <div className="header">
                <form onSubmit={this.addItem}>
                  <input ref={(a) => this._inputElement = a}
                         placeholder="enter task">
                  </input>
                  <button type="submit">add</button>
                </form>
              </div>
              <TodoItems entries={this.state.items}
                         delete={this.deleteItem}/>
            </div>
        )
    }
}

export default TodoList;
 