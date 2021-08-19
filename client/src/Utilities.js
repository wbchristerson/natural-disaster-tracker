export const USER_ACCESS_TOKEN_KEY = "user_access_token";
export const USER_ID_TOKEN_KEY = "user_id_token";
export const DEFAULT_DISASTER_FIELD_TEXT = "No data available from witness reports";
export const OBSERVER_DATABASE_ID_KEY = "observer_database_id";
export const DISASTER_TYPES = ["Please select", "Earthquake", "Flood", "Wildfire", "Tornado", "Hurricane", "Tsunami", "Landslide", "Avalanche", "Volcano", "Other"];
const MONTH_ABBREVIATIONS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


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


export function isValidTime(timeString) {
  const regExp = /^\s*\d?\d:\d\d(:\d\d)?\s*$/;
  if (!regExp.test(timeString)) {
    return false;
  }
  const listedTime = timeString.trim();
  const hours = parseInt(timeString.charAt(1) == ':' ? timeString.slice(0, 1) : timeString.slice(0,2));
  const minutes = parseInt(timeString.charAt(1) == ':' ? timeString.slice(2,4) : timeString.slice(3,5));
  const seconds = timeString.length > 5 ? parseInt(timeString.charAt(1) == ":" ? timeString.slice(5,7) : timeString.slice(6,8)) : null;

  return 0 <= hours && hours < 24 && 0 <= minutes && minutes < 60 && 0 <= seconds && seconds < 60;
}


export function isValidNonnegativeInteger(integerString) {
  const regExp = /^\s*\d+\s*$/;
  return regExp.test(integerString);
}


export function isValidGeographicCoordinate(coordingateString) {
  const regExp = /^\s*-?0*\d\d?\d?(\.\d*)?\s*$/;
  if (!regExp.test(coordingateString)) {
    return false;
  }
  const numericCoordinate = parseInt(coordingateString);
  return -180 <= numericCoordinate && numericCoordinate <= 180;
}


export function isValidNonnegativeIntegerInRange(intString, loInclusive, HiInclusive) {
  const regExp = /^\s*\d+\s*$/;
  if (!regExp.test(intString)) {
    return false;
  }
  const intRepresentation = parseInt(intString);
  return loInclusive <= intRepresentation && intRepresentation <= HiInclusive;
}


export function isValidImageURL(urlString) {
  const regExp = /^\s*.*(\.jpg|\.jpeg|\.png)\s*$/;
  return regExp.test(urlString);
}


export function getGeneralTimeFormat(timeString) {
  // assumed that isValidTime(timeString) == true
  const trimmedTimeString = timeString.trim();
  if (trimmedTimeString.length == 4) {
    return "0" + trimmedTimeString + ":00";
  } else if (trimmedTimeString.length == 5) {
    return trimmedTimeString + ":00";
  } else {
    return trimmedTimeString;
  }
}


function getDateObjectFromDateTimeString(dateTimeString) {
  const [day, date, month, year, time, timeZone] = dateTimeString.split(' ');
  const [hours, minutes, seconds] = time.split(':');
  const formattedDate = (MONTH_ABBREVIATIONS.indexOf(month)+1).toString() + "/" + date + "/" + year;
  const formattedTime = hours + ":" + minutes + ":" + seconds + " UTC";

  return new Date(formattedDate + " " + formattedTime);
}


// assumed that num.string().length <= width
function getPaddedStringRepresentation(num, width) {
  const stringRepresentation = num.toString();
  let result = stringRepresentation;
  for (let i = 0; i < width - stringRepresentation.length; i++) {
    result = "0" + result;
  }
  return result;
}


export function getLocalTimeFromGMTDateTime(dateTimeString) {
  const givenDateTime = getDateObjectFromDateTimeString(dateTimeString);
  const displayHours = getPaddedStringRepresentation(givenDateTime.getHours(), 2);
  const displayMinutes = getPaddedStringRepresentation(givenDateTime.getMinutes(), 2);
  const displaySeconds = getPaddedStringRepresentation(givenDateTime.getSeconds(), 2);
  return displayHours + ":" + displayMinutes + ":" + displaySeconds;
}


export function getLocalDateFromGMTDateTime(dateTimeString) {
  const givenDateTime = getDateObjectFromDateTimeString(dateTimeString);
  const displayMonth = getPaddedStringRepresentation(givenDateTime.getMonth() + 1, 2);
  const displayDay = getPaddedStringRepresentation(givenDateTime.getDate(), 2);
  const displayYear = getPaddedStringRepresentation(givenDateTime.getFullYear(), 2);
  return displayYear + "-" + displayMonth + "-" + displayDay;
}