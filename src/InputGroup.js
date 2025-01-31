import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules, tagPropType } from './utils';

const propTypes = {
  tag: tagPropType,
  size: PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object,
};

const InputGroup = (props) => {
  const {
    className,
    cssModule,
    tag: Tag = 'div',
    size,
    ...attributes
  } = props;
  const classes = mapToCssModules(classNames(
    className,
    'input-group',
    size ? `input-group-${size}` : null
  ), cssModule);

  return (
    <Tag {...attributes} className={classes} />
  );
};

InputGroup.propTypes = propTypes;

export default InputGroup;
