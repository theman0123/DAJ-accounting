import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { decorator as reduxBurgerMenu } from 'redux-burger-menu/immutable';
import { slide as Menu } from 'react-burger-menu';
import { action as toggleMenu } from 'redux-burger-menu/immutable';
import BuildNavRoutes from './BuildNavRoutes';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    //state displays routes and BuildNavRoutes applies styles and links
    this.state = {
      routes: [
        {
          name: 'Home',
          URL: '/'
        },
        {
          name: 'Build Invoices',
          URL: '/build-invoices'
        }
      ],
      selected: 'Home'
    }
  }
  
  handleClick = (e, newSelect) => {
    e.preventDefault();
    this.setState({ selected: newSelect });
    this.props.toggleMenu(false);
  }

  render() {
    const BurgerMenu = reduxBurgerMenu(Menu);
    const selected = this.state.selected;

    return (
      <BurgerMenu
        styles={ styles }
        right>
        <div style={styles.menuHeader}>
          {'Select an App'}
          <div style={styles.selected}>
            {selected}
          </div>
        </div>
        {this.state.routes.map(route => (
          <BuildNavRoutes
            key={route.URL + route.name}
            routeObj={route}
            closeMenu={e => this.handleClick(e, route.name)}
          />
        ))}
      </BurgerMenu>
    );
  }
}

Navigation.propTypes = {
  toggleMenu: PropTypes.func.isRequired
}


const mapActionsToProps = (dispatch) =>
  bindActionCreators({
    toggleMenu
  }, dispatch);

export default connect(null, mapActionsToProps)(Navigation);

//styles
const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    right: '36px',
    top: '36px'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#8EE0C4'
  },
  bmMenu: {
    background: '#9FE4CC',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
    overflow: 'no-scroll'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  },
  menuHeader: {
    fontSize: '2em',
    marginBottom: '1em',
    textAlign: 'center',
    color: 'white'
  },
  selected: {
    fontSize: ".7em",
    opacity: ".5",
    color: 'white'
  }
}

//tests

//describe('::NAVIGATION::', () => {
//  let wrapper;
//  let testStore;
//  beforeEach(() => {
//    testStore = store();
//    wrapper = shallow(<Navigation store={store}/>);
//  });
//  
//  describe('it should be connected to store', () => {
//    it('should be closed initially', () => {
//      const initialBM = testStore.getState().burgerMenu.get('isOpen');
//      expect(initialBM).toMatchSnapshot();
//    });
//  });
//  
//  it('should display landing route from props.selected', () => {
//    expect(wrapper.prop('selected')).toEqual('home');
//  });
//  describe('BuildNavRoutes', () => {
//    it('renders children', () => {
//      expect(wrapper.dive().children().last().props())
//        .toMatchSnapshot();
//    });
//  });
//});