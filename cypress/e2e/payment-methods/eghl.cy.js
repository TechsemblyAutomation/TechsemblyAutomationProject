// cypress/integration/cart.spec.js
describe("add in cart all products", () => {
    beforeEach(() => {
        cy.VisitStoreURL(); // visit store URL
    });

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

            cy.wait(5000);

            // Commented out the login logic as you have a GuestUser command to handle user login
            // cy.get('#login-email, #login-password, #checkout-as-guest').then($elements => {
            //     if ($elements.length !== 3) {
            //         cy.get('div.col-12.px-4.proceed-checkout-cont button[type="button"]').click();
            //     } else {
            //         cy.RandomLogin();
            //     }
            // });

            cy.GuestUser(); 
            cy.ProceedtoCheckout();
            cy.wait(2000);
            cy.AddressDetails();
            cy.wait(2000);

            cy.ScheduleShippingMethod();
            cy.ContinueToPayment();
            cy.ShippingMethodOkbtn();

            // Enter Stripe payment details
            cy.EGHL(); // Use the custom command to handle Stripe payment details
        });
    });
});
