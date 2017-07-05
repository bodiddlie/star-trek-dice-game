import React from 'react';
import { shallow } from 'enzyme';

import { Crystals } from '../crystals';

describe('<Crystals />', () => {
  it('should render the dilithium crystal value', () => {
    const wrapper = shallow(<Crystals crystals={4} />);
    expect(wrapper).toMatchSnapshot();
  });
});
