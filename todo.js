"use strict";

import { ToDoApp } from "./components/TodoApp.js";

const e = React.createElement;
const domContainer = document.querySelector("#react_todo_app");
const root = ReactDOM.createRoot(domContainer);
root.render(e(ToDoApp));
