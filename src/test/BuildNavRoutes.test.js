import React from 'react';
import TestRenderer from 'react-test-renderer';
import BuildNavRoutes from '../components/BuildNavRoutes';
import { MemoryRouter } from 'react-router-dom';

//how do you write tests for hover effect?
describe('BuildNavRoutes', () => {
  const testRenderer = TestRenderer.create(
    <MemoryRouter>
      <div>
        <BuildNavRoutes routeObj={{name: 'test', URL: '/test'}} closeMenu={() => {'function ran'}} />,

      </div>
    </MemoryRouter>
);
  const testInstance = testRenderer.root;
  test('render', () => {
    let tree = testRenderer.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('hover state changes', () => {
    console.log('bnr', testInstance.instance.root)
    //onMouseEnter this.state.hover === true
//    console.log(tree.props.onMouseEnter())
    //onMouseLeave this.state.hover === false
    
    
  })
})