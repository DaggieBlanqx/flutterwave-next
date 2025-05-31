import { useState } from 'react';

export function useCheckoutStatus() {
  const [status, setStatus] = useState(null);

  const onSuccess = (data) => {
    setStatus({ status: 'success', data });
  };

  const onClose = () => {
    setStatus({ status: 'closed' });
  };

  return { status, onSuccess, onClose };
}
