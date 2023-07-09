// "use strict";

const e = React.createElement;

class ToDoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { id: 1, name: "本を買う" },
        { id: 2, name: "クリーニング屋に行く" },
        { id: 3, name: "床屋に行く" },
      ],
    };
    this.addTodo = this.addTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  addTodo(name) {
    console.log(name);
    const newId =
      this.state.todos.length === 0
        ? 1
        : Math.max(...this.state.todos.map((todo) => todo.id)) + 1;
    this.setState((state) => {
      return {
        todos: [...state.todos, { id: newId, name: name }],
      };
    });
  }

  updateTodo(todo, newName) {
    const newTodo = { id: todo.id, name: newName };
    const newTodos = [...this.state.todos];
    newTodos[this.state.todos.indexOf(todo)] = newTodo;
    this.setState({ todos: newTodos });
  }

  deleteTodo(todo) {
    const newTodos = [...this.state.todos];
    newTodos.splice(this.state.todos.indexOf(todo), 1);
    this.setState({ todos: newTodos });
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

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
    this.finishAddTodo = this.finishAddTodo.bind(this);
  }
  finishAddTodo(e) {
    this.setState({ name: "" });
    this.props.addTodo(this.state.name, e);
    e.preventDefault();
  }
  render() {
    return (
      <form onSubmit={(e) => this.finishAddTodo(e)}>
        <input
          type="text"
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.target.value })}
        />
        <input type="submit" value="登録" />
      </form>
    );
  }
}

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
    this.startEdit = this.startEdit.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
  }
  startEdit() {
    this.setState({ editing: true });
  }
  finishEdit(newName) {
    this.setState({ editing: false });
    this.props.updateTodo(this.props.todo, newName);
  }
  render() {
    return (
      <div>
        {this.state.editing ? (
          <EditTodo todo={this.props.todo} finishEdit={this.finishEdit} />
        ) : (
          <ShowTodo
            todo={this.props.todo}
            startEdit={this.startEdit}
            deleteTodo={this.props.deleteTodo}
          />
        )}
      </div>
    );
  }
}

class EditTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: this.props.todo.name,
    };
  }
  render() {
    return (
      <div>
        <form onSubmit={() => this.props.finishEdit(this.state.newName)}>
          <input
            type="text"
            value={this.state.newName}
            onChange={(e) => this.setState({ newName: e.target.value })}
          />
          <input type="submit" value="更新" />
        </form>
      </div>
    );
  }
}

class ShowTodo extends React.Component {
  render() {
    return (
      <div>
        {this.props.todo.name}
        <button onClick={this.props.startEdit}>編集</button>
        <button onClick={() => this.props.deleteTodo(this.props.todo)}>
          削除
        </button>
      </div>
    );
  }
}

const domContainer = document.querySelector("#react_todo_app");
const root = ReactDOM.createRoot(domContainer);
root.render(e(ToDoApp));
