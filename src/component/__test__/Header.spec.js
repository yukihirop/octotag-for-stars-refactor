"use strict"

import * as matchers from "jest-jquery-matchers"
import { default as Header} from "@/component/Header"
import jQuery from "jquery"
global.jQuery = jQuery
global.chrome = {
    extension: {
        getURL() { return jest.fn() }
    }
}

describe("Header", () => {
    beforeEach(() => {
        document.body.innerHTML = `
      <header>
        <nav>
          <ul class="test-ul">
            <li>Issues</li>
          </ul>
        </nav>
      </header>
    `

        jest.addMatchers(matchers)
    })

    describe("constructor", () => {
        it("正常に初期化される", () => {
            let header = new Header()
            expect(header.$head).toExist()
            expect(header.$headerUl).toHaveClass("test-ul")
            expect(header.$starsLinkLi).toHaveText("Stars")
        })
    })

    describe("#attachStarsLink", () => {
        it("ナビゲーションバーに「Stars」のリンクが追加される", () => {
            let header = new Header()
            header.attachStarsLink()
            expect(document.body.innerHTML).toHaveText("Stars")
        })
    })

    describe("#loadStyleSheet", () => {
        it("headに読み込むべきstylesheetが正常に読み込まれている", () => {
            let header = new Header()
            header.loadStyleSheet()
            // http://blog.livedoor.jp/yo_miz/archives/53540189.html
            expect(document.getElementsByTagName("head")[0].innerHTML).toBeMatchedBy("link")
        })
    })
})