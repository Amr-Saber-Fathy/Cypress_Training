/// <reference types="cypress" />

["iphone-8", "ipad-mini", "macbook-15"].forEach(viewport => {

    it("Running a Testcase on different view ports", () => {
        cy.viewport(viewport);
        cy.visit("https://todo.qacart.com/");
    })
})




