// (C) Copyright 2023 Hewlett Packard Enterprise Development LP
import packageJson from "../package.json"

import { defineCustomElements } from "../dist/loader"
defineCustomElements()

export const parameters = {
  packageJson: {
    baseUrl: packageJson?.repository?.url,
    name: packageJson?.name,
    version: packageJson?.version,
  },
  isMonoRepo: false,
  isDevDependency: false,
}
