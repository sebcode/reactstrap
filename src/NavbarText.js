import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules, tagPropType } from './utils';

const propTypes = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object
};

const NavbarText = (props) => {
  const {
    className,
    cssModule,
    active,
    tag: Tag = 'span',
    ...attributes
  } = props;

  const classes = mapToCssModules(classNames(
    className,
    'navbar-text'
  ), cssModule);

  return (
    <Tag {...attributes} className={classes} />
  );
};

NavbarText.propTypes = propTypes;

export default NavbarText;
