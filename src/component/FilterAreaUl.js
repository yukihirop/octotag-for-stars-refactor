"use strict"

import { constants } from "@/constants"
import { default as FilterAreaLi } from "@/component/FilterAreaLi"
import * as util from "@/util"

export default class FilterAreaUl {
    constructor(data){
        this.data = data
        this.$octotagUl = jQuery(`ul.${constants.functional.taglist_ul_class}.${constants.functional.filtertaglist_ul_class}`)
        this.$octotagFilterAreaUl = jQuery(constants.functional.filtertaglist_ul_id)
        this.$octotagFilterLi = jQuery(constants.functional.filtertaglist_input_id)
    }

    loadCheckedList(){
        let tagArray = this.createTagArray()
        let $octotagUl = this.$octotagUl

        this.$octotagFilterAreaUl.empty()

        tagArray.forEach((tagname) => {
            let li = new FilterAreaLi(tagname)
            li.create()
            $octotagUl.append(li.createSelector)
        })
    }

    createTagArray(){
        let data = this.data
        let tagArray = Array.from(util.setTagSet(data))

        if (tagArray.length === 0) {
            tagArray = this.createCheckedTagArray()
        }
        return tagArray.sort()
    }

    createCheckedTagArray(){
        let tagArray = []
        this.$octotagFilterLi.each((index, element) => {
            if(jQuery(element).prop("checked")){
                tagArray.push(jQuery(element).val())
            }
        })
        return tagArray
    }
}