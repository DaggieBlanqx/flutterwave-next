# flutterwave-next

A small client-side-safe React/Next.js library to integrate Flutterwave Checkout into your Next.js or React app.

## Version

[![npm version](https://badge.fury.io/js/flutterwave-next.svg)](https://badge.fury.io/js/flutterwave-next)
[![npm](https://img.shields.io/npm/dt/flutterwave-next.svg)](https://www.npmjs.com/package/flutterwave-next)
[![GitHub license](https://img.shields.io/github/license/oluwaseunolufemi/flutterwave-next.svg)](https://img.shields.io/github/license/oluwaseunolufemi/flutterwave-next.svg)

## Motivation

- The popular [Flutterwave library](https://github.com/Flutterwave/React-v3/issues/60) is currently incompatible with Next.js, primarily due to outdated dependencies and issues with React 19.
- As a result, I often had to implement custom workarounds to integrate Flutterwave Checkout into Next.js projects.
- This library was created to eliminate those workarounds and offer a clean, reliable solution for using Flutterwave Checkout in both React and Next.js apps.
- It is not an official Flutterwave library, rather, it’s a lightweight wrapper around the official v3.js script (https://checkout.flutterwave.com/v3.js).
- You’re free to extend, customize, or contribute to the library as needed.
- The Flutterwave script is loaded only once, and the payment function can be triggered multiple times without reloading.
- It ships with no external dependencies beyond React, and includes both a prebuilt button component and a hook-based API for programmatic use.

---

## 📦 Install

```bash
npm install flutterwave-next
```

## 🚀 Features

✅ Safe for Next.js App Router

⚙️ Use with a Button or programmatically via hooks

📦 No dependencies (uses native React + Flutterwave's CDN script)

🎛 Customizable: pass any valid Flutterwave config

## 🧩 Usage — FlutterwaveButton

```jsx
'use client';

import { FlutterwaveButton } from 'flutterwave-next';

export default function Page() {
  return (
    <FlutterwaveButton
      public_key="FLWPUBK_TEST-xxxxxxxxxxxxxxxx"
      tx_ref={`tx-${Date.now()}`}
      amount={2500}
      payment_options=['mpesa','card']
      customer={{
        email: 'test@mail.com',
        phone_number: '08100000000',
        name: 'John Doe',
      }}
      customizations={{
        title: 'My Store',
        description: 'Payment for items in cart',
        logo: 'https://example.com/logo.png',
      }}
      callback={(data) => {
        console.log('Payment Success:', data);
        alert(`Payment complete! Ref: ${data.transaction_id}`);
      }}
      onclose={() => {
        console.log('Payment closed');
        alert('Payment was cancelled.');
      }}
    />
  );
}
```

## 🎣 Advanced Usage — Hooks

#### useFlutterwaveCheckout()

Use this when you want to control when and how to trigger payments.

```jsx
'use client';

import { useFlutterwaveCheckout } from 'flutterwave-next';

export default function CustomPaymentButton() {
  const { initiatePayment, ready } = useFlutterwaveCheckout({
    public_key: 'FLWPUBK_TEST-xxxxxxxxxxxxxxxx',
    tx_ref: `tx-${Date.now()}`,
    amount: 5000,
    currency: 'NGN',
    payment_options=['card','banktransfer'],
    customer: {
      email: 'user@example.com',
      phone_number: '08000000000',
      name: 'User Name',
    },
    customizations: {
      title: 'My Store',
      description: 'Secure Payment',
      logo: 'https://example.com/logo.png',
    },
    callback: (data) => console.log('Payment complete!', data),
    onclose: () => console.log('Checkout closed'),
  });

  return (
    <button onClick={initiatePayment} disabled={!ready}>
      {ready ? 'Pay Now' : 'Loading...'}
    </button>
  );
}
```

#### useCheckoutStatus()

Tracks and stores payment status (success / closed):

```jsx
'use client';

import { useFlutterwaveCheckout, useCheckoutStatus } from 'flutterwave-next';

export default function PayWithStatus() {
  const { status, onSuccess, onClose } = useCheckoutStatus();

  const { initiatePayment, ready } = useFlutterwaveCheckout({
    public_key: 'FLWPUBK_TEST-xxxxxxxxxxxxxxxx',
    tx_ref: `tx-${Date.now()}`,
    amount: 3000,
    currency: 'NGN',
    payment_options=['card','banktransfer'],
    customer: {
      email: 'customer@example.com',
      phone_number: '08000000000',
      name: 'Customer',
    },
    customizations: {
      title: 'My Store',
      description: 'Order Payment',
      logo: 'https://example.com/logo.png',
    },
    callback: onSuccess,
    onclose: onClose,
  });

  return (
    <>
      <button onClick={initiatePayment} disabled={!ready}>
        {ready ? 'Pay Now' : 'Loading...'}
      </button>
      {status?.status === 'success' && (
        <p>✅ Paid: {status.data.transaction_id}</p>
      )}
      {status?.status === 'closed' && <p>❌ Payment cancelled</p>}
    </>
  );
}
```

### 🔒 Environment-Specific Public Keys

Store your public key in your .env file:

```bash
NEXT_PUBLIC_FLUTTERWAVE_KEY=FLWPUBK_TEST-xxxxxxxxxxxxxxxx
```

Then use it in your component:

```js

public_key={process.env.NEXT_PUBLIC_FLUTTERWAVE_KEY}
```

### 🧠 Notes

This library only supports client-side rendering ('use client' is required).

Works great with Next.js App Router or Create React App.

You are responsible for verifying transactions on your backend via webhook or Flutterwave’s status API.

This is for frontend only — no sensitive keys should be exposed.

### 📄 License

MIT © 2025 — [Daggie Blanqx @daggieblanqx](https://github.com/daggieblanqx)
