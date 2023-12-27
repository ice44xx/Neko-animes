export const storeToken = (token: string, userInfo: any) => ({
  type: 'STORE_TOKEN',
  payload: { token, userInfo },
});
