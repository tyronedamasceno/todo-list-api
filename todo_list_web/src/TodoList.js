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
        if (this._inputElement.value.trim() !== "") {
            var newItem = {
                title: this._inputElement.value
            };
            fetch(TodoList.baseUrl+'/tasks', {
                headers: {'Content-Type': 'application/json'},
                method: 'post',
                body: JSON.stringify(newItem)
              }).then((response) => {
                return response.json();
            }).then((response) => {
                newItem.key = response.data.id;
                newItem.status = response.data.status;
                this.setState((prevState) => {
                    return {
                        items: prevState.items.concat(newItem)
                    };
                });
            });

        }

        this._inputElement.value = "";

        e.preventDefault();
    }

    deleteItem(key) {
        fetch(TodoList.baseUrl+'/task/'+key, {
            method: 'delete'
        }).then((response) =>{
            if (response.ok && response.status === 200) {
                var filteredItems = this.state.items.filter(function (item) {
                    return (item.id !== key);
                });
                this.setState({
                    items: filteredItems
                });
            }
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
 