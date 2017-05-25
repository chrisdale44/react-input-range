import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import Label from './label';

/**
 * @ignore
 */
export default class Slider extends React.Component {
  /**
   * Accepted propTypes of Slider
   * @override
   * @return {Object}
   * @property {Function} ariaLabelledby
   * @property {Function} ariaControls
   * @property {Function} className
   * @property {Function} formatLabel
   * @property {Function} maxValue
   * @property {Function} minValue
   * @property {Function} onSliderDrag
   * @property {Function} onSliderKeyDown
   * @property {Function} onFocus
   * @property {Function} onBlur
   * @property {Function} percentage
   * @property {Function} type
   * @property {Function} value
   */
  static get propTypes() {
    return {
      ariaLabelledby: PropTypes.string,
      ariaControls: PropTypes.string,
      classNames: PropTypes.objectOf(PropTypes.string).isRequired,
      formatLabel: PropTypes.func,
      maxValue: PropTypes.number,
      minValue: PropTypes.number,
      onSliderDrag: PropTypes.func.isRequired,
      onSliderKeyDown: PropTypes.func.isRequired,
      onFocus: PropTypes.func.isRequired,
      onBlur: PropTypes.func.isRequired,
      percentage: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    };
  }

  /**
   * @param {Object} props
   * @param {string} [props.ariaLabelledby]
   * @param {string} [props.ariaControls]
   * @param {InputRangeClassNames} props.classNames
   * @param {Function} [props.formatLabel]
   * @param {number} [props.maxValue]
   * @param {number} [props.minValue]
   * @param {Function} props.onSliderKeyDown
   * @param {Function} props.onSliderDrag
   * @param {Function} props.onFocus
   * @param {Function} props.onBlur
   * @param {number} props.percentage
   * @param {number} props.type
   * @param {number} props.value
   */
  constructor(props) {
    super(props);

    /**
     * @private
     * @type {?Component}
     */
    this.node = null;
    this.state = {
      sliderSelected: false,
    };
  }

  /**
   * @ignore
   * @override
   * @return {void}
   */
  componentWillUnmount() {
    this.removeDocumentMouseMoveListener();
    this.removeDocumentMouseUpListener();
    this.removeDocumentTouchEndListener();
    this.removeDocumentTouchMoveListener();
  }

  /**
   * @private
   * @param {SyntheticEvent} event
   * @return {void}
   */
  @autobind
  onBlur(event) {
    this.setState({ sliderSelected: false });
    this.props.onBlur(event, this.props.type);
  }

  /**
   * @private
   * @param {SyntheticEvent} event
   * @return {void}
   */
  @autobind
  onFocus(event) {
    this.setState({ sliderSelected: true });
    this.props.onFocus(event, this.props.type);
  }

  /**
   * @private
   * @return {Object}
   */
  getStyle() {
    const perc = (this.props.percentage || 0) * 100;
    const style = {
      position: 'absolute',
      left: `${perc}%`,
    };

    return style;
  }

  /**
   * @private
   * @return {Object}
   */
  getSliderStyle() {
    if (this.state.sliderSelected) {
      return {
        backgroundColor: this.props.classNames.selectedColor,
      };
    }
    return {};
  }

  /**
   * @private
   * @return {Object}
   */
  getLabelStyle() {
    const color = this.state.sliderSelected ? this.props.classNames.selectedColor : this.props.classNames.primaryColor;
    const style = {
      color,
    };

    return style;
  }

  /**
   * Listen to mousemove event
   * @private
   * @return {void}
   */
  addDocumentMouseMoveListener() {
    this.removeDocumentMouseMoveListener();
    this.node.ownerDocument.addEventListener('mousemove', this.handleMouseMove);
  }

  /**
   * Listen to mouseup event
   * @private
   * @return {void}
   */
  addDocumentMouseUpListener() {
    this.removeDocumentMouseUpListener();
    this.node.ownerDocument.addEventListener('mouseup', this.handleMouseUp);
  }

