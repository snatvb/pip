import * as React from 'react'

require('./Frame.scss')

export interface HandlersProps {
    onClose: (event: React.MouseEvent) => void
    onMinimize: (event: React.MouseEvent) => void
    onMaximize: (event: React.MouseEvent) => void
}

export interface OutProps {
    children: any
    title: string
    maximize?: boolean
    minimize?: boolean
    close?: boolean
}

export interface InnerProps {
    lastBounds: Electron.Rectangle
    setLastBound: (bounds: Electron.Rectangle) => void
    maximized: boolean
    setMaximized: (maximized: boolean) => void
}

export interface Props extends HandlersProps, OutProps, InnerProps {}


const Frame: React.StatelessComponent<Props> = (props) => (
    <div className="Frame">
        <div className="body">
            <header>
                <div className="title">
                    { props.title }
                </div>
                { props.maximize && (
                    <a className="maximize" href="#" onClick={ props.onMaximize }>+</a>
                ) }
                { props.minimize && (
                    <a href="#" className="minimize" onClick={ props.onMinimize }>-</a>
                ) }
                { props.close && (
                    <a href="#" className="close" onClick={ props.onClose }>&#215;</a>
                ) }
            </header>
            <div className="content">
                { props.children }
            </div>
        </div>
    </div>
);

export default Frame
