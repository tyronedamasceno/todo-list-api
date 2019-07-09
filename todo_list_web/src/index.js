import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from "react-router-dom";
import Task from "./task"
import './App.css';

function App() {
    return (
        <div className="App">
            <h1>Tyrone to-do list </h1>
            <Router>
                <Route exact path="/" component={Task}/>
                <Route path="tasks" />
            </Router>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
