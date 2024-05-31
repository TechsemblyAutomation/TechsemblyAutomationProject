import 'cypress-iframe';

describe("Add products to cart", () => {
  it("Add single product to cart", () => {
    cy.fixture("cart-data.json").then(data => {
      const singleProductSlug = data.singleProduct;

      // Custom commands to add product, proceed as guest user, etc.
      cy.findProductByName(singleProductSlug);
      cy.wait(2000);
      cy.GuestUser();
      cy.wait(7000);
      cy.proceedtochkot();
      cy.wait(10000);
      cy.AddressDetails();
      cy.wait(10000);
      cy.ContinueToPayment({ timeout: 10000 });
      cy.wait(10000);
      cy.ShippingMethodOkbtn();
      cy.wait(10000);

      // Ensure the iframe is available and interact with its contents
      cy.get('iframe[name^="__privateStripeFrame"]').should('be.visible').then($iframe => {
        const $body = $iframe.contents().find('body');

        // Ensure the iframe's body is fully loaded
        cy.wrap($body).should('not.be.empty').within(() => {
          // Check if the input field is available and interact with it
          cy.get('input[name="cardnumber"]').should('exist').then($input => {
            cy.wrap($input).should('be.visible').type('4242424242424242', { delay: 100 });
          });

          cy.get('input[name="exp-date"]').should('exist').then($input => {
            cy.wrap($input).should('be.visible').type('1229', { delay: 100 });
          });

          cy.get('input[name="cvc"]').should('exist').then($input => {
            cy.wrap($input).should('be.visible').type('123', { delay: 100 });
          });
        });
      });
    });
  });
});
