import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export default function ShowBalance() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [balance, setBalance] = useState(0);

  async function getUserBalance() {
    if (!wallet.publicKey) {
      return;
    }
    const balance = await connection.getBalance(wallet?.publicKey);
    setBalance(balance / LAMPORTS_PER_SOL);
  }
  useEffect(() => {
    getUserBalance();
  }, [wallet]);

  return <>Balance: {balance} SOL</>;
}
