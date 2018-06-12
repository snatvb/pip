import * as React from 'react'

require('./Frame.scss')
const remote = require('electron').remote;

export type Props = {
    children: any,
    title: string,
    displayMaximize?: boolean,
}

const handleClose = (event: React.MouseEvent) => {
    event.preventDefault()
    remote.getCurrentWindow().close()
}

const handleMinimize = (event: React.MouseEvent) => {
    event.preventDefault()
    remote.getCurrentWindow().minimize()
}

const handleMaximize = (event: React.MouseEvent) => {
    event.preventDefault()
    remote.getCurrentWindow().maximize()
}

const Frame = (props: Props) => (
    <div className="Frame">
        <div className="body">
            <header>
                <div className="title">
                    { props.title }
                </div>
                { props.displayMaximize && (
                    <a className="maximize" href="#" onClick={ handleMaximize }>+</a>
                ) }
                    <a href="#" className="minimize" onClick={ handleMinimize }>-</a>
                    <a href="#" className="close" onClick={ handleClose }>&#215;</a>
            </header>
            <div className="content">
                { props.children }
            </div>
        </div>
    </div>
);

export default Frame;
