import * as React from 'react'
import './Button.less'

export default function Button(props: { children?: any }) {
	return <button>{props.children}</button>
}
