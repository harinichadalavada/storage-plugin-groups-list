// (C) Copyright 2023 Hewlett Packard Enterprise Development LP
module.exports = {
  core: {
    builder: "webpack5",
    disableTelemetry: true,
  },
  stories: ["../src/components/storage-plugin-groups-list/storage-plugin-groups-list.stories.js"],
  addons: ["@storybook/addon-essentials", "@storage/storybook-addon"],
}
