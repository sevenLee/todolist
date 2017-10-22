import React from 'react'

const MenuBtn = ({open, onClick}) => {

    const compClassList = ['navbar-toggle']

    if(!open){
        compClassList.push('collapsed')
    }

    return (
        <button
            onClick={(e) => onClick(e)}
            type="button"
            className={compClassList.join(' ')}>
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
        </button>
    )
}

export default MenuBtn