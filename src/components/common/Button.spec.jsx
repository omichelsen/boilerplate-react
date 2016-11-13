import React from 'react'
import { shallow } from 'enzyme'

import Button from './Button'

describe('<Button />', function () {
	it('renders children when passed in', function () {
		const wrapper = shallow(
			<Button>
				<div className="unique" />
			</Button>
		)
		expect(wrapper.contains(<div className="unique" />)).to.equal(true)
	})
})
