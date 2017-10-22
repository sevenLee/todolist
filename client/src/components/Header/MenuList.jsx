import React from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import * as rootAction from '../../redux/actions/rootAction'


const dispatchActions = {
    resetStates: rootAction.resetStates,
}

const MenuList = ({open, resetStates}) => {
    const compClassList = ['navbar-collapse', 'collapse']

    if(open){
        compClassList.push('open')
    }

    return (
        <div className={compClassList.join(' ')}>
            <ul className="nav navbar-nav main-nav">
                <li>
                    <NavLink
                        to="/"
                        exact
                        activeClassName="active"
                        onClick={() => {resetStates()}}>Todo List</NavLink>
                </li>
                <li>
                    <NavLink
                        to="/current"
                        activeClassName="active"
                        onClick={() => {resetStates()}}>Photo Uploader</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default withRouter(connect(null, dispatchActions)(MenuList))
