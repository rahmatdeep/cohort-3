import "./App.css";
// wallet adapter imports
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { TokenLaunchpad } from "./components/TokenLaunchpad";

function App() {
  return (
    <div>
      <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: 20,
              }}
            >
              <WalletMultiButton />
            </div>
            <TokenLaunchpad></TokenLaunchpad>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;