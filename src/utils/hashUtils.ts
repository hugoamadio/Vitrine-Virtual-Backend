import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

async function hashPass(pass: string) {
  return await bcrypt.hash(pass, SALT_ROUNDS);
}

async function compareHash(password: string, hashPass: string) {
  return await bcrypt.compare(password, hashPass);
}

export default { hashPass, compareHash };