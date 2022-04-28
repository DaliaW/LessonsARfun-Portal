require("dotenv").config();

// backend route
var tmp;
if (process.env.NODE_ENV === "production")
  tmp = "https://infinite-garden-37966.herokuapp.com";
// api production link here
else tmp = `http://localhost:1337`;
export const link = tmp;

// AR environment route
var ARtmp;
if (process.env.NODE_ENV === "production")
  ARtmp = "https://my-ar-environment.netlify.app"; // production link here
else ARtmp = `https://192.168.1.2:3001`;

export const ARlink = ARtmp;

export function dateFormat(input) {
  const date = new Date(input);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return year + "-" + month + "-" + day;
}
