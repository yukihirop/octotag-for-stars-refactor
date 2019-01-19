"use strict"

import * as event from "@/event"

let mockEditButton_onClick = jest.fn()
jest.mock("@/component/shared/EditButton", () => {
    return jest.fn().mockImplementation(() => {
        return {
            onClick: mockEditButton_onClick
        }
    })
})

let mockEditInput_onBlur = jest.fn()
let mockEditInput_onKeyPress = jest.fn()
jest.mock("@/component/shared/EditInput", () => {
    return jest.fn().mockImplementation(() => {
        return {
            onBlur: mockEditInput_onBlur,
            onKeyPress: mockEditInput_onKeyPress
        }
    })
})

let mockFilterAreaLi_onClickInput = jest.fn()
jest.mock("@/component/FilterAreaLi", () => {
    return jest.fn().mockImplementation(() => {
        return {
            onClickInput: mockFilterAreaLi_onClickInput
        }
    })
})

describe("event", () => {
    describe("addListenersForRepo", () => {
        it("各イベントが登録される", () => {
            event.addListenersForRepo()

            expect(mockEditButton_onClick).toHaveBeenCalledTimes(1)
            expect(mockEditInput_onBlur).toHaveBeenCalledTimes(1)
            expect(mockEditInput_onKeyPress).toHaveBeenCalledTimes(1)
        })
    })

    describe("addListenersForFilter", () => {
        it("各イベントが登録される", () => {
            event.addListenersForFilter()

            expect(mockFilterAreaLi_onClickInput).toHaveBeenCalledTimes(1)
        })
    })
})