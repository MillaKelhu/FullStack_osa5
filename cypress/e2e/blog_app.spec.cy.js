describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('h2').contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.get('button').contains('login')
  })
})