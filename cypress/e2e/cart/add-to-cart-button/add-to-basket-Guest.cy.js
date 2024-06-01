describe("Add products to cart", () => {

    it.only("Add single product to cart", () => {
      cy.fixture("cart-data.json").then(data => {
        const singleProductSlug = data.singleProduct; // Use singleProduct for single product slug
        // Use these product slugs to add them into the cart from "cart-data.json" file
        // where ProductName variable is available; just update its value and run the script
        // 1- monetary-digital-033003, 2- monetary-physical-033008, 3- givex-digital-033005, 4- givex-physical-033004
        // 5- experiences-physical-033001, 6- experiences-digital-033000, 7- simple-product-033009, 8- food-pickup-033006
        // 9- food-delivery-033007, 10- voucher-product-033011
        cy.findProductByName(singleProductSlug).then(() => {
        });
        cy.wait(2000);
        cy.GuestUser();
      });
    });
  
    it("Find and add all products from storefront", () => {
      cy.fixture("cart-data.json").then(data => { // Use productSlugs for multiple product slugs
        const productSlugs = data.productSlugs;
         // Check if productSlugs is empty or undefined
         if (!productSlugs || productSlugs.length === 0) {
          cy.log('No product slugs found in the JSON file.');
          return; // Stop execution if no data found
      }
  
        productSlugs.forEach(productSlug => {
          cy.findProductByName(productSlug).then(() => {
          });
          cy.wait(2000);
        });
  
        cy.wait(2000);
        cy.GuestUser();
      });
    });
  });
  