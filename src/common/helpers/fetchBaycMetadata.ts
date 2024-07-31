import axios from "axios";
import { API_CONFIG as config } from "../constants";
import { ipfs as API } from "../endpoints";
import { toCamelCase } from "./caseTransformer";
import { BaycIpfsMetadata } from "../../models/api/BaycMetadata";

export const fetchBaycMetadata = async (tokenId: number) => {
  const canceler = axios.CancelToken.source();

  const response = await axios.request({
    ...config("ipfs"),
    url: `${API.baycMetadata}/${tokenId}`,
    cancelToken: canceler.token,
  });

  const normalizedResponse = toCamelCase(response.data) as BaycIpfsMetadata;

  return normalizedResponse;
};
