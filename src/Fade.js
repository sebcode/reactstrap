import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';
import { mapToCssModules, omit, pick, TransitionPropTypeKeys, TransitionTimeouts, tagPropType } from './utils';

const propTypes = {
  ...Transition.propTypes,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  tag: tagPropType,
  baseClass: PropTypes.string,
  baseClassActive: PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.func,
  ]),
};

delete propTypes.timeout

const defaultProps = {
  ...Transition.defaultProps,
  timeout: TransitionTimeouts.Fade,
  appear: true,
  enter: true,
  exit: true,
  in: true,
};

function Fade(props) {
  const nodeRef = useRef(null);

  const {
    tag: Tag = 'div',
    baseClass = 'fade',
    baseClassActive = 'show',
    className,
    cssModule,
    children,
    ...otherProps
  } = props;

  const transitionProps = pick({ ...defaultProps, ...otherProps }, TransitionPropTypeKeys);
  const childProps = omit(otherProps, TransitionPropTypeKeys);

  const innerRef = props.innerRef ? props.innerRef : nodeRef

  return (
    <Transition nodeRef={nodeRef} {...transitionProps}>
      {(status) => {
        const isActive = status === 'entered';
        const classes = mapToCssModules(classNames(
          className,
          baseClass,
          isActive && baseClassActive
        ), cssModule);
        return (
          <Tag className={classes} {...childProps} ref={innerRef}>
            {children}
          </Tag>
        );
      }}
    </Transition>
  );
}

Fade.propTypes = propTypes;
Fade._defaultProps = defaultProps;

export default Fade;
