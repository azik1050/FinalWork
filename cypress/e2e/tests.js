/// <reference types="cypress" />


describe('Saucedemo tests', () => {
    before(() => {
        cy.clearAllCookies()
        cy.clearAllLocalStorage()
        cy.clearAllSessionStorage()
    });

    beforeEach(() => {
        cy.intercept('https://events.backtrace.io/api/summed-events/submit?universe=UNIVERSE&token=TOKEN', {
            body: undefined
        })           
        cy.intercept('https://events.backtrace.io/api/unique-events/submit?universe=UNIVERSE&token=TOKEN', {
            body: undefined
        })           
        cy.intercept('/service-worker.js', {
            body: undefined
        })
        cy.visit('https://www.saucedemo.com/')
        cy.get('body').should('exist');
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('#login-button').click()
    });

    it('Set price', () => {
        cy.get('.product_sort_container').select('lohi')
        cy.get('.product_sort_container')
        .should('have.value', 'lohi')
        cy.get('.select_container').highlight()
        cy.screenshot('set_price')
    });

    it('Add product to cart', () => {
        cy.get('#add-to-cart-sauce-labs-backpack').click()

        cy.get('.shopping_cart_badge')
        .should('contain', '1').click()
        cy.get('.cart_item')
        .should('have.length', 1).highlight()
        cy.screenshot('add_to_cart')
    });

    it('Fill the form', () => {
        cy.get('.shopping_cart_link').click()
        cy.get('#checkout').click()

        cy.get('[data-test="firstName"]').type('blabla')
        .should('have.attr', 'value', 'blabla')
        cy.get('[data-test="lastName"]').type('blabla')
        .should('have.attr', 'value', 'blabla')
        cy.get('[data-test="postalCode"]').type('blabla')
        .should('have.attr', 'value', 'blabla')

        cy.get('#continue').click()
        cy.get('#finish').click()

        cy.get('[data-test="complete-header"]')
        .should('contain', 'Thank you for your order!').highlight()
        cy.screenshot('fill_the_form')
    });
});