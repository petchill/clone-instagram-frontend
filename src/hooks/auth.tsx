import { useCookies } from "react-cookie";

export function UseAuth() {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  function setAccessToken(token: string) {
    // set to cookie
    setCookie("access_token", token, { path: "/" });
  }

  function getAccessToken() {
    return cookies["access_token"];
  }

  function removeAccessToken() {
    removeCookie("access_token", { path: "/" });
  }

  return {
    setAccessToken,
    getAccessToken,
    removeAccessToken,
  };
}
