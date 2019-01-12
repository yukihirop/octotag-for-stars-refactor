"use strict"

import { default as EditButton } from "@/component/shared/EditButton"
import { default as EditInput } from "@/component/shared/EditInput"
import { default as FilterAreaLi } from "@/component/FilterAreaLi"

/* eslint-disable indent */
export var addListenersForRepo = () => {
  new EditButton().onClick()
  new EditInput().onBlur()
  new EditInput().onKeyPress()
}
/* eslint-enable indent */

export var addListenersForFilter = () => {
    new FilterAreaLi().onClickInput()
}