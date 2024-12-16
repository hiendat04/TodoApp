import PropTypes from "prop-types";
import { useContext } from "react";
import { AppContext } from "../context/AppProvider";

const TodoItem = () => {
  const { filterTodos, handleCompleteCheckboxChange, handleTodoItemClick } =
    useContext(AppContext);

  return filterTodos.map((todo) => {
    return (
      <div
        key={todo.id}
        className="todo-item"
        onClick={() => {
          handleTodoItemClick(todo.id);
        }}
      >
        <div style={{ display: "flex", gap: 4 }}>
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={() => {
              handleCompleteCheckboxChange(todo.id); // We cannot write props.handleCompleteCheckboxChange because the parameter is an event by default but we want TodoId instead
            }}
          />
          <p className="todo-item-text">{todo.name}</p>
        </div>
        {todo.isImportant && <p>⭐</p>}
      </div>
    );
  });
};

TodoItem.propTypes = {
  handleTodoItemClick: PropTypes.func,
  handleCompleteCheckboxChange: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.string,
  isImportant: PropTypes.bool,
  isCompleted: PropTypes.bool,
};

export default TodoItem;
