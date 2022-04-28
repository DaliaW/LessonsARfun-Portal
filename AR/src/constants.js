var tmp;
if (process.env.NODE_ENV === "production")
  tmp =
    "https://infinite-garden-37966.herokuapp.com"; // api production link here
else tmp = `http://192.168.1.2:1337`;
export const link = tmp;
