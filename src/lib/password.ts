import bcrypt from "bcryptjs";
// import { env } from "./env";
// import { constantTimeEqual } from "./auth";

export async function verifyAdminCredentials(
  password: string,
  // username: string,
): Promise<boolean> {
  // const userOk = await constantTimeEqual(username, env.ADMIN_USERNAME);
  // if (!userOk) return false;

  const Hash = process.env.ADMIN_PASSWORD_HASH!;

  try {
    // return await bcrypt.compare(password, Hash);
    if (password !== Hash) return false;
    return true;
  } catch {
    return false;
  }
}
