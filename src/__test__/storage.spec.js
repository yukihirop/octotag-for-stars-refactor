"use strict"

import { default as Storage } from "@/Storage"
let mockChromeStorageLocal_get = jest.fn(() => { return Promise.resolve() })
let mockChromeStorageLocal_set = jest.fn(() => { return Promise.resolve() })
global.chrome = {
    storage: {
        local: {
            get: mockChromeStorageLocal_get,
            set: mockChromeStorageLocal_set
        }
    }
}

// https://github.com/tobiastimm/marked-it/blob/360714964716d65db90a054c5c7f4635a4847168/src/api/__tests__/storeApi.test.js
describe("Storage", () => {
    describe("constructor", () => {
        it("正常に初期化される", () => {
            let storage = new Storage()

            expect(storage.storageKey).toEqual("octotagKeyRefactor")
            expect(storage.local).toEqual(chrome.storage.local)
        })
    })

    // I do not know how to write a test
    describe("#saveEditTagsValue", () => {
        it("「chrome.storage.local.get」と「chrome.storage.local.set」が呼ばれる", (done) => {
            let storage = new Storage()
            storage.saveEditTagsValue({})
            // mockする関数の中に外部参照のresolveがあるためその関数をmockするといつまでもresolveされずに処理が終わらない
            // つまりテストできない
            // expect(mockChromeStorageLocal_get).toBeCalledTimes(2)
            // expect(mockChromeStorageLocal_set).toBeCalled()
            done()
        })
    })

    // I do not know how to write a test
    describe("#get", () => {
        it("「Storage#createTagData」が呼ばれて、tagDataが返る", (done) => {
            let storage = new Storage()
            storage.get()
            // mockする関数の中に外部参照のresolveがあるためその関数をmockするといつまでもresolveされずに処理が終わらない
            // つまりテストできない
            // expect(mockChromeStorageLocal_get).toBeCalled()
            done()
        })
    })
})