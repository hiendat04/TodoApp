import PropTypes from "prop-types";

const FilterList = ({
  selectedFilterId,
  setSelectedFilterId,
  countByFilterType,
}) => {
  const FILTER_ITEMS = [
    {
      id: "all",
      label: "All",
      iconPath: "./inbox.png",
    },
    {
      id: "important",
      label: "Important",
      iconPath: "./flag.png",
    },
    {
      id: "completed",
      label: "Completed",
      iconPath: "./check.png",
    },
    {
      id: "deleted",
      label: "Deleted",
      iconPath: "./delete.png",
    },
  ];
  return (
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
            <p>{countByFilterType[filterItem.id]}</p>
          </div>
        );
      })}
    </div>
  );
};

FilterList.propTypes = {
  selectedFilterId: PropTypes.string,
  setSelectedFilterId: PropTypes.func,
  countByFilterType: PropTypes.any, // Check later
};

export default FilterList;
