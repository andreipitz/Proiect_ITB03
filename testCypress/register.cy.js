describe('Register page', ()=>{
    it('permite inregistrarea unui nou utilizator-happy path', ()=>{
        //am renuntat la intercept pentru a putea scrie in db.
    cy.visit('/register');

    cy.get('#username').type('testuser27');
    cy.get('#email').type('testuser26@example.com');
    cy.get('#password').type('testuser123');
    cy.get('#confirm-password').type('testuser123');
    cy.get('#age').type('25');
    cy.contains('button', 'Înregistrează-te').click();

    cy.location('pathname').should('eq', '/register-success.html');
    cy.contains('h1', 'Înregistrare reușită').should('be.visible');
    });

    it('afiseaza mesaj de validare pentru varsta sub 18 ani', ()=>{
        cy.visit('/register');

    cy.get('#username').type('testuser26');
    cy.get('#email').type('testuser@example.com');
    cy.get('#password').type('testuser123');
    cy.get('#confirm-password').type('testuser123');
    cy.get('#age').type('17');
    cy.contains('button', 'Înregistrează-te').click();

    cy.get('#form-message')
    .should('be.visible')
    .and('have.text', 'Varsta trebuie sa fie mai mare de 18.');
    });


    it('afiseaza mesaj de validare pentru parole care nu coincid', ()=>{
        cy.visit('/register');

    cy.get('#username').type('testuser27');
    cy.get('#email').type('testuser@example.com');
    cy.get('#password').type('testuser123');
    cy.get('#confirm-password').type('testuser456');
    cy.get('#age').type('25');
    cy.contains('button', 'Înregistrează-te').click();

    cy.get('#form-message')
    .should('be.visible')
    .and('have.text', 'Parolele nu coincid.');
    });

    it('afiseaza mesaj de eroare cand lipsesc campuri obligatorii', ()=>{
        cy.visit('/register');

   
  
    cy.contains('button', 'Înregistrează-te').click();
    cy.get('#form-message')
    .should('be.visible')
    .and('have.text', 'Toate campurile sunt obligatorii.');
    });



});
