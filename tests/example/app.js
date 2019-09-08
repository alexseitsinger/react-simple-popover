import React from "react"
import { connect } from "react-redux"

import { SimplePopover } from "../../src"
import { setPopoverVisible } from "./actions"

export const Content = () => (<div>Content</div>)

export class App extends React.Component {
  state = {
    isVisible: false,
  }
  handleSetVisible = bool => {
    this.setState({isVisible: bool})
  }
  render() {
    const { isVisible } = this.state
    const { message } = this.props
    return (
      <SimplePopover
        isPopoverVisible={isVisible}
        setPopoverVisible={this.handleSetVisible}
        popoverMessage={message}>
        <Content />
      </SimplePopover>
    )
  }
}

