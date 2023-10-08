import { QueueEntry } from "@goodtok/apiserver/src/workspaces/types";
import { Precense, presence } from "./presence";

export function sortPeople(peps: QueueEntry[]) {
  return peps.sort((a, b) => {
    const presenceA = presence(a.lastSeenDateTime);
    const presenceB = presence(b.lastSeenDateTime);

    if (presenceA === Precense.ONLINE && presenceB !== Precense.ONLINE) {
      return -1;
    }

    if (presenceA !== Precense.ONLINE && presenceB === Precense.ONLINE) {
      return 1;
    }

    if (presenceA === Precense.IDLE && presenceB === Precense.OFFLINE) {
      return -1;
    }

    if (presenceA === Precense.OFFLINE && presenceB === Precense.IDLE) {
      return 1;
    }

    if (presenceA === Precense.OFFLINE && presenceB === Precense.OFFLINE) {
      return (
        new Date(a.lastSeenDateTime).getTime() -
        new Date(b.lastSeenDateTime).getTime()
      );
    }

    return 0;
  });
}
