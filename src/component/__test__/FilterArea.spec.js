"use strict"

import * as matchers from "jest-jquery-matchers"
import { default as FilterArea } from "@/component/FilterArea"
import jQuery from "jquery"
global.jQuery = jQuery

describe("FilterArea", () => {
    describe("constructor", () => {
        it("正常に初期化される", () => {
            let filterArea = new FilterArea()

            expect(filterArea.$filterHeader).toEqual('<hr><h3 class="h4 mb-2">Filter by tags</h3>')
            expect(filterArea.$parentFilterDiv).toEqual(jQuery("div.col-md-3.mb-6.mb-md-0"))
            expect(filterArea.$filterDiv).toEqual(jQuery("<div>", { id: "octotag-filter" }))
            expect(filterArea.$octotagList).toEqual(jQuery("<ul>", { class: "octotag-taglist octotag-filtertaglist" }))
        })

        describe("#appendTagFilter", () => {
            beforeEach(() => {
                document.body.innerHTML = `
        <div class="col-md-3 mb-6 mb-md-0">
        </div>
        `

                jest.addMatchers(matchers)
            })

            it("「Filter by tags」エリアに「typescriptとrubyのタグが作成される」", () => {
                let filterArea = new FilterArea()

                filterArea.appendTagFilter(["typescript", "ruby"])
                expect(jQuery("div.col-md-3.mb-6.mb-md-0")).toHaveText(/Filter by tags/)
                expect(jQuery("input#octotag-filter-typescript")).toExist()
                expect(jQuery("input#octotag-filter-ruby")).toExist()
                expect(jQuery("label[for='octotag-filter-typescript']")).toHaveText(/typescript/)
                expect(jQuery("label[for='octotag-filter-ruby']")).toHaveText(/ruby/)
            })
        })
    })
})