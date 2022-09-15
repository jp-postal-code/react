/**
 * 郵便番号からハイフンを取り除きノーマライズする
 * @param postalCode 郵便番号
 */
export function normalizePostalCode(postalCode: string): string {
  return postalCode.replace(/[-]/g, '');
}
