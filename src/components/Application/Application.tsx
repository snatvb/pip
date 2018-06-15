import * as React from 'react'
import Frame from '../Frame'
import Input from '../Input'
import Button from '../Button'

require('./Application.scss')

export interface HandlersProps {
    onOpenTwitch: (event: React.MouseEvent<HTMLButtonElement>) => void
    onOpenYoutube: (event: React.MouseEvent<HTMLButtonElement>) => void
    onRightClickTwitch: (event: React.MouseEvent<HTMLInputElement>) => void
    onRightClickYoutube: (event: React.MouseEvent<HTMLInputElement>) => void
    onKeyUpTwitch: (event: React.KeyboardEvent<HTMLInputElement>) => void
    onKeyUpYoutube: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

export interface Props {
    twitch: string
    youtube: string
    changeTwitch: (twith: string) => void
    changeYoutube: (youtube: string) => void
}


const Application: React.StatelessComponent<Props & HandlersProps> = (props) => (
    <Frame title="Picture in Picture" minimize>
        <div className="Application">
            <div className="row">
                <Input
                    value={props.twitch}
                    placeholder={'Twitch'}
                    className="url-input"
                    onRigthClick={ props.onRightClickTwitch }
                    onKeyUp={ props.onKeyUpTwitch }
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        props.changeTwitch(event.target.value)
                    }
                />
                <Button onClick={props.onOpenTwitch}>Open</Button>
            </div>
            <div className="row">
                <Input
                    value={props.youtube}
                    placeholder={'Youtube'}
                    className="url-input"
                    onRigthClick={ props.onRightClickYoutube }
                    onKeyUp={ props.onKeyUpYoutube }
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        props.changeYoutube(event.target.value)
                    }
                />
                <Button onClick={ props.onOpenYoutube }>Open</Button>
            </div>
        </div>
    </Frame>
)

export default Application
