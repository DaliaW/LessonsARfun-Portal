async function checkLogin() {
  try {
    const token = localStorage.getItem("user");
    if (token) {
      return token;
    } else {
      document.location.href = "/login";
    }
  } catch (err) {
    localStorage.removeItem("user");
    document.location.href = window.location.origin + "/login";
    console.log("err", err);
  }
}

export default checkLogin;
