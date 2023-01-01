const isLogin = !!localStorage.getItem("memberNum");

const logout = () =>{
  localStorage.removeItem("memberNum");
  localStorage.removeItem("userNickname");
  window.location.replace("/");
};

export {isLogin, logout};