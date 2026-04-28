import { useState } from "react";
import { ethers } from "ethers";
import { ABI, CONTRACT_ADDRESS } from "../contract";

export default function StatusForm() {
  const [message, setMessage] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");

  async function sendStatus() {
    try {
      setLoading(true);
      setError("");
      setStatus("");

      if (!window.ethereum) throw new Error("MetaMask não encontrado");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ABI,
        signer
      );

      const tx = await contract.updateStatus(message);

      setTxHash(tx.hash);
      setStatus("⏳ Transação enviada... aguardando confirmação");

      await tx.wait();

      setStatus("✔ Status registrado com sucesso!");
      setMessage("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro na transação";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Status (Caso 1)</h3>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ex: Produto enviado"
      />

      <button onClick={sendStatus} disabled={loading}>
        {loading ? "Enviando..." : "Enviar"}
      </button>

      {txHash && <p>Tx: {txHash}</p>}
      {status && <p>{status}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}