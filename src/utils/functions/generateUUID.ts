import crypto from "crypto";

export default function generateUUID() {
  return crypto.randomUUID();
}
