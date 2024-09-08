import { Keypair, PublicKey } from "@solana/web3.js";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { useState, useEffect } from "react";
import nacl from "tweetnacl";
import { solBalance } from "../utils";

interface Keys {
  key: PublicKey;
  balance: number;
}

export function SolanaWallet({ mnemonic }: { mnemonic: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<Keys[]>([]);

  // Reset state when mnemonic changes
  useEffect(() => {
    setCurrentIndex(0);
    setPublicKeys([]);
  }, [mnemonic]);

  const addWallet = async () => {
    if (!mnemonic) {
      console.error("No mnemonic provided");
      return;
    }

    try {
      const seed = await mnemonicToSeed(mnemonic);
      const path = `m/44'/501'/${currentIndex}'/0'`;
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keyPair = Keypair.fromSecretKey(secret);
      setCurrentIndex((prev) => prev + 1);
      const balance = await solBalance(keyPair.publicKey);
      setPublicKeys((prevKeys) => [
        ...prevKeys,
        { key: keyPair.publicKey, balance: balance },
      ]);
    } catch (error) {
      console.error("Error generating wallet:", error);
    }
  };

  return (
    <>
      <br />
      <h2>Solana</h2>
      <button onClick={addWallet} disabled={!mnemonic}>
        Add Wallet
      </button>
      {publicKeys.map((p, index) => (
        <div key={index}>
          {p.key.toBase58()} - {p.balance === 0 ? 0 : p.balance / 1e9}
          {" Sol"}
        </div>
      ))}
    </>
  );
}
