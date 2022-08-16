describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const newUser = {
      username: 'user',
      name: 'Test User',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', newUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('h2')
      .contains('Log in to application')

    cy.contains('username')

    cy.contains('password')

    cy.get('button')
      .contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[name="Username"]')
        .type('user')

      cy.get('input[name="Password"]')
        .type('password')

      cy.get('button')
        .contains('login')
        .click()

      cy.get('h2')
        .contains('blogs')

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input[name="Username"]')
        .type('user')

      cy.get('input[name="Password"]')
        .type('notmypassword')

      cy.get('button')
        .contains('login')
        .click()

      cy.get('h2')
        .contains('Log in to application')

      cy.get('div.error')
        .contains('wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})