describe('Guest checkout flow', () => {
  const uniqueEmail = `e2e+${Date.now()}@f1store.com`;

  it('guest шукає ferrari, додає в кошик, реєструється, оформлює замовлення', () => {
    cy.visit('/');

    cy.get('input[placeholder="Пошук товарів"]').type('ferrari');

    cy.contains('button', 'Scuderia Ferrari Team Cap').click();
    cy.hash().should('eq', '#/product/p001');
    cy.contains('h1', 'Scuderia Ferrari Team Cap').should('be.visible');

    cy.contains('button', 'Додати в кошик').click();

    cy.get('header').contains('a', 'Кошик').click();
    cy.hash().should('eq', '#/cart');
    cy.contains('Scuderia Ferrari Team Cap').should('be.visible');

    cy.get('header').contains('a', 'Увійти').click();
    cy.hash().should('eq', '#/login');

    cy.contains('a', 'Створити').click();
    cy.hash().should('eq', '#/register');

    cy.get('input[name="firstName"]').type('Max');
    cy.get('input[name="lastName"]').type('Verstappen');
    cy.get('input[name="email"]').type(uniqueEmail);
    cy.get('input[name="password"]').type('f1store2026');
    cy.get('input[name="passwordConfirm"]').type('f1store2026');
    cy.contains('button', 'Створити акаунт').click();

    cy.hash().should('eq', '#/');
    cy.get('header').contains('Max');

    cy.get('header').contains('a', 'Кошик').click();
    cy.hash().should('eq', '#/cart');
    cy.contains('a', 'Оформити замовлення').click();

    cy.hash().should('eq', '#/checkout');
    cy.get('input[name="address"]').type('вул. Соборна, 95, кв. 4');
    cy.get('input[name="city"]').type('Вінниця');
    cy.get('input[name="postalCode"]').type('21000');

    cy.contains('button', 'Підтвердити замовлення').click();

    cy.contains('h1', 'Замовлення прийнято', { timeout: 10000 }).should('be.visible');
    cy.contains('a', 'Продовжити покупки').should('be.visible');
  });
});
