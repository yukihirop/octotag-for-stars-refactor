"use strict"

import { constants } from "@/constants"

export default class Storage {
    constructor() {
        this.storageKey = constants.storageKey
        this.local = chrome.storage.local // eslint-disable-line no-undef
    }

    saveEditTagsValue(tagData){
        return new Promise((resolve) => {
            this.local.get(this.storageKey, (result) => {
                let tagDataFromStorage = {}
                if (result[this.storageKey] !== void 0) {
                    tagDataFromStorage = JSON.parse(result[this.storageKey])
                }
                resolve(tagDataFromStorage)
            })
        }).then((tagDataFromStorage) => {
            return new Promise((resolve) => {
                Object.assign(tagDataFromStorage, tagData)
                this.local.set({ [this.storageKey]: JSON.stringify(tagDataFromStorage) }, () => {
                    this.local.get([this.storageKey], (result) => {
                        resolve(JSON.parse(result[this.storageKey]))
                    })
                })
            })
        })
    }

    get(reponameArray) {
        return new Promise(resolve => {
            this.local.get(this.storageKey, result => {
                let tagData = this.createTagData(result, this.storageKey, reponameArray)
                resolve(tagData)
            })
        })
    }

    //private
    createTagData(result, storageKey, reponameArray) {
        let tagData = {}
        if (result[storageKey] !== void 0){
            tagData = JSON.parse(result[storageKey])
        }
        reponameArray.forEach((reponame) => {
            if (!tagData[reponame]){
                tagData[reponame] = []
            }
        })
        return tagData
    }
}