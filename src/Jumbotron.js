import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules, tagPropType } from './utils';

const propTypes = {
  tag: tagPropType,
  fluid: PropTypes.bool,
  className: PropTypes.string,
  cssModule: PropTypes.object,
};

const Jumbotron = (props) => {
  const {
    className,
    cssModule,
    tag: Tag = 'div',
    fluid,
    ...attributes
  } = props;

  const classes = mapToCssModules(classNames(
    className,
    'jumbotron',
    fluid ? 'jumbotron-fluid' : false
  ), cssModule);

  return (
    <Tag {...attributes} className={classes} />
  );
};

Jumbotron.propTypes = propTypes;

export default Jumbotron;
