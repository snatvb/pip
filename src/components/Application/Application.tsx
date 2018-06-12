import * as R from 'ramda'
import * as React from 'react'
import { withState, renameProp, withHandlers, compose } from 'recompose'
import Frame from '../Frame'
import Input from '../Input'
import Button from '../Button'

const { ipcRenderer } = require('electron')
require('./Application.scss')

const handleOpenTwitch = (inputTwitch: string) => (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    if(inputTwitch.length === 0) return;
    const twitch: string = R.takeLast(1, inputTwitch.split('/'))[0]
    
    const url: string = `https://player.twitch.tv/?channel=${twitch}`
    ipcRenderer.send('open-window', url)
}
const handleOpenYoutube = (inputYoutube: string) => (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    if(inputYoutube.length === 0) return;
    const youtubeSlash: string = R.takeLast(1, inputYoutube.split('/'))[0]
    const youtube: string = R.takeLast(1, youtubeSlash.split('v='))[0]
    const time = R.match(/t=[0-9]+s/gi, youtube)
    const timeString = time.length === 1 ? `&start=${ time[0].split('=')[1] }` : ''
    const youtubeClear = youtube.replace(/&t=[0-9]+s/gi, '')

    const url: string = `https://www.youtube.com/embed/${youtubeClear}?autoplay=1${timeString}`
    ipcRenderer.send('open-window', url)
}

// type Props = {
//     twitch: string,
//     changeTwitch: (twitch: string) => void,
// }

const Application = (props: any) => (
    <Frame title="Picture in Picture">
        <div className="Application">
            <div className="row">
                <Input
                value={ props.twitch }
                placeholder={ "Twitch" }
                className="url-input"
                onChange={ (event: React.ChangeEvent<HTMLInputElement>) => props.changeTwitch(event.target.value) }
                />
                <Button onClick={handleOpenTwitch(props.twitch)}>Open</Button>
            </div>
            <div className="row">
                <Input
                value={ props.youtube }
                placeholder={ "Youtube" }
                className="url-input"
                onChange={ (event: React.ChangeEvent<HTMLInputElement>) => props.changeYoutube(event.target.value) }
                />
                <Button onClick={handleOpenYoutube(props.youtube)}>Open</Button>
            </div>
        </div>
    </Frame>
);

export default compose(
    withState('twitch', 'changeTwitch', ''),
    withState('youtube', 'changeYoutube', '')
)(Application);
