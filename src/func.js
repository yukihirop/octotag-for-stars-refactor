"use strict"

import { default as TagUl } from "@/component/TagUl"
import { default as FilterArea } from "@/component/FilterArea"
import { default as FilterAreaUl } from "@/component/FilterAreaUl"
import { default as RepoUl } from "@/component/RepoUl"
import { default as Storage } from "@/storage"
import * as util from "@/util"
import * as event from "@/event"

var storage = new Storage()
var tagData = {}

export var updateTagsInFilterArea = (data) => {
    let filterAreaUl = new FilterAreaUl(data)
    filterAreaUl.loadCheckedList()
    event.addListenersForFilter()
}

export var saveEditTagsValue = ($targetInput) => {
    let tagUl = new TagUl($targetInput)
    tagData = tagUl.tagData()

    tagUl.saveAfterEdit()

    return new Promise((resolve) => {
        storage.local.get(storage.storageKey, (result) => {
            let tagDataFromStorage = {}
            if (result[storage.storageKey] !== void 0) {
                tagDataFromStorage = JSON.parse(result[storage.storageKey])
            }
            resolve(tagDataFromStorage)
        })
    }).then((tagDataFromStorage) => {
        return new Promise((resolve) => {
            Object.assign(tagDataFromStorage, tagData)
            storage.local.set({ [storage.storageKey]: JSON.stringify(tagDataFromStorage) }, () => {
                storage.local.get([storage.storageKey], (result) => {
                    resolve(JSON.parse(result[storage.storageKey]))
                })
            })
        })
    }).then((data) => {
        updateTagsInFilterArea(data)
    })
}

export var initialize = () => {
    let repoUl = new RepoUl({},[])
    let reponameArray = repoUl.getRepoNameList()
    let tagData = {}
    reponameArray.forEach((reponame) => {
        tagData[reponame] = []
    })

    // appendRepoTags
    return new Promise((resolve) => {
        storage.local.get(storage.storageKey, result => {
            let tagData = createTagData(result, reponameArray)
            let repoUl = new RepoUl(tagData,[])
            repoUl.appendRepoTags()
            resolve()
        })
    }).then(() => {
        // appendTagFilter
        return new Promise((resolve) => {
            storage.local.get(storage.storageKey, result => {
                let tagData = createTagData(result, reponameArray)
                let tagSet = util.setTagSet(tagData)
                let tagArray = Array.from(tagSet).sort()
                let filterArea = new FilterArea()
                filterArea.appendTagFilter(tagArray)
                resolve()
            })
        })
    })
}

export var createTagData = (result, reponameArray) => {
    let tagData = {}
    if (result[storage.storageKey] !== void 0){
        tagData = JSON.parse(result[storage.storageKey])
    }
    reponameArray.forEach((reponame) => {
        if (!tagData[reponame]){
            tagData[reponame] = []
        }
    })
    return tagData
}
