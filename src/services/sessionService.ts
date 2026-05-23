import { randomBytes } from "crypto";

const userToToken = new Map<string, string>();
const tokenToUser = new Map<string, string>();

export function createSessionForUser(username: string) {
  // invalidate existing session
  const existing = userToToken.get(username);
  if (existing) {
    tokenToUser.delete(existing);
  }
  const token = randomBytes(16).toString("hex");
  userToToken.set(username, token);
  tokenToUser.set(token, username);
  return token;
}

export function invalidateSessionForUser(username: string) {
  const t = userToToken.get(username);
  if (t) {
    userToToken.delete(username);
    tokenToUser.delete(t);
  }
}

export function getUserForToken(token: string) {
  return tokenToUser.get(token) ?? null;
}

export function getTokenForUser(username: string) {
  return userToToken.get(username) ?? null;
}
