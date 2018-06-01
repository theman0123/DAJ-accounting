//component imports
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
//test imports


class BuildNavRoutes extends React.Component {
  constructor() {
    super();
    //state controls styling <obj> and hover <bool>
    this.state = {
      hover: false,
      font: {
        color: "white",
        fontSize: "1.75em",
        opacity: ".8",
      },
      onHover: {
        color: "white-yellow",
        fontSize: "1.75em",
        opacity: "1",
      },
    }
  }
  
  toggleHover = () => {
    this.setState({ hover: !this.state.hover })
  }
  
  render() {
    const { routeObj, closeMenu } = this.props;
    const { font, onHover } = this.state;
    const setFont = this.state.hover ? onHover: font;

    return (
      <div
        key={routeObj.name}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
        onClick={closeMenu}
        style={setFont}>
        
        <Link to={routeObj.URL}>
          {routeObj.name}
        </Link>
        
      </div>
    );
  }
}

BuildNavRoutes.propTypes = {
  routeObj: PropTypes.shape({
    name: PropTypes.string.isRequired,
    URL: PropTypes.string.isRequired
  }).isRequired,
  closeMenu: PropTypes.func.isRequired
};

export default BuildNavRoutes;

//styles--see state

//tests




