import React from 'react';
import { shallow } from 'enzyme';

import { DifficultyChooser } from '../difficulty-chooser';

describe('<Difficulty Chooser />', () => {
  it('renders a modal for choosing the difficulty', () => {
    const wrapper = shallow(<DifficultyChooser show={true} chooseDifficulty={() => {}} />);
    expect(wrapper).toMatchSnapshot();
  });
});
