function TodoApp() {
  const [items, setItems] = React.useState([]);
  const [text, setText] = React.useState("");

  const itemKey = "todos";

  React.useEffect(() => {
    const items = fetchTodos();
    setItems(items);
  }, []);

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (text.length === 0) {
      return;
    }
    const newItem = {
      text,
      id: Date.now(),
    };

    const newItems = items.concat(newItem);

    saveTodos(newItems);
    setItems(newItems);
    setText("");
  }

  function handleDelete(e) {
    e.preventDefault();
    const itemId = Number(e.target.value);
    const newItems = items.filter((item) => item.id !== itemId);
    saveTodos(newItems);
    setItems(newItems);
  }

  function handleSave(e, itemId, text) {
    e.preventDefault();
    const newItems = [...items];
    const editedItem = newItems.find((item) => item.id === itemId);
    editedItem.text = text;
    saveTodos(newItems);
    setItems(newItems);
  }

  function fetchTodos() {
    const todos = localStorage.getItem(itemKey);
    return todos === null ? [] : JSON.parse(todos);
  }

  function saveTodos(todos) {
    localStorage.setItem(itemKey, JSON.stringify(todos));
  }

  return (
    <div>
      <h3>TODO</h3>
      <TodoList items={items} onDelete={handleDelete} onSave={handleSave} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-todo" className="todo-item-add-label">
          What needs to be done?
        </label>
        <input
          id="new-todo"
          onChange={handleChange}
          value={text}
          className="todo-item-add-input"
        />
        <button className="todo-item-add-button">
          Add #{items.length + 1}
        </button>
      </form>
    </div>
  );
}

function TodoList(props) {
  function handleDelete(e) {
    props.onDelete(e);
  }

  function handleSave(e, itemId, text) {
    props.onSave(e, itemId, text);
  }

  return (
    <ul>
      {props.items.map((item) => (
        <li key={item.id}>
          <TodoItem item={item} onDelete={handleDelete} onSave={handleSave} />
        </li>
      ))}
    </ul>
  );
}

function TodoItem(props) {
  const [editing, setEditing] = React.useState(false);
  const [text, setText] = React.useState(props.item.text);

  function handleDelete(e) {
    props.onDelete(e);
  }

  function handleEdit(e) {
    e.preventDefault();
    setEditing(true);
  }

  function handleSave(e, itemId, text) {
    props.onSave(e, itemId, text);
    setEditing(false);
  }

  function handleChange(e) {
    setText(e.target.value);
  }

  if (editing) {
    return (
      <div className="todo-item">
        <form
          onSubmit={(e) => handleSave(e, props.item.id, text)}
          className="todo-item-edit-form"
        >
          <input
            type="text"
            name="text"
            value={text}
            onChange={handleChange}
            className="todo-item-edit-input"
          />
          <button className="todo-item-button">Save</button>
        </form>
      </div>
    );
  }

  return (
    <div className="todo-item">
      <div className="todo-item-text">{props.item.text}</div>
      <button
        onClick={handleEdit}
        value={props.item.id}
        className="todo-item-button"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        value={props.item.id}
        className="todo-item-button"
      >
        Delete
      </button>
    </div>
  );
}

const container = document.querySelector("#todo_app_container");
const root = ReactDOM.createRoot(container);
root.render(<TodoApp />);
