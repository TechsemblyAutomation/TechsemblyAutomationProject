Cypress.Commands.add("SimpleShippingMethod", ()=>{

  cy.get(".checkmark").click({ force: true })
  cy.ContinueToPayment()
  });
Cypress.Commands.add("ContinueToPayment", ()=>{    
  
  cy.get("button[type='submit']").click();
  cy.wait(2000)
  
})
Cypress.Commands.add("GivexPhysical", ()=>{    
  
  cy.get("button[type='submit']").click();
  cy.wait(2000)
  
})
Cypress.Commands.add("ScheduleShippingMethod", ()=>{
 // Assuming current date and time
 const currentDate = new Date();
 const nextHour = (currentDate.getHours() + 1) % 24; // Add one hour and wrap around if it exceeds 23
 const nextHourFormatted = nextHour < 10 ? `0${nextHour}` : nextHour; // Ensure hour is two digits

 // Assuming the time format is HH:00 (e.g., 19:00 for 7 PM)
 const nextHourTime = `${nextHourFormatted}:00`;

  cy.get("button[aria-label='Open calendar']").click()
 // Select the next hour in the time input field
 cy.get('.tbody > :nth-child(2) > :nth-child(1)').type(nextHourTime);
 cy.wait(4000)

 // Click the button at the end of the form
 cy.get('.actions > .mat-focus-indicator').click({force: true});

})
Cypress.Commands.add("proctocheckout", ()=>{
  cy.get(".proceed-checkout-cont > .btn").click()

})
Cypress.Commands.add("ShippingMethodOkbtn", ()=>{
  cy.get("button[class='btn btn-primary action-btn text-uppercase text-white ml-3 ng-star-inserted']").should("be.visible").click()

})
  Cypress.Commands.add('setCurrentTimeAndConfirm', () => {
      // Get the current date and time
      const currentDate = new Date();
      let currentHour = currentDate.getHours();
      let currentMinute = currentDate.getMinutes() + 10; // Add 10 minutes
    
      // Adjust hours and minutes if necessary
      if (currentMinute >= 60) {
        currentHour += 1;
        currentMinute -= 60;
      }
      if (currentHour > 12) {
        currentHour -= 12; // Convert to 12-hour format if necessary
      }
    
      // Format the time as needed
      const formattedHour = String(currentHour).padStart(2, '0');
      const formattedMinute = String(currentMinute).padStart(2, '0');
    
      // Click the hour element
      cy.get('.clock-face__number').contains(formattedHour).click();
    
      // Click the minute element
      cy.get('.clock-face__number').contains(formattedMinute).click();
    
      // Click the "Ok" button
      cy.get('button').contains('Ok').click();
    });
