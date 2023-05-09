// (C) Copyright 2023 Hewlett Packard Enterprise Development LP
// @ts-nocheck
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import "@testing-library/cypress/add-commands"
import { configure } from "@testing-library/cypress"

// CURO components use 'data-test-id' instead of 'data-testid' so override here
configure({ testIdAttribute: "data-test-id" })

// Cypress.Commands.add("getPluginContentSectionHeading", () => {
//   return cy
//     .get("storage-plugin-reference")
//     .shadow()
//     .findByTestId("reference-plugin")
//     .findByTestId(referencePluginSelector.refPluginContentSection)
//     .findByTestId("col2")
//     .findByTestId("reference-plugin-column-one")
// })
