import { expect, jest, test } from '@jest/globals';
import { useFetchAddresses } from '../../index.js';
import { renderHook, waitFor } from '@testing-library/react';

test('initial state', () => {
  const { result } = renderHook(() => useFetchAddresses(''));

  expect(result.current).toEqual({
    loading: false,
  });
});

test('get addresses', async () => {
  const { result } = renderHook(() => useFetchAddresses('1000001'));

  expect(result.current).toEqual({
    loading: true,
  });

  // レスポンスを待機する
  await waitFor(() => {
    expect(result.current).toEqual({
      addresses: [
        {
          postalCode: '1000001',
          regionId: 13,
          region: '東京都',
          locality: '千代田区',
          address1: '千代田',
          address2: '',
          regionKana: 'トウキョウト',
          localityKana: 'チヨダク',
          address1Kana: 'チヨダ',
          address2Kana: '',
        },
      ],
      loading: false,
    });
  });
});

test('not found', async () => {
  const { result } = renderHook(() => useFetchAddresses('0000000'));

  expect(result.current).toEqual({
    loading: true,
  });

  // レスポンスを待機する
  await waitFor(() => {
    expect(result.current).toEqual({
      loading: false,
      error: new Error('Cannot fetch addresses: Not Found'),
    });
  });
});

test('abort if postal code changed', async () => {
  const abortSpy = jest.spyOn(AbortController.prototype, 'abort');

  const { result, rerender } = renderHook(
    ({ postalCode }) => useFetchAddresses(postalCode),
    {
      initialProps: {
        postalCode: '1000001',
      },
    }
  );

  expect(result.current).toEqual({
    loading: true,
  });

  // まだ呼ばれないはず
  expect(abortSpy).toBeCalledTimes(0);

  rerender({ postalCode: '1000000' });

  // postalCode が変わったので abort 呼ばれる
  expect(abortSpy).toBeCalledTimes(1);

  await waitFor(() => {
    expect(result.current).toEqual({
      addresses: [
        {
          postalCode: '1000000',
          regionId: 13,
          region: '東京都',
          locality: '千代田区',
          address1: '',
          address2: '',
          regionKana: 'トウキョウト',
          localityKana: 'チヨダク',
          address1Kana: '',
          address2Kana: '',
        },
      ],
      loading: false,
    });
  });
});
