import axios from "axios";

const appAdvice = axios.create({
  baseURL: "https://api.adviceslip.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const kanyeApp = axios.create({
  baseURL: "https://api.kanye.rest",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export { appAdvice, kanyeApp };
