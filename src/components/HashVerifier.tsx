import { useState } from "react";
import { ethers } from "ethers";
import { ABI, CONTRACT_ADDRESS } from "../contract";

export default function HashVerifier() {
  const [hash, setHash] = useState<string>("");
  const [result, setResult] = useState<string>("");

  async function verify() {
    if (!window.ethereum) return;

    const provider = new ethers.BrowserProvider(window.ethereum);

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      ABI,
      provider
    );

    const res = await contract.verifyHash(hash);

    const valid = res[0];
    const owner = res[1];

    setResult(
      valid
        ? `✔ Válido - Owner: ${owner}`
        : "✖ Hash não encontrado"
    );
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Hash Verify (Caso 3)</h3>

      <input
        value={hash}
        onChange={(e) => setHash(e.target.value)}
        placeholder="0x..."
      />

      <button onClick={verify}>
        Verificar
      </button>

      <p>{result}</p>
    </div>
  );
}