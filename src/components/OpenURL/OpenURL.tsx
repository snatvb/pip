import * as React from 'react'
import Frame from '../Frame'

require('./OpenURL.scss')

type Props = {
    value?: string
}

const OpenURL = (props: Props) => (
    <Frame title="PiP Player">
        <div className="OpenURL">
            <iframe src={ props.value } frameBorder="0" allowFullScreen></iframe>
        </div>
    </Frame>
);

export default OpenURL;
