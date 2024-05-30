describe("Add products to cart", () => {
  // Ensure the store flow is set to V3 before running this script
  it("Add single product to cart", () => {
      cy.fixture("cart-data.json").then(data => {
          const singleProductSlug = data.singleProduct;

          if (!singleProductSlug) {
              cy.log('No single product slug found in the JSON file.');
              return;
          }

          cy.findProductBuynow(singleProductSlug).then(() => {
              cy.wait(2000);
              cy.V3RecpBuyNowButton();
          });
      });
  });

  it.only("Find and add all products from storefront", () => {
    cy.fixture("cart-data.json").then(data => {
      const productSlugs = data.productSlugs;
  
      if (!productSlugs || productSlugs.length === 0) {
        cy.log('No product slugs found in the JSON file.');
        return; // Stop execution if no data found
      }
  
      let firstIteration = true;
      let skippedAll = true; // Flag to check if all products were skipped
  
      productSlugs.forEach((productSlug, index) => {
        // Check if the productSlug includes "food simple" or "voucher"
        if (productSlug.includes("food") || productSlug.includes("simple") || productSlug.includes("voucher")) {
          cy.log(`Skipping product slug: ${productSlug}`);
          return; // Skip this iteration
        }
  
        skippedAll = false; // Set flag to false if any product slug is processed
  
        cy.findProductBuynow(productSlug).then(() => {
          if (firstIteration) {
            cy.BUYNOW();
            cy.V3RecpBuyNowButton();
            firstIteration = false;
          } else {
            cy.wait(2000);
            cy.BUYNOW();
            cy.ContinuetoBuyNow();
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
  
});
