import React from 'react';
import { shallow } from 'enzyme';

import { Developments } from '../developments';

describe('<Developments />', () => {
  it('should render an empty div with no developments', () => {
    const wrapper = shallow(<Developments developments={[]} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a lits of developments', () => {
    const devs = [{ id: 1, title: 'dev 1' }, { id: 2, title: 'dev 2' }];
    const wrapper = shallow(<Developments developments={devs} />);
    expect(wrapper).toMatchSnapshot();
  });
});
