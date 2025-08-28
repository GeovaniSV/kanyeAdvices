import axios from "axios";

const appAdvice = axios.create({
  baseURL: "https://api.adviceslip.com",
});

const kanyeApp = axios.create({
  baseURL: "https://api.kanye.rest",
});

export { appAdvice, kanyeApp };