  /**
   * Listen to touchmove event
   * @private
   * @return {void}
   */
  addDocumentTouchMoveListener() {
    this.removeDocumentTouchMoveListener();
    this.node.ownerDocument.addEventListener('touchmove', this.handleTouchMove);
  }

  /**
   * Listen to touchend event
   * @private
   * @return {void}
   */
  addDocumentTouchEndListener() {
    this.removeDocumentTouchEndListener();
    this.node.ownerDocument.addEventListener('touchend', this.handleTouchEnd);
  }

  /**
   * @private
   * @return {void}
   */
  removeDocumentMouseMoveListener() {
    this.node.ownerDocument.removeEventListener('mousemove', this.handleMouseMove);
  }

  /**
   * @private
   * @return {void}
   */
  removeDocumentMouseUpListener() {
    this.node.ownerDocument.removeEventListener('mouseup', this.handleMouseUp);
  }

  /**
   * @private
   * @return {void}
   */
  removeDocumentTouchMoveListener() {
    this.node.ownerDocument.removeEventListener('touchmove', this.handleTouchMove);
  }

  /**
   * @private
   * @return {void}
   */
  removeDocumentTouchEndListener() {
    this.node.ownerDocument.removeEventListener('touchend', this.handleTouchEnd);
  }

  /**
   * @private
   * @return {void}
   */
  @autobind
  handleMouseDown() {
    this.setState({ sliderSelected: true });
    this.addDocumentMouseMoveListener();
    this.addDocumentMouseUpListener();
  }

  /**
   * @private
   * @return {void}
   */
  @autobind
  handleMouseUp() {
    this.setState({ sliderSelected: false });
    this.removeDocumentMouseMoveListener();
    this.removeDocumentMouseUpListener();
  }

  /**
   * @private
   * @param {SyntheticEvent} event
   * @return {void}
   */
  @autobind
  handleMouseMove(event) {
    this.props.onSliderDrag(event, this.props.type);
  }

  /**
   * @private
   * @return {void}
   */
  @autobind
  handleTouchStart() {
    this.setState({ sliderSelected: true });
    this.addDocumentTouchEndListener();
    this.addDocumentTouchMoveListener();
  }

  /**
   * @private
   * @param {SyntheticEvent} event
   * @return {void}
   */
  @autobind
  handleTouchMove(event) {
    this.props.onSliderDrag(event, this.props.type);
  }

  /**
   * @private
   * @return {void}
   */
  @autobind
  handleTouchEnd() {
    this.setState({ sliderSelected: false });
    this.removeDocumentTouchMoveListener();
    this.removeDocumentTouchEndListener();
  }

  /**
   * @private
   * @param {SyntheticEvent} event
   * @return {void}
   */
  @autobind
  handleKeyDown(event) {
    this.props.onSliderKeyDown(event, this.props.type);
  }

  /**
   * @override
   * @return {JSX.Element}
   */
  render() {
    const style = this.getStyle();
    const sliderStyle = this.getSliderStyle();
    const labelStyle = this.getLabelStyle();

    return (
      <div className={this.props.classNames[`${this.props.type}ValueLabel`]}>
        <span
          className={this.props.classNames.sliderContainer}
          ref={(node) => { this.node = node; }}
          style={style}>
          <div
            aria-labelledby={this.props.ariaLabelledby}
            aria-controls={this.props.ariaControls}
            aria-valuemax={this.props.maxValue}
            aria-valuemin={this.props.minValue}
            aria-valuenow={this.props.value}
            className={this.props.classNames.slider}
            draggable="false"
            onKeyDown={this.handleKeyDown}
            onMouseDown={this.handleMouseDown}
            onTouchStart={this.handleTouchStart}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            role="slider"
            tabIndex="0"
            style={sliderStyle} />
        </span>
        <Label
          classNames={this.props.classNames}
          formatLabel={this.props.formatLabel}
          type="value"
          labelStyle={labelStyle}>
          {this.props.value}
        </Label>
      </div>
    );
  }
}
