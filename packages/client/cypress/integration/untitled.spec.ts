// untitled.spec.ts created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/* ==== Test Created with Cypress Studio ==== */
it('test stuff', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('http://localhost:3000/');
  cy.get(':nth-child(3) > .menu__link > .menu__svg').click();
  cy.get(':nth-child(1) > :nth-child(2) > .menu__link > .menu__svg').click();
  cy.get('.fd > .btn').click();
  cy.get('.fd__more > :nth-child(3)').click();
  cy.get('#\\33 MF').uncheck();
  cy.get('#gcode').check();
  /* ==== End Cypress Studio ==== */
});
