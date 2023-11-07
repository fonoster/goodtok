// FIXME: This is a duplicate of the one in the backend
export enum Role {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER"
}

// FIXME: This is a duplicate of the one in the backend
export enum Status {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
}

// FIXME: This is a duplicate of the one in the backend
export type Member = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  createdAt: Date;
};

export type InviteInfo = {
  name: string;
  email: string;
  role: Role;
};
