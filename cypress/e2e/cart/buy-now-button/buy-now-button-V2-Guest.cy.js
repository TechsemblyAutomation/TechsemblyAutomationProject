describe("Add products to cart", () => {

    it("Add single product to cart", () => {
      cy.fixture("cart-data.json").then(data => {
        const singleProductSlug = data.singleProduct; // Use singleProduct for single product slug
        // Use these product slugs to add them into the cart from "cart-data.json" file
        // where ProductName variable is available; just update its value and run the script
        // 1- monetary-digital-033003, 2- monetary-physical-033008, 3- givex-digital-033005, 4- givex-physical-033004
        // 5- experiences-physical-033001, 6- experiences-digital-033000, 7- simple-product-033009, 8- food-pickup-033006
        // 9- food-delivery-033007, 10- voucher-product-033011
        cy.findProductBuynow(singleProductSlug).then(() => {
        });
        cy.wait(2000);
        cy.V2BuyNowButtonGuest();
    });
    });
  
      it.only("Find and add all products from storefront", () => {
          cy.fixture("cart-data.json").then(data => { // Use productSlugs for multiple product slugs
              const productSlugs = data.productSlugs;
               // Check if productSlugs is empty or undefined
            if (!productSlugs || productSlugs.length === 0) {
              cy.log('No product slugs found in the JSON file.');
              return; // Stop execution if no data found
          }
              let firstIteration = true;
              let skippedAll = true; // Flag to check if all products were skipped

              Cypress._.each(productSlugs, (productSlug) => {
                // Check if the productSlug includes "food simple" or "voucher"
                if (productSlug.includes("food") || productSlug.includes("simple") || productSlug.includes("voucher")) {
                  cy.log(`Skipping product slug: ${productSlug}`);
                  return; // Skip this iteration
                }
        
                skippedAll = false; // Set flag to false if any product slug is processed
        
                cy.findProductBuynow(productSlug).then(() => {
                  if (firstIteration) {
                    cy.BUYNOW();
                    cy.V2BuyNowButtonGuest();
                    cy.wait(2000);
                    firstIteration = false;
                  } else {
                    cy.wait(2000);
                    cy.BUYNOW();
                    cy.ContinuetoBuyNow({ timeout: 15000 });
                    cy.wait(6000)
                    
                  }
                });
              });
        
              if (skippedAll) {
                cy.log('All product slugs were skipped.');
                // Optionally, you could restart the test or handle this case as needed
                // cy.reload(); // Example: reload the page and restart the test
              }
            });
          });
  
              /*productSlugs.forEach(productSlug => {
                  cy.findProductBuynow(productSlug).then(() => {
                      if (firstIteration) {
                          cy.BUYNOW();
                          cy.V2BuyNowButtonGuest();
                          cy.wait(3000);
                          firstIteration = false;
                      } else {
                          cy.wait(2000);
                          cy.BUYNOW();
                          cy.ContinuetoBuyNow();
                      }
                  });
              });
          });
      });*/
  });
  
    
  