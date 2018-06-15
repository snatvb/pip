import Frame, { Props } from './Frame'
import { defaultProps, compose } from 'recompose'


export default compose<Props, Props>(
    defaultProps({
        maximize: false,
        minimize: false,
        close: true,
    })
)(Frame)
export * from './Frame'
