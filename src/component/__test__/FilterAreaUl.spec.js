"use strict"

import * as matchers from "jest-jquery-matchers"
import { default as FilterAreaUl } from "@/component/FilterAreaUl"
import jQuery from "jquery"
global.jQuery = jQuery

describe("FilterAreaUl", () => {
    beforeEach(() => {
        jest.addMatchers(matchers)
    })

    describe("constructor", () => {
        it("正常に初期化される", () => {
            let filterAreaUl = new FilterAreaUl({})

            expect(filterAreaUl.data).toEqual({})
            expect(filterAreaUl.$octotagUl).toEqual(jQuery("ul.octotag-taglist.octotag-filtertaglist"))
            expect(filterAreaUl.$octotagFilterAreaUl).toEqual(jQuery(".octotag-filtertaglist"))
            expect(filterAreaUl.$octotagFilterLi).toEqual(jQuery(".octotag-taglist.octotag-filtertaglist input"))
        })
    })

    describe("loadCheckedList", () => {
        beforeEach(() => {
            document.body.innerHTML = `
      <div class="col-md-3 mb-6 mb-md-0">
      <hr>
        <h3 class="h4 mb-2">Filter by tags</h3>
        <div id="octotag-filter">
          <ul class="octotag-taglist octotag-filtertaglist">
          </ul>
        </div>
      </div>
      `
        })

        it("「typescriptとruby」のタグが「Filter by tags」エリアに作成される", () => {
            let filterAreaUl = new FilterAreaUl({ "/test/typescript": ["typescript"], "/test/ruby": ["ruby"]})

            filterAreaUl.loadCheckedList()
            expect(jQuery("input#octotag-filter-typescript")).toExist()
            expect(jQuery("input#octotag-filter-ruby")).toExist()
        })
    })
})