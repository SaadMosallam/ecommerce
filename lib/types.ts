export type User = {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  avatar?: string;
  role: "user" | "admin";
};

export type SignUpInput = {
  username: string;
  email: string;
  password: string;
  avatar?: string;
};

export type SignInInput = {
  email: string;
  password: string;
};
