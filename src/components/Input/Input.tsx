import * as React from 'react'
import * as cn from 'classnames'

require('./Input.scss')

type Props = {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    className?: string,
    value?: string,
    placeholder?: string,
}

const Input = (props: Props) => (
    <input 
        value={ props.value }
        placeholder={ props.placeholder }
        onChange={ props.onChange } 
        className={cn('Input', props.className)} 
    />
);

export default Input;
