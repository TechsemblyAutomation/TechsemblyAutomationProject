Cypress.Commands.add('findProductBuynow', (productSlug) => {
    cy.fixture('cart-data.json').then((data) => {
        const storeURL = data.StoreURL;
        const productURL = `${storeURL}/${productSlug}`;      
        cy.visit(productURL);
        cy.url({ timeout: 15000 }).should('include', productSlug);
    
            if (productSlug.includes("physical")) {
                cy.CheckPhysical();

            } else if (productSlug.includes("food") || productSlug.includes("simple") || productSlug.includes("voucher")) {
               
            } else {
                cy.EnterEmail();
                cy.AddRecpDetails();
            }           
            return false; 
        })
});

Cypress.Commands.add("BUYNOW", ()=>{
        cy.get(".btn.btn-primary.buy-btn.ng-star-inserted").click()   
});

Cypress.Commands.add("V2BuyNowButtonGuest", () => {
    cy.get(".info-text").should("have.text", "Sign in to check out faster.")
    cy.get("#checkout-as-guest").should("have.text", "Checkout as Guest").click()
    cy.GuestRandomEmail()
    cy.get("#guest-btn").click()
});

Cypress.Commands.add("ContinuetoBuyNow", ()=>{
    cy.get(".btn.btn-primary.w-100.btn-guest.ml-md-1").click()
});

Cypress.Commands.add("V2buynowbuttonUser", ()=>{
    cy.fixture("cart-data").then(data =>{
        cy.get("#login-email").type(data.UserEmail)
        cy.get("#login-password").type(data.UserPassword)
    })
    cy.get("#login-btn").click()
});

Cypress.Commands.add("V3RecpBuyNowButton", () => {
    cy.get("div[class='info-text text-center pb-4'] p").contains("Where should we send your receipt and order")
    cy.GuestRandomEmail()
    cy.get("#guest-btn").click()
});

Cypress.Commands.add("Okbutton", ()=>{
    cy.get("button[class='btn btn-primary action-btn text-uppercase text-white ml-3 ng-star-inserted']").click()
})






