import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { decorator as reduxBurgerMenu } from 'redux-burger-menu/immutable';
import { slide as Menu } from 'react-burger-menu';
import { action as toggleMenu } from 'redux-burger-menu/immutable';
import BuildNavRoutes from './BuildNavRoutes';
import Avatar from './Avatar';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    
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
      selected: '',
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
    const logoutObj = {
      name: 'Logout', 
      URL: '/logout'
    }

    return (
      <div style={styles.container}>
        <div style={styles.mainHeader}>
          <h1 style={styles.logo}> {'insert logo'} </h1>
          <Avatar image={this.props.avatar} />
        </div>
        
        <div style={styles.menuWrapper}>
          <BurgerMenu
            styles={ styles }
            right>
            <div style={styles.menuHeader}>
              {'Select an App'}
              <div style={styles.selected}>
                {selected}
              </div>
            </div>
            <div>
              {this.state.routes.map(route => (
                <BuildNavRoutes
                  key={route.URL + route.name}
                  routeObj={route}
                  closeMenu={(e) => this.handleClick(e, route.name)}
                />
              ))}
            </div>
            <div style={styles.logout}>
              {this.props.isAuthed === true
                ? <BuildNavRoutes
                    key={logoutObj.URL + logoutObj.name}
                    routeObj={logoutObj}
                    closeMenu={(e) => this.handleClick(e, logoutObj.name)} />
                : null
              }
            </div>
          </BurgerMenu>
        </div>
      </div>
    );
  }
}


Navigation.propTypes = {
  toggleMenu: PropTypes.func.isRequired
}

const mapStateToProps = ({user}) => {
  const uid = user.get('authedId')
  const info = user.getIn([uid, 'info']) 
  
  return {
    isAuthed: user.get('isAuthed'),
    authedId: user.get('authedId'),
    avatar: info ? info.imageUrl : null
  }
}

const mapActionsToProps = (dispatch) =>
  bindActionCreators({
    toggleMenu
  }, dispatch);

export default connect(mapStateToProps, mapActionsToProps)(Navigation);

//styles
const styles = {
  container: {
    marginBottom: '1.25em',
    display: 'grid',
    gridGap: '.25em',
    gridTemplateRows: '[header] 7em',
    justifyItems: 'center',
    alignItems: 'center',
    background: '#EBEAC0',
    boxShadow: '0em .5em #A4A486'
  },
  menuWrapper: {
    position: 'absolute',
  },
  mainHeader: {
    gridRow: 'header',
    display: 'grid',
    gridGap: '.25em',
    gridTemplateColumns: '[logo] 1fr 1fr 1fr 1fr [avatar] 1fr 1fr [icon]',
    gridTemplateRows: '7em'
  },
  logo: {
    fontWeight: 'bold',
    gridColumn: 'logo'
  },
  avatar: {
    gridColumn: 'avatar'
  },
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
    width: '24px',
    background: 'white'
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
    padding: '0.8em',
    display: 'flex',
    flexDirection: 'column',
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
  },
  logout: {
    marginTop: 'auto', //places 'logout' on floor of menu
    marginBottom: '1em' //make sure 'logout is stil visible
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