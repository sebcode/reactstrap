import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules, tagPropType } from './utils';

const propTypes = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object,
};

const ModalFooter = (props) => {
  const {
    className,
    cssModule,
    tag: Tag = 'div',
    ...attributes } = props;
  const classes = mapToCssModules(classNames(
    className,
    'modal-footer'
  ), cssModule);

  return (
    <Tag {...attributes} className={classes} />
  );
};

ModalFooter.propTypes = propTypes;

export default ModalFooter;
