import React from 'react'
import CreateTodoForm from './CreateTodoForm'
import TodoListSection from './TodoListSection'

const Home = ({isMobile}) => (
    <div>
        <div className="wrapper">
            <div className="container">
                <h3 className="text-center mt-xxlg">
                    Todo List
                </h3>

            </div>
            <div className="index-content-wrapper">
                <div className="container">

                    <div className="row">
                        <div className="col-xs-12 col-md-12">
                            <div className="info-box-container">
                                <div className="rule-box">
                                    <CreateTodoForm />
                                    <TodoListSection/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default Home
