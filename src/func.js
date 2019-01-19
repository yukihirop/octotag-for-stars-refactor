"use strict"

import { default as TagUl } from "@/component/TagUl"
import { default as FilterArea } from "@/component/FilterArea"
import { default as FilterAreaUl } from "@/component/FilterAreaUl"
import { default as RepoUl } from "@/component/RepoUl"
import { default as Storage } from "@/storage"
import * as util from "@/util"
import * as event from "@/event"

export var updateTagsInFilterArea = (data) => {
    let filterAreaUl = new FilterAreaUl(data)
    filterAreaUl.loadCheckedList()
    event.addListenersForFilter()
}

export var saveEditTagsValue = ($targetInput) => {
    let storage = new Storage()
    let tagUl = new TagUl($targetInput)
    var tagData = {}
    tagData = tagUl.tagData()

    tagUl.saveAfterEdit()
    storage.saveEditTagsValue(tagData).then((data) => {
        updateTagsInFilterArea(data)
    })
}

export var initialize = () => {
    let repoUl = new RepoUl({},[])
    let reponameArray = repoUl.getRepoNameList()

    return new Promise(resolve => {
        appendRepoTags(reponameArray, resolve)
    }).then(() => {
        return new Promise(resolve => {
            appendTagFilter(reponameArray, resolve)
        })
    })
}

//private
var appendRepoTags = (reponameArray, resolve) => {
    let storage = new Storage()
    
    storage.get(reponameArray).then(tagData => {
        let repoUl = new RepoUl(tagData,[])
        repoUl.appendRepoTags()
        resolve()
    })
}

//private
var appendTagFilter = (reponameArray, resolve) => {
    let storage = new Storage()
    
    storage.get(reponameArray).then(tagData => {
        let tagSet = util.setTagSet(tagData)
        let tagArray = Array.from(tagSet).sort()
        let filterArea = new FilterArea()
        filterArea.appendTagFilter(tagArray)
        resolve()
    })
}
