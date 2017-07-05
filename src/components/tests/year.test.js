import React from 'react';
import { shallow } from 'enzyme';

import { Year } from '../year';

describe('<Year />', () => {
  it('renders the current year track value', () => {
    const wrapper = shallow(<Year year={2} />);
    expect(wrapper).toMatchSnapshot();
  });
});
