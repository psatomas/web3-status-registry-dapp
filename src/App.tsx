import { useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0xd9145CCE52D386f254917e481eB44e9943F39138";

const ABI = [
  "function updateStatus(string memory _message)",
  "function getTotalRecords() view returns (uint256)",
  "function getRecord(uint256 index) view returns (string memory, uint256, address)"
];

function App() {
  const [account, setAccount] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [latestMessage, setLatestMessage] = useState<string>("");

  const [contract, setContract] = useState<ethers.Contract | null>(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not found");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    setAccount(address);

    const contractInstance = new ethers.Contract(
      CONTRACT_ADDRESS,
      ABI,
      signer
    );

    setContract(contractInstance);
  };

  const sendStatus = async () => {
    if (!contract) {
      alert("Connect wallet first");
      return;
    }

    if (!message) {
      alert("Enter a message");
      return;
    }

    try {
      const tx = await contract.updateStatus(message);
      setStatus("Sending transaction...");

      await tx.wait();

      setStatus(`Confirmed: ${tx.hash}`);
    } catch (err) {
      console.error(err);
      setStatus("Transaction failed");
    }
  };

  const loadTotal = async () => {
    if (!contract) {
      alert("Connect wallet first");
      return;
    }

    const count: bigint = await contract.getTotalRecords();
    const totalNumber = Number(count);

    setTotal(totalNumber);

    // fetch latest record (simple upgrade)
    if (totalNumber > 0) {
      const record = await contract.getRecord(totalNumber - 1);
      setLatestMessage(record[0]);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Status Registry dApp</h2>

      <button onClick={connectWallet}>Connect Wallet</button>
      <p>{account}</p>

      <input
        type="text"
        placeholder="Enter status..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendStatus}>Update Status</button>

      <p>{status}</p>

      <button onClick={loadTotal}>Load Data</button>

      <p>Total Records: {total}</p>
      <p>Latest Message: {latestMessage}</p>
    </div>
  );
}

export default App;