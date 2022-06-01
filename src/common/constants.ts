import { AxiosRequestConfig } from "axios";

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
        baseURL:
          "https://cors-anywhere.herokuapp.com/https://boredapeyachtclub.com/api/",
        responseType: "json",
        method: "GET",
      };
  }
};
