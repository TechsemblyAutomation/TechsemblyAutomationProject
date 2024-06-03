describe("Food Pickup Shipping Method", () => {
    it("Add single product to cart", () => {
      cy.fixture("cart-data.json").then(data => {
        const singleProductSlug = data.singleProduct;
        // Use these product slugs to add them into the cart from "cart-data.json" file
        // where ProductName variable is available; just update its value and run the script
        // 1- monetary-digital-033003, 2- monetary-physical-033008, 3- givex-digital-033005, 4- givex-physical-033004
        // 5- experiences-physical-033001, 6- experiences-digital-033000, 7- simple-product-033009, 8- food-pickup-033006
        // 9- food-delivery-033007, 10- voucher-product-033011
        cy.findProductByName(singleProductSlug).then(() => {
        });
        cy.GuestUser(); 
        cy.proctocheckout();
        cy.wait(2000)
        cy.AddressDetails();
        cy.wait(2000)
        cy.get("button[aria-label='Open calendar']").click()
        cy.get('.mat-calendar-body-today').click();

        // Optionally, you can add assertions here to verify the date selection
        // For example, check if the selected date is highlighted or some other element is updated
        cy.get('.mat-calendar-body-today').should('have.class', 'mat-calendar-body-selected');
        cy.get("body > div:nth-child(2) > div:nth-child(1) > app-root:nth-child(2) > app-checkout:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > app-checkout-delivery-v2:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > form:nth-child(1) > div:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > select:nth-child(1)").select("06:15 pm - 07:00 pm")
        cy.wait(2000)
        cy.ContinueToPayment()

});
})
})
