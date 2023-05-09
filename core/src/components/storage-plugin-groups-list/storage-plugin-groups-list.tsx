// (C) Copyright 2023 Hewlett Packard Enterprise Development LP
import { Component, h, Prop } from "@stencil/core"

@Component({
  tag: "storage-plugin-groups-list",
  styleUrl: "storage-plugin-groups-list.css",
  scoped: true,
})
export class StoragePluginGroupsList {
  /**
   * unique id
   */
  @Prop() dataTestId: string = "default_test_id"
  /**
   * Array for rendering associated groups
   */
  @Prop({ reflect: true }) associatedGroups: string

  componentWillLoad(): void {}

  render() {
    return (
      //TODO: revisit so that whichever app uses the plugin can customize the height
      <div data-testid={this.dataTestId} class="h-full w-full storage-plugin-group-list">
        Hello World
      </div>
    )
  }
}
