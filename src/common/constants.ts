import { AxiosRequestConfig } from "axios";

const localUrl = "http://localhost:8000/";
const prodUrl = "https://api.apewallpapers.com/";

export const API_CONFIG: (server: "ipfs" | "bayc") => AxiosRequestConfig = (
  server: "ipfs" | "bayc"
) => {
  switch (server) {
    case "ipfs":
      return {
        baseURL: "https://ipfs.io/ipfs/",
        responseType: "json",
        method: "GET",
      };
    case "bayc":
      return {
        baseURL: process.env.NODE_ENV === "production" ? prodUrl : localUrl,
        responseType: "json",
        method: "GET",
      };
  }
};
