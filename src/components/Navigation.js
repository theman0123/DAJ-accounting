import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { decorator as reduxBurgerMenu } from 'redux-burger-menu/immutable';
import { slide as Menu } from 'react-burger-menu';
import { action as toggleMenu } from 'redux-burger-menu/immutable';
import BuildNavRoutes from './BuildNavRoutes';
//import { formatCurrentPath } from '../../utils/formats';

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

var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
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

//const styles = {
///* General sidebar styles */
//  burgerMenu: {
//    background: '#FA6FD0',
//    padding: '2.5em 1.5em 0',
//    fontSize: '1.15em'
//  },
//
//  /* Position and sizing of burger button */
//  burgerButton: {
//    position: "fixed",
//    height: "30px",
//    width: "36px",
//    right: "36px",
//    top: "36px"
//  },
//
//  /* Color/shape of burger icon bars */
//  burgerBars: {
//    background: "#373a47"
//  },
//
//  /* Position and sizing of clickable cross button */
//  crossButton: {
//    height: "24px",
//    width: "24px"
//  },
//
//  /* Color/shape of close button cross */
//  cross: {
//    background: "#bdc3c7"
//  },
//
//  menuHeader: {
    //
//  },
//
//  itemList: {
//    fontSize: "1.75em"
//  },
//
//  ,
//
//  divider: {
//    background: "#333",
//    height: "1px",
//    border: "0"
//  }
//}

//const mapStateToProps = ({ router }) => {
//  const currentPath = router.location ? router.location.pathname : 'home';
//
//  return {
//    selected: formatCurrentPath(currentPath)
//  }
//}

const mapActionsToProps = (dispatch) =>
  bindActionCreators({
    toggleMenu
  }, dispatch);

export default connect(null, mapActionsToProps)(Navigation);
