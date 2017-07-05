import React from 'react';
import { shallow } from 'enzyme';

import { Shields } from '../shields';

describe('<Shields />', () => {
  it('should render the shields value', () => {
    const wrapper = shallow(<Shields shields={5} />);
    expect(wrapper).toMatchSnapshot();
  });
});
