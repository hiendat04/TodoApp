import { useRef } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import Sidebar from "./components/Sidebar";
import FilterPanel from "./components/FilterPanel";
import { useAppContext } from "./context/AppProvider";

function App() {
  const { todoList, setTodoList, showSidebar } = useAppContext();

  const inputRef = useRef();

  return (
    <div className="container">
      <FilterPanel />
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
                  isDeleted: false,
                  category: "personal",
                },
              ]);
              inputRef.current.value = "";
            }
          }}
        />
        <div>
          <TodoItem />
        </div>
        {showSidebar && <Sidebar />}
      </div>
    </div>
  );
}

export default App;
