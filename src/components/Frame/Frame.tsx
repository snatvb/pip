import * as React from 'react'

require('./Frame.scss')
const remote = require('electron').remote;

export type Props = {
    children: any,
    title: string,
}

const handleClose = (event: React.MouseEvent) => {
    event.preventDefault()
    remote.getCurrentWindow().close()
}

const handleMinimize = (event: React.MouseEvent) => {
    event.preventDefault()
    remote.getCurrentWindow().minimize()
}

const Frame = (props: Props) => (
    <div className="Frame">
        <div className="body">
            <header>
                <div className="title">
                    { props.title }
                </div>
                <div className="minimize">
                    <a href="#" onClick={ handleMinimize }>-</a>
                </div>
                <div className="close">
                    <a href="#" onClick={ handleClose }>&#215;</a>
                </div>
            </header>
            <div className="content">
                { props.children }
            </div>
        </div>
    </div>
);

export default Frame;
