// cypress/integration/stripe_payment_spec.js

describe('Stripe Payment', () => {
    it('should type card number into the Stripe element', () => {
      // Visit the page with the Stripe element
      cy.visit('/path-to-your-page');
  
      // Access the iframe
      cy.get('iframe[src*="js.stripe.com/v3/elements-inner-card"]').then(($iframe) => {
        const $body = $iframe.contents().find('body');
  
        // Wrap the body in Cypress context
        cy.wrap($body).find('.InputElement').eq(0).type('4242424242424242', { delay: 100 });
      });
  
      // Add any other interactions as needed, for example, entering expiry date and CVC
      cy.get('iframe[src*="js.stripe.com/v3/elements-inner-card"]').then(($iframe) => {
        const $body = $iframe.contents().find('body');
  
        // Wrap the body in Cypress context for expiry date
        cy.wrap($body).find('.InputElement').eq(1).type('12/24', { delay: 100 });
  
        // Wrap the body in Cypress context for CVC
        cy.wrap($body).find('.InputElement').eq(2).type('123', { delay: 100 });
      });
  
      // Submit the form if applicable
      cy.get('button[type="submit"]').click();
    });
  });
  