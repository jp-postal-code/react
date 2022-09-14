import { useState, useEffect } from 'react';
import { fetchAddresses } from '@jp-postal-code/api-client';
import type { Address } from './address.js';

export interface UseFetchAddressesState {
  addresses?: Address[];
  loading: boolean;
  error?: unknown;
}

export function useFetchAddresses(postalCode: string): UseFetchAddressesState {
  const [addresses, setAddresses] = useState<Address[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      try {
        setLoading(true);

        const addresses = await fetchAddresses(postalCode, {
          signal: abortController.signal,
        });

        setAddresses(addresses);
      } catch (error) {
        // abort による error の場合は error に設定しない
        if (!abortController.signal.aborted) {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [postalCode]);

  return {
    addresses,
    loading,
    error,
  };
}
