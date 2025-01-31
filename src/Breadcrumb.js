import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules, tagPropType } from './utils';

const propTypes = {
  tag: tagPropType,
  listTag: tagPropType,
  className: PropTypes.string,
  listClassName: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.node,
  'aria-label': PropTypes.string
};

const Breadcrumb = (props) => {
  const {
    className,
    listClassName,
    cssModule,
    children,
    tag: Tag = 'nav',
    listTag: ListTag = 'ol',
    'aria-label': label = 'breadcrumb',
    ...attributes
  } = props;

  const classes = mapToCssModules(classNames(
    className
  ), cssModule);

  const listClasses = mapToCssModules(classNames(
    'breadcrumb',
    listClassName
  ), cssModule);

  return (
    <Tag {...attributes} className={classes} aria-label={label}>
      <ListTag className={listClasses}>
        {children}
      </ListTag>
    </Tag>
  );
};

Breadcrumb.propTypes = propTypes;

export default Breadcrumb;
