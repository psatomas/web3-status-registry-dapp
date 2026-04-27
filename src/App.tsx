import WalletInfo from "./components/WalletInfo";
import StatusForm from "./components/StatusForm";
import TokenTransfer from "./components/TokenTransfer";
import HashVerifier from "./components/HashVerifier";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Mini DApp Web3</h1>

      <WalletInfo />

      <hr />

      <StatusForm />

      <hr />

      <TokenTransfer />

      <hr />

      <HashVerifier />
    </div>
  );
}