// (C) Copyright 2023 Hewlett Packard Enterprise Development LP
import { Config } from "@stencil/core"
import { postcss } from "@stencil/postcss"
import { reactOutputTarget } from "@stencil/react-output-target"
import autoprefixer from "autoprefixer"
import replace from "postcss-replace"
import { inlineSvg } from "stencil-inline-svg"
import storageStyles from "@storage/dscc-storage-styles"
import purgecss from "@fullhuman/postcss-purgecss"

// purge function to keep only the classes used in EACH component
const purge = purgecss({
  content: ["./src/**/*.tsx", "./src/**/*.css", "./src/**/*.ts"],
  safelist: [":host", "icon-success", "icon-warning", "icon-lock"],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
})

// To enable mocking update the 'build' and 'watch' targets in package.json to include this flag.
const enableMock: boolean = process.argv && process.argv.indexOf("--enableMock") > -1

export const config: Config = {
  namespace: "storage-plugin-groups-list",
  globalScript: "./start-server",
  env: {
    PLUGIN_DISABLE_CYPRESS_ROUTES: enableMock ? "false" : "true",
    PLUGIN_USE_MIRAGE_SERVER: enableMock ? "true" : "false",
  },
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: "@storage/storage-plugin-groups-list",
      //excludeComponents: ["storage-plugin-chips", "storage-chips-panel"],
      // proxiesFile target would need to be changed to package the react lib in CI or wherever
      proxiesFile: "../framework-bindings/react/src/components.ts",
      includeDefineCustomElements: true,
      includePolyfills: false,
    }),
    {
      type: "dist",
      copy: [
        {
          src: "i18n/*.ts",
          dest: "../esm/i18n",
        },
      ],
    },
    {
      type: "docs-readme",
      dependencies: false,
      footer: "", // To remove footer from auto generated readme file
      strict: true, //
    },
    {
      type: "www",
      copy: [
        {
          src: "i18n/*.ts",
          dest: "build/i18n",
        },
      ],
    },
  ],

  // jest config
  // testing: {
  //   transform: {
  //     ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
  //   },
  // },
  testing: {
    browserHeadless: true,
    browserExecutablePath: "/snap/bin/chromium",
    modulePathIgnorePatterns: ["cypress/support/*"],
  },

  devServer: {
    reloadStrategy: "pageReload",
    port: 3434,
    openBrowser: false,
  },

  plugins: [
    inlineSvg(),
    postcss({
      // Add postcss plugins
      plugins: [
        storageStyles,
        autoprefixer(),
        // Shadow dom does not respect 'html' and 'body' styling, so we replace it with ':host' instead
        replace({ pattern: "html", data: { replaceAll: ":host" } }),
        // purge and cssnano if production build
        //...(process.argv.includes("--purge") ? [purge, cssnano()] : []),
      ],
    }),
  ],
}
