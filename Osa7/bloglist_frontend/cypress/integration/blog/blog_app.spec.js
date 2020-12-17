//I made the functions to commands.js but decided not to use them since that caused complications that I was not gonna deal with rn

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Lari Haapaniemi',
      username: 'LariH',
      password: 'passu'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('LariH')
      cy.get('#password').type('passu')
      cy.get('#login-button').click()
    })

    it('succeeds with correct credentials', function() {
      if (cy.contains('Logout')) {
        cy.contains('Logout').click()
      }
      cy.contains('login').click()
      cy.get('#username').type('LariH')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
    })

  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('LariH')
      cy.get('#password').type('passu')
      cy.get('#login-button').click()

      cy.contains('create blog').click()
      cy.get('#title').type('testing blog')
      cy.get('#author').type('Lari Haapaniemi')
      cy.get('#url').type('www.test.fi')
      cy.get('#create-blog').click()
    })

    it('A blog can be created', function() {
      //created in before each
      cy.contains('testing blog')
    })

    it('A blog can be liked', function() {
      cy.contains('view').click()
      cy.contains('likes 0')
      cy.get('#like').click()
      cy.contains('likes 1')
    })

    it('A blog can be deleted', function() {
      cy.contains('view').click()
      cy.get('#remove-blog').click()
      cy.get('html').should('not.contain', 'testing blog')
    })
  })

  describe('Blog arrange correctly', function() {

    it('blog changes its order after likes change', function() {
      cy.contains('login').click()
      cy.get('#username').type('LariH')
      cy.get('#password').type('passu')
      cy.get('#login-button').click()

      cy.contains('create blog').click()
      cy.get('#title').type('testing blog')
      cy.get('#author').type('Lari Haapaniemi')
      cy.get('#url').type('www.test.fi')
      cy.get('#create-blog').click()
      cy.contains('testing blog Lari Haapaniemi').find('button').click('')
      cy.get('#like').click()
      cy.get('#hide').click()

      //probably a bad way to do this, should have made different functions
      cy.contains('create blog').click()
      cy.get('#title').type('hello world')
      cy.get('#author').type('Jimi Forsell')
      cy.get('#url').type('www.rtk.fi')
      cy.get('#create-blog').click()
      //checks that before likes the first blog is on top
      cy.get('#blog-done').contains('testing blog')
      cy.get('#blog-done').should('not.contain','hello world')
      cy.contains('hello world Jimi Forsell').find('button').click('')
      cy.get('#like').click()
      cy.get('#like').click()
      cy.get('#like').click()
      cy.get('#hide').click()

      //checks that after likes the new one is on top
      cy.get('#blog-done').contains('hello world')
      cy.get('#blog-done').should('not.contain','testing blog')
    })

  })
})