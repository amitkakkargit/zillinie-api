import { Request, Response, NextFunction } from "express";
import { getUserForToken } from "../services/sessionService.js";

export function sessionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Allow unauthenticated access to auth and health endpoints
  if (
    req.method === "OPTIONS" ||
    req.path.startsWith("/auth") ||
    req.path === "/health"
  ) {
    return next();
  }

  const token = (req.header("x-session-token") || "").toString();
  if (!token) {
    return res.status(401).json({ message: "Missing session token" });
  }
  const username = getUserForToken(token);
  if (!username) {
    return res
      .status(401)
      .json({ message: "Invalid or expired session token" });
  }

  // attach username on request for downstream handlers if needed
  (req as any).sessionUser = username;
  next();
}

export default sessionMiddleware;
