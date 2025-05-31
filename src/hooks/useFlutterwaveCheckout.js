import { useEffect, useState, useCallback } from 'react';

let isScriptLoaded = false;

export function useFlutterwaveScript() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || isScriptLoaded) {
      setLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.flutterwave.com/v3.js';
    script.async = true;
    script.onload = () => {
      isScriptLoaded = true;
      setLoaded(true);
    };
    script.onerror = () => console.error('Failed to load Flutterwave script');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return loaded;
}

export function useFlutterwaveCheckout(config) {
  const ready = useFlutterwaveScript();

  const initiatePayment = useCallback(() => {
    if (!ready || !window.FlutterwaveCheckout) return;
    window.FlutterwaveCheckout(config);
  }, [ready, config]);

  return {
    initiatePayment,
    ready,
  };
}
