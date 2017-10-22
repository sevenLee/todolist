import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './Home'
import NotFound from './NotFound'

const Main = (props) => (
    <main>
        <Switch>
            <Route key={Math.random()} exact path="/" component={Home}/>}/>
            <Route key={Math.random()} exact path="/index" component={Home}/>
            <Route key={Math.random()} component={NotFound}/>
        </Switch>
    </main>
)

export default Main
