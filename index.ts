import {
  EnigmaSchema,
  EncryptionMethods,
  encode,
  decode,
  hashKey,
} from "./encryption";

const enigma_schema: EnigmaSchema[] = [
  {
    method: EncryptionMethods.AES,
    key: () => hashKey("AES_SECRET_KEY"),
  },
  {
    method: EncryptionMethods.TripleDES,
    key: () => hashKey("3DES_SECRET_KEY"),
  },
  {
    method: EncryptionMethods.DES,
    key: () => hashKey("DES_SECRET_KEY"),
  },
  {
    method: EncryptionMethods.Rabbit,
    key: () => hashKey("RABBIT_SECRET_KEY"),
  },
  {
    method: EncryptionMethods.RC4,
    key: () => hashKey("RC4_SECRET_KEY"),
  },
  {
    method: EncryptionMethods.base64,
  },
];

// Testing

const message = "Hello, World!";
const encrypted = encode(enigma_schema, message);
const decrypted = decode(enigma_schema, encrypted);

console.log("message:", message);
console.log("encrypted:", encrypted);
console.log("decrypted:", decrypted);
console.log("success:", message == decrypted ? "✅" : "❌");
