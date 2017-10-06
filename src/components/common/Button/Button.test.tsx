import { shallow } from 'enzyme'
import * as React from 'react'
import { expect } from '../../../../test/expect'
import Button from './Button'

describe('<Button />', () => {
	it('renders children when passed in', () => {
		const wrapper = shallow(
			<Button>
				<div className="unique" />
			</Button>
		)
		expect(wrapper.contains(<div className="unique" />)).to.equal(true)
	})
})
