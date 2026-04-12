import { ROUTE_PATTERNS } from '@/constants/routes';
import { TestStep } from '@/helpers/test-step';
import { BasePage } from '@/pages/BasePage';

export class NavigationPage extends BasePage {
  get logoutButton() {
    return this.page.getByTestId('nav-logout-btn');
  }

  get loginButton() {
    return this.page.getByTestId('nav-login-btn');
  }

  get username() {
    return this.page.getByTestId('nav-username');
  }

  @TestStep
  async logout() {
    await this.clickAndWait(this.logoutButton);
  }

  @TestStep
  async logoutAndWaitForHome() {
    await this.logout();
    await this.assertURL(ROUTE_PATTERNS.home, 'After logout, user should be on the home page.');
  }

  @TestStep
  async expectLoggedInState() {
    await this.assertVisible(this.username, 'Logged in user name should be shown in the navigation bar.');
    await this.assertVisible(this.logoutButton, 'Logout button should be available for authenticated users.');
  }

  @TestStep
  async expectLoggedOutState() {
    await this.assertVisible(this.loginButton, 'Login button should be visible after user logs out.');
  }
}
