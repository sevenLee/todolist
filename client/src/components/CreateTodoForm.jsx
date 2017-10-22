import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as todoAction from '../redux/actions/todoAction'


const dispatchActions = {
    createTodo: todoAction.createTodo,
}

class CreateTodoForm extends Component {
    render() {
        const {createTodo} = this.props

        return (
            <div>
                <form
                    className="form-container block-center"
                    onSubmit={e => {
                        e.preventDefault();
                        if (!this.input.value.trim()) {
                            return;
                        }
                        createTodo(this.input.value);
                        this.input.value = '';
                    }}
                >
                    <input
                        placeholder="Please Input"
                        defaultValue="Good"
                        type="text"
                        ref={node => { this.input = node; }} />
                    <button type="submit">
                        Create
                    </button>
                </form>
            </div>
        )
    }
}

export default connect(
    null,
    dispatchActions
)(CreateTodoForm)