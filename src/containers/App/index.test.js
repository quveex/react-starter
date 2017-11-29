import React from 'react';
import App from './index';
import { shallow } from 'enzyme';

const render = (props = {}) => shallow(<App {...props} />);

describe('<App />', () => {
  it('should render h1 tag', () => {
    const component = render();
    expect(component.find('h1').length).toEqual(1);
  });

  it('should have "title" class', () => {
    const component = render();
    expect(component.find('h1').hasClass('title')).toEqual(true);
  })
});
