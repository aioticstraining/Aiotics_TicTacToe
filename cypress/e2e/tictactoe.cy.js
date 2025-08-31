describe('TicTacToe Integration Test', () => {

    it('should display the game page and allow a player to make a move', () => {
        // Visit the URL where the Tic-Tac-Toe application is running
        // We use localhost since the test container will be on the same network
        cy.visit('http://localhost:9090');

        // Check if the page contains the correct heading
        cy.contains('h1', 'Tic Tac Toe').should('be.visible');

        // Check if the game board is visible
        cy.get('#game-board').should('be.visible');

        // Click on the first square of the board
        cy.get('[data-cell-index="0"]').click();

        // Check if the square now contains an 'X'
        cy.get('[data-cell-index="0"]').should('have.text', 'X');
    });
});
