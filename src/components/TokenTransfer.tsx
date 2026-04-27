import { useState } from "react";
import { ethers } from "ethers";
import { ABI, CONTRACT_ADDRESS } from "../contract";

export default function TokenTransfer() {
  const [to, setTo] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  async function transfer() {
    if (!window.ethereum) return;

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      ABI,
      signer
    );

    const tx = await contract.transferTokens(
      to,
      ethers.parseEther(amount)
    );

    await tx.wait();

    alert("Tokens enviados!");
    setTo("");
    setAmount("");
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Transfer Token (Caso 2)</h3>

      <input
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="Endereço destino"
      />

      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Quantidade"
      />

      <button onClick={transfer}>
        Enviar Tokens
      </button>
    </div>
  );
}