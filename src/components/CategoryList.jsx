import { useContext } from "react";
import "./CategoryList.css";
import { CATEGORY_ITEMS } from "./Constant";
import { AppContext } from "../context/AppProvider";

const CategoryList = () => {
  const { selectedCategoryId, setSelectedCategoryId } = useContext(AppContext);

  return (
    <div>
      <p>Categories</p>
      <div>
        {CATEGORY_ITEMS.map((category) => {
          return (
            <div
              key={category.id}
              className={`category-item ${
                category.id === selectedCategoryId ? "selected" : ""
              }`}
              onClick={() => {
                setSelectedCategoryId(category.id);
              }}
            >
              <p className="category-name">{category.label}</p>
              <p>2</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CategoryList;
