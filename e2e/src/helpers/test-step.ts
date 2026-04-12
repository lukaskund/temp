import { test } from '@playwright/test';

const formatMethodNameIntoStepDescription = (input: string) => {
  const words = input.replaceAll(/([A-Z])/g, ' $1').trim();
  const result = words.charAt(0).toUpperCase() + words.slice(1).toLowerCase();

  return result;
};

const formatParametersForDescription = (parameters: unknown[]): string => {
  if (parameters.length === 0) return '';

  const formattedParameters = parameters
    .filter((parameter) => parameter !== undefined && parameter !== null)
    .map((parameter) => {
      if (typeof parameter === 'string') return parameter;
      if (typeof parameter === 'object') return JSON.stringify(parameter);
      if (typeof parameter === 'number' || typeof parameter === 'boolean') {
        return String(parameter);
      }

      return 'unknown';
    })
    .join(', ');

  return formattedParameters ? ` : ${formattedParameters}` : '';
};

/**
 * Named step in the HTML report and trace, with `box: true` for clearer failures.
 */
export async function testStep<T>(title: string, body: () => T | Promise<T>): Promise<T> {
  return test.step(title, async () => body(), { box: true });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TestStep<T extends (...arguments_: any[]) => any>(
  target: T,
  context: ClassMethodDecoratorContext
): T {
  async function replacementMethod(this: ThisParameterType<T>, ...arguments_: Parameters<T>) {
    const methodName = String(context.name);
    const baseDescription = formatMethodNameIntoStepDescription(methodName);
    const parameterDescription = formatParametersForDescription([...arguments_]);
    const fullDescription = `${baseDescription}${parameterDescription}`;

    return await test.step(fullDescription, () => target.apply(this, arguments_), { box: true });
  }

  return replacementMethod as T;
}
