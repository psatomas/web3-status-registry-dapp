export const CONTRACT_ADDRESS = "0x16425fe53429B4e0C045af461E12f93127697051";

export const ABI = [
  // Caso 1 - Status
  "function updateStatus(string _message)",
  "function getRecord(uint256 index) view returns (string,uint256,address)",
  "function getTotalRecords() view returns (uint256)",

  // Caso 2 - Token (ERC20)
  "function transferTokens(address to, uint256 amount)",
  "function balanceOf(address) view returns (uint256)",

  // Caso 3 - Hash
  "function registerHash(bytes32 _fileHash)",
  "function verifyHash(bytes32 _fileHash) view returns (bool,address)"
];