describe("Add Address", () => {
  it("Add single product to cart", () => {
    cy.fixture("cart-data.json").then(data => {
      const singleProductSlug = data.singleProduct;
      cy.findProductByName(singleProductSlug);
        cy.GuestUser(); 
        cy.wait(7000)
        cy.proceedtochkot();
        cy.AddressDetails();
});
})
})



    
