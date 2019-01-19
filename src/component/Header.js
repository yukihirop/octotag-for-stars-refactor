"use strict"

import { constants } from "@/constants"

export default class Header {
    constructor(){
        this.$head = jQuery("head")
        this.$headerUl = jQuery(constants.selector.github.header_ul)
        this.$starsLinkLi = constants.DOM.stars_link_li
    }

    attachStarsLink(){
        this.$headerUl.append(this.$starsLinkLi)
    }

    /* eslint-disable no-undef */
    loadStyleSheet(){
        let $head = this.$head

        $head.append(jQuery("<link>", {
            rel: "stylesheet",
            href: chrome.extension.getURL("css/all.min.css")
        }))

        $head.append(jQuery("<link>", {
            rel: "stylesheet",
            href: chrome.extension.getURL("css/style.css")
        }))
    }
    /* eslint-enable no-undef */
}