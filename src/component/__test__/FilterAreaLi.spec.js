"use strict"

import * as matchers from "jest-jquery-matchers"
import { default as FilterAreaLi } from "@/component/FilterAreaLi"
import jQuery from "jquery"
global.jQuery = jQuery

// https://stackoverflow.com/questions/47402005/jest-mock-how-to-mock-es6-class-default-import-using-factory-parameter
let mockFilterByTags = jest.fn()
jest.mock("@/component/RepoUl", () => {
    return jest.fn().mockImplementation(() => {
        return { filterByTags: mockFilterByTags }
    })
})

describe("FilterAreaLi", () => {

    beforeEach(() => {
        jest.addMatchers(matchers)
    })

    describe("constructor", () => {
        it("正常に初期化される", () => {
            let filterAreaLi = new FilterAreaLi("test")

            expect(filterAreaLi.tagname).toEqual("test")
            expect(filterAreaLi.selector).toEqual(jQuery(".octotag-taglist.octotag-filtertaglist input"))
            expect(filterAreaLi.$list).toEqual(jQuery(".octotag-taglist.octotag-filtertaglist input").parents("li"))
        })
    })

    describe("#create", () => {
        it("testというタグがcreateSelectorプロパティに設定される", () => {
            let filterAreaLi = new FilterAreaLi("test")

            filterAreaLi.create()
            expect(filterAreaLi.createSelector).toHaveText(/test/)
        })
    })

    describe("#onClickInput", () => {
        beforeEach(() => {
            document.body.innerHTML = `
      <div class="col-md-3 mb-6 mb-md-0">
      <hr>
        <h3 class="h4 mb-2">Filter by tags</h3>
        <div id="octotag-filter">
          <ul class="octotag-taglist octotag-filtertaglist">
            <li>
              <input type="checkbox" id="octotag-filter-javascript" value="javascript">
              <label for="octotag-filter-javascript">javascript</label>
            </li>
            <li>
              <input type="checkbox" id="octotag-filter-typescript" value="typescript">
              <label for="octotag-filter-typescript">typescript</label>
            </li>
          </ul>
        </div>
      </div>
      `
        })

        it("javascriptタグをクリックした時にタグのチェック状態が変わる", () => {
            let filterAreaLi = new FilterAreaLi("javascript")

            filterAreaLi.onClickInput()
            jQuery("input#octotag-filter-javascript").click()
            expect(jQuery("input#octotag-filter-javascript").parent("li")).toHaveClass("checked")
        })

        it("javascriptタグをクリックした時に「repoUl.filterByTags」が呼ばれる", () => {
            let filterAreaLi = new FilterAreaLi("javascript")

            filterAreaLi.onClickInput()
            jQuery("input#octotag-filter-javascript").click()
            expect(mockFilterByTags).toHaveBeenCalled()
        })
    })
})