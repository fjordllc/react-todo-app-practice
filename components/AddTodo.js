export class AddTodo extends React.Component {
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