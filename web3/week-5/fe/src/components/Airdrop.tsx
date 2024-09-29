import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

export default function Airdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState("");

  async function sendAirdropToUser() {
    if (!wallet.publicKey) {
      console.log(`public key is null`);
      return;
    }
    await connection.requestAirdrop(
      wallet.publicKey,
      Number(amount) * LAMPORTS_PER_SOL
    );
    alert("Airdrop successful");
  }
  return (
    <div>
      <input
        type="text"
        placeholder="amount"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <button onClick={sendAirdropToUser}>Send Airdrop</button>
    </div>
  );
}
