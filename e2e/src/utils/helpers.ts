import { Page } from '@playwright/test';

/**
 * Wait for a network request matching a URL pattern.
 */
export async function waitForRequest(
  page: Page,
  urlPattern: string | RegExp,
  action: () => Promise<void>
): Promise<void> {
  await Promise.all([
    page.waitForRequest(urlPattern),
    action(),
  ]);
}

/**
 * Wait for a network response matching a URL pattern.
 */
export async function waitForResponse(
  page: Page,
  urlPattern: string | RegExp,
  action: () => Promise<void>
): Promise<void> {
  await Promise.all([
    page.waitForResponse(urlPattern),
    action(),
  ]);
}

/**
 * Retry a function up to `attempts` times with a delay.
 */
export async function retry<T>(
  fn: () => Promise<T>,
  attempts = 3,
  delayMs = 500
): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i < attempts - 1) await new Promise(r => setTimeout(r, delayMs));
    }
  }
  throw lastError;
}

/**
 * Generate a unique string (useful for test data).
 */
export function uniqueId(prefix = 'test'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * Sleep for a given number of milliseconds.
 * Prefer Playwright's built-in waits; use this only as a last resort.
 */
export async function sleep(ms: number): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Remove one or more localStorage keys on the current page origin.
 */
export async function clearLocalStorageKeys(page: Page, keys: string[]): Promise<void> {
  await page.evaluate((storageKeys) => {
    storageKeys.forEach((key) => localStorage.removeItem(key));
  }, keys);
}
