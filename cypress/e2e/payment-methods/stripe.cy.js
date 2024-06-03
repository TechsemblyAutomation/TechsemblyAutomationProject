describe("Stripe Payment Method", ()=>{

  it("Add single product to cart", () => {
    cy.fixture("cart-data.json").then(data => {
      const singleProductSlug = data.singleProduct;
  
      cy.findProductByName(singleProductSlug).then(() => {
      });
      cy.GuestUser();
      cy.proctocheckout()
      cy.wait(2000);
      cy.AddressDetails();
      cy.wait(7000);
  
      //cy.ScheduleShippingMethod();
      cy.ContinueToPayment();
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
      cy.wait(10000)

      // Add assertions to verify successful submission or handle any responses
      cy.get('.breadcrumb-heading').should('include.text', 'Confirmed');
    });
  });

  

})
