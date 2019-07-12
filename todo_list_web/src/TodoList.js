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
        this.finishTask = this.finishTask.bind(this);
    }

    componentDidMount() {
        fetch(TodoList.baseUrl+'/tasks').then((response) => {
          return response.json();  
        }).then((responseData) => {
            const sortedItems = responseData.data.sort((a, b) => a.status-b.status);
            this.setState({ items: sortedItems});
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
            var filteredItems = this.state.items.filter(function (item) {
                return (item.id !== key);
            });
            this.setState({
                items: filteredItems
            });
        });
    }

    finishTask(key) {
        fetch(TodoList.baseUrl+'/task/'+key, {
            headers: {'Content-Type': 'application/json'},
            method: 'patch',
            body: JSON.stringify({status: 2})
        }).then((response) => {
            return response.json();
        }).then((res) => {
            const response = res.updated_data;
            const items = this.state.items;
            items.map(item => { 
                if (item.id === response.id) {
                    item.status = response.status;
                }
                return item;
            });
            const sortedItems = items.sort((a, b) => a.status-b.status);
            this.setState({
                items: sortedItems
            });
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
                         delete={this.deleteItem}
                         finish={this.finishTask}/>
            </div>
        )
    }
}

export default TodoList;
 