import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import bcrypt from "bcryptjs";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}
