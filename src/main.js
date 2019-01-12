"use strict"

import { default as Header } from "@/component/Header"
import * as func from "@/func"
import * as event from "@/event"

jQuery(() => {
    const main = new Promise((resolve) => {
        let header = new Header()
        header.attachStarsLink()

        if (new RegExp("^/stars/?$").test(location.pathname)){
            header.loadStyleSheet()
            Promise.all([func.initialize()]).then(() => { resolve("stars") })
        } else {
            resolve("github")
        }
    })

    main.then((value) => { // eslint-disable-line no-unused-vars
        event.addListenersForRepo()
    })
})