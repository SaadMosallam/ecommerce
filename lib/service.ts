import bcrypt from "bcryptjs";
import {
  addUser,
  findUserByEmail,
  findUserByUsername,
} from "./mock-user-store";
import { SignInInput, SignUpInput } from "./types";

const normalizeString = (data: string) => data.toLowerCase().trim();
const INVALID_CREDENTIALS_ERROR = "invalid credentials";

type PublicUser = {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: "user" | "admin";
};

type AuthResult =
  | { ok: true; user: PublicUser }
  | { ok: false; error: string };

const toPublicUser = (user: {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: "user" | "admin";
}): PublicUser => ({
  id: user.id,
  username: user.username,
  email: user.email,
  avatar: user.avatar,
  role: user.role,
});

export const signUp = async (input: SignUpInput): Promise<AuthResult> => {
  const { username, email, password, avatar } = input;

  const normalizedEmail = normalizeString(email);
  const normalizedUsername = normalizeString(username);

  if (findUserByEmail(normalizedEmail)) {
    return { ok: false, error: "duplicated email" };
  } else if (findUserByUsername(normalizedUsername)) {
    return { ok: false, error: "duplicated username" };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const createdUser = addUser({
    id: crypto.randomUUID(),
    username: normalizedUsername,
    avatar,
    email: normalizedEmail,
    passwordHash,
    role: "user",
  });

  return { ok: true, user: toPublicUser(createdUser) };
};

export const signIn = async (input: SignInInput): Promise<AuthResult> => {
  const { email, password } = input;

  if (!email || !password) {
    return { ok: false, error: INVALID_CREDENTIALS_ERROR };
  }

  const normalizedEmail = normalizeString(email);

  const user = findUserByEmail(normalizedEmail);

  if (!user) {
    return { ok: false, error: INVALID_CREDENTIALS_ERROR };
  }

  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isCorrectPassword) {
    return { ok: false, error: INVALID_CREDENTIALS_ERROR };
  }

  return { ok: true, user: toPublicUser(user) };
};
