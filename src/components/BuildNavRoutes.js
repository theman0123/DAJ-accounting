import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BuildNavRoutes = ({ routeObj, closeMenu }) => {
  return (
    <div key={routeObj.name} onClick={closeMenu}>
      <Link to={routeObj.URL}>
        {routeObj.name}
      </Link>
    </div>
  );
};

BuildNavRoutes.propTypes = {
  navRoutes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    URL: PropTypes.string.isRequired
  })).isRequired,
  closeMenu: PropTypes.func.isRequired
};

export default BuildNavRoutes;
