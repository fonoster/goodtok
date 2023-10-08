import { Precense, presence } from "./presence";

export function sortPeople(peps: any[]) {
  return peps.sort((a, b) => {
    const presenceA = presence(new Date(a.registeredAt));
    const presenceB = presence(new Date(b.registeredAt));

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
        new Date(a.registeredAt).getTime() -
        new Date(b.registeredAt).getTime()
      );
    }

    return 0;
  });
}
