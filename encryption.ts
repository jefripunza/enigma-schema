import CryptoJS from "crypto-js";

// Helper functions for common tasks
function hashKey(key: string): string {
  return CryptoJS.SHA256(key).toString(CryptoJS.enc.Hex);
}

// Encryption and Decryption methods
function encryptMethod(method: string, key: string, plaintext: string): string {
  return CryptoJS[method].encrypt(plaintext, key).toString();
}

function decryptMethod(
  method: string,
  key: string,
  cipher_text: string
): string {
  return CryptoJS[method].decrypt(cipher_text, key).toString(CryptoJS.enc.Utf8);
}

// Supported encryption methods with string keys
export enum EncryptionMethods {
  AES = "AES",
  TripleDES = "TripleDES",
  DES = "DES",
  Rabbit = "Rabbit",
  RC4 = "RC4",
  base64 = "base64",
}

export interface EnigmaSchema {
  method: EncryptionMethods;
  key?: () => string;
}

function applyMethod(
  text: string,
  layer: EnigmaSchema,
  isEncrypt: boolean
): string {
  if (layer.method === EncryptionMethods.base64) {
    return isEncrypt
      ? CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text))
      : CryptoJS.enc.Base64.parse(text).toString(CryptoJS.enc.Utf8);
  } else if (layer.key) {
    const key = layer.key();
    return isEncrypt
      ? encryptMethod(layer.method, hashKey(key), text)
      : decryptMethod(layer.method, hashKey(key), text);
  }
  throw new Error(`Key function missing for method: ${layer.method}`);
}

export function encode(enigma_schema: EnigmaSchema[], text: string): string {
  return enigma_schema.reduce(
    (cipher_text, layer) => applyMethod(cipher_text, layer, true),
    text
  );
}

export function decode(
  enigma_schema: EnigmaSchema[],
  encrypted: string
): string {
  return enigma_schema.reduceRight(
    (plaintext, layer) => applyMethod(plaintext, layer, false),
    encrypted
  );
}
