import { RouteComponentProps, withRouter } from 'react-router'
import * as React from 'react'
import Frame from '../Frame'

require('./OpenURL.scss')

export interface Props {
}

export interface MatchParams {
    url: string
}

const OpenURL: React.StatelessComponent<Props & RouteComponentProps<MatchParams>> = (props) => (console.log(props),
    <Frame title="PiP Player" maximize minimize>
        <div className="OpenURL">
            <iframe src={ decodeURIComponent(props.match.params.url) } frameBorder="0" allowFullScreen></iframe>
        </div>
    </Frame>
)

export default withRouter<RouteComponentProps<MatchParams>>(OpenURL)
