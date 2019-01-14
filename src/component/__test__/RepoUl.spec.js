"use strict"

import * as matchers from "jest-jquery-matchers"
import { default as RepoUl } from "@/component/RepoUl"
import jQuery from "jquery"
global.jQuery = jQuery

describe("RepoUl", () => {
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
            <li>typescript</li>
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
            <li>ruby</li>
          </ul>
        </div>
      </li>
    </ul>
    `

        jest.addMatchers(matchers)
    })

    describe("constructor", () => {
        it("正常に初期化される", () => {
            let repoUl = new RepoUl({}, [])

            expect(repoUl.$repoUl).toEqual(jQuery("ul.repo-list"))
            expect(repoUl.$repoAnchors).toEqual(jQuery("ul.repo-list").find("h3 a"))
            expect(repoUl.$repoList).toEqual(jQuery("ul.repo-list").children("li"))
            expect(repoUl.tagData).toEqual({})
            expect(repoUl.tagArray).toEqual([])
            expect(repoUl.isShowAll).toEqual(true)
        })
    })

    describe("#filterByTags", () => {
        it("rubyのタグをもつリポジトリだけ残る", () => {
            let repoUl = new RepoUl({},["ruby"])

            repoUl.filterByTags()
            expect(jQuery("li.test-typescript")).toHaveClass("test-typescript octotag-hidden")
            expect(jQuery("li.test-ruby")).toHaveClass("test-ruby")
        })
    })

    describe("#appendRepoTags", () => {
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
        </li>
        <li class="test-ruby">
          <div class="d-inline-block mb-1">
            <h3>
              <a href="/test/ruby" class="ghh-repo-x tooltipstered" style="box-shadow: transparent 0px 0px;">
              <span class="text-normal">test / </span>ruby</a>
            </h3>
          </div>
        </li>
      </ul>
      `
        })
    
        it("test/rubyリポジトリにrubyというタグが付く", () => {
            let repoUl = new RepoUl({ "/test/typescript": [], "/test/ruby": ["ruby"]}, [])

            repoUl.appendRepoTags()
            expect(jQuery("li.test-typescript")).toHaveHtml('<ul class="octotag-taglist"></ul>')
            expect(jQuery("li.test-ruby")).toHaveHtml('<ul class="octotag-taglist"><li>ruby</li></ul>')
        })

        it("「Edit tags」ボタンが各リポジトリに表示される", () => {
            let repoUl = new RepoUl({"/test/typescript": [], "/test/ruby": []},[])

            repoUl.appendRepoTags()
            expect(jQuery("li.test-typescript")).toHaveText(/Edit tags/)
            expect(jQuery("li.test-typescript")).toHaveText(/Edit tags using comma to separate tags, and press the enter-key to store tags./)
            expect(jQuery("li.test-typescript button")).toHaveClass("octotag-edit-button")
            expect(jQuery("li.test-typescript span")).toHaveClass("octotag-edit-hint octotag-hidden")

            expect(jQuery("li.test-ruby")).toHaveText(/Edit tags/)
            expect(jQuery("li.test-ruby")).toHaveText(/Edit tags using comma to separate tags, and press the enter-key to store tags./)
            expect(jQuery("li.test-ruby button")).toHaveClass("octotag-edit-button")
            expect(jQuery("li.test-ruby span")).toHaveClass("octotag-edit-hint octotag-hidden")
        })
    })

    describe("#getRepoNameList", () => {
        it("「/test/typescript」と「/test/ruby」を配列で得る", () => {
            let repoUl = new RepoUl({},[])

            expect(repoUl.getRepoNameList()).toEqual(["/test/typescript", "/test/ruby"])
        })
    })
})