import React from "react"
import PropTypes from "prop-types"
import _ from "underscore"

import { Container, Popover, PopoverMessage } from "./elements"

/**
 * A simple popover element.
 *
 * @returns {function} A component.
 *
 * @param {object} props
 * @param {boolean} props.isPopoverVisible
 * Determines if the popover is visible or not.
 * @param {function} props.setPopoverVisible
 * The function to invoke to change the isPopoverVisible value.
 * @param {string} props.popoverMessage
 * The text string to display in the popover.
 * @param {object} [props.popoverStyle={}]
 * Extra css styles to apply to the popover.
 * @param {string} [props.popoverOrigin=right]
 * The direction that the popover message is displayed from.
 * @param {function} props.children
 * The content to display which triggers a popover.
 *
 * @example
 * import React from "react"
 * import { connect } from "react-redux"
 * import { SimplePopover } from "@alexseitsinger/react-simple-popover"
 *
 * const App = ({ isPopoverVisible, setPopoverVisible, ...props }) => {
 *  return (
 *    <SimplePopover
 *      isPopoverVisible={isPopoverVisible}
 *      setPopoverVisible={setPopoverVisible}
 *      popoverMessage={"This is the text that gets displayed"}>
 *      <div>This is the content that has a popover.</div>
 *    </SimplePopover>
 *  )
 * }
 *
 * const mapDispatch = dispatch => ({
 *   setPopoverVisible: bool => dispatch(setPopoverVisible(bool)),
 * })
 *
 * const mapState = state => ({
 *   isPopoverVisible: state.app.isPopoverVisible,
 * })
 *
 * export default connect(mapState, mapDispatch)(App)
 */
export class SimplePopover extends React.Component {
  static propTypes = {
    isPopoverVisible: PropTypes.bool.isRequired,
    setPopoverVisible: PropTypes.func.isRequired,
    popoverMessage: PropTypes.string.isRequired,
    popoverStyle: PropTypes.object,
    popoverOrigin: PopTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
  }

  static defaultProps = {
    setPopoverVisible: () => {},
    isPopoverVisible: false,
    popoverMessage: "",
    popoverStyle: {},
    popoverOrigin: "right",
  }

  constructor(props) {
    super(props)

    this.isWithinContainerElement = false
    this.isWithinPopoverElement = false
    this.handleMouseEnter = _.debounce(this.handleMouseEnter, 600)
    this.handleMouseLeave = _.debounce(this.handleMouseLeave, 200)
  }

  handleMouseEnter = e => {
    const isWithinContainer = this.isWithinContainerElement
    const isWithinPopover = this.isWithinPopoverElement
    if (isWithinContainer || isWithinPopover) {
      this.handleSetPopoverVisible(true)
    }
  }

  handleMouseLeave = e => {
    const isWithinContainer = this.isWithinContainerElement
    const isWithinPopover = this.isWithinPopoverElement
    if (isWithinPopover === false) {
      if (isWithinContainer === false) {
        this.handleSetPopoverVisible(false)
      }
    }
  }

  handleSetPopoverVisible = bool => {
    const { setPopoverVisible, isPopoverVisible } = this.props
    if (isPopoverVisible !== bool) {
      setPopoverVisible(bool)
    }
  }

  handleMouseEnterContainer = e => {
    this.isWithinContainerElement = true
    this.handleMouseEnter()
  }

  handleMouseLeaveContainer = e => {
    this.isWithinContainerElement = false
    this.handleMouseLeave()
  }

  handleMouseEnterPopover = e => {
    this.isWithinPopoverElement = true
    this.handleMouseEnter()
  }

  handleMouseLeavePopover = e => {
    this.isWithinPopoverElement = false
    this.handleMouseLeave()
  }

  renderPopover = () => {
    const {
      isPopoverVisible,
      popoverMessage,
      popoverStyle,
      popoverOrigin,
    } = this.props

    return isPopoverVisible ? (
      <Popover
        onMouseEnter={this.handleMouseEnterPopover}
        onMouseLeave={this.handleMouseLeavePopover}
        style={popoverStyle}
        popoverOrigin={popoverOrigin}>
        <PopoverMessage>{popoverMessage}</PopoverMessage>
      </Popover>
    ) : null
  }

  render() {
    const { children } = this.props
    const renderedPopover = this.renderPopover()
    return (
      <Container
        onMouseEnter={this.handleMouseEnterContainer}
        onMouseLeave={this.handleMouseLeaveContainer}>
        {renderedPopover}
        {children}
      </Container>
    )
  }
}
