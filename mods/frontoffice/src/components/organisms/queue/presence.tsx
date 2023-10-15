import React from "react";

export enum Precense {
  ONLINE = "online",
  IDLE = "idle",
  OFFLINE = "offline",
  DEQUEUED = "dequeued"
}

const IDLE_TIME = 5 * 60 * 1000; // 5 minutes
const OFFLINE_TIME = 15 * 60 * 1000; // 15 minutes
const DEQUEUED_TIME = 30 * 60 * 1000; // 30 minutes

export function presence(lastSeenDateTime: Date): Precense {
  const now = new Date();
  const diff = now.getTime() - lastSeenDateTime.getTime();

  if (diff < IDLE_TIME) {
    return Precense.ONLINE;
  } else if (diff < OFFLINE_TIME) {
    return Precense.IDLE;
  } else if (diff < DEQUEUED_TIME) {
    return Precense.OFFLINE;
  } else {
    return Precense.DEQUEUED;
  }
}

interface PresenceSwitchProps {
  lastSeenDateTime: Date;
}

const PresenceSwitch: React.FC<PresenceSwitchProps> = ({
  lastSeenDateTime
}) => {
  const currentPresence = presence(new Date(lastSeenDateTime));

  switch (currentPresence) {
    case Precense.ONLINE:
      return (
        <div className="mt-1 flex items-center gap-x-1.5">
          <div className="flex-none rounded-full bg-emerald-500/20 p-1">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </div>
          <p className="text-xs leading-5 text-gray-500">Online</p>
        </div>
      );
    case Precense.IDLE:
      return (
        <div className="mt-1 flex items-center gap-x-1.5">
          <div className="flex-none rounded-full bg-yellow-500/20 p-1">
            <div className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
          </div>
          <p className="text-xs leading-5 text-gray-500">Idle</p>
        </div>
      );
    case Precense.OFFLINE:
      return (
        <div className="mt-1 flex items-center gap-x-1.5">
          <div className="flex-none rounded-full bg-gray-500/20 p-1">
            <div className="h-1.5 w-1.5 rounded-full bg-gray-500" />
          </div>
          <p className="text-xs leading-5 text-gray-500">Offline</p>
        </div>
      );
  }

  return (
    <div className="mt-1 flex items-center gap-x-1.5">
      <div className="flex-none rounded-full bg-emerald-500/20 p-1">
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      </div>
      <p className="text-xs leading-5 text-gray-500">Online</p>
    </div>
  );
};

export default PresenceSwitch;
