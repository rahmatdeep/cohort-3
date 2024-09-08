import { Keypair, PublicKey } from "@solana/web3.js";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { useState } from "react";
import nacl from "tweetnacl";
import { solBalance } from "../utils";

interface SolanaWalletType {
  mnemonic: string;
}

interface Keys {
  key: PublicKey;
  balance: number;
}

export function SolanaWallet({ mnemonic }: SolanaWalletType) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<Keys[]>([]);

  return (
    <>
      <br />
      <h2>Solana</h2>
      <button
        onClick={async function () {
          const seed = mnemonicToSeed(mnemonic);
          const path = `m/44'/501'/${currentIndex}'/0'`;
          const derivedSeed = derivePath(path, seed.toString()).key;
          const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
          const keyPair = Keypair.fromSecretKey(secret);
          setCurrentIndex((prev) => prev + 1);
          const balance = await solBalance(keyPair.publicKey);
          setPublicKeys([
            ...publicKeys,
            { key: keyPair.publicKey, balance: balance },
          ]);
        }}
      >
        {" "}
        Add Wallet{" "}
      </button>
      {publicKeys.map((p) => (
        <div>
          {p.key.toBase58()} - {p.balance === 0 ? 0 : p.balance / 1e9}
          {" Sol"}
        </div>
      ))}
    </>
  );
}
