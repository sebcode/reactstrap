import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules, tagPropType } from './utils';

const propTypes = {
  tag: tagPropType,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  wrapTag: tagPropType,
  toggle: PropTypes.func,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.node,
  closeAriaLabel: PropTypes.string,
  charCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  close: PropTypes.object,
};

const ToastHeader = (props) => {
  let closeButton;
  let icon;
  const {
    className,
    cssModule,
    children,
    toggle,
    tag: Tag = 'strong',
    wrapTag: WrapTag = 'div',
    closeAriaLabel = 'Close',
    charCode = 215,
    close,
    tagClassName = 'mr-auto',
    icon: iconProp,
    ...attributes
  } = props;

  const classes = mapToCssModules(classNames(
    className,
    'toast-header'
  ), cssModule);

  if (!close && toggle) {
    const closeIcon = typeof charCode === 'number' ? String.fromCharCode(charCode) : charCode;
    closeButton = (
      <button type="button" onClick={toggle} className={mapToCssModules('close', cssModule)} aria-label={closeAriaLabel}>
        <span aria-hidden="true">{closeIcon}</span>
      </button>
    );
  }

  if (typeof iconProp === "string") {
    icon = (
      <svg
        className={mapToCssModules(`rounded text-${iconProp}`)}
        width="20"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
        role="img"
      >
        <rect fill="currentColor" width="100%" height="100%"></rect>
      </svg>
    );
  } else if (iconProp) {
    icon = iconProp;
  }

  return (
    <WrapTag {...attributes} className={classes}>
      {icon}
      <Tag className={mapToCssModules(classNames(tagClassName, { "ml-2": icon != null }), cssModule)}>
        {children}
      </Tag>
      {close || closeButton}
    </WrapTag>
  );
};

ToastHeader.propTypes = propTypes;

export default ToastHeader;
