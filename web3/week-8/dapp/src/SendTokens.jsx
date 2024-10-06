import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useState } from "react";

export default function SendTokens() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  async function sendToken() {
    const transaction = new Transaction();
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey(to),
        lamports: Number(amount) * LAMPORTS_PER_SOL,
      })
    );
    await wallet.sendTransaction(transaction, connection);
    alert(`Sent ${amount} SOL to ${to}`);
  }

  return (
    <>
      <h2>Send Solana</h2>
      <input
        placeholder="to"
        type="text"
        value={to}
        onChange={(e) => {
          setTo(e.target.value);
        }}
      />
      <br />
      <input
        placeholder="amount"
        type="text"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <br />
      <button onClick={sendToken}>Send</button>
    </>
  );
}
