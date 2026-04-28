import { useState } from "react";
import { ethers } from "ethers";
import { ABI, CONTRACT_ADDRESS } from "../contract";

export default function HashVerifier() {
  const [hash, setHash] = useState<string>("");
  const [result, setResult] = useState<string>("");

  async function verify() {
    try {
      if (!window.ethereum) throw new Error("MetaMask não encontrada");

      setResult("⏳ Verificando...");

      const provider = new ethers.BrowserProvider(window.ethereum);

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ABI,
        provider
      );

      // convert string → bytes32 hash
      const bytes32Hash = ethers.keccak256(
        ethers.toUtf8Bytes(hash)
      );

      const res = await contract.verifyHash(bytes32Hash);

      const valid: boolean = res[0];
      const owner: string = res[1];

      setResult(
        valid
          ? `✔ Válido - Owner: ${owner}`
          : "❌ Hash não encontrado"
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      setResult(`❌ ${msg}`);
    }
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Hash Verify (Caso 3)</h3>

      <input
        value={hash}
        onChange={(e) => setHash(e.target.value)}
        placeholder="Texto do arquivo"
      />

      <button onClick={verify}>Verificar</button>

      <p>{result}</p>
    </div>
  );
}