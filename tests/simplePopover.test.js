import React from "react"
//import { Provider } from "react-redux"

import { Popover, PopoverMessage } from "../src/simplePopover/elements"
import { App, Content } from "./example/app"
//import { createStore } from "./example/store"

//const store = createStore()
const setup = (message) => mount(
  <App message={message} />
)

describe("<SimplePopover />", () => {
  it("renders", () => {
    const enterDelay = 600
    const leaveDelay = 200
    const message = "Popover Message!"

    const wrapper = setup(message)

    expect(wrapper.find(Popover)).toHaveLength(0)

    wrapper.simulate("mouseenter")
    setTimeout(() => {
      expect(wrapper.find(Popover)).toHaveLength(1)
    }, enterDelay)

    wrapper.simulate("mouseleave")
    setTimeout(() => {
      expect(wrapper.find(Popover)).toHaveLength(0)
    }, leaveDelay)
  })
})
