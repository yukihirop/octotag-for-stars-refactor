"use strict"

import * as func from "@/func"
import * as event from "@/event"
import jQuery from "jquery"
global.jQuery = jQuery

jest.mock("@/event")

let mockFilterAreaUl_LoadCheckedList = jest.fn()
jest.mock("@/component/FilterAreaUl", () => {
    return jest.fn().mockImplementation(() => {
        return { loadCheckedList: mockFilterAreaUl_LoadCheckedList }
    })
})

let mockTagUl_SaveAfterEdit = jest.fn()
jest.mock("@/component/TagUl", () => {
    return jest.fn().mockImplementation(() =>{
        return {
            saveAfterEdit: mockTagUl_SaveAfterEdit,
            tagData: jest.fn()
        }
    })
})

let mockRepoUl_GetRepoNameList = jest.fn()
let mockRepoUl_AppendRepoTags = jest.fn()
jest.mock("@/component/RepoUl", () => {
    return jest.fn().mockImplementation(() => {
        return {
            getRepoNameList: mockRepoUl_GetRepoNameList,
            appendRepoTags: mockRepoUl_AppendRepoTags
        }
    })
})

let mockStorage_resolveValue = {}
let mockStorage_SaveEditTagsValue = jest.fn(() => { return Promise.resolve(mockStorage_resolveValue) })
let mockStorage_Get = jest.fn(() => { return Promise.resolve() })
jest.mock("@/storage", () => {
    return jest.fn().mockImplementation(() => {
        return {
            saveEditTagsValue: mockStorage_SaveEditTagsValue,
            get: mockStorage_Get
        }
    })
})

describe("func", () => {
    describe("initialize", () => {
        it("「func.appendRepoTags」と「func.appendTagFilter」が呼ばれる", (done) => {
            expect.assertions(1)
            func.initialize().then(() => {
                expect(mockRepoUl_GetRepoNameList).toHaveBeenCalled()
                done()
            })
        })
    })

    describe("updateTagsInFilterArea", () => {
        it("「FilterAreaUl#loadCheckedList」と「event.addListenersForFilter」が呼ばれること", () => {
            expect.assertions(2)
            func.updateTagsInFilterArea({"/test/typescript": [], "/test/ruby": []})
            expect(mockFilterAreaUl_LoadCheckedList).toHaveBeenCalled()
            expect(event.addListenersForFilter).toHaveBeenCalled()
        })
    })

    describe("saveEditTagsValue", () => {
    /* Since jest can not mock an exported function of the same module, it can not test what was called */
    /* https://qiita.com/verytired/items/ad705afc41fc11312711 */

        // let mockFunc_UpdateTagsInFilterArea

        // beforeEach(() => {
        //   mockFunc_UpdateTagsInFilterArea = jest.spyOn(func, 'updateTagsInFilterArea').mockImplementation((data) => jest.fn())
        // })

        // afterEach(() => {
        //   mockFunc_UpdateTagsInFilterArea.mockReset()
        //   mockFunc_UpdateTagsInFilterArea.mockRestore()
        // })

        it("「TagUl#saveAfterEdit」と「Storage#saveEditTagsValue」が呼ばれる", (done) => {
            expect.assertions(2)
            func.saveEditTagsValue(jQuery("<input>"))
            expect(mockTagUl_SaveAfterEdit).toHaveBeenCalled()
            expect(mockStorage_SaveEditTagsValue).toHaveBeenCalled()
            // jestが同一moduleのexportされた関数をmockできないので呼ばれたことをテストできない
            // expect(func.updateTagsInFilterArea).toHaveBeenCalled(mockStorage_resolveValue)
            done()
        })
    })
})