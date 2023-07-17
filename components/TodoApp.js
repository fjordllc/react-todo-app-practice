"use strict";

import { Todo } from "./Todo.js";
import { AddTodo } from "./AddTodo.js";

export class ToDoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: JSON.parse(localStorage.getItem("todos")) || [],
    };
    this.addTodo = this.addTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  saveTodo() {
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  }

  addTodo(name) {
    const newId =
      this.state.todos.length === 0
        ? 1
        : Math.max(...this.state.todos.map((todo) => todo.id)) + 1;
    this.setState(
      { todos: [...this.state.todos, { id: newId, name: name }] },
      this.saveTodo,
    );
  }

  updateTodo(todo, newName) {
    const newTodos = [...this.state.todos];
    newTodos[this.state.todos.indexOf(todo)] = { id: todo.id, name: newName };
    this.setState({ todos: newTodos }, this.saveTodo);
  }

  deleteTodo(todo) {
    const newTodos = [...this.state.todos];
    newTodos.splice(this.state.todos.indexOf(todo), 1);
    this.setState({ todos: newTodos }, this.saveTodo);
  }

  render() {
    return (
      <div>
        <h1>Todo App</h1>
        <AddTodo addTodo={this.addTodo} />
        <ul>
          {this.state.todos.map((todo) => (
            <li key={todo.id}>
              <Todo
                todo={todo}
                updateTodo={this.updateTodo}
                deleteTodo={this.deleteTodo}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
