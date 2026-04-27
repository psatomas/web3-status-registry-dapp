import { useState } from "react";
import { ethers } from "ethers";
import { ABI, CONTRACT_ADDRESS } from "../contract";

export default function StatusForm() {
  const [message, setMessage] = useState<string>("");

  async function sendStatus() {
    if (!window.ethereum) return;

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      ABI,
      signer
    );

    const tx = await contract.updateStatus(message);
    await tx.wait();

    alert("Status registrado na blockchain!");
    setMessage("");
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Status (Caso 1)</h3>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ex: Produto enviado"
      />

      <button onClick={sendStatus}>
        Enviar
      </button>
    </div>
  );
}