import * as R from 'ramda'
import * as React from 'react'
import OpenURL from '../OpenURL'
import Application from '../Application'
import Frame from '../Frame'

const windows: { [s: string]: any; } = {
    openURL: OpenURL,
}

const WindowManager = () => {
    const search = window.location.search.substr(1)
    const [windowType, ...windowValue] = search.split('=')

    const Component = R.prop(windowType, windows)
    if (Component) {
        return (<Component value={ windowValue.join('=') } />)
    }

    return (
        <Application />
    )
}

export default WindowManager;
