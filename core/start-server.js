// (C) Copyright 2023 Hewlett Packard Enterprise Development LP
import { makeServer } from "./src/mirage/mock-server"
import { Server, Response } from "miragejs"
import { Env } from "@stencil/core"

const useMirageServer = Env["PLUGIN_USE_MIRAGE_SERVER"] === "true"
const disableProxy = Env["PLUGIN_DISABLE_CYPRESS_ROUTES"] === "false"

export default function () {
  if (disableProxy) {
    console.info("[Groups List Plugin] Proxying Mirage Server through Cypress")
    const cyServer = new Server({
      environment: "test",
      routes() {
        ;["get", "put", "patch", "post", "delete"].forEach(method => {
          this[method]("/*", async (schema, request) => {
            const [status, headers, body] = await window.handleFromCypress(request)
            return new Response(status, headers, body)
          })
        })
      },
    })
    cyServer.logging = false
  }
  if (useMirageServer) {
    console.info("[Groups List Plugin] Using mock server based on environment flag.")
    makeServer({ environment: "Development" })
  } else {
    console.info("[Groups List Plugin] using API.")
  }
}
