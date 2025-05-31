'use client';

import { useFlutterwaveScript } from './hooks/useFlutterwaveCheckout';

export function FlutterwaveButton({
  public_key,
  tx_ref,
  amount,
  currency = 'NGN',
  payment_options = 'card, banktransfer, ussd',
  customer,
  meta,
  customizations,
  callback = (data) => console.log('Flutterwave callback:', data),
  onclose = () => console.log('Flutterwave closed'),
  className = '',
  children = 'Pay Now',
}) {
  const loaded = useFlutterwaveScript();

  const handleClick = () => {
    if (!window.FlutterwaveCheckout) return;

    window.FlutterwaveCheckout({
      public_key,
      tx_ref,
      amount,
      currency,
      payment_options,
      customer,
      meta,
      customizations,
      callback,
      onclose,
    });
  };

  return (
    <button
      type="button"
      disabled={!loaded}
      onClick={handleClick}
      className={className}
    >
      {loaded ? children : 'Loading...'}
    </button>
  );
}
