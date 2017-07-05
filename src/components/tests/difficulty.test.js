import React from 'react';
import { shallow } from 'enzyme';

import { Difficulty } from '../difficulty';

describe('<Difficulty />', () => {
  it('renders the chosen difficulty', () => {
    const wrapper = shallow(<Difficulty difficulty={2} />);
    expect(wrapper).toMatchSnapshot();
  });
});
