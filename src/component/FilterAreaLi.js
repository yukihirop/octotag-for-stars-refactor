"use strict"

import { default as FilterAreaUl } from "@/component/FilterAreaUl"
import { default as RepoUl } from "@/component/RepoUl"
import { constants } from "@/constants"

export default class FilterAreaLi {
    constructor(tagname){
        this.tagname = tagname
        this.selector = jQuery(constants.functional.filtertaglist_input_id)
        this.$list = this.selector.parents("li")
    }

    onClickInput(){
        this.selector.on("change", (event) => {
            let $this = jQuery(event.currentTarget)
            let filterAreaUl = new FilterAreaUl()
            let tagArray = filterAreaUl.createCheckedTagArray()
            let repoUl = new RepoUl({},tagArray)

            this.switchStatus(jQuery($this))
            repoUl.filterByTags()
        })
    }

    create(){
        let tagname = this.tagname

        this.createSelector = jQuery("<li>").append(jQuery("<input>", {
            type: "checkbox",
            id: "octotag-filter-" +  tagname,
            value: tagname,
        })).append(jQuery("<label>", {
            for: "octotag-filter-" + tagname,
            text: tagname,
        }))
        return this
    }

    //private
    switchStatus($element){
        let isChecked = $element.prop("checked")

        if(isChecked){
            this.checked($element.parents("li"))
        } else {
            this.unchecked($element.parents("li"))
        }
    }

    //private
    checked($element){
        $element.addClass(constants.functional.checkedtag_class)
    }

    //private
    unchecked($element){
        $element.removeClass(constants.functional.checkedtag_class)
    }
}