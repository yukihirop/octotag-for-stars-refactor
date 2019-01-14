"use strict"

import { constants } from "@/constants"
import * as util from "@/util"

export default class EditButton {
    constructor(reponame) {
        this.reponame = reponame
        this.selector = jQuery(constants.event.edit_button)
    }

    create(){
        let reponame = this.reponame
        let $editButton = jQuery("<button>",{
            type: "button",
            class: constants.functional.edit.button_class,
            value: reponame,
        })

        $editButton.append(jQuery("<li>", {
            class: "fas fa-edit",
        }))

        $editButton.append(jQuery("<span>",{
            text: "Edit tags",
        }))

        this.createSelector = $editButton
        return this
    }

    onClick() {
        this.selector.on('click', (event) => { // eslint-disable-line no-unused-vars
            let $this = jQuery(event.currentTarget)
            let $input = jQuery($this).nextAll(constants.selector.tag_edit.input_id)
            util.addHiddenClass(jQuery($this))
            util.removeHiddenClass(jQuery($this).nextAll(constants.selector.tag_edit.hint_id))
            util.removeHiddenClass($input)
            $input.focus()
        })
    }
}