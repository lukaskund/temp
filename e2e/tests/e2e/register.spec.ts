import { test, expect } from '@/fixtures/index';
import { buildRegisterTestUser, createRegisterEmail } from '../test-data/register-data';

test.describe('PawShop register', () => {
  test.beforeEach(async ({ pom }) => {
    await pom.registerPage.clearRegistrationState();
    await pom.registerPage.openAndExpectVisible();
  });

  test('A user with valid details should be able to register successfully', async ({ pom }) => {
    const user = buildRegisterTestUser({ email: createRegisterEmail('valid') });
    await pom.registerPage.registerWithUser(user);
    await pom.registerPage.waitForHomeAfterRegister();
    await expect(pom.navigation.username).toBeVisible();
  });

  test('Registering with an already existing email should show an error', async ({ pom }) => {
    const existingEmail = createRegisterEmail('duplicate');
    const firstRegistrationUser = buildRegisterTestUser({ email: existingEmail });
    const secondRegistrationUser = buildRegisterTestUser({
      firstName: 'John',
      lastName: 'Smith',
      email: existingEmail,
    });

    await pom.registerPage.registerAndReturnToRegister(firstRegistrationUser);
    await pom.registerPage.registerWithUser(secondRegistrationUser);
    await pom.registerPage.expectExistingEmailError();
    await expect(pom.registerPage.registerErrorAlert).toBeVisible();
  });

  test('Submitting with mismatched passwords should show a validation error', async ({ pom }) => {
    const user = buildRegisterTestUser({
      email: createRegisterEmail('mismatch'),
      confirmPassword: 'password124',
    });
    await pom.registerPage.registerWithUser(user);

    await pom.registerPage.expectMismatchedPasswordError();
    await expect(pom.registerPage.confirmPasswordValidationError).toBeVisible();
  });

  test('Submitting an empty form should show validation errors', async ({ pom }) => {
    await pom.registerPage.submit();

    await pom.registerPage.expectEmptyFormValidationErrors();
    await expect(pom.registerPage.registerErrorAlert).toBeHidden();
  });
});
