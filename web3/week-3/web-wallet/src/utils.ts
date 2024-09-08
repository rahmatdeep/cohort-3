import { PublicKey } from "@solana/web3.js";
import axios from "axios";

export async function solBalance(key: PublicKey): Promise<number> {
  const data = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "getBalance",
    params: [key],
  });
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://solana-mainnet.g.alchemy.com/v2/Q8qThEvRBKn0RVZG0B3ZxbhqjzBXSCfG",
    headers: {
      "Content-Type": "application/json",
      Cookie:
        "_cfuvid=Cii3oju3vPf6wnzITwxVIns9lnxlCoa1xhvjb_nKMwM-1725753079558-0.0.1.1-604800000",
    },
    data: data,
  };
  const balance = await axios.request(config);
  return Number(balance.data.result.value);
}

export async function ethBalance(key: string): Promise<number> {
  const data = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getBalance",
    params: [key],
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://eth-mainnet.g.alchemy.com/v2/Q8qThEvRBKn0RVZG0B3ZxbhqjzBXSCfG",
    headers: {
      "Content-Type": "application/json",
      Cookie:
        "_cfuvid=Cii3oju3vPf6wnzITwxVIns9lnxlCoa1xhvjb_nKMwM-1725753079558-0.0.1.1-604800000",
    },
    data: data,
  };

  const response = await axios.request(config);
  const bal = response.data.result;
  const newBal = bal === "0x0" ? 0 : Number((Number(bal) / 1e18).toFixed(4));
  return newBal;
}
