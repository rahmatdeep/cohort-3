import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import {
  http,
  createConfig,
  WagmiProvider,
  useConnect,
  useAccount,
  useBalance,
  useSendTransaction,
} from "wagmi";
import { mainnet } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { useRef } from "react";

const queryClient = new QueryClient();

const config = createConfig({
  chains: [mainnet],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
  },
});

function App() {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <WalletConnector />
          <MyAddress />
          <EthSend />
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

function WalletConnector() {
  const { connectors, connect } = useConnect();
  return (
    <>
      {connectors.map((connector) => (
        <button key={connector.uid} onClick={() => connect({ connector })}>
          {connector.name}
        </button>
      ))}
    </>
  );
}

function MyAddress() {
  const { address } = useAccount();
  const balance = useBalance({ address });

  return (
    <>
      <br />
      {address}
      <br />
      {balance?.data?.formatted}
    </>
  );
}

function EthSend() {
  const addressRef = useRef(null);

  const { hash: data, sendTransaction } = useSendTransaction();

  async function sendEth() {
    sendTransaction({
      to: addressRef.current.value,
      value: "10000000000000000",
    });
  }

  return (
    <>
      <br />
      <input type="text" placeholder="Address" ref={addressRef} />
      <br />
      <button onClick={sendEth}>Send 0.1 ETH</button>
    </>
  );
}

export default App;
