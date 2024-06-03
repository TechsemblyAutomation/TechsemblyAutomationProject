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
        cy.wait(7000)
        cy.proctocheckout();
        cy.ContinuetoDeliveryButton()
        cy.SimpleShippingMethod();

});
})
})
