// (C) Copyright 2023 Hewlett Packard Enterprise Development LP
import { newE2EPage } from "@stencil/core/testing"

describe("Test basic plugin features", () => {
  let testArgs = {
    "associated-groups":
      '[{ "name": "GroupA", "id": "21", "canDelete": true }, { "name": "GroupB", "id": "22", "canDelete": false }, {"name": "GroupC", "id": "23", "canDelete": false }]',
    "data-test-id": "TestID",
  }

  it("Tests default layout of components", async () => {
    const page = await newE2EPage()
    await page.setContent(`<storage-plugin-groups-list data-test-id='${testArgs["data-test-id"]}' associated-groups='${testArgs["associated-groups"]}'></storage-plugin-groups>`)
    // page.waitForChanges()
    const el = await page.find("storage-plugin-groups-list")
    expect(el).not.toBeNull()
    // find the top level component
    expect(el.getAttribute("data-test-id")).toBe("TestID")
  })

  it("Tests readonly layout of plugin", async () => {
    const page = await newE2EPage()
    await page.setContent(`<storage-plugin-groups-list  associated-groups='${testArgs["associated-groups"]}'></storage-plugin-groups>`)

    const el = await page.find("storage-plugin-groups-list")
    console.log(el.outerHTML)
    expect(el).not.toBeNull()
  })

  it("Tests delete", async () => {
    const page = await newE2EPage()
    await page.setContent(`<storage-plugin-groups-list associated-groups='${testArgs["associated-groups"]}'></storage-plugin-groups-list>`)

    const el = await page.find("storage-plugin-groups-list")
    console.log(el.outerHTML)
    expect(el).not.toBeNull()
  })

  it("Tests search", async () => {
    const page = await newE2EPage()
    await page.setContent(`<storage-plugin-groups-list associated-groups='${testArgs["associated-groups"]}'></storage-plugin-groups-list>`)

    const el = await page.find("storage-plugin-groups-list")
    console.log(el.outerHTML)
    expect(el).not.toBeNull()

    // find the input control
    const iel = await page.find("input")
    //  expect(iel.getAttribute("data-testid")).toBe("TestID_input")
    iel.press("G")
    iel.press("r")
    iel.press("o")
    await page.waitForChanges()
    const el2 = await page.find("storage-plugin-groups-list")
    console.log(el2.outerHTML)
  })
})
