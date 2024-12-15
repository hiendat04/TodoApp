import React from "react";

const TodoItem = (props) => {
  return (
    <div
      className="todo-item"
      onClick={() => {
        props.handleTodoItemClick(props.id);
      }}
    >
      <div style={{ display: "flex", gap: 4 }}>
        <input
          type="checkbox"
          checked={props.isCompleted}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={() => {
            props.handleCompleteCheckboxChange(props.id); // We cannot write props.handleCompleteCheckboxChange because the parameter is an event by default but we want TodoId instead
          }}
        />
        <p className="todo-item-text">{props.name}</p>
      </div>
      {props.isImportant && <p>⭐</p>}
    </div>
  );
};

export default TodoItem;
