import { Request, Response } from "express";
import { authenticate } from "../services/authService.js";

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
