import { useAuth } from "../../../authentication";
import { useEffect, useState } from "react";
import { QueueEntry } from "@goodtok/apiserver/src/workspaces/types";
import { sortPeople } from "./sort";
import Workspaces from "@goodtok/sdk/src/workspaces";
import Customers from "@goodtok/sdk/src/customers";
import moment from "moment";
import PresenceSwitch, { Precense, presence } from "./presence";

export default function Queue({ onSelectCustomer }) {
  const { client, logout } = useAuth();
  const [people, setPeopleList] = useState<QueueEntry[]>([]);

  const workspaces = new Workspaces(client);
  const customers = new Customers(client);

  useEffect(() => {
    if (!client) {
      logout();
      return;
    }

    // TODO: Add automatic dequeueing preference at the workspace level
    // TODO: Add preference indicating iddle time (will mark as iddle)
    // TODO: Add preference indicating offline time (will mark as offline)

    workspaces
      .getQueueByWorkspaceId("default")
      .then((entries) => {
        const peps = entries
          .map((entry) => ({
            customerId: entry.customerId,
            name: entry.customer.name,
            avatar: entry.customer.avatar,
            lastSeen: moment(entry.createdAt).fromNow(),
            lastSeenDateTime: entry.registeredAt
          }))
          // If last seen is more than DEQUEUED_TIME, remove from the list enven
          // if it's still in the queue
          .filter(
            (entry) => presence(entry.lastSeenDateTime) !== Precense.DEQUEUED
          );

        setPeopleList(sortPeople(peps));
      })
      .catch((err) => {
        console.log({ err });
        if (err.data?.code === "UNAUTHORIZED") {
          logout();
        }
      });

    workspaces.watchQ("default", (_, p: QueueEntry) => {
      console.log({ customerId: p.customerId });
      const person = {
        customerId: p.customerId,
        name: p.customer.name,
        avatar: p.customer.avatar,
        lastSeen: moment(p.createdAt).fromNow(true),
        lastSeenDateTime: p.registeredAt
      };

      // Update the list to include the new person
      setPeopleList((people) => {
        const idx = people.findIndex(
          (person) => person.customerId === p.customerId
        );
        if (idx === -1) {
          return [...people, person];
        } else {
          const newPeople = [...people];
          newPeople[idx] = person;
          return sortPeople(newPeople);
        }
      });
    });
  }, [client, logout]);

  const handleRowClick = async (customerId: string) => {
    try {
      const customerDetails = await customers.getCustomerById(customerId);
      onSelectCustomer(customerDetails);
    } catch (err) {
      console.error("Failed to fetch customer details:", err);
    }
  };

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {people.map((person) => (
        <li
          key={person.customerId}
          className="px-2 py-2 hoverable-list-item flex justify-between gap-x-2"
          onClick={() => handleRowClick(person.customerId)}
        >
          <div className="flex min-w-0 gap-x-4">
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src={person.avatar}
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {person.name}
              </p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Joined{" "}
                <time dateTime={person.lastSeenDateTime}>
                  {person.lastSeen}
                </time>
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <div className="mt-1 flex items-center gap-x-1.5">
              <PresenceSwitch lastSeenDateTime={person.lastSeenDateTime} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
