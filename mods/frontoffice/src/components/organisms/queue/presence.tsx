import VideoCameraIcon from '@heroicons/react/24/outline/VideoCameraIcon';
import React from 'react';

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
  const diff = now.getTime() - new Date(lastSeenDateTime).getTime();

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

const PresenceSwitch: React.FC<PresenceSwitchProps> = ({ lastSeenDateTime }) => {
  const currentPresence = presence(new Date(lastSeenDateTime));

  switch (currentPresence) {
    case Precense.ONLINE:
      return <VideoCameraIcon className="mt-3 w-5 text-green-600" aria-hidden="true" />
    case Precense.IDLE:
      return <VideoCameraIcon className="mt-3 w-5 text-yellow-600" aria-hidden="true" />
    case Precense.OFFLINE:
      return <VideoCameraIcon className="mt-3 w-5 text-gray-600" aria-hidden="true" />
  }

  return (
    <div>
      <VideoCameraIcon className="mt-3 w-5 text-green-500" aria-hidden="true" />
    </div>
  );
}

export default PresenceSwitch;
