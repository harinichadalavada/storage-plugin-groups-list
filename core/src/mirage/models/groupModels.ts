// (C) Copyright 2023 Hewlett Packard Enterprise Development LP
// import { belongsTo, hasMany, Model, Registry } from "miragejs"
import { Model } from "miragejs"
import { ModelDefinition } from "miragejs/-types"
// import Schema from "miragejs/orm/schema"

export interface Group {
  associationCount: number
  lastModifiedUser: string
  lastModifiedTime: number
  description: string
  name: string
  id: string
}

export const GroupModel: ModelDefinition<Group> = Model.extend({})

export const mockModels = {
  group: GroupModel,
}
