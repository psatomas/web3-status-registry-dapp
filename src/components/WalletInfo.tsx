import { useState } from "react";
import { ethers } from "ethers";

export default function WalletInfo() {
  const [account, setAccount] = useState<string>("");

  async function connectWallet() {
    if (!window.ethereum) {
      alert("Instale MetaMask");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);

    setAccount(accounts[0]);
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <button onClick={connectWallet}>
        Conectar MetaMask
      </button>

      {account && (
        <p>Conectado: {account}</p>
      )}
    </div>
  );
}