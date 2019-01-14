"use strict"

import * as matchers from "jest-jquery-matchers"
import { default as TagUl } from "@/component/TagUl"
import jQuery from "jquery"
global.jQuery = jQuery

describe("TagUl", () => {
    beforeEach(() => {
        document.body.innerHTML = `
    <ul class="repo-list list-style-none js-navigation-container js-active-navigation-container">
      <li class="test-typescript">
        <div class="d-inline-block mb-1">
          <h3>
            <a href="/test/typescript" class="ghh-repo-x tooltipstered" style="box-shadow: transparent 0px 0px;">
            <span class="text-normal">test / </span>typescript</a>
          </h3>
        </div>
        <div class="octotag-repo">
          <button type="button" class="octotag-edit-button"><li class="fas fa-edit"></li><span>Edit tags</span></button>
          <span class="octotag-edit-hint octotag-hidden">Edit tags using comma to separate tags, and press the enter-key to store tags.</span>
          <input type="text" class="octotag-edit-input octotag-hidden" name="/test/typescript" data-before="typescript">
          <ul class="octotag-taglist">
          </ul>
        </div>
      </li>
      <li class="test-ruby">
        <div class="d-inline-block mb-1">
          <h3>
            <a href="/test/ruby" class="ghh-repo-x tooltipstered" style="box-shadow: transparent 0px 0px;">
            <span class="text-normal">test / </span>ruby</a>
          </h3>
        </div>
        <div class="octotag-repo">
          <button type="button" class="octotag-edit-button"><li class="fas fa-edit"></li><span>Edit tags</span></button>
          <span class="octotag-edit-hint octotag-hidden">Edit tags using comma to separate tags, and press the enter-key to store tags.</span>
          <input type="text" class="octotag-edit-input octotag-hidden" name="/test/ruby" data-before="typescript">
          <ul class="octotag-taglist">
          </ul>
        </div>
      </li>
    </ul>
    `

        jest.addMatchers(matchers)
    })

    describe("constructor", () => {
        it("正常に初期化される", () => {
            let $input = jQuery("li.test-typescript div.octotag-repo input")
            let tagUl = new TagUl($input)

            expect(tagUl.reponame).toEqual("/test/typescript")
            expect(tagUl.$targetInput).toEqual($input)
            expect(tagUl.$tagList).toEqual($input.nextAll(".octotag-taglist"))
            expect(tagUl.$editHint).toEqual($input.prevAll(".octotag-edit-hint"))
            expect(tagUl.$editButton).toEqual($input.prevAll(".octotag-edit-button"))
        })
    })

    describe("#saveAfterEdit",() => {
        it("入力欄に「typescript,test」と入力されたら「typescript」と「test」のタグが作成される", () => {
            let $input = jQuery("li.test-typescript div.octotag-repo input")
            let tagUl = new TagUl($input)

            jQuery($input).val("typescript, test")
            tagUl.saveAfterEdit()
            expect(jQuery("li.test-typescript div.octotag-repo ul.octotag-taglist")).toHaveHtml('<li>test</li><li>typescript</li>')
            expect(jQuery("li.test-ruby div.octotag-repo ul.octotag-taglist")).toExist()
        })

        it("入力欄とEditヒントが隠れて「Edit tags」ボタンが現れる", () => {
            let $input = jQuery("li.test-typescript div.octotag-repo input")
            let tagUl = new TagUl($input)

            tagUl.saveAfterEdit()
            expect(tagUl.$targetInput).toHaveClass("octotag-edit-input octotag-hidden")
            expect(tagUl.$editHint).toHaveClass("octotag-edit-hint octotag-hidden")
            expect(tagUl.$editButton).toHaveClass("octotag-edit-button")
            expect(tagUl.$editButton).toHaveText(/Edit tags/)
        })
    })

    describe("#tagData", () => {
        it("入力欄に「typescript,test」と入力されたら「typescript」と「test」を要素に持つデータが返る", () => {
            let $input = jQuery("li.test-typescript div.octotag-repo input")
            let tagUl = new TagUl($input)

            jQuery($input).val("typescript, test")
            expect(tagUl.tagData()).toEqual({"/test/typescript": ["test", "typescript"]})
        })
    })
})