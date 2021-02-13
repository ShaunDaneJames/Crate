describe('Crate', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/user/login')
    .get('button').contains('Signup').click()
    .get('input:first').type('User')
    .get('input').eq(1).type('user@user.com')
    .get('input:last').type('123456')
  })
  
  it('should be able to sign up a user, log in and take a style survey only once', () => {
    cy.visit('http://localhost:3000/user/login')
    .get('button').contains('Login').click()
    .get('input:first').type('user@gmail.com')
    .get('input:last').type('123456')
    .get('button:last').contains('Login').click()

    cy.visit('http://localhost:3000/crates')
    .get('button:last').contains('Subscribe').click()

    cy.visit('http://localhost:3000/user/style-preferences')
    .get('[alt="survey-image"]').eq(0).click()
    .get('[alt="survey-image"]').eq(1).click()
    .get('[alt="survey-image"]').eq(2).click()
    .get('[alt="survey-image"]').eq(3).click()
    .get('[alt="survey-image"]').eq(4).click()
    .get('[data-testId="MenuItemButton"]').eq(4).click()

    cy.visit('http://localhost:3000/crates')
    .get('button:last').contains('Subscribe').click()
  })

})