// cypress/e2e/checkout/add-address.cy.js
import faker from 'faker';

/*describe("add in cart all products", ()=>{
beforeEach(()=>{
    cy.VisitStoreURL(); // visit store url
})
it("Find Product from Storefront", () => {
    cy.fixture("cart-data.json").then(data => {
        // Use these product names to add them into the cart from "cart-data.json" file
        // where ProductName variable is available; just update its value and run the script
        // 1- Monetary Digital, 2- Monetary Physical, 3- GiveX Digital, 4- GiveX Physical
        // 5- Experiences Physical, 6- Experiences Digital, 7- Simple, 8- Food Pickup
        // 9- Food Delivery, 10- Voucher
        cy.findProductByName(data.ProductName).then(() => {
            // The condition to handle different types of products is now handled inside the `findProductByName` command
        });
        cy.wait(2000)
        /*cy.get('#login-email, #login-password, #checkout-as-guest').then($elements => {
            // Check if any of the elements are not found
            if ($elements.length !== 3) {
                // Click on the button if any of the elements are not found
                cy.get('div.col-12.px-4.proceed-checkout-cont button[type="button"]').click();
            }
            else {
                //it will login user might be user or guest it is a random fucntion
                cy.RandomLogin();
            }
        });
        cy.GuestUser(); 
        cy.wait(7000)
        cy.ProceedtoCheckout();
        cy.wait(2000)
        cy.AddressDetails();
        cy.wait(5000)
        
        

});
})
})


*/
   describe("setdatetime", ()=>{

    it("setdatetime", ()=>{
        cy.login();
        cy.wait(7000);
        cy.get(':nth-child(16) > .nav-link > app-sidebar-nav-link-content > .d-flex').click()
        cy.get(':nth-child(6) > .comp-link > .setting-desc > .setting-name').should("be.visible").click()
        cy.get("#shipping-method-food-pickup").should("be.visible").click()
        cy.wait(2000)

        cy.get('.col-md-9 > .btn').should("be.visible").click()
        cy.setCurrentTimeAndConfirm()
        
    })
   }) 
