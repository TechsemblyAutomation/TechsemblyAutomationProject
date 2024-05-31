Cypress.Commands.add('findProductByName', (productSlug) => {
    cy.fixture('cart-data.json').then((data) => {
        const storeURL = data.StoreURL;
        const productURL = `${storeURL}/${productSlug}`;      
        cy.visit(productURL);
        cy.url({ timeout: 15000 }).should('include', productSlug);

        if (productSlug.includes("physical")) {
            cy.wait(3000)
            cy.AddRecpDetails();
            cy.ClickAddToCart();

        } else if (productSlug.includes("food") || productSlug.includes("simple") || productSlug.includes("voucher")) {
            cy.ClickAddToCart();

        } else {
            cy.wait(2000)
            cy.EnterEmail();
            cy.AddRecpDetails();
            cy.ClickAddToCart();
        }       
        return false; 
    });
});

Cypress.Commands.add("GuestUser", () => {
    cy.window().should((win) => {
        expect(win.data).to.have.property('storeId');
    }).then((win) => {
        const storId = win.data.storeId;
        const guestEmailCookieName = `${storId}_guest_email`;

        cy.getCookie(guestEmailCookieName).then((cookie) => {
            if (cookie) {
                // Cookie exists, continue to shipping
                cy.ContinuetoShipping();
            } else {
                // Cookie does not exist, log in as guest and type the random email
                cy.GuestLogin()
            }
        });
    });
});

Cypress.Commands.add("LoggedinUser", () => {
    cy.window().then((win) => {
        if (!win.data || !win.data.storeId) {
            throw new Error('storeId is not defined on window.data');
        }

        const storId = win.data.storeId;
        const userEmailCookieName = `${storId}_access_token`;

        cy.getCookie(userEmailCookieName).then((cookie) => {
            if (cookie) {
                // Cookie exists, continue to account page or any other logic
                cy.log('User is logged in.');
                cy.ContinuetoShipping();

            } else {
                cy.log('User is not logged in. Performing login...');
                cy.UserLogin()

                }
        });
    });
});

Cypress.Commands.add("V3AddtoCart", ()=>{
    cy.GuestRandomEmail();
    cy.get("#guest-btn").click()

})


