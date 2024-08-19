// ***********************************************
// This example commands.js shows you how to
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

Cypress.Commands.add('highlight', { prevSubject: true }, (subject, color = 'red', duration = 1000) => {
    // Highlight the element
    cy.wrap(subject).should('be.visible').then(($el) => {
      const originalColor = $el.css('border-color');
      $el.css('border', `2px solid ${color}`);
      // Remove the highlight after the default duration
      cy.wait(duration);
      $el.css('border', `2px solid ${originalColor}`);
    });
  
    // Return the subject for chaining
    return subject;
  });
  