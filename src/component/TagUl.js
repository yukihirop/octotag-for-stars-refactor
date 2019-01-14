"use strict"

import { constants } from "@/constants"
import * as util from "@/util"

export default class TagUl {
    constructor($targetInput){
        this.reponame = $targetInput.attr("name")
        this.$targetInput = $targetInput
        this.$tagList = $targetInput.nextAll(constants.selector.taglist_id)
        this.$editHint = $targetInput.prevAll(constants.selector.tag_edit.hint_id)
        this.$editButton = $targetInput.prevAll(constants.selector.tag_edit.button_id)
    }

    saveAfterEdit() {
        let inputTag = this.inputTag()
        let tagArray = inputTag.createTagArray()

        util.addHiddenClass(this.$targetInput)
        util.addHiddenClass(this.$editHint)
        util.removeHiddenClass(this.$editButton)

        this.appendTag(tagArray)
    }

    tagData(){
        let tagData = {}
        let tagArray = this.inputTag().createTagArray()
        tagData[this.reponame] = tagArray
        return tagData
    }

    //private
    appendTag(tagArray){
        let $tagList = this.$tagList

        $tagList.empty()
        tagArray.forEach((item) => {
            $tagList.append(jQuery("<li>", { text: item }))
        })
    }

    //private
    inputTag(){
        return new InputTag(this.$targetInput)
    }
}


//private
class InputTag {
    constructor($input){
        this.$input = $input
    }

    createTagArray(){
        let $input = this.$input

        let tagArray = $input.val().split(",").filter((item) => {
            return item.replace(/[\s]+/g, "") != ""
        })

        let tagSet = new Set()

        tagArray.forEach((item) => {
            tagSet.add(item.replace(/(^[\s ]+)|([\s ]+$)/g, ""))
        })

        tagArray = Array.from(tagSet)
        tagArray.sort()

        return tagArray
    }
}