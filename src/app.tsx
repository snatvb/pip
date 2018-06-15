import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { HashRouter, Route, Switch } from 'react-router-dom'

import WindowManager from './components/WindowManager'
import Application from './components/Application'
import OpenURL from './components/OpenURL'
import store from './store'

// Create main element
const mainElement = document.createElement('div')
mainElement.className = 'wrapper'
document.body.appendChild(mainElement)

// Render components
const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <HashRouter>
                    <Switch>
                        <Route exact path='/' component={ Application }/>
                        <Route path='/openURL/:url' component={ OpenURL }/>
                    </Switch>
                </HashRouter>
            </Provider>
        </AppContainer>,
        mainElement
    )
}

render()

// Hot Module Replacement API
if (typeof module.hot !== 'undefined') {
    // module.hot.accept('./components/WindowManager', () => {
    //     import('./components/WindowManager').then(World => {
    //         // render(World.default)
    //     })
    // })
}
