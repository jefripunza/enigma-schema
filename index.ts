import { EnigmaSchema, EncryptionMethods, encode, decode } from "./encryption";

const enigma_schema_positive: EnigmaSchema[] = [
  {
    method: EncryptionMethods.AES, // 1
    key: () => "AES_SECRET_KEY",
  },
  {
    method: EncryptionMethods.TripleDES, // 2
    key: () => "3DES_SECRET_KEY",
  },
  {
    method: EncryptionMethods.DES, // 3
    key: () => "DES_SECRET_KEY",
  },
  {
    method: EncryptionMethods.Rabbit, // 4
    key: () => "RABBIT_SECRET_KEY",
  },
  {
    method: EncryptionMethods.RC4, // 5
    key: () => "RC4_SECRET_KEY",
  },
  {
    method: EncryptionMethods.base64, // 6
  },
];

// Testing Positive

const message = "Hello, World!";
const encrypted = encode(enigma_schema_positive, message);
const decrypted = decode(enigma_schema_positive, encrypted);

console.log("message:", message);
console.log("encrypted:", encrypted);
console.log("decrypted:", decrypted);
console.log("success:", message == decrypted ? "✅" : "❌");

// Testing Negative

const enigma_schema_negative: EnigmaSchema[] = [
  {
    method: EncryptionMethods.DES, // 3
    key: () => "DES_SECRET_KEY",
  },
  {
    method: EncryptionMethods.AES, // 1
    key: () => "AES_SECRET_KEY",
  },
  {
    method: EncryptionMethods.TripleDES, // 2
    key: () => "3DES_SECRET_KEY",
  },
  {
    method: EncryptionMethods.RC4, // 5
    key: () => "RC4_SECRET_KEY",
  },
  {
    method: EncryptionMethods.Rabbit, // 4
    key: () => "RABBIT_SECRET_KEY",
  },
  {
    method: EncryptionMethods.base64, // 6
  },
];

try {
  const decrypted_negative = decode(enigma_schema_negative, encrypted);
  console.log("decrypted negative:", decrypted_negative);
  console.log("success negative: ❌");
} catch (error) {
  console.log("error:", error.message);
  console.log("success negative: ✅");
}
