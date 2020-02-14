import React from 'react'
import './Button.less'

const Button: React.FC = (props) => {
	return <button>{props.children}</button>
}

export default Button
