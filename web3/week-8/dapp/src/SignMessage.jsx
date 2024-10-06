import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import bs58 from "bs58";

export default function SignMessage() {
  const { publicKey, signMessage } = useWallet();
  const [message, setMessage] = useState("");

  async function SigningMessage() {
    if (!publicKey) throw new Error("Wallet not connected");
    if (!signMessage)
      throw new Error("Wallet does not support message signing!");

    let encodedMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodedMessage);

    if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes()))
      throw new Error("Message signature invalid!");
    console.log("success", `Message signature: ${bs58.encode(signature)}`);
  }

  return (
    <>
      <h2>Sign Message</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <br />
      <button onClick={SigningMessage}>Sign Message</button>
      <br />
    </>
  );
}
