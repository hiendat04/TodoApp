
import "./FilterPanel.css";
import PropTypes from "prop-types";
import CategoryList from "./CategoryList";
import FilterList from "./FilterList";
import { useAppContext } from "../context/AppProvider";

const FilterPanel = () => {
  const { searchText, setSearchText } = useAppContext();
  // Count todo item by filter type

  return (
    <div className="filter-panel">
      <input
        name="search-text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      <FilterList />
      <CategoryList/>
    </div>
  );
};

FilterPanel.propTypes = {
  selectedFilterId: PropTypes.string,
  setSelectedFilterId: PropTypes.func,
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
};

export default FilterPanel;
