import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Popper as ReactPopper } from 'react-popper';
import { getTarget, targetPropType, mapToCssModules, DOMElement, tagPropType } from './utils';
import Fade from './Fade';

function noop() {  }

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  popperClassName: PropTypes.string,
  placement: PropTypes.string,
  placementPrefix: PropTypes.string,
  arrowClassName: PropTypes.string,
  hideArrow: PropTypes.bool,
  tag: tagPropType,
  isOpen: PropTypes.bool.isRequired,
  cssModule: PropTypes.object,
  offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fallbackPlacement: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  flip: PropTypes.bool,
  container: targetPropType,
  target: targetPropType.isRequired,
  modifiers: PropTypes.object,
  positionFixed: PropTypes.bool,
  boundariesElement: PropTypes.oneOfType([PropTypes.string, DOMElement]),
  onClosed: PropTypes.func,
  fade: PropTypes.bool,
  transition: PropTypes.shape(Fade.propTypes),
};

const defaultProps = {
  boundariesElement: 'scrollParent',
  placement: 'auto',
  hideArrow: false,
  isOpen: false,
  offset: 0,
  fallbackPlacement: 'flip',
  flip: true,
  container: 'body',
  modifiers: {},
  onClosed: noop,
  fade: true,
  transition: {
      ...Fade._defaultProps,
  }
};

class PopperContent extends React.Component {
  constructor(props) {
    super(props);

    this.setTargetNode = this.setTargetNode.bind(this);
    this.getTargetNode = this.getTargetNode.bind(this);
    this.getRef = this.getRef.bind(this);
    this.onClosed = this.onClosed.bind(this);
    this.state = { isOpen: props.isOpen };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isOpen && !state.isOpen) {
      return { isOpen: props.isOpen };
    }
    else return null;
  }

  componentDidUpdate() {
    if (this._element && this._element.childNodes && this._element.childNodes[0] && this._element.childNodes[0].focus) {
      this._element.childNodes[0].focus();
    }
  }

  setTargetNode(node) {
    this.targetNode = typeof node === 'string' ? getTarget(node) : node;
  }

  getTargetNode() {
    return this.targetNode;
  }

  getContainerNode() {
    return getTarget(this.props.container);
  }

  getRef(ref) {
    this._element = ref;
  }

  onClosed() {
    this.props.onClosed();
    this.setState({ isOpen: false });
  }

  renderChildren() {
    const {
      cssModule,
      children,
      isOpen,
      flip,
      target,
      offset,
      fallbackPlacement,
      placementPrefix,
      arrowClassName: _arrowClassName,
      hideArrow,
      popperClassName: _popperClassName,
      tag,
      container,
      modifiers,
      positionFixed,
      boundariesElement,
      onClosed,
      fade,
      transition,
      placement,
      ...attrs
    } = this.props;
    const arrowClassName = mapToCssModules(classNames(
      'arrow',
      _arrowClassName
    ), cssModule);
    const popperClassName = mapToCssModules(classNames(
      _popperClassName,
      placementPrefix ? `${placementPrefix}-auto` : ''
    ), this.props.cssModule);

    const extendedModifiers = {
      offset: { offset },
      flip: { enabled: flip, behavior: fallbackPlacement },
      preventOverflow: { boundariesElement },
      ...modifiers,
    };

    const popperTransition = {
      ...Fade._defaultProps,
      ...transition,
      baseClass: fade ? transition.baseClass : '',
      timeout: fade ? transition.timeout : 0,
    }

    return (
      <Fade
        {...popperTransition}
        {...attrs}
        in={isOpen}
        onExited={this.onClosed}
        tag={tag}
      >
        <ReactPopper
          referenceElement={this.targetNode}
          modifiers={extendedModifiers}
          placement={placement}
          positionFixed={positionFixed}
        >
          {({ ref, style, placement, outOfBoundaries, arrowProps, scheduleUpdate }) => (
            <div ref={ref} style={style} className={popperClassName} x-placement={placement} x-out-of-boundaries={outOfBoundaries ? 'true' : undefined}>
              {typeof children === 'function' ? children({ scheduleUpdate }) : children}
              {!hideArrow && <span ref={arrowProps.ref} className={arrowClassName} style={arrowProps.style} />}
            </div>
          )}
        </ReactPopper>
      </Fade>
    );
  }

  render() {
    this.setTargetNode(this.props.target);

    if (this.state.isOpen) {
      return this.props.container === 'inline' ?
        this.renderChildren() :
        ReactDOM.createPortal((<div ref={this.getRef}>{this.renderChildren()}</div>), this.getContainerNode());
    }

    return null;
  }
}

PopperContent.propTypes = propTypes;
PopperContent.defaultProps = defaultProps;

export default PopperContent;
