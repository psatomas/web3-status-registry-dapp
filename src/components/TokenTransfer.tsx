import { useState } from "react";
import { ethers } from "ethers";
import { ABI, CONTRACT_ADDRESS } from "../contract";

export default function TokenTransfer() {
  const [to, setTo] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");

  async function transfer() {
    try {
      setLoading(true);
      setError("");
      setStatus("");

      // 1. MetaMask check
      if (!window.ethereum) {
        throw new Error("MetaMask não encontrada");
      }

      // 2. Validate address
      if (!ethers.isAddress(to)) {
        setError("❌ Endereço inválido");
        return;
      }

      // 3. Validate amount
      if (!amount || Number(amount) <= 0) {
        setError("❌ Quantidade inválida");
        return;
      }

      // 4. Provider (FIXED)
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // 5. Contract
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ABI,
        signer
      );

      // 6. Transaction
      const tx = await contract.transferTokens(
        to,
        ethers.parseEther(amount)
      );

      setTxHash(tx.hash);
      setStatus("⏳ Transferência enviada... aguardando confirmação");

      await tx.wait();

      setStatus("✔ Tokens enviados com sucesso!");
      setTo("");
      setAmount("");
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Erro na transação";

      setError(`❌ ${msg}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Transfer Token (Caso 2)</h3>

      <input
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="Endereço destino (0x...)"
      />

      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Quantidade (ex: 1)"
      />

      <button onClick={transfer} disabled={loading}>
        {loading ? "Enviando..." : "Enviar Tokens"}
      </button>

      {txHash && <p>Tx: {txHash}</p>}
      {status && <p>{status}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
