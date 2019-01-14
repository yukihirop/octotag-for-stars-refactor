"use strict"

import { constants } from "@/constants"
import * as util from "@/util"
import * as func from "@/func"

export default class EditInput {
    constructor(reponame){
        this.reponame = reponame
        this.selector = jQuery(constants.event.edit_input)
    }

    setTag(str){
        this.createSelector.val(str)
        this.createSelector.attr("data-before", str)
    }

    create(){
        let reponame = this.reponame
        this.createSelector = jQuery("<input>",{
            type: "text",
            class: constants.functional.edit.input_class,
            name: reponame,
        })
        return this
    }

    onBlur(){
        this.selector.on("blur", (event) => {  // eslint-disable-line no-unused-vars
            let $this = jQuery(event.currentTarget)
            util.addHiddenClass(jQuery($this))
            util.addHiddenClass(jQuery($this).prevAll(constants.selector.tag_edit.hint_id))
            util.removeHiddenClass(jQuery($this).prevAll(constants.selector.tag_edit.button_id))
        })
    }

    onKeyPress(){
        this.selector.on("keypress", (event) => {
            const enteryKey = 13
            if (event.which == enteryKey){
                let $this = jQuery(event.currentTarget)
                func.saveEditTagsValue(jQuery($this))
            }
        })
    }
}