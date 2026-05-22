import crypto from "crypto";

const ENCRYPTION_KEY = "1vDk3$r8FzA@5yL#0sGpQ2hXmC!9nJtU";
const KEY_BUFFER = Buffer.from(ENCRYPTION_KEY, "utf8");

export function encrypt(text: string): string {
  const cipher = crypto.createCipheriv("aes-256-ecb", KEY_BUFFER, null);
  const data = Buffer.concat([
    cipher.update(Buffer.from(text, "utf8")),
    cipher.final(),
  ]);
  return data.toString("base64");
}

export function decrypt(encrypted: string): string {
  const decipher = crypto.createDecipheriv("aes-256-ecb", KEY_BUFFER, null);
  const data = Buffer.concat([
    decipher.update(Buffer.from(encrypted, "base64")),
    decipher.final(),
  ]);
  return data.toString("utf8");
}
