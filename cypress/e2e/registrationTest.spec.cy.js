/// <reference types="cypress" />


it("Registration Test Case", () => {

    cy.viewport('macbook-15');
    cy.fixture('Registration_Data').then(users =>{
        users.forEach(data => {
            cy.visit("https://todo.qacart.com/");
            cy.get('[href="/signup"]').click();
            cy.get('[data-testid="first-name"]').type(data.firstName);
            cy.get('[data-testid="last-name"]').type(data.lastName);
            cy.get('[data-testid="email"]').type(data.email);
            cy.get('[data-testid="password"]').type(data.password);
            cy.get('[data-testid="confirm-password"]').type(data.confirmPassword);
            cy.get('[data-testid="submit"]').click();

            if(data.loged == 1){
                cy.url().should('contain', 'todo');
                cy.get('.MuiButton-label').click();
            }
            else if(data.loged == 0){
                cy.get('[data-testid="error"]').invoke('text').then(error =>{
                    expect(error).to.eq(data.expectedMessage);
                });
            }
            else if(data.loged == -1){
                cy.get('.MuiFormHelperText-root').invoke('text').then(error =>{
                    expect(error).to.eq(data.expectedMessage);
                });
            }
        });
    })

    
})