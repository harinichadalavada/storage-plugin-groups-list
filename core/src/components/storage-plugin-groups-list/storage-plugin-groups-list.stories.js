// (C) Copyright 2023 Hewlett Packard Enterprise Development LP
import React from "react"
import { StoragePluginGroupsList } from "../../../dist"
import readme from "./readme.md"

export default {
  title: "Service Plugins/Storage Plugin Groups list",
  component: StoragePluginGroupsList,
  argTypes: {
    "associated-groups": {
      description: "Associated Groups information",
      type: { required: true },
    },
  },
  parameters: {
    markdown: readme,
    description:
      "Storage Plugin Groups List exists to provide developers a plugin to user an UI to to display the total number of associated groups and view them in DSCC UI Console.",
  },
}

const GroupsPanelList = ({ ...args }) => {
  return (
    <div>
      <storage-plugin-groups-list {...args}></storage-plugin-groups-list>
    </div>
  )
}

export const groupsPluginList = GroupsPanelList.bind({})

groupsPluginList.args = {
  "data-test-id": "TestID",
  "associated-groups":
    '[{ "name": "GroupA", "id": "21", "canDelete": true }, { "name": "GroupB", "id": "22", "canDelete": false },{ "name": "GroupC", "id": "23", "canDelete": false }]',
}
groupsPluginList.storyName = "Storage Plugin Groups List"

// '[{ "name": "A", "id": "1", "canDelete": true }, { "name": "a", "id": "2", "canDelete": false },{ "name": "Group3", "id": "3", "canDelete": false },{ "name": "group4", "id": "4", "canDelete": true },{ "name": "group5", "id": "5", "canDelete": false },{ "name": "group6", "id": "6", "canDelete": false },{ "name": "group7", "id": "7", "canDelete": true },{ "name": "group8", "id": "8", "canDelete": true },{ "name": "group9", "id": "9", "canDelete": true },{ "name": "group10", "id": "10", "canDelete": true },{ "name": "group11", "id": "11", "canDelete": false }, { "name": "SQL", "id": "12", "canDelete": true }, { "name": "group2", "id": "13", "canDelete": false },{ "name": "Group3", "id": "14", "canDelete": false },{ "name": "group4", "id": "15", "canDelete": true },{ "name": "group5", "id": "16", "canDelete": false },{ "name": "group6", "id": "17", "canDelete": false },{ "name": "group7", "id": "18", "canDelete": true },{ "name": "group8", "id": "19", "canDelete": true },{ "name": "group9", "id": "20", "canDelete": true },{ "name": "group10", "id": "21", "canDelete": true },{ "name": "group11", "id": "22", "canDelete": false }]',
