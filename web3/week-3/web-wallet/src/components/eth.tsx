import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { useState, useEffect } from "react";
import { ethBalance } from "../utils";

interface Keys {
  key: string;
  balance: number;
}

export function EthWallet({ mnemonic }: { mnemonic: string }) {
  const [index, setIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<Keys[]>([]);

  // Reset state when mnemonic changes
  useEffect(() => {
    setIndex(0);
    setPublicKeys([]);
  }, [mnemonic]);

  const addWallet = async () => {
    if (!mnemonic) {
      console.error("No mnemonic provided");
      return;
    }

    try {
      const seed = await mnemonicToSeed(mnemonic);
      const derivationPath = `m/44'/60'/${index}'/0/0`;
      const hdNode = HDNodeWallet.fromSeed(seed);
      const child = hdNode.derivePath(derivationPath);
      const wallet = new Wallet(child.privateKey);
      const balance = await ethBalance(wallet.address);

      setIndex((prev) => prev + 1);
      setPublicKeys((prevKeys) => [
        ...prevKeys,
        { key: wallet.address, balance: balance },
      ]);
    } catch (error) {
      console.error("Error generating Ethereum wallet:", error);
    }
  };

  return (
    <>
      <br />
      <h2>Ethereum</h2>
      <button onClick={addWallet} disabled={!mnemonic}>
        Add Eth Wallet
      </button>
      {publicKeys.map((k, index) => (
        <div key={index}>
          Eth - {k.key} - {k.balance} ETH
        </div>
      ))}
    </>
  );
}
