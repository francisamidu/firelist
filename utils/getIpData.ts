import getConfig from "next/config";
import ky from "ky-universal";
import { Result } from "../types";
const { publicRuntimeConfig } = getConfig();
const { IPDATA_API_KEY } = publicRuntimeConfig;

const getIpData = async () => {
  try {
    const URL = `https://api.ipdata.co?api-key=${IPDATA_API_KEY}`;
    const res = await ky(URL).json<Result>();
    return res;
  } catch (error) {
    throw error;
  }
};
export default getIpData;
