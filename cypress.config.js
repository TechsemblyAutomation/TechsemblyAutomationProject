const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter', 
  video: true,
  videosFolder: 'cypress/RecordedVideos',
  "chromeWebSecurity": false,

  // Generating HTML reports
   // Configuring the folder for recorded videos
  
  e2e: {
    setupNodeEvents(on, config) {
      // This line should be outside the e2e configuration object
    require('cypress-mochawesome-reporter/plugin')(on); // for HTML report
    },
  
    "compilerOptions": {
      "types": ["cypress"],
      "defaultCommandTimeout": 90000,

      "pageLoadTimeout": 30000,
      "requestTimeout": 5000, // default is 5 seconds
  "responseTimeout": 30000 // default is 30 seconds1
      
      // Move video-related configurations out of e2e object
    },
    
      "env": {
        "Username": "hassan.saleem8769@gmail.com",
        "Password": "hassan.saleem8769@gmail.com",
        "BuyNowEmail": "saleemhassan588@gmail.com"
        
      }
    
    
    
  }
});
