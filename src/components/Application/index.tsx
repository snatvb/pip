import * as R from 'ramda'
import { withState, withHandlers, compose } from 'recompose'

import Application, { Props, HandlersProps } from './Application'

const { ipcRenderer, clipboard } = require('electron')

const handleOpenTwitch = (props: Props & HandlersProps) => (
    e: React.MouseEvent<HTMLButtonElement>
): void => {
    e.preventDefault()
    if (props.twitch.length === 0) return
    const twitch: string = R.takeLast(1, props.twitch.split('/'))[0]

    const url: string = `https://player.twitch.tv/?channel=${twitch}`
    ipcRenderer.send('open-window', encodeURIComponent(url))
}

const getTimeFromTLink = (tlink: string): string => tlink.split('=')[1]
const takeLast = <T extends {}>(arr: ReadonlyArray<T>) => R.takeLast(1, arr)[0]
const takeFirst = <T extends {}>(arr: ReadonlyArray<T>) => R.take(1, arr)[0]

const handleOpenYoutube = (props: Props & HandlersProps) =>
    (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        if (props.youtube.length === 0) return
        const youtubeSlash: string = takeLast(props.youtube.split('/'))
        const youtubeEnd: string = takeLast(youtubeSlash.split('v='))
        const youtube: string = takeFirst(youtubeEnd.split('&'))
        const time = R.match(/t=[0-9]+s/gi, youtube)
        const timeString = time.length === 1 ? `&start=${getTimeFromTLink(time[0])}` : ''
        const youtubeClear = youtube.replace(/&t=[0-9]+s/gi, '')

        const url: string = `https://www.youtube.com/embed/${youtubeClear}?autoplay=1${timeString}`
        ipcRenderer.send('open-window', encodeURIComponent(url))
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

export default compose<Props & HandlersProps, {}>(
    withState('twitch', 'changeTwitch', ''),
    withState('youtube', 'changeYoutube', ''),
    withHandlers({
        onOpenTwitch: handleOpenTwitch,
        onOpenYoutube: handleOpenYoutube,
        onRightClickYoutube: handleRightClickYoutube,
        onRightClickTwitch: handleRightClickTwitch,
    }),
)(Application)
export * from './Application'
