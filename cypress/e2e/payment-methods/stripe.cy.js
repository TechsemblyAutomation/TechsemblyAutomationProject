it("Add single product to cart", () => {
    cy.fixture("cart-data.json").then(data => {
      const singleProductSlug = data.singleProduct;
  
      cy.findProductByName(singleProductSlug).then(() => {
      });
      cy.GuestUser();
      cy.proctocheckout()
      cy.wait(2000);
      cy.AddressDetails();
      cy.wait(2000);
  
      cy.ScheduleShippingMethod();
      cy.ContinueToPayment();
      cy.ShippingMethodOkbtn();
    });
  });
  