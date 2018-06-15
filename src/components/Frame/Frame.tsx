import * as React from 'react'

require('./Frame.scss')
const remote = require('electron').remote;

export interface Props {
    children: any
    title: string
    maximize?: boolean
    minimize?: boolean
    close?: boolean
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

const Frame: React.StatelessComponent<Props> = (props) => (
    <div className="Frame">
        <div className="body">
            <header>
                <div className="title">
                    { props.title }
                </div>
                { props.maximize && (
                    <a className="maximize" href="#" onClick={ handleMaximize }>+</a>
                ) }
                { props.minimize && (
                    <a href="#" className="minimize" onClick={ handleMinimize }>-</a>
                ) }
                { props.close && (
                    <a href="#" className="close" onClick={ handleClose }>&#215;</a>
                ) }
            </header>
            <div className="content">
                { props.children }
            </div>
        </div>
    </div>
);

export default Frame
