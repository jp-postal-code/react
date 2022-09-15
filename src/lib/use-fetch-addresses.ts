import { useState, useEffect } from 'react';
import { fetchAddresses } from '@jp-postal-code/api-client';
import type { Address } from './address.js';
import { normalizePostalCode } from './normalize-postal-code.js';
import { validatePostalCode } from './validate-postal-code.js';

export interface UseFetchAddressesState {
  addresses?: Address[];
  loading: boolean;
  error?: unknown;
}

export function useFetchAddresses(postalCode: string): UseFetchAddressesState {
  postalCode = normalizePostalCode(postalCode);

  const [addresses, setAddresses] = useState<Address[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    if (!validatePostalCode(postalCode)) {
      return;
    }

    const abortController = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(undefined);

        const addresses = await fetchAddresses(postalCode, {
          signal: abortController.signal,
        });

        setAddresses(addresses);
      } catch (error) {
        // abort による error の場合は error に設定しない
        if (!abortController.signal.aborted) {
          setAddresses(undefined);
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
