// (C) Copyright 2023 Hewlett Packard Enterprise Development LP
import { Server } from "miragejs"
import { processCollectionRequest } from "../utils"
import { API_VERSION_PATH } from "../../../src/constants/apiversion"

export function registerRoutes(context: Server) {
  return [
    (context.namespace = API_VERSION_PATH),
    context.get("/groups", (schema, request) => {
      const processedCollection = processCollectionRequest(schema, request, "groups")
      return processedCollection
    }),
    // context.get("/associations", (schema, request) => {
    //   //@ts-ignore
    //   const processedCollection = schema.associations.all()
    //   // TODO handle filtering and page usage
    //   return processedCollection
    // }),

    //
    //   context.get("/groups", function (schema, request) {
    //     let res = processCollectionRequest(schema, request, "tasks", this)
    //     // res.items.forEach(e => {
    //     //   ;["associatedResourceId", "associatedResourceName", "associatedResourceType"].forEach(p => delete e[p])
    //     //   e.progressPercent = e.healthStatus === "Success" ? 100 : e.progressPercent
    //     // })
    //     return res
    //   })
    //

    context.passthrough("https://app.launchdarkly.com/sdk/*"),
    context.passthrough("https://clientstream.launchdarkly.com/eval/*"),
    context.passthrough("https://events.launchdarkly.com/*"),
    // this.passthrough("https://events.launchdarkly.com/events/diagnostic/*")
    // this.passthrough("https://events.launchdarkly.com/events/bulk/*")
  ]
}

export default registerRoutes
