"use strict"

import { constants } from "@/constants"
import { default as FilterAreaLi } from "@/component/FilterAreaLi"

export default class FilterArea {
    constructor(){
        this.$filterHeader = constants.DOM.filterbytags_heading
        this.$parentFilterDiv = jQuery(constants.selector.github.filter_div)
        this.$filterDiv = jQuery("<div>", { id: constants.selector.filter_id })
        this.$octotagList = jQuery("<ul>", { class: constants.functional.taglist_ul_class + " " + constants.functional.filtertaglist_ul_class })
    }

    appendTagFilter(tagArray){
        let $filterHeader = this.$filterHeader
        let $parentFilterDiv = this.$parentFilterDiv
        let $filterDiv = this.$filterDiv
        let $octotagList = this.$octotagList

        tagArray.forEach((tagname) => {
            let li = new FilterAreaLi(tagname)
            li.create()
            $octotagList.append(li.createSelector)
        })

        $filterDiv.append($octotagList)
        $parentFilterDiv.append($filterHeader).append($filterDiv)
    }
}