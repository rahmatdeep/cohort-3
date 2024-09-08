import { mnemonicToSeed } from "bip39";
import { Wallet } from "ethers";
import { HDNodeWallet } from "ethers";
import { useState } from "react";
import { ethBalance } from "../utils";

interface Keys {
  key: string;
  balance: number;
}

export function EthWallet({ mnemonic }: { mnemonic: string }) {
  const [index, setIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<Keys[]>([]);

  return (
    <>
      <br />
      <h2>Ethereum</h2>
      <button
        onClick={async () => {
          const seed = await mnemonicToSeed(mnemonic);
          const derivationPath = `m/44'/60'/${index}'/0'`;
          const hdNode = HDNodeWallet.fromSeed(seed);
          const child = hdNode.derivePath(derivationPath);
          const privateKey = child.privateKey;
          const wallet = new Wallet(privateKey);
          const balance = await ethBalance(wallet.address);
          setIndex((prev) => prev + 1);
          setPublicKeys([
            ...publicKeys,
            { key: wallet.address, balance: balance },
          ]);
        }}
      >
        {" "}
        Add Eth Wallet{" "}
      </button>
      {publicKeys.map((k) => (
        <div>
          Eth - {k.key} - {k.balance}
        </div>
      ))}
    </>
  );
}
