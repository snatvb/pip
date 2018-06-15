import * as R from 'ramda'
import { withState, withHandlers, compose } from 'recompose'

import Application, { Props, HandlersProps } from './Application'

const { ipcRenderer, clipboard } = require('electron')

const getTimeFromTLink = (tlink: string): string => R.replace('s', '', tlink.split('=')[1])
const takeLast = <T extends {}>(arr: ReadonlyArray<T>) => R.takeLast(1, arr)[0]
const takeFirst = <T extends {}>(arr: ReadonlyArray<T>) => R.take(1, arr)[0]

const openTwitch = (props: Props & HandlersProps) => {
    if (props.twitch.length === 0) return
    const twitch: string = R.takeLast(1, props.twitch.split('/'))[0]

    const url: string = `https://player.twitch.tv/?channel=${twitch}`
    ipcRenderer.send('open-window', encodeURIComponent(url))
}

const openYoutube = (props: Props & HandlersProps) => {
    if (props.youtube.length === 0) return
    const youtubeSlash: string = takeLast(props.youtube.split('/'))
    const youtubeEnd: string = takeLast(youtubeSlash.split('v='))
    const youtubeWithoutAnd: string = takeFirst(youtubeEnd.split('&'))
    const youtube: string = takeFirst(youtubeWithoutAnd.split('?'))
    const time = R.match(/t=[0-9]+s/gi, youtubeSlash)[0]
    const timeString = typeof time === 'string' ? `&start=${getTimeFromTLink(time)}` : ''

    const url: string = `https://www.youtube.com/embed/${youtube}?autoplay=1${timeString}`
    ipcRenderer.send('open-window', encodeURIComponent(url))
}

const handleOpenTwitch = (props: Props & HandlersProps) => (
    e: React.MouseEvent<HTMLButtonElement>
): void => {
    e.preventDefault()
    openTwitch(props)
}

const handleOpenYoutube = (props: Props & HandlersProps) =>
    (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        openYoutube(props)
    }

const handleRightClickYoutube = (props: Props & HandlersProps) =>
    (event: React.MouseEvent) => {
        event.preventDefault()
        props.changeYoutube(clipboard.readText())
    }

const handleRightClickTwitch = (props: Props & HandlersProps) =>
    (event: React.MouseEvent) => {
        event.preventDefault()
        props.changeTwitch(clipboard.readText())
    }


const KEY_ENTER = 13 // keyCode for enter button
const handleKeyUpTwitch = (props: Props & HandlersProps) =>
    (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === KEY_ENTER) {
            openTwitch(props)
        }
    }

const handleKeyUpYoutube = (props: Props & HandlersProps) =>
    (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === KEY_ENTER) {
            openYoutube(props)
        }
    }

export default compose<Props & HandlersProps, {}>(
    withState('twitch', 'changeTwitch', ''),
    withState('youtube', 'changeYoutube', ''),
    withHandlers({
        onOpenTwitch: handleOpenTwitch,
        onOpenYoutube: handleOpenYoutube,
        onRightClickYoutube: handleRightClickYoutube,
        onRightClickTwitch: handleRightClickTwitch,
        onKeyUpYoutube: handleKeyUpYoutube,
        onKeyUpTwitch: handleKeyUpTwitch,
    }),
)(Application)
export * from './Application'
