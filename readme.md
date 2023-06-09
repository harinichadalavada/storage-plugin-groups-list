# Storage Plugin Groups List

## Getting Started

For a guide on how to get started, check out [Developing Plugins](./developing-plugins/developing-plugins.md)

## Description

This groups plugin list will be used by various microapps to display the total number of associated groups and allow the user to hover/click and open the popup with a limited number of groups. Clicking the view all opens a dialog showing the full filterable/pageable list of groups.

If you are using `nvm` you can install the currently supported version of node with:

```
# nvm install
# nvm use
```

This is a lerna repository, where `core` is a stencil based storage plugin groups list component and `framework-bindings/react` is the react wrapper for storage plugin groups list. You will need to install lerna to build the top level project.

```
# npm install -g lerna
```

## NPM Registry

TODO Delete
DSCC Plugins are currently published to an internal npm registry. Before installing or publishing any plugins, first make sure that your repo points to this registry. One way of achieving this is to include a `.npmrc` file within your repository and populate it with the URL of the Storage NPM registry:

```
// .npmrc
registry=https://artifactory.eng.nimblestorage.com/artifactory/api/npm/npm/
```

## Using this plugin

As a practice, we suggest leveraging the core stencil based storage plugin list as a reference to build new plugins and wrap it as a react component. The user will have to publish both the components, i.e, component within the core and framework-bindings. Since this is a lerna repo, the publish command will publish both the components.

### Installation (Stencil Based Component in folder core)

To leverage this plugin, you will need to install and save the core stencil based storage plugin groups list component as a `dependency` within your project:

```
npm install --save @storage/storage-plugin-groups-list
```

#### Usage

With the plugin installed, to use the plugin in your code, import the plugin at the top of your file and use the plugin directly in your markup:

TODO - discuss limits of base javascript plugin vs react

```javascript
import { defineCustomElements as storagePluginGroupsList } from '@storage/storage-plugin-groups-list/dist/loader';
storagePluginGroupsList()

render() {
  return (
    <>
      <storage-plugin-groups-list/>
    </>
  );
}
```

### Installation (React Wrapper Component)

To leverage the react wrapper for the plugin, you will need to install and save it as a `dependency` within your react application:

```
npm install --save @storage/react-storage-plugin-groups-list
```

### Usage

Import components from the package, directly:

```bash
import { StoragePluginGroupsList } from '@storage/react-storage-plugin-groups-list';
```

### Attributes

| Property     | Attribute      | Description                                   | Type     | Default           |
| ------------ | -------------- | --------------------------------------------- | -------- | ----------------- |
| `dataTestId` | `data-test-id` | Unique id to identify the element for testing | `string` | `default_test_id` |

---

### Events

#### Details about Events

To develop stencil based storage plugin groups list component, first clone this repo and install its dependencies:

```bash
git clone https://github.hpe.com/cloud/storage-plugin-groups-list.git
cd storage-plugin-groups-list/core
npm install
```

### Project layout

This Project layout has important key files/folders in storage plugin groups

```
├───core
│   │   start-server.js			-- file to start mirage on start of the dev server
│   │
│   ├───.storybook				-- storybook configuration for storybook-addon
│   │       main.js				-- controls the behavior of the Storybook server, needs to be updated to refer name of your plugin
│   │
│   ├───cypress					-- directory for cypress files
│   │
│   └───src
│       │   api-store.ts		-- JS Class for interacting with the API
│       │   components.d.ts		-- autogenerated file by the compiler which contains typing information for all components
│       │
│       ├───components			-- directory for storing project specific components
│       │   └───storage-plugin-groups-filter    -- directory for storing plugin files
│       │       ├── acceptance-test     -- cypress testcase directory for plugin groups
│       │       │   └── App.js
│       │       ├── readme.md                           -- autogenerated file based on storage-plugin-groups-list props and comments which are defined in the `.tsx` file
│       │       ├── storage-plugin-groups-list.css         -- css file for storage-plugin-groups-list
│       │       ├── storage-plugin-groups-list.stories.js  -- storybook/documentation file
│       │       └── storage-plugin-groups-list.tsx         -- actual source code for the plugin to be released
│       │
│       ├───constants					  -- directory for constant files
│       │       model.ts				  -- model for plugin details
│       │       test-selector-ids.js	  -- cypress test case ids
│       │
│       ├───i18n                        -- internationalization language files
│       │
│       ├───mirage			-- mirage server configuration used for mock endpoint testing
│       │
│       └───utils                       -- directory for utility files
│               i18n.ts                 -- configuration file for i18n
│
└───framework-bindings
    └───react                           -- react wrapper for plugin groups
        │
        └───src
                index.ts                -- component export file
```

