// (C) Copyright 2023 Hewlett Packard Enterprise Development LP
export interface chipInfo {
  id: string
  name: string
  canDelete: boolean
}

export interface chipDetails {
  associatedTagIds: Array<string>
}

export interface associatedResource {
  associatedResourceName: string
  associatedResourceType: string
  associatedResourceId: string
  associatedResourceConsoleURL: string
  associatedResourceObjectURL: string
}

export const defaultLimit = 6
