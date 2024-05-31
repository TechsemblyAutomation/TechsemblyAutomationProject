import 'cypress-iframe';

// Custom command to fill in Stripe card details
Cypress.Commands.add('fillStripeCard', ({ cardNumber, expDate, cvc }) => {
  // Wait for the Stripe iframe to load and become visible
  cy.frameLoaded('iframe[name^="__privateStripeFrame"]');
  
  // Enter the iframe
  cy.iframe('iframe[name^="__privateStripeFrame"]').within(() => {
    // Fill in card number
    cy.get('input[name="cardnumber"]').type(cardNumber, { delay: 10 });

    // Fill in expiry date
    cy.get('input[name="exp-date"]').type(expDate, { delay: 10 });

    // Fill in CVC
    cy.get('input[name="cvc"]').type(cvc, { delay: 10 });

    // Optionally fill in postal code if needed
    // cy.get('input[name="postal"]').type('12345', { delay: 10 });
  });
});


Cypress.Commands.add("EGHL", () => {
    cy.get(':nth-child(5) > .radio-container > .d-flex > .checkmark').click();
    cy.get('[name="CustName"]').type("hassan")
    cy.get('[name="CustEmail"]').type("saleemhassan588@gmail.com")  
    cy.get('[name="CustPhone"]').type("1234567");
    cy.CompleteOrderbtn();

    cy.origin('https://pay.e-ghl.com', () => {

        cy.get("#param4").type("Hassan Saleem");
        cy.get("#cardnumber1").type("4444333322221111");
        cy.get("#epMonth2").select("01");
        cy.get("#epYear2").select("2030");
    });
});





Cypress.Commands.add("CompleteOrderbtn", ()=>{
    cy.get('.mt-4 > .btn').click()
})
