import React, {Component} from 'react'
import MenuBtn from './MenuBtn'
import MenuList from './MenuList'

class Header extends Component {
    state={
        isMenuOpen: true
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isMobile){
            this.setState({isMenuOpen: false})
        }
    }

    onToggleMenu(e) {
        e.preventDefault()
        this.setState({isMenuOpen: !this.state.isMenuOpen})
    }

    render() {
        return (
            <header>
                <div className="container">

                    {/*for mobile*/}
                    <nav className="navbar main-nav-container">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <MenuBtn
                                    onClick={(e) => this.onToggleMenu(e)}
                                    open={this.state.isMenuOpen}/>
                            </div>
                            <MenuList open={this.state.isMenuOpen}/>
                        </div>
                    </nav>
                </div>
            </header>
        )
    }
}

export default Header
