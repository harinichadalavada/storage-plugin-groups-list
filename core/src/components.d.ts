/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface StoragePluginGroupsList {
        /**
          * Array for rendering associated groups
         */
        "associatedGroups": string;
        /**
          * unique id
         */
        "dataTestId": string;
    }
}
declare global {
    interface HTMLStoragePluginGroupsListElement extends Components.StoragePluginGroupsList, HTMLStencilElement {
    }
    var HTMLStoragePluginGroupsListElement: {
        prototype: HTMLStoragePluginGroupsListElement;
        new (): HTMLStoragePluginGroupsListElement;
    };
    interface HTMLElementTagNameMap {
        "storage-plugin-groups-list": HTMLStoragePluginGroupsListElement;
    }
}
declare namespace LocalJSX {
    interface StoragePluginGroupsList {
        /**
          * Array for rendering associated groups
         */
        "associatedGroups"?: string;
        /**
          * unique id
         */
        "dataTestId"?: string;
    }
    interface IntrinsicElements {
        "storage-plugin-groups-list": StoragePluginGroupsList;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "storage-plugin-groups-list": LocalJSX.StoragePluginGroupsList & JSXBase.HTMLAttributes<HTMLStoragePluginGroupsListElement>;
        }
    }
}