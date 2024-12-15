import { useRef, useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import Sidebar from "./components/Sidebar";
import FilterPanel from "./components/FilterPanel";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, name: "Di hoc them", isImportant: false, isCompleted: false },
    { id: 2, name: "Di tap gym", isImportant: true, isCompleted: true },
    { id: 3, name: "Di hoc code", isImportant: false, isCompleted: false },
  ]);

  const [selectedFilterId, setSelectedFilterId] = useState("all");

  const [activeTodoItemId, setActiveTodoItemId] = useState();

  const [showSidebar, setShowSidebar] = useState(false);

  const activeTodoItem = todoList.find((todo) => todo.id === activeTodoItemId);

  const handleCompleteCheckboxChange = (todoId) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  const handleTodoItemClick = (todoId) => {
    setShowSidebar(true);
    setActiveTodoItemId(todoId);
  };

  const handleTodoItemChange = (newTodo) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === newTodo.id) {
        return newTodo;
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  const inputRef = useRef();

  const todos = todoList.map((todo, index) => {
    return (
      <TodoItem
        id={todo.id}
        name={todo.name}
        key={todo.id}
        isImportant={todo.isImportant}
        isCompleted={todo.isCompleted}
        handleCompleteCheckboxChange={handleCompleteCheckboxChange}
        handleTodoItemClick={handleTodoItemClick}
      />
    );
  });

  return (
    <div className="container">
      <FilterPanel
        selectedFilterId={selectedFilterId}
        setSelectedFilterId={setSelectedFilterId}
      />
      <div className="main-content">
        <input
          ref={inputRef}
          type="text"
          name="add-new-task"
          placeholder="Add new task"
          className="task-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const value = e.target.value;
              setTodoList([
                ...todoList,
                {
                  id: crypto.randomUUID(),
                  name: value,
                  isCompleted: false,
                  isImportant: false,
                },
              ]);
              inputRef.current.value = "";
            }
          }}
        />
        <div>{todos}</div>
        {showSidebar && (
          <Sidebar
            key={activeTodoItemId} // Remove the current state and re-render the new state of new to do item
            todoItem={activeTodoItem}
            handleTodoItemChange={handleTodoItemChange}
            setShowSidebar={setShowSidebar}
          />
        )}
      </div>
    </div>
  );
}

export default App;