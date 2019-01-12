"use strict"

import { constants } from "@/constants"

export default class EditHint {
    constructor(){
        this.selector = jQuery(constants.event.edit_hint)
    }

    create(){
        this.createSelector = jQuery("<span>", {
            class: constants.functional.edit.hint_class,
            text: "Edit tags using comma to separate tags, and press the enter-key to store tags.",
        })
        return this
    }
}