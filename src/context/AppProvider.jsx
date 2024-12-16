import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(false);
  const [todoList, setTodoList] = useState([
    {
      id: "1",
      name: "Di hoc them",
      isImportant: false,
      isCompleted: false,
      isDeleted: false,
      category: "personal",
    },
    {
      id: "2",
      name: "Di tap gym",
      isImportant: true,
      isCompleted: true,
      isDeleted: false,
      category: "personal",
    },
    {
      id: "3",
      name: "Di hoc code",
      isImportant: false,
      isCompleted: false,
      isDeleted: false,
      category: "travel",
    },
  ]);

  const [selectedFilterId, setSelectedFilterId] = useState("all");
  const [activeTodoItemId, setActiveTodoItemId] = useState();
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchText, setSearchText] = useState("");
  const activeTodoItem = todoList.find((todo) => todo.id === activeTodoItemId);

  const countByFilterType = useMemo(() => {
    return todoList.reduce(
      (acc, cur) => {
        let newAcc = { ...acc };
        if (cur.isCompleted) {
          newAcc = { ...newAcc, completed: newAcc.completed + 1 };
        }
        if (cur.isImportant) {
          newAcc = { ...newAcc, important: newAcc.important + 1 };
        }
        if (cur.isDeleted) {
          newAcc = { ...newAcc, deleted: newAcc.deleted + 1 };
        }
        return newAcc;
      },
      { all: todoList.length, important: 0, completed: 0, deleted: 0 }
    );
  }, [todoList]);

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

  const filterTodos = useMemo(() => {
    return todoList.filter((todo) => {
      // Check if search text is matched
      if (!todo.name.includes(searchText)) return false;

      // Check if category is matched
      if (selectedCategoryId && todo.category !== selectedCategoryId)
        return false;

      switch (selectedFilterId) {
        case "all":
          return true;
        case "important":
          return todo.isImportant;
        case "completed":
          return todo.isCompleted;
        case "deleted":
          return todo.isDeleted;
        default:
          return true;
      }
    });
  }, [selectedFilterId, todoList, searchText, selectedCategoryId]);

  return (
    <AppContext.Provider
      value={{
        selectedCategoryId,
        setSelectedCategoryId,
        todoList,
        setTodoList,
        selectedFilterId,
        setSelectedFilterId,
        activeTodoItemId,
        setActiveTodoItemId,
        showSidebar,
        setShowSidebar,
        searchText,
        setSearchText,
        countByFilterType,
        handleTodoItemChange,
        activeTodoItem,
        handleTodoItemClick,
        handleCompleteCheckboxChange,
        filterTodos,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.element,
};

export const useAppContext = () => {
  return useContext(AppContext);
};
export default AppProvider;
