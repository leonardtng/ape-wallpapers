import { AxiosRequestConfig } from "axios";

const localUrl = "https://api.apewallpapers.com/";
const prodUrl = "http://localhost:8000/";

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
