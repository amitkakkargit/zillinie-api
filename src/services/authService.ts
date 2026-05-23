import { findUserByCredentials } from "../repositories/userRepository.js";
import type { UserRecord } from "../repositories/userRepository.js";
import {
  createSessionForUser,
  invalidateSessionForUser,
} from "./sessionService.js";

export async function authenticate(
  username: string,
  password: string,
): Promise<(UserRecord & { sessionToken?: string }) | null> {
  const user = await findUserByCredentials(username, password);
  if (!user) return null;

  // create a session token for this user; invalidate previous
  const token = createSessionForUser(
    user.username ?? user.name ?? String(user.id ?? "user"),
  );

  return { ...user, sessionToken: token };
}

export async function signOutUser(username: string) {
  invalidateSessionForUser(username);
}
