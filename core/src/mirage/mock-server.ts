// (C) Copyright 2023 Hewlett Packard Enterprise Development LP
import { createServer, Server } from "miragejs"
import registerRoutes from "./routes/registerRoutes"
import { groupFactory, CreateGroup } from "./factories"
import { GroupModel } from "./models/groupModels"

export function makeServer({ environment = "development" } = {}) {
  const server: Server = createServer({
    environment,

    factories: {
      group: groupFactory,
    },

    models: {
      group: GroupModel,
    },

    seeds(_server) {
      _server.createList("group", 20)

      let newgroup = CreateGroup({
        associationCount: 0,
        lastModifiedUser: "john.doe@hpe.com",
        lastModifiedTime: new Date().getTime() / 1000,
        description: "GroupA",
        id: "21",
        name: "GroupA",
      })

      _server.create("group", newgroup)

      newgroup = CreateGroup({
        associationCount: 0,
        lastModifiedUser: "john.doe@hpe.com",
        lastModifiedTime: new Date().getTime() / 1000,
        description: "GroupB",
        id: "22",
        name: "GroupB",
      })
      _server.create("group", newgroup)

      newgroup = CreateGroup({
        associationCount: 0,
        lastModifiedUser: "john.doe@hpe.com",
        lastModifiedTime: new Date().getTime() / 1000,
        description: "GroupC",
        id: "23",
        name: "GroupC",
      })
      _server.create("group", newgroup)
    },
  })

  // logging: true, -- this will generate a ton of internal mirage messages
  // logging: false,
  // logging: undefined,
  server.logging = false
  registerRoutes(server)
  return server
}
