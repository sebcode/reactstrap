import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules, tagPropType } from './utils';

const propTypes = {
  tag: tagPropType,
  'aria-label': PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  role: PropTypes.string,
};

const ButtonToolbar = (props) => {
  const {
    className,
    cssModule,
    tag: Tag = 'div',
    ...attributes
  } = props;

  const classes = mapToCssModules(classNames(
    className,
    'btn-toolbar'
  ), cssModule);

  return (
    <Tag {...{ 'role': 'toolbar', ...attributes }} className={classes} />
  );
};

ButtonToolbar.propTypes = propTypes;

export default ButtonToolbar;
