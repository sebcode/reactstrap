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
  size: PropTypes.string,
  vertical: PropTypes.bool,
};

const ButtonGroup = (props) => {
  const {
    className,
    cssModule,
    size,
    vertical,
    tag: Tag = 'div',
    ...attributes
  } = props;

  const classes = mapToCssModules(classNames(
    className,
    size ? 'btn-group-' + size : false,
    vertical ? 'btn-group-vertical' : 'btn-group'
  ), cssModule);

  return (
    <Tag {...{ 'role': 'group', ...attributes }} className={classes} />
  );
};

ButtonGroup.propTypes = propTypes;

export default ButtonGroup;
