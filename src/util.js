"use strict"

import { constants } from "@/constants"

/**
 * Add hidden class to param not to display.
 * @param {jQuery object} $elem
 */
export var addHiddenClass = ($elem) => {
    return $elem.addClass(constants.functional.hidden_class)
}

/**
 * Remove hidden class to param to display.
 * @param {jQuery object} $elem
 */
export var removeHiddenClass = ($elem) => {
    return $elem.removeClass(constants.functional.hidden_class)
}

/**
 * Update tags in filter area in page.
 * @param {JSON object} data
 */
export var setTagSet = (data) => {
    let tagSet = new Set()
    for (let k in data) {
        let tagArray = data[k]
        for (let tag of tagArray){
            if(!tagSet.has(tag)){
                tagSet.add(tag)
            }
        }
    }
    return tagSet
}
