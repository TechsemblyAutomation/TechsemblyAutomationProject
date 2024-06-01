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
      cy.wait(5000);
      cy.AddressDetails();
      cy.wait(5000);
      cy.ContinueToPayment();
      cy.wait(2000);
      cy.ShippingMethodOkbtn();
      cy.wait(5000);

      // Card details to fill
      const cardDetails = '4242424242424242123412312345'; // Card number + expDate + CVC + postal code

      // Access the iframe and fill the single input field
      cy.get('iframe[name^="__privateStripeFrame"]').then($iframe => {
        const $body = $iframe.contents().find('body');
        cy.wrap($body).find('input[name="cardnumber"]').type(cardDetails);
      });

      // Assuming you have a form submission button outside the iframe
      cy.get('button[type="submit"]').click();
      cy.wait(6000)

      // Add assertions to verify successful submission or handle any responses
      cy.get('.breadcrumb-heading').should('include.text', 'Confirmed');
    });
  });
});
