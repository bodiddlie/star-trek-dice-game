import React from 'react';
import { shallow } from 'enzyme';

import { Hull } from '../hull';

describe('<Hull />', () => {
  it('should render the hull value', () => {
    const wrapper = shallow(<Hull hull={7} />);
    expect(wrapper).toMatchSnapshot();
  });
});
