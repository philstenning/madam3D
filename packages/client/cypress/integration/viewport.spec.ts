describe('',()=>{
    it('we should be abel to still see the left menu',()=>{
        cy.visit('/')
        cy.viewport("macbook-15");
        cy.wait(200);
        cy.viewport("macbook-13");
        cy.wait(200);
        cy.viewport("macbook-11");
        cy.wait(200);
        cy.viewport("ipad-2");
        cy.wait(200);
        
    })

    it('click folders', function() {
        cy.visit('http://localhost:3000/');
        cy.get('[data-cy="main-nav-folders"]').click()
        cy.wait(1000)
        cy.get('[data-cy="main-nav-projects"]').click()
        cy.wait(1000)
        cy.get('[data-cy="main-nav-help"]').click()
        cy.wait(1000)
        cy.get('[data-cy="main-nav-settings"]').click()
        cy.wait(1000)

  
    });
})