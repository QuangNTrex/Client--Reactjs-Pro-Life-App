// const domain = "localhost:5000/";
// const methodHttp = "http://";
let mode = "",
  domain,
  methodHttp;

// mode = "deploy";

if (mode === "deploy") {
  domain = "pro-and-life.onrender.com/";
  methodHttp = "https://";
} else {
  domain = "localhost:5000/";
  methodHttp = "http://";
}

export const HTTP = (params) => {
  return fetch(methodHttp + (domain + params).replace(/[/]+/gi, "/"), {
    credentials: "include",
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const HTTPPOST = (params, body) => {
  return fetch(methodHttp + (domain + params).replace(/[/]+/gi, "/"), {
    credentials: "include",
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
