export class EditTodo extends React.Component {
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