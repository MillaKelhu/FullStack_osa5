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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login',
        {username: 'user', password: 'password'}
      ).then(response => {
        localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog')
        .click()

      cy.get('input[name="Title"]')
        .type('James Bond food')

      cy.get('input[name="Author"]')
        .type('Edward Biddulph')

      cy.get('input[name="Url"]')
        .type('https://jamesbondfood.com/')

      cy.get('button[type="submit"]')
        .contains('create')
        .click()

      cy.get('div.notification')
        .contains('a new blog James Bond food by Edward Biddulph added')

      cy.get('div.blog')
        .contains('James Bond food Edward Biddulph')
    })

    describe('When blogs have been created', function() {
      beforeEach(function() {
        const loggedUserJSON = localStorage.getItem('loggedBlogAppUser')
        const user = JSON.parse(loggedUserJSON)
        const authorization = `bearer ${user.token}`
        const newBlog = {
          title: 'License to Queer',
          author: 'David Lowbrigde-Ellis',
          url: 'https://www.licencetoqueer.com/'
        }
        const anotherNewBlog = {
          title: 'Bond and Banter',
          author: 'Jack Lugo',
          url: 'https://bondandbanter.libsyn.com/'
        }
        const thirdNewBlog = {
          title: 'BAMF Style',
          author: 'Nick Guzan',
          url: 'https://bamfstyle.com/'
        }

        cy.request({
          method: 'POST',
          url: 'http://localhost:3003/api/blogs/',
          body: newBlog,
          headers: { Authorization: authorization } })
          .then(response => {
            cy.request({
              method: 'POST',
              url: 'http://localhost:3003/api/blogs/',
              body: anotherNewBlog,
              headers: { Authorization: authorization } })
              .then(response => {
                cy.request({
                  method: 'POST',
                  url: 'http://localhost:3003/api/blogs/',
                  body: thirdNewBlog,
                  headers: { Authorization: authorization } })
                  .then(response => {
                    cy.visit('http://localhost:3000')
                  })
              })
          })
      })

      it('A blog can be liked', function() {
        cy.contains('License to Queer David Lowbrigde-Ellis')
          .contains('view')
          .click()

        cy.contains('License to Queer David Lowbrigde-Ellis')
          .contains('likes 0')

        cy.contains('License to Queer David Lowbrigde-Ellis')
          .contains('like')
          .click()

        cy.contains('License to Queer David Lowbrigde-Ellis')
          .contains('likes 1')
      })

      it('A blog can be deleted', function() {
        cy.contains('License to Queer David Lowbrigde-Ellis')
          .contains('view')
          .click()

        cy.contains('License to Queer David Lowbrigde-Ellis')
          .contains('remove')
          .click()

        cy.get('div.notification')
          .contains('blog License to Queer has been deleted')

        cy.contains('License to Queer David Lowbrigde-Ellis')
          .should('not.exist')
      })

      it('Blogs are in the order of likes', function() {
        cy.contains('Bond and Banter Jack Lugo')
          .contains('view')
          .click()

        cy.contains('BAMF Style Nick Guzan')
          .contains('view')
          .click()

        cy.contains('BAMF Style Nick Guzan')
          .contains('like')
          .click()

        cy.contains('BAMF Style Nick Guzan')
          .contains('likes 1')
          .click()

        cy.get('div.blog')
          .eq(0)
          .should('contain', 'BAMF Style Nick Guzan')

        cy.contains('Bond and Banter Jack Lugo')
          .contains('like')
          .click()

        cy.contains('Bond and Banter Jack Lugo')
          .contains('likes 1')

        cy.contains('Bond and Banter Jack Lugo')
          .contains('like')
          .click()

        cy.contains('Bond and Banter Jack Lugo')
          .contains('likes 2')

        cy.get('div.blog')
          .eq(0)
          .should('contain', 'Bond and Banter Jack Lugo')

        cy.get('div.blog')
          .eq(1)
          .should('contain', 'BAMF Style Nick Guzan')

        cy.get('div.blog')
          .eq(2)
          .should('contain', 'License to Queer David Lowbrigde-Ellis')
      })

      it('A blog can only be deleted by its creator', function() {
        const newUser = {
          username: 'another-user',
          name: 'Another Test User',
          password: 'another password'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', newUser)
        cy.request('POST', 'http://localhost:3003/api/login',
          {username: 'another-user', password: 'another password'}
        ).then(response => {
          localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })

        cy.contains('License to Queer David Lowbrigde-Ellis')
          .contains('view')
          .click()

        cy.contains('License to Queer David Lowbrigde-Ellis')
          .contains('remove')
          .should('not.exist')

        cy.contains('Bond and Banter Jack Lugo')
          .contains('view')
          .click()

        cy.contains('Bond and Banter Jack Lugo')
          .contains('remove')
          .should('not.exist')

      })
    })
  })
})