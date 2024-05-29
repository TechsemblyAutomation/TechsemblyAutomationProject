// cypress/support/commands.js

Cypress.Commands.add("Stripe", () => {
    cy.get('iframe[name^="__privateStripeFrame"]').then($iframe => {
        if ($iframe.length === 0) {
            cy.log('Error: Stripe iframe not found');
            throw new Error('Stripe iframe not found');
        }

        const iframe = $iframe[0].contentWindow.document;
        cy.wrap(iframe)
            .find('input[name="cardnumber"]', { timeout: 10000 })
            .should('exist')
            .type('4111111111111111', { force: true });

        cy.wrap(iframe)
            .find('input[name="exp-date"]', { timeout: 10000 })
            .should('exist')
            .type('1225', { force: true });

        cy.wrap(iframe)
            .find('input[name="cvc"]', { timeout: 10000 })
            .should('exist')
            .type('123', { force: true });
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
