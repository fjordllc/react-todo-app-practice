export class ShowTodo extends React.Component {
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