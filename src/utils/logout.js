export const clearSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("loginTime");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("role");
  localStorage.removeItem("identifier");

  sessionStorage.clear(); 
};