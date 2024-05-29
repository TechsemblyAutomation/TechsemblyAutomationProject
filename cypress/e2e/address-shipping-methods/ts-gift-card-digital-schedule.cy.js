describe("add in cart all products", ()=>{
    beforeEach(()=>{
        cy.VisitStoreURL(); // visit store url
    })
    it("Find Product from Storefront", () => {
        cy.fixture("cart-data.json").then(data => {
        // Use these product slugs to add them into the cart from "cart-data.json" file
        // where ProductName variable is available; just update its value and run the script
        // 1- monetary-digital-033003, 2- monetary-physical-033008, 3- givex-digital-033005, 4- givex-physical-033004
        // 5- experiences-physical-033001, 6- experiences-digital-033000, 7- simple-product-033009, 8- food-pickup-033006
        // 9- food-delivery-033007, 10- voucher-product-033011
            cy.findProductByName(data.ProductName).then(() => {
                // The condition to handle different types of products is now handled inside the `findProductByName` command
            });
            cy.wait(5000)
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
            });*/
            cy.GuestUser(); 
            cy.ProceedtoCheckout();
            cy.wait(2000)
            cy.AddressDetails();
            cy.wait(2000);
    
            cy.ScheduleShippingMethod()
            cy.ContinueToPayment()
            cy.ShippingMethodOkbtn()
            
            
    
    });
    })
    })
    