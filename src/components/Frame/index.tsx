import { defaultProps, compose, withHandlers, withState } from 'recompose';
const remote = require('electron').remote;

import Frame, { Props, OutProps } from './Frame'

const handleClose = (props: Props) => (event: React.MouseEvent) => {
    event.preventDefault()
    remote.getCurrentWindow().close()
}

const handleMinimize = (props: Props) => (event: React.MouseEvent) => {
    event.preventDefault()
    remote.getCurrentWindow().minimize()
}

const handleMaximize = (props: Props) => (event: React.MouseEvent) => {
    event.preventDefault()
    const currentWindow = remote.getCurrentWindow()
    if(props.maximized) {
        props.setMaximized(false)
        currentWindow.setBounds(props.lastBounds)
    } else {
        props.setLastBound(currentWindow.getBounds())
        props.setMaximized(true)
        currentWindow.maximize()
    }
}

const defaultLastBounds: Electron.Rectangle = {
    x: 0,
    y: 0,
    width: 720,
    height: 480,
}

export default compose<Props, OutProps>(
    withState('maximized', 'setMaximized', false),
    withState('lastBounds', 'setLastBound', defaultLastBounds),
    defaultProps({
        maximize: false,
        minimize: false,
        close: true,
    }),
    withHandlers({
        onClose: handleClose,
        onMinimize: handleMinimize,
        onMaximize: handleMaximize,
    })
)(Frame)
export * from './Frame'
