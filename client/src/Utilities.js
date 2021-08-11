export const USER_ACCESS_TOKEN_KEY = "user_access_token";
export const USER_ID_TOKEN_KEY = "user_id_token";
export const DEFAULT_DISASTER_FIELD_TEXT = "No data available from witness reports"

export function getCookieWithKey(key) {
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
    const unformattedAccessToken = getCookieWithKey(USER_ACCESS_TOKEN_KEY);
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


export function displayDisasterDataLine(stateData) {
  if (stateData) {
    return stateData;
  } else {
    return DEFAULT_DISASTER_FIELD_TEXT;
  }
}

export function formatLatitudeLongitude(locationData) {
  const [latitude, longitude] = locationData;
  const formattedLatitude = Math.abs(latitude) + "° " + (latitude >= 0 ? "N" : "S");
  const formattedLongitude = Math.abs(longitude) + "° " + (longitude >= 0 ? "E" : "W");

  return formattedLatitude + ", " + formattedLongitude;

}