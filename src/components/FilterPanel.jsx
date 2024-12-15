import "./FilterPanel.css";
import PropTypes from "prop-types";

const FILTER_ITEMS = [
  {
    id: "all",
    label: "All",
    iconPath: "./public/inbox.png",
  },
  {
    id: "important",
    label: "Important",
    iconPath: "./public/flag.png",
  },
  {
    id: "completed",
    label: "Completed",
    iconPath: "./public/check.png",
  },
  {
    id: "deleted",
    label: "Deleted",
    iconPath: "./public/delete.png",
  },
];

const FilterPanel = ({ selectedFilterId, setSelectedFilterId }) => {
  return (
    <div className="filter-panel">
      <input name="search-text" placeholder="Search" />
      <div className="filter-container">
        {FILTER_ITEMS.map((filterItem) => {
          return (
            <div
              key={filterItem.id}
              className={`filter-item ${
                filterItem.id === selectedFilterId ? "selected" : ""
              }`}
              onClick={() => setSelectedFilterId(filterItem.id)}
            >
              <div className="filter-name">
                <img src={filterItem.iconPath} />
                <p>{filterItem.label}</p>
              </div>
              <p>22</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

FilterPanel.propTypes = {
  selectedFilterId: PropTypes.string,
  setSelectedFilterId: PropTypes.func,
};

export default FilterPanel;
