export const generateTempId = () => {
  return Date.now() + Math.floor(Math.random() * 1000);
};
export const isTokenExpired = (token) => {
  const payload = JSON.parse(atob(token.split(".")[1]));
  const now = Date.now() / 1000;
  return payload.exp < now;
};
