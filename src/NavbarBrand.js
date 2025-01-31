import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules, tagPropType } from './utils';

const propTypes = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object,
};

const NavbarBrand = (props) => {
  const {
    className,
    cssModule,
    tag: Tag = 'a',
    ...attributes
  } = props;

  const classes = mapToCssModules(classNames(
    className,
    'navbar-brand'
  ), cssModule);

  return (
    <Tag {...attributes} className={classes} />
  );
};

NavbarBrand.propTypes = propTypes;

export default NavbarBrand;
