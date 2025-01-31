import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules, tagPropType } from './utils';

const propTypes = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  type: PropTypes.string
};

const List = forwardRef((props, ref) => {
  const {
    className,
    cssModule,
    tag: Tag = 'ul',
    type,
    ...attributes
  } = props;
  const classes = mapToCssModules(classNames(
    className,
    type ? `list-${type}` : false
  ), cssModule);

  return (
    <Tag {...attributes} className={classes} ref={ref} />
  );
});

List.propTypes = propTypes;

export default List;
