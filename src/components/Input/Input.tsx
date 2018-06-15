import * as React from 'react'
import * as cn from 'classnames'

require('./Input.scss')

export interface HandlersProps {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    onRigthClick?: (event: React.MouseEvent<HTMLInputElement>) => void
}

export interface Props {
    className?: string
    value?: string
    placeholder?: string
}

const Input: React.StatelessComponent<Props & HandlersProps> = (props) => (
    <input 
        value={ props.value }
        placeholder={ props.placeholder }
        onChange={ props.onChange }
        onContextMenu={ props.onRigthClick }
        className={cn('Input', props.className)} 
    />
);

export default Input;
