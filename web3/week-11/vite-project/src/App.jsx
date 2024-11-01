import { createPublicClient, http } from "viem";
import "./App.css";
import { mainnet } from "viem/chains";

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

async function getBalance() {
  const res = await client.getBalance({
    address: "0x075c299cf3b9FCF7C9fD5272cded21A4688bEeD",
  });
  console.log(res);
}
function App() {
  return (
    <>
      <button onClick={getBalance}>get balance</button>
    </>
  );
}

export default App;
