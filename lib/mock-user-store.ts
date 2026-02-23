import type { User } from "./types";

const users: User[] = [
  {
    id: "u_001",
    username: "Saad",
    email: "saad@example.com",
    passwordHash: "$2b$10$SSFOuCXtnhcXaCxyaWHnfO/F2XDmsPQUi67fDpAC0h0HzM8cJ0uBu",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Saad",
    role: "user",
  },
  {
    id: "u_002",
    username: "Said",
    email: "said@example.com",
    passwordHash: "$2b$10$1hrgifOrDvXoDzhHaW1rTOmlgSH/YQxIuOYFoAdc9.Dhp5bQsSrkO",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Said",
    role: "user",
  },
  {
    id: "u_003",
    username: "Mido",
    email: "mido@example.com",
    passwordHash: "$2b$10$Kwo58fJ7RFYgfwfPHnwMaO2U/GJlblL4NQEUAmYLjit7X3dji1VfC",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Mido",
    role: "user",
  },
  {
    id: "u_004",
    username: "Amer",
    email: "amer@example.com",
    passwordHash: "$2b$10$9yPk4oJhNbJ2vh/qn1YoyeXhhjbsSOmTT2/Omk71YzPjgTznbtlli",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Amer",
    role: "user",
  },
];

export function findUserByEmail(email: string): User | undefined {
  const normalizedEmail = email.trim().toLowerCase();
  return users.find((user) => user.email.toLowerCase() === normalizedEmail);
}

export function findUserByUsername(username: string): User | undefined {
  const normalizedUsername = username.trim().toLowerCase();
  return users.find(
    (user) => user.username.toLowerCase() === normalizedUsername
  );
}

export function findUserById(id: string): User | undefined {
  return users.find((user) => user.id === id);
}

export function addUser(user: User): User {
  users.push(user);
  return user;
}

export function listUsers(): User[] {
  return [...users];
}
