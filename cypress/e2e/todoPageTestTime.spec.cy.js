/// <reference types="cypress" />


describe("Test Todo Page Welcome Message for different Timing", () =>{
    const datesArray = [
        {time: new Date(2023, 10, 6, 0, 0, 0), message: "Time to sleep"},
        {time: new Date(2023, 10, 6, 12, 0, 0), message: "Good morning"},
        {time: new Date(2023, 10, 6, 15, 0, 0), message: "Good afternoon"},
        {time: new Date(2023, 10, 8, 18, 45, 0), message: "Good Evening"},
    ];

    datesArray.forEach(date =>{
        it(`Test Welcome Message for ${date.time}`, () =>{
            cy.clock(date.time.getTime());
            cy.viewport('macbook-15');
            cy.visit("https://todo.qacart.com/");
            cy.fixture('Login_Data').then(users =>{
                cy.get('[data-testid="email"]').type(users[0].email);
                cy.get('[data-testid="password"]').type(users[0].password);
                cy.get('[data-testid="submit"]').click();
                cy.url().should('contain', 'todo');
                cy.get('[data-testid="welcome"]').invoke('text').should('contain', date.message);
            })
        })
    })
})