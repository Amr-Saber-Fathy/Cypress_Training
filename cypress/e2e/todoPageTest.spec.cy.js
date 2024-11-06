/// <reference types="cypress" />

beforeEach(()=>{
    cy.viewport('macbook-15');
    cy.visit("https://todo.qacart.com/");
    cy.fixture('Login_Data').then(users =>{
        cy.get('[data-testid="email"]').type(users[0].email);
        cy.get('[data-testid="password"]').type(users[0].password);
        cy.get('[data-testid="submit"]').click();
        cy.url().should('contain', 'todo');
    })
})

it("Add Todo Test Cases", () => {
    cy.get('.sc-idiyUo > .MuiButtonBase-root').click();
    cy.url().should('contain', 'new');

    cy.fixture('ToDo_Data').then(todos =>{
        todos.forEach(todo =>{
            cy.get('[data-testid="new-todo"]').type(todo.itemName);
            cy.get('[data-testid="submit-newTask"]').click();

            if(todo.accepted){
                cy.url().should('contain', 'todo');
                cy.get('[data-testid="todo-item"]').first().invoke('text').should('eq', todo.itemName);
                cy.get('.sc-idiyUo > .MuiButtonBase-root').click();
            }

            else{
                cy.url().should('contain', 'new');
                cy.get('.MuiFormHelperText-root').invoke('text').then(error =>{
                    expect(error).to.eq(todo.expectedMessage);
                })
            }
        })
    })

    cy.get('[href="/todo"]').click();
})

it("Complete Todo Test Case", () =>{
    cy.get('[data-testid="complete-task"]').first().check();
    cy.get('[data-testid="todo-item"]').first().should('have.class', 'fkEinw');
})

it("UnComplete Todo Test Case", () =>{
    cy.get('[data-testid="complete-task"]').first().uncheck();
    cy.get('[data-testid="todo-item"]').first().should('have.class', 'dIVhJd');
})

it("Delete Todo Test Case", () =>{
    cy.get('[data-testid="delete"]').first().click();
    cy.get('[data-testid="no-todos"]').invoke('text').should('eq', 'No Available Todos');
})

it("ToDo Paging Test Case", () =>{
    [1,2,3,4,5,6].forEach(num =>{
        cy.get('.sc-idiyUo > .MuiButtonBase-root').click();
        cy.url().should('contain', 'new');
        cy.get('[data-testid="new-todo"]').type('Task ' + num);
        cy.get('[data-testid="submit-newTask"]').click();
    })
    cy.get('.sc-hAZoDl').children().last().click();
    cy.get('[data-testid="todo-item"]').first().invoke('text').should('eq', 'Task 1');
})

it("Delete Todos from last Page", () =>{
    cy.get('.sc-hAZoDl').children().last().click();
    cy.get('[data-testid="delete"]').first().click();
    cy.wait(100);
    cy.get('[data-testid="todo-item"]').first().invoke('text').should('eq', 'Task 6');
})

it("Delete All Todos", () =>{
    cy.get('[data-testid="delete"]').each((btn) =>{
        cy.wrap(btn).click();
        cy.wait(100);
    });
    cy.get('[data-testid="no-todos"]').invoke('text').should('eq', 'No Available Todos');
})