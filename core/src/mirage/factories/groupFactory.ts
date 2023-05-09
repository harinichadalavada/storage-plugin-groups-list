// (C) Copyright 2023 Hewlett Packard Enterprise Development LP
import { Factory } from "miragejs"
import { faker } from "@faker-js/faker"

export const groupFactory = Factory.extend({
  id(i): string {
    //return faker.datatype.uuid()
    return i + ""
  },
  name(): string {
    const name = faker.company.name()
    // replace non-alphanumeric characters with '1' to prevent test collision
    // const name = faker.random.word().replace("/[^a-zA-Z0-9]+/g", "1")
    return name
  },
  description(): string {
    return faker.random.words(Math.floor(Math.random() * 20) + 5)
  },
  lastModifiedTime(): number {
    return faker.date.recent(90).getTime() / 1000
  },
  lastModifiedUser(): string {
    return faker.random.word().toLowerCase() + "@" + faker.random.word().toLowerCase() + ".com"
  },
  associationCount(): number {
    return faker.datatype.number(220) + 1
  },

  // @ts-ignore
  // afterCreate(group, server: Server) {
  // },
})

export default groupFactory
