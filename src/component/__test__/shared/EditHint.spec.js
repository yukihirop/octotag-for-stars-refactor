"use strict"

import * as matchers from "jest-jquery-matchers"
import { default as EditHint } from "@/component/shared/EditHint"
import jQuery from "jquery"
global.jQuery = jQuery

describe("EditHint", () => {
    beforeEach(() => {
        jest.addMatchers(matchers)
    })

    describe("constructor", () => {
        it("正常に初期化される", () => {
            let editHint = new EditHint()

            expect(editHint.selector).toEqual(jQuery(".octotag-edit-input"))
        })
    })

    describe("#create", () => {
        it("EditヒントがcreateSelectorプロパティに設定される", () => {
            let editHint = new EditHint()
            editHint.create()
            expect(editHint.createSelector).toHaveText("Edit tags using comma to separate tags, and press the enter-key to store tags.")
        })
    })
})
