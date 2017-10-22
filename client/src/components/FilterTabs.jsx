import React from 'react'
import FilterTabContainer from './FilterTabContainer'

const FilterTabs = () => {
    return (
        <div className="filter-tabs-wrapper">
            <div className="filter-tabs">
                <FilterTabContainer filter="ALL" />
                <FilterTabContainer filter="UNCOMPLETED" />
                <FilterTabContainer filter="COMPLETED" />
            </div>
        </div>
    )
}

export default FilterTabs