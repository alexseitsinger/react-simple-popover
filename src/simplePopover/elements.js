import styled from "@emotion/styled"
import { css } from "@emotion/core"

export const Popover = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 50%;
  background-color: rgba(22, 22, 22, 0.8);
  color: #FFFFFF;
  text-shadow: 0 1px 1px #000000;
  border-radius: 0.333em;
  border: 1px solid #000000;
  ${props => props.popoverOrigin && props.popoverOrigin === "left" && css`
    left: 0;
  `}
  ${props => props.popoverOrigin && props.popoverOrigin === "right" && css`
    right: 0;
  `}
`

export const PopoverMessage = styled.div`
  white-space: nowrap;
  font-size: 0.7em;
  padding: 0.333em;
`

export const Container = styled.div`
  position: relative;
`

export const Button = styled.button`
  font-size: 0.75em;
  margin-top: 0.2rem;
  z-index: 1;
`
