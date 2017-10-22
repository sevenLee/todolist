import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as todoAction from '../redux/actions/todoAction'

import {getDisplayFilter} from '../redux/reducers/todo'


const dispatchActions = {
    setDisplayFilter: todoAction.setDisplayFilter,
}

class FilterTabContainer extends Component {
    render() {
        const {setDisplayFilter, filter, displayFilter} = this.props
        let filterName = ''

        if (filter === "ALL") {
            filterName = 'All'
        } else if (filter === "UNCOMPLETED") {
            filterName = 'Uncompleted'
        } else {
            filterName = 'Completed'
        }

        return (
            <a
                className={(filter === displayFilter)?'filter-tab active' : 'filter-tab'}
                onClick={(e) => {
                    e.preventDefault()
                    setDisplayFilter(filter)
                }}
            >
                {filterName}
            </a>
        )
    }
}

export default connect(
    (state) => {
        return {
            displayFilter: getDisplayFilter(state)
        }
    },
    dispatchActions
)(FilterTabContainer)