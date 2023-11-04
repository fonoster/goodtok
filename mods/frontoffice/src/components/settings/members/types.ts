export enum Status {
  ACTIVE = "Active",
  PENDING = "Pending"
}

export enum Role {
  ADMIN = "Admin",
  MEMBER = "Member"
}

export type Member = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  createdAt: Date;
};
