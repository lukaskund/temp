export type CheckoutDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal: string;
  country: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  cardName: string;
};

export function buildCheckoutDetails(overrides: Partial<CheckoutDetails> = {}): CheckoutDetails {
  return {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@pawshop.com',
    phone: '+15550000000',
    address: '123 Main Street',
    city: 'New York',
    postal: '10001',
    country: 'US',
    cardNumber: '4242424242424242',
    cardExpiry: '1228',
    cardCvv: '123',
    cardName: 'Jane Doe',
    ...overrides,
  };
}
