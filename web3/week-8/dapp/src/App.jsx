import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import "./App.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import RequestAirdrop from "./RequestAirdrop";
import ShowBalance from "./ShowBalance";
import SendTokens from "./SendTokens";
import SignMessage from "./SignMessage";

function App() {
  return (
    <>
      <ConnectionProvider endpoint="https://devnet.helius-rpc.com/?api-key=4ba31a55-25a1-4117-984f-5a2c5e5b7504">
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <WalletMultiButton />
            <RequestAirdrop />
            <ShowBalance />
            <SendTokens />
            <SignMessage />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}

export default App;
