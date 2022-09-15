describe('spec', () => {
  it('passes', () => {
    cy.visit('/');

    cy.get('input').first().should('have.value', '1000001');
    cy.get('select').first().should('have.value', '東京都千代田区千代田');

    cy.get('input').first().type('{selectAll}{del}611-0021');
    cy.get('select').first().should('have.value', '京都府宇治市宇治');
  });
});
