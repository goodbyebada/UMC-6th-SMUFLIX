const TOKEN = "token";
const USER_NAME = "username";

export const storeToken = (obj) => {
  window.localStorage.setItem(TOKEN, obj.token);
  window.localStorage.setItem(USER_NAME, obj.username);
};

export const removeToken = () => {
  const storgeToken = window.localStorage.getItem(TOKEN);
  console.log("storageToken:" + storgeToken);

  window.localStorage.removeItem(TOKEN);
  window.localStorage.removeItem(USER_NAME);
};

/**
 * 토큰이 저장되어 있는지 확인하는 함수
 *
 * @param {string} tokenKey - 로컬 스토리지에서 토큰이 저장된 키
 * @returns {boolean} - 토큰이 저장되어 있으면 true, 그렇지 않으면 false
 */

export const isTokenStored = () => {
  const storgeToken = window.localStorage.getItem(TOKEN);
  const storgeUserName = window.localStorage.getItem(USER_NAME);

  return Boolean(storgeToken && storgeUserName);
};
