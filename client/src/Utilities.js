function getCookieWithKey(key) {
  const pairs = document.cookie.split(";");
  for (const pair of pairs) {
    const splitPair = pair.split("=");
    const entryKey = (splitPair[0]+'').trim();
    if (entryKey === key) {
      return splitPair[1];
    } 
  }
  return "";
}


export function getAccessToken() {
    const unformattedAccessToken = getCookieWithKey("user_access_token");
    if (unformattedAccessToken === null || unformattedAccessToken === undefined || unformattedAccessToken === "") {
      return unformattedAccessToken;
    } else {
      const accessTokenParts = unformattedAccessToken.split("\"");

      if (accessTokenParts.length < 5) {
        return "";
      } else {
        return accessTokenParts[4].slice(0,-1);
      }
    }
}


export function getFrontEndHost() {
  if (process.env["NODE_ENV"] === "development") {
    return "http://localhost:3000";
  } else {
    return "https://sample-will.herokuapp.com";
  }
}


export function getBackEndHost() {
  if (process.env["NODE_ENV"] === "development") {
    return "http://localhost:5000";
  } else {
    return "https://sample-will.herokuapp.com";
  }
}