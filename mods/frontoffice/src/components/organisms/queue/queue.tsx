import * as SDK from "@goodtok/sdk";
import { useAuth } from "../../../authentication";
import { useEffect, useState } from "react";
import { sortPeople } from "./sort";
import { QueueEntry } from "@goodtok/sdk";
import PresenceSwitch, { Precense, presence } from "./presence";
import moment from "moment";

interface QueueProps {
  onSelectCustomer: (customer: any) => void;
  onSetInviteInfo: (inviteInfo: any) => void;
}

export default function Queue({
  onSelectCustomer,
  onSetInviteInfo
}: QueueProps) {
  const { client, logout } = useAuth() as any;
  const [people, setPeopleList] = useState<any[]>([]);

  const workspaces = new SDK.Workspaces(client);
  const customers = new SDK.Customers(client);

  useEffect(() => {
    if (!client) {
      logout();
      return;
    }

    // TODO: Add automatic dequeueing preference at the workspace level
    // TODO: Add preference indicating iddle time (will mark as iddle)
    // TODO: Add preference indicating offline time (will mark as offline)

    workspaces
      .getQueueByWorkspaceId(client.getDefaultWorkspaceId())
      .then((response: { queue: QueueEntry[] }) => {
        const peps = response.queue
          // If last seen is more than DEQUEUED_TIME, remove from the list enven
          // if it's still in the queue
          .filter(
            (entry: any) =>
              presence(new Date(entry.registeredAt)) !== Precense.DEQUEUED
          );

        setPeopleList(sortPeople(peps));
      })
      .catch((err: any) => {
        console.log({ err });
        if (err.data?.code === "UNAUTHORIZED") {
          logout();
        }
      });

    workspaces.watchQueue(
      client.getDefaultWorkspaceId(),
      (error: Error, person: any) => {
        if (error) {
          console.error("Failed to watch queue:", error);
          return;
        }

        // Update the list to include the new person
        setPeopleList((people) => {
          console.log({ people, person });
          const idx = people.findIndex(
            (p) => p.customerId === person.customerId
          );
          if (idx === -1) {
            return [...people, person];
          } else {
            const newPeople = [...people];
            newPeople[idx] = person;
            return sortPeople(newPeople);
          }
        });
      }
    );
  }, [client, logout]);

  const handleRowClick = async (customerId: string) => {
    try {
      const customerDetails = await customers.getCustomerInDefaultWorkspace(customerId);
      const queueEntry = people.find((p) => p.customerId === customerId);

      const inviteInfo = {
        ref: customerId,
        // TODO: Construct the aor from the logged in user (caller)
        aor: "sip:goodtok@sip.goodtok.io",
        // The queue entry aor becomes the aorLink (callee)
        aorLink: queueEntry?.aor,
        customerId: customerId,
        methods: ["INVITE"]
      };

      onSelectCustomer(customerDetails);
      onSetInviteInfo(inviteInfo);
    } catch (err) {
      console.error("Failed to fetch customer details:", err);
    }
  };

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {(people as any).map((person: any) => (
        <li
          key={person.customerId}
          className="px-2 py-2 hoverable-list-item flex justify-between gap-x-2"
          onClick={() => handleRowClick(person.customerId)}
        >
          <div className="flex min-w-0 gap-x-4">
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src={person.customer.avatar}
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {person.customer.name}
              </p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Joined{" "}
                <time dateTime={new Date(person.registeredAt).toDateString()}>
                  {moment(person.registeredAt).fromNow()}
                </time>
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <div className="mt-1 flex items-center gap-x-1.5">
              <PresenceSwitch
                lastSeenDateTime={new Date(person.registeredAt)}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
