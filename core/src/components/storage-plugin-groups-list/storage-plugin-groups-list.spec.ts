// (C) Copyright 2023 Hewlett Packard Enterprise Development LP
import { newSpecPage } from "@stencil/core/testing"
import { StoragePluginGroupsList } from "./storage-plugin-groups-list"

function setupFetchStub(data) {
  return function fetchStub(_url) {
    return new Promise(resolve => {
      resolve({
        json: () =>
          Promise.resolve({
            data,
          }),
      })
    })
  }
}

describe("sample test", () => {
  let testArgs = {
    "associated-groups":
      '[{ "name": "GroupA", "id": "21", "canDelete": true }, { "name": "GroupB", "id": "22", "canDelete": false }, {"name": "GroupC", "id": "23", "canDelete": false }]',
    "data-test-id": "TestID",
  }

  it("should build", async () => {
    let comp = new StoragePluginGroupsList()
    comp.dataTestId = testArgs["data-test-id"]

    // @ts-ignore 2345
    jest.spyOn(global, "fetch").mockImplementation(setupFetchStub({}))
    // let res = await comp.getGroups("Group")
    // expect(fetch).toBeCalled()

    // // expect(fetch).toBeCalled()
    // console.log("What is result:" + res)
  })

  it("sample-test", async () => {
    const page = await newSpecPage({
      components: [StoragePluginGroupsList],
      html: `<storage-plugin-groups-list selected-groups='${testArgs["selected-groups"]}'></storage-plugin-groups>`,
    })

    expect(page.root.nodeName).toBe("STORAGE-PLUGIN-GROUPS-LIST")
    // const v1 = page.root.querySelector("STORAGE-PLUGIN-CHIPS")
  })
})
