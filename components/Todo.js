"use strict";

import { EditTodo } from "./EditTodo";
import { ShowTodo } from "./ShowTodo.js";

export class Todo extends React.Component {
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