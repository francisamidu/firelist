import kyUniversal from "ky-universal";
import getConfig from "next/config";
import { IpData } from "../types";
const {
  publicRuntimeConfig: { IPDATA_API_KEY },
} = getConfig();

export const getIpData = async () => {
  try {
    const URL = `https://api.ipdata.co?api-key=${IPDATA_API_KEY}`;
    return await kyUniversal(URL).json<IpData>();
  } catch (error) {
    throw error;
  }
};
