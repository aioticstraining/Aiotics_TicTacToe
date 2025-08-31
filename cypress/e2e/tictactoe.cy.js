describe('TicTacToe Integration Test', () => {
  it('should display the game page and allow a player to make a move', () => {
    // Visit the application URL
    cy.visit('http://localhost:9090');

    // Wait for the game to load
    cy.wait(2000);

    // Assert that the game board is visible
    cy.get('#game-board').should('be.visible');

    // Make a move
    cy.get('#cell-0').click();

    // Assert that the cell now contains the "X" marker
    cy.get('#cell-0').should('have.text', 'X');
  });
});
