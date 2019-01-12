"use strict"

import { constants } from "@/constants"

export default class Storage {
    constructor() {
        this.storageKey = constants.storageKey
        this.local = chrome.storage.local // eslint-disable-line no-undef
    }
}