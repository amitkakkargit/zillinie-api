import { findUserByCredentials } from "../repositories/userRepository.js";
import type { UserRecord } from "../repositories/userRepository.js";

export async function authenticate(
  username: string,
  password: string,
): Promise<UserRecord | null> {
  return findUserByCredentials(username, password);
}
