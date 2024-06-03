// cypress/support/checkout.js
import faker from 'faker';

Cypress.Commands.add("AddressDetails", () => {
    // Generate random valid data using faker library
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const streetAddress1 = faker.address.streetAddress();
    const streetAddress2 = faker.address.secondaryAddress();
    const region = faker.address.state();
    const district = faker.address.city();
    const phone = faker.phone.phoneNumber();

    // Type the random data into the input fields
    cy.get('#first-name').should("be.visible").type(firstName);
    cy.get('#last-name').type(lastName);
    cy.fixture("cart-data").then(data =>{
        cy.get("#country").select(data.AddressCountry)
    })
    cy.get('#street-addressline1').type(streetAddress1);
    cy.get('#street-addressline2').type(streetAddress2);
    cy.get('#region').type(region);
    cy.get('#district').type(district);
    cy.get('#phone').type(phone);
    cy.ContinuetoDeliveryButton()
});
Cypress.Commands.add("ContinuetoDeliveryButton", ()=>{
    cy.get("#continue-to-delivery-and-billing").click()

})