import { test, expect } from '@/fixtures/index';

test.describe('PawShop login', () => {
  test.describe('Unauthenticated flows', () => {
    test.beforeEach(async ({ pom }) => {
      await pom.loginPage.clearUserSession();
      await pom.loginPage.openAndExpectVisible();
    });

    test('A user with valid credentials should be able to log in successfully', async ({ pom, testUser }) => {
      await pom.loginPage.loginAndWaitForHome(testUser.email, testUser.password);
      await pom.navigation.expectLoggedInState();

      await expect(pom.navigation.loginButton, 'Login button should be hidden after successful login.').toBeHidden();
    });

    test('A user with wrong credentials should see an error message', async ({ pom }) => {
      await pom.loginPage.loginWithCredentials('wrong-user@pawshop.com', 'wrong-password');

      await pom.loginPage.expectInvalidCredentialsError();
      await pom.loginPage.expectLoginPageVisible();
      await expect(pom.loginPage.loginErrorAlert, 'Wrong credentials should surface an auth error.').toBeVisible();
    });

    test('Submitting an empty form should show validation errors', async ({ pom }) => {
      await pom.loginPage.submitEmptyForm();

      await pom.loginPage.expectValidationErrorsForRequiredFields();
      await expect(pom.loginPage.loginErrorAlert, 'Global login error should stay hidden for empty-form validation.').toBeHidden();
    });
  });

  test.describe('Authenticated flows', () => {
    test.beforeEach(async ({ authenticatedPom }) => {
      await authenticatedPom.loginPage.clearUserSession();
      await authenticatedPom.loginPage.openAndExpectVisible();
      await authenticatedPom.loginPage.loginAsDemoUser();
      await authenticatedPom.navigation.expectLoggedInState();
    });

    test('A user who is already logged in should not be able to access the login page', async ({ authenticatedPom }) => {
      await expect(
        authenticatedPom.navigation.loginButton,
        'Login button should not be visible on the home page for authenticated users.'
      ).toBeHidden();
    });

    test('A logged in user should be able to log out', async ({ authenticatedPom }) => {
      await authenticatedPom.navigation.logoutAndWaitForHome();
      await authenticatedPom.navigation.expectLoggedOutState();
      await expect(
        authenticatedPom.navigation.username,
        'Authenticated username should no longer be visible after logout.'
      ).toBeHidden();
    });
  });
});
