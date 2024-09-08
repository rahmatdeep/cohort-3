import { useState } from "react";

import "./App.css";
import { generateMnemonic } from "bip39";
import { SolanaWallet } from "./components/sol";
import { EthWallet } from "./components/eth";

function App() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <>
      <div>{mnemonic}</div>
      <br />
      <button
        onClick={async () => {
          const mn = await generateMnemonic();
          setMnemonic(mn);
        }}
      >
        Generate Mnemonic
      </button>
      <SolanaWallet mnemonic={mnemonic} />
      <EthWallet mnemonic={mnemonic} />
    </>
  );
}

export default App;
