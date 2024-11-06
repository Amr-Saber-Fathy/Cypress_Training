/// <reference types="cypress" />

it("Running a Testcase with different data and assertions", () => {

    cy.fixture('Login_Data').then(data =>{
        data.forEach(({email, password, loged, expectedMessage}) => {
            cy.viewport("macbook-15");
            cy.visit('https://todo.qacart.com/');
            cy.get('[data-testid="email"]').type(email);
            cy.get('[data-testid="password"]').type(password);
            cy.get('[data-testid="submit"]').click();
            if(loged == 1){
                cy.url().should('contain', 'todo');
                cy.get('.MuiButton-label').click();
            }
            else if(loged == 0){
                cy.get('[data-testid="error-alert"]').invoke('text').then(error =>{
                    expect(error).to.eq(expectedMessage);
                })
            }
            else if(loged == -1){
                cy.get('#email-helper-text').invoke('text').then((error) => {
                    expect(error).to.eq(expectedMessage);
                });
            }
        });
    })

    
    
})