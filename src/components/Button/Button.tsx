import * as React from 'react'
import * as cn from 'classnames'

require('./Button.scss')

type Props = {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    className?: string,
    value?: string,
    placeholder?: string,
    children?: React.ReactNode,
}

const Button = (props: Props) => (
    <button 
        value={ props.value }
        placeholder={ props.placeholder }
        onClick={ props.onClick } 
        className={cn('Button', props.className)} 
    >{ props.children }</button>
)

export default Button
