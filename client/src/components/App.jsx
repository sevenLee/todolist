import React, {Component} from 'react'
import Header from './Header/Header'
import Main from './Main'

class App extends Component{
    state={
        isMobile: null
    }
    componentDidMount() {
        this.onUpdateDimensions()
        window.addEventListener("resize", () => this.onUpdateDimensions());
    }
    onUpdateDimensions() {
        if(window.innerWidth<=767){
            /*eslint-disable no-unused-expressions*/
            // (!this.state.isMobile)?
            //     (
            //         console.log('mobile:', window.innerWidth),
            //         this.setState({isMobile: true})
            //     )
            // :
            //     console.log('mobile:', window.innerWidth)

            if(!this.state.isMobile){
                this.setState({isMobile: true})
            }
        }

        if(window.innerWidth>767){
            if(this.state.isMobile){
                this.setState({isMobile: false})
            }
        }
    }
    render() {
        return (
            <div className="main-layout">
                <Header isMobile={this.state.isMobile}/>
                <Main isMobile={this.state.isMobile}/>
            </div>
        )
    }
}


export default App