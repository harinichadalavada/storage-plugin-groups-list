// (C) Copyright 2023 Hewlett Packard Enterprise Development LP
import { faker } from "@faker-js/faker"

interface GroupDefaults {
  associationCount?: number
  lastModifiedUser?: string
  lastModifiedTime?: number
  description?: string
  name?: string
  id?: string
}

const CreateGroup = ({
  id = faker.datatype.uuid(),
  name = faker.company.name(),
  description = faker.random.words(Math.floor(Math.random() * 20) + 5),
  lastModifiedTime = faker.date.recent(90).getTime() / 1000,
  lastModifiedUser = faker.random.word().toLowerCase() + "@" + faker.random.word().toLowerCase() + ".com",
  associationCount = faker.datatype.number(220) + 1,
}: GroupDefaults = {}) => {
  return {
    id: id,
    name: name,
    description: description,
    lastModifiedTime: lastModifiedTime,
    lastModifiedUser: lastModifiedUser,
    associationCount: associationCount,
  }
}

export default CreateGroup
