"use strict"

import * as matchers from "jest-jquery-matchers"
import { default as EditInput } from "@/component/shared/EditInput"
import * as func from "@/func"
import jQuery from "jquery"
global.jQuery = jQuery

let mockSaveEditTagsValue

describe("EditInput", () => {
    beforeEach(() => {
        jest.addMatchers(matchers)
    })

    describe("constructor", () => {
        it("正常に初期化される", () => {
            let editInput = new EditInput("test-repo")

            expect(editInput.reponame).toEqual("test-repo")
            expect(editInput.selector).toEqual(jQuery(".octotag-edit-input"))
        })
    })

    describe("#create", () => {
        it("タグの入力欄のセレクタがcreateSelectorプロパティに設定される", () => {
            let editInput = new EditInput("test-repo")
            editInput.create()
            expect(editInput.createSelector).toBeMatchedBy("input")
        })
    })

    describe("#onBlur", () => {
        beforeEach(() => {
            document.body.innerHTML = `
      <button type="button" class="octotag-edit-button octotag-hidden">
        <li class="fas fa-edit"></li><span>Edit tags</span>
      </button>
      <span class="octotag-edit-hint">Edit tags using comma to separate tags, and press the enter-key to store tags.</span>
      <input type="text" class="octotag-edit-input" name="/test/test-repo" data-before="">
      <ul class="octotag-taglist"></ul>
      `
        })

        it("入力欄が隠れて、「Edit tags」ボタンが表示されること", () => {
            let editInput = new EditInput("test-repo")
            editInput.onBlur()
            jQuery(".octotag-edit-input").blur()
            expect(jQuery(".octotag-edit-input")).toHaveClass("octotag-edit-input octotag-hidden")
            expect(jQuery(".octotag-edit-hint")).toHaveClass("octotag-edit-hint octotag-hidden")
            expect(jQuery(".octotag-edit-button")).toHaveClass("octotag-edit-button")
        })
    })

    describe("#onKeyPress", () => {
        beforeEach(() => {
            document.body.innerHTML = `
      <button type="button" class="octotag-edit-button octotag-hidden">
        <li class="fas fa-edit"></li><span>Edit tags</span>
      </button>
      <span class="octotag-edit-hint">Edit tags using comma to separate tags, and press the enter-key to store tags.</span>
      <input type="text" class="octotag-edit-input" name="/test/test-repo" data-before="">
      <ul class="octotag-taglist"></ul>
      `
        })

        beforeEach(() => {
            // https://medium.com/@akameco/jest%E3%81%A7console-log%E3%82%92%E3%83%A2%E3%83%83%E3%82%AF%E3%81%99%E3%82%8B-fd6cd61bf926
            mockSaveEditTagsValue = jest.spyOn(func, 'saveEditTagsValue').mockImplementation(() => jest.fn())
        })

        afterEach(() => {
            mockSaveEditTagsValue.mockReset()
            mockSaveEditTagsValue.mockRestore()
        })

        describe("入力欄でEnterを押したら", () => {
            it("func.saveEditTagsValueが呼ばれる", () => {
                let editInput = new EditInput("test-repo")
                editInput.onKeyPress()

                jQuery(".octotag-edit-input").focus()

                var enterKey = 13
                var event = jQuery.Event('keypress')
                event.which = enterKey
                jQuery(".octotag-edit-input").trigger(event)

                expect(func.saveEditTagsValue).toHaveBeenCalled()
            })
        })

        describe("その他が押されたら", () => {
            it("func.saveEditTagsValueは呼ばれない", () => {
                let editInput = new EditInput("test-repo")
                editInput.onKeyPress()

                jQuery(".octotag-edit-input").focus()

                var enterKey = 14
                var event = jQuery.Event('keypress')
                event.which = enterKey
                jQuery(".octotag-edit-input").trigger(event)

                expect(func.saveEditTagsValue).not.toHaveBeenCalled()
            })
        })
    })
})