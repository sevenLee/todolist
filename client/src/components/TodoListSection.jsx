import React from 'react'
import FilterTabs from './FilterTabs'
import TodoListContainer from './TodoListContainer'


const TodoListSection = () => {
    return (
        <div>
            <FilterTabs />
            <TodoListContainer />
        </div>
    )
}

export default TodoListSection