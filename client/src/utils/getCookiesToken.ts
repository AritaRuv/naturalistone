import Cookies from "js-cookie";


export function getToken(){
  const sessionId = Cookies.get("sessionId");
  return sessionId;
}