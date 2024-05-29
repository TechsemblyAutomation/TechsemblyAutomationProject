
///<reference types= "cypress" />
///<reference types = "cypress-iframe" />
import 'cypress-iframe'

describe("UI Elements", ()=>{

it("Static and Dynamic dropdowns", ()=>{

    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    //Static Dropdown
    cy.get("select").select("Option3").should("have.value", "option3")
    //Dynamic Dropdown
    cy.get("#autocomplete").type("pa")
    cy.get(".ui-menu-item div").each(($e1, Index, $List)=>{

        if($e1.text()==="Pakistan"){
            cy.wrap($e1).click() //need to wrap the element as it is not a promises element so for this we need to wrap it
        }

    })
    cy.get('#autocomplete').should("have.value", "Pakistan")
    // radio button
    cy.get("[value='radio3']").check().should("be.checked")

    // hide and show input fiedl after clicking buttons
    cy.get("#displayed-text").should("be.visible")
    cy.get("#hide-textbox").click()
    cy.get("#displayed-text").should("not.be.visible")
    cy.get("#show-textbox").click()
    cy.get("#displayed-text").should("be.visible")

    //alerts that cypress handle easily
    cy.get("#alertbtn").click()
    //windows alert help to show the alert screen not on web but for cypress only if we
    //dont use window alert event it does not open it in cypress or we can't verify the text on alert window
    cy.on(("window:alert"),(str)=>{

        expect(str).be.eq("Hello , share this practice page and share your knowledge")
    })
    //for confirm windows
    cy.get("#confirmbtn").click()
    cy.on(("window:confirm"),(str)=>{

        expect(str).be.eq("Hello , Are you sure you want to confirm?")
    })
    //invoke is a jquery fucntion that enter into the element and do some actions that we will provide like
    //removeattrr and its value like target.. basically we are doing this to open the url into the same
    //tab by removing target-blank attr as target blank open a url into other tab
    cy.get("#opentab").invoke("removeAttr", "target").click()
    //this will create and issue that you start with rahulshetty domain and now why aare you switching to
    //a totally new domain so for this issue we do cy.origin tell cypress now its my new domain
    cy.origin("https://www.qaclickacademy.com/", ()=>{

    cy.get(".nav-item a[href='about.html']").click()
    cy.get(".col-lg-5 h2").contains("QAClick Academy")


    })
    

})
//this code will find the required course then get its price so the first thing we do is 
//get the whole table path then go to child then find nth-child(2) means there are three columns in every
//row and every 2nd column in every row is course so do set nth-child(2) that give us all courses
//for visualization visit the below website
//for xpath we use tr td[2] but i used css not xpath
it("Table Data Verifiction", ()=>{
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    /*cy.get("#product tr td:nth-child(2)").each(($e1, index, $List)=>{
        const CourseName = $e1.text()
        if(CourseName.includes("TestNG")){
            //next() use for find immediate next sibllings td
            ///why we dont use .text() after .next() bcz its jquery method and cypress does not resolve this
            //promises so thats why we use then, each methods for this we have single value we use then 
            cy.get("#product tr td:nth-child(2)").eq(index).next().then(function(price){

                const CoursePrice = price.text()
                expect(CoursePrice).to.equal("20")
            })

        }*/
        cy.get('.post-tile-link')
  .each(($element) => {
    const productName = $element.find('.post-link').text();
    if (productName.includes('Product')) {
      // Perform actions on the element with "Product" in its name
      cy.wrap($element).click(); // For example, click on the element
    }
  });



    })


})
it("Mouser Hover", ()=>{
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

//show jquery method should be applied on immediate parent of hidden element like if we move cursor
//then hidden elements show then we say it
//we use invoke() jquery method to change/update/ the element attribute here we add method of show
//to display the hidden attributes of this element
//we can get/click on invisible items in cypress only not selenium by using {force:true}
    cy.get(".mouse-hover-content").invoke("show")
    cy.contains("Top").click()
    cy.url().should("contains", "top")



})
it("child window new url", ()=>{

    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    cy.get("#opentab").then(function(url){

        const NewUrl = url.prop('href')
        cy.visit(NewUrl)
        cy.origin(NewUrl, ()=>{

            cy.get("a[href='https://www.qaclickacademy.com/blog']").click()

        })

    })


})

it("Iframes", ()=>{

    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    cy.frameLoaded("#courses-iframe")
    cy.iframe().find("a[href*='mentorship']").eq(0).click()
    cy.iframe().find(".pricing-title").should("have.length", 2)

})
//npm install -D cypress-iframe use this command to install iframes basicaly they are the html pages
//under one html

//Pick date from new type calender not normal use of this calender
it.only("Calender Date picker", ()=>{
    const year = "2025"
    const month = "6"
    const Date = "10"
    const selectedDate = [month, Date, year]
    cy.visit("https://www.rahulshettyacademy.com/seleniumPractise/#/offers")
    cy.get(".react-date-picker").click()
    cy.get(".react-calendar__navigation__label").click()
    cy.get(".react-calendar__navigation__label").click()
    cy.contains("button", year).click()
    // first method of getting/selecting month frst one with contains methods
    //for bot month we have to give proper value like January 
    //cy.contains("button", month).click()
    //second method of selecting month eq(5) means 6th month so for this we use minus now it will select 6th month
    // but month is a string so we change this str into number by using Number
    cy.get(".react-calendar__year-view__months__month").eq(Number(month)-1).click()
    cy.get(".react-calendar abbr").each(($e1, index, $List)=>{

        const datepicker = $e1.text()
        if(datepicker.includes(Date)){
            cy.wrap($e1).click()
        }

    })
    cy.get(".react-date-picker__inputGroup__input").each(($e1, index)=>{

        cy.wrap($e1).invoke("val").should("eq", selectedDate[index] )

    })
    })




})
