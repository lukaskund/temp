import { uniqueId } from '@/utils/helpers';

export type RegisterTestUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterTestUserOverrides = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export function createRegisterEmail(tag: string) {
  return `${uniqueId(`register-${tag}`)}@pawshop.com`;
}

export function buildRegisterTestUser(overrides: RegisterTestUserOverrides = {}): RegisterTestUser {
  const password = overrides.password ?? 'password123';

  return {
    firstName: overrides.firstName ?? 'Jane',
    lastName: overrides.lastName ?? 'Doe',
    email: overrides.email ?? `${uniqueId('register')}@pawshop.com`,
    password,
    confirmPassword: overrides.confirmPassword ?? password,
  };
}
