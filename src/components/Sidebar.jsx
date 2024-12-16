import PropTypes from "prop-types";
import "./Sidebar.css";
import { CATEGORY_ITEMS } from "./Constant";
import { useState } from "react";
import { useAppContext } from "../context/AppProvider";

const Sidebar = () => {
  const { activeTodoItem, handleTodoItemChange, setShowSidebar } = useAppContext();

  const [name, setName] = useState(activeTodoItem.name);
  const [isImportant, setIsImportant] = useState(activeTodoItem.isImportant);
  const [isCompleted, setIsCompleted] = useState(activeTodoItem.isCompleted);
  const [category, setCategory] = useState(activeTodoItem.category);

  const handleSave = () => {
    const newTodo = {
      ...activeTodoItem,
      name,
      isImportant,
      isCompleted,
      category,
    }; //Override the information of the current to do item to update
    handleTodoItemChange(newTodo);
    setShowSidebar(false);
  };

  return (
    <div className="sidebar">
      <form className="sb-form">
        <div className="sb-form-field">
          <label htmlFor="sb-name">Todo Name</label>
          <input
            type="text"
            id="sb-name"
            name="name"
            value={name}
            onChange={(e) => {
              console.log(e.target.value);
              setName(e.target.value);
              // props.handleTodoNameChange(data.id, e.target.value);
            }}
          />
        </div>
        <div className="sb-form-field">
          <label htmlFor="sb-important">Is important?</label>
          <input
            type="checkbox"
            id="sb-important"
            name="isImportant"
            checked={isImportant}
            onChange={() => {
              setIsImportant(!isImportant);
            }}
          />
        </div>
        <div className="sb-form-field">
          <label htmlFor="sb-completed">Is Completed?</label>
          <input
            type="checkbox"
            id="sb-completed"
            name="isCompleted"
            checked={isCompleted}
            onChange={() => {
              setIsCompleted(!isCompleted);
            }}
          />
        </div>
        <div className="sb-form-field">
          <label htmlFor="sb-category">Category</label>
          <select
            id="sb-category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            {CATEGORY_ITEMS.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.label}
                </option>
              );
            })}
          </select>
        </div>
      </form>
      <div className="sb-footer">
        <button onClick={handleSave}>Save</button>
        <button
          onClick={() => {
            setShowSidebar(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  setShowSidebar: PropTypes.func,
  todoItem: PropTypes.shape({
    name: PropTypes.string,
    isImportant: PropTypes.bool,
    isCompleted: PropTypes.bool,
    category: PropTypes.string,
  }),
  handleTodoItemChange: PropTypes.func,
};

export default Sidebar;
