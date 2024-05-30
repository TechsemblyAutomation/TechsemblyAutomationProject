








Cypress.Commands.add("ViewCart", ()=>{
    cy.get(".btn.btn-secondary.btn-guest.view-cart-btn.w-100.mx-md-2.d-flex.justify-content-center.align-items-center").click()

})

Cypress.Commands.add("GuestRandomEmail", (selector) => {
    const generateRandomEmail = () => {
        const randomString = Math.random().toString(36).substr(2, 5); 
        const randomDomain = Math.random().toString(36).substr(2, 5) + ".com"; 
        return `${randomString}@${randomDomain}`;
    };
    
    const randomEmail = generateRandomEmail();

    cy.get("#guest-email").type(randomEmail);
})





Cypress.Commands.add("CheckPhysical", () => {
    cy.get("input[value='physical']", {timeout:15000}).should("be.checked")
    cy.AddRecpDetails()
})

Cypress.Commands.add("EnterEmail", () => {
    cy.fixture("cart-data.json").then((data) => {
        cy.wait(3000)
        cy.get("input[placeholder ='Recipient Email']").type(data.RecipientEmail)
    })
})

Cypress.Commands.add("ClickAddToCart", () => {
    cy.get("#add-to-basket-btn").click()
    cy.wait(2000)
    cy.get("#cart-bag-partial").click()
});

Cypress.Commands.add("GuestLogin", () => {
        cy.get("#checkout-as-guest").should("be.visible").click()
        const generateRandomEmail = () => {
            const randomString = Math.random().toString(36).substr(2, 5); // Random string
            const randomDomain = Math.random().toString(36).substr(2, 5) + ".com"; // Random domain
            return `${randomString}@${randomDomain}`;
        }       
        const randomEmail = generateRandomEmail();
        cy.get("#guest-email").type(randomEmail);
        cy.ContinuetoShipping()
});

Cypress.Commands.add("ContinuetoShipping", ()=>{
        cy.get('#guest-btn').click()
});

Cypress.Commands.add("UserLogin", () => {
        cy.fixture("cart-data").then(data =>{
        cy.get('#login-email').type(data.UserEmail)
        cy.get("#login-password").type(data.UserPassword)
        })
        cy.get('#login-btn').click()
        cy.get("button.action-btn").click();
});

Cypress.Commands.add("RandomLogin", ()=>{
        const methods = [cy.UserLogin, cy.GuestLogin];
                const randomIndex = Math.floor(Math.random() * methods.length);
                const randomMethod = methods[randomIndex];
                randomMethod();
                cy.wait(6000);
});

Cypress.Commands.add("AddRecpDetails", () => {
    cy.fixture("cart-data.json").then(() => {
        const generateRandomString = (length) => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                result += characters.charAt(randomIndex);
            }
            return result;
        };     
        const randomRecipientFirstName = generateRandomString(5);
        const randomRecipientLastName = generateRandomString(5);
        const randomSenderName = generateRandomString(5);
        cy.get("input[placeholder ='Recipient First Name']").type(randomRecipientFirstName);
        cy.get("input[placeholder ='Recipient Last Name']").type(randomRecipientLastName);
        cy.get("input[placeholder ='Sender Name']").type(randomSenderName);
    });
});

Cypress.Commands.add("VisitStoreURL", () => {
    cy.fixture("cart-data.json").then((data) => {
        cy.visit(data.StoreURL);
    });
});



Cypress.Commands.add("proceedtochkot", () => {
    cy.get(".proceed-checkout-cont > .btn").click()
});


Cypress.Commands.add('login', () => {
    cy.visit("https://staging-admin.techsembly.com/session/new");
    cy.fixture("cart-data").then((data) => {
        cy.get("#email").type(data.Username);
        cy.get("#password").type(data.Password);
        cy.get(".btn[type='submit']").should("have.text", "Login").click();
        cy.wait(2000);    
    });
});
Cypress.Commands.add("OpenStore", ()=>{
    cy.get(':nth-child(12) > .nav-link > app-sidebar-nav-link-content > .d-flex > .ml-1').click()
    cy.fixture('cart-data.json').then(storeData => {
        // Retrieve the store name from the JSON file
        const storeName = storeData.storeName;
        cy.contains('tr.ng-star-inserted a', storeName).click();
      });

})
Cypress.Commands.add("SetVFlow", (Flow) => {
    cy.get("select[name='checkout_flow']").select(Flow);
    cy.get('.col-7 > .btn-primary').click();
    cy.wait(2000);
});
Cypress.Commands.add("ProceedtoCheckoutBtn", ()=>{
    cy.get("div[class='col-12 px-4 proceed-checkout-cont'] button[type='button']").click()
})


