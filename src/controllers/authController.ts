import { Request, Response } from "express";
import { authenticate, signOutUser } from "../services/authService.js";
import { getUserForToken } from "../services/sessionService.js";

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const user = await authenticate(username, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    return res.json({ user });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ message: "Login failed.", error: String(error) });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    const token = (req.header("x-session-token") || "").toString();
    const username = getUserForToken(token);
    if (username) {
      await signOutUser(username);
    }
    return res.json({ ok: true });
  } catch (err) {
    console.error("Logout failed", err);
    return res.status(500).json({ ok: false, error: String(err) });
  }
}
