"use strict"

import * as matchers from "jest-jquery-matchers"
import { default as EditButton } from "@/component/shared/EditButton"
import jQuery from "jquery"
global.jQuery = jQuery

describe("EditButton", () => {
    beforeEach(() => {
        jest.addMatchers(matchers)
    })

    describe("constructor", () => {
        it("正常に初期化される", () => {
            let editButton = new EditButton("test-repo")

            expect(editButton.reponame).toEqual("test-repo")
            expect(editButton.selector).toEqual(jQuery(".octotag-edit-button"))
        })
    })

    describe("#create", () => {
        it("「Edit tags」ボタンがcreateSelectorプロパティに設定される", () => {
            let editButton = new EditButton("test-repo")
            editButton.create()
            expect(editButton.createSelector).toHaveText("Edit tags")
        })
    })

    describe("#onClick", () => {
        beforeEach(() => {
            document.body.innerHTML = `
      <button type="button" class="octotag-edit-button">
        <li class="fas fa-edit"></li><span>Edit tags</span>
      </button>
      <span class="octotag-edit-hint octotag-hidden">Edit tags using comma to separate tags, and press the enter-key to store tags.</span>
      <input type="text" class="octotag-edit-input octotag-hidden" name="/test/test-repo" data-before="">
      <ul class="octotag-taglist"></ul>
      `
        })

        it("Editヒントとタグ入力欄が表示され、入力欄がフォーカスされる", () => {
            let editButton = new EditButton("test-repo")
            editButton.onClick()
            jQuery(".octotag-edit-button").click()
            expect(jQuery(".octotag-edit-button")).toHaveClass("octotag-edit-button octotag-hidden")
            expect(jQuery(".octotag-edit-hint")).not.toHaveClass(".octotag-hidden")
            expect(jQuery(".octotag-edit-input")).toHaveClass("octotag-edit-input")
            expect(jQuery(".octotag-edit-input")).toBeFocused()
        })
    })
})