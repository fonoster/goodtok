import { jwtDecode } from "jwt-decode";

type Payload = {
  workspaces: { id: string }[];
};

export function getDefaultWorkspaceId(token: string) {
  const payload: Payload = jwtDecode(token);
  return payload.workspaces[0].id;
}