### Development

To build storage plugin groups and start storybook locally in the core directory, run:

```bash
npm start
```

This will build storage plugin groups and start storybook.

To build locally, run:

```bash
npm run build
```

We recommend you to use [dscc-storage-styles](https://github.hpe.com/cloud/storage-styles) for styling the groups-plugin. It uses tailwind under hood and utilizes the [dscc-base-styles](https://github.hpe.com/cloud/dscc-base-styles) and [dscc-icons](https://github.hpe.com/cloud/dscc-icons) plugins to provide styling classes

### Unit testing

We use unit tests to test individual javascript function and libraries. We do not use it for testing user interaction with plugins. For that we leverage acceptance tests. Unit tests are written using [Jest](https://jestjs.io/docs/en/getting-started). At the moment, there are no unit tests to run. Jest unit tests should be mirror the tested code, be in the same directory and end in '.test.js'. To run the unit tests for the components, run:

```bash
npm test-unit
```

You also can watch tests to have them re-run when you make changes to make sure you do not break previous tests while developing with this command:

```bash
npm run test-unit.watch
```

### Acceptance testing

Acceptance tests are written using [Cypress](https://on.cypress.io/installing-cypress). Acceptance tests are our primary means for "unit" testing a customers interaction with our service plugins. These tests interact with the plugin within the browser. Interacting with the plugin typically involves also interacting with the API. The combination of which ultimately tests a unit of user flow.

To open the Cypress test runner, but not automatically run any tests, you can run:

```bash
npm run test:open
```

To open Cypress test runner and automatically run all tests within this project, you can run:

```bash
npm run test:run
```

### Mocking api calls

Mocking api data is done by using [Mirage](https://miragejs.com/). This mocking of API calls is useful for both development purposes as well as testing purposes. Mock data and rest endpoints should be added to the mirage mock-server.js, however, please refer to the Mirage documentation for additional usage information.

### Documentation and Development with Storybook

We leverage storybook, for both development as well as documentation of plugins. Storybook is integrated into this project using the internal [storybook plugin](https://github.hpe.com/cloud/storage-storybook-addon). See above for starting the development environment. For documentation, we leverage Github Pages within this repo. Additionally the content rendered within Github Pages is built using Storybook. To build this project for Github Pages, run:

```bash
npm run build-storybook
```

Note, you will want to perform this on the `gh-pages` branch, as that is where Github Pages looks for its content.

### Framework Bindings

The stencil plugin that you develop should be wrapped as react component by adding an additional react output target in stencil config file(`core/stencil.config.ts`). This output target will emit a react component library, just like if your components were originally written using react framework. Here, `core` is a stencil based storage plugin groups component and `framework-bindings/react` is the React component wrapper which will be generated.

### Stencil Config Setup for React Library

1. Install React output target in stencil plugin that you are developing.

```bash
npm install @stencil/react-output-target --save-dev
```

2. Next, open `stencil.config.ts` then add React to the output target list:

```javascript
import { Config } from "@stencil/core";
import { reactOutputTarget } from "@stencil/react-output-target";

export const config: Config = {
  namespace: "demo",
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: "@storage/storage-plugin-groups-list",
      proxiesFile: "../framework-bindings/react/src/components.ts",
      includeDefineCustomElements: true,
    }),
  ],
};
```

3. _Proxies File_ is the output file that gets generated by the outputTarget. During a Stencil build, a React package is created that exports all components defined in this file.

4. With React support configured, run `npm run build` to create the Stencil React bindings. You'll see the newly generated files in framework-binding/react's dist folder.

5. Final step is to create export file (index.ts) in `framework-bindings/react/src` folder.

```javascript
export * from "./components";
export type {
  associatedResource,
  taskDetails,
} from "@storage/storage-plugin-groups-list";
```

### Publishing this plugin

```bash
npm run publish
```

This command will build and publish your stencil based storage plugin groups list component and respective react component wrapper to npm registry. Before publishing, make sure that service plugin builds are in place.
