import * as SDK from "@goodtok/sdk";
import { useEffect, useState } from "react";
import { useAuth } from "../../../authentication";
import { WeeklyHoursType } from "@goodtok/sdk";
import HoursOfOperation from "./hours";
import TimezoneSelect from "../../molecules/timezone";

export default function WorkspaceSettings() {
  const { client, logout } = useAuth() as any;
  const [workspaceName, setWorkspaceName] = useState("");
  const [shopifyAccessToken, setShopifyAccessToken] = useState("");
  const [shopifyStoreId, setShopifyStoreId] = useState("");
  const [timezone, setTimezone] = useState("America/New_York");
  const [gtid, setGtid] = useState("");
  const [hoursOfOperation, setHoursOfOperation] = useState<WeeklyHoursType>({
    Sunday: { enabled: false, hours: [] },
    Monday: { enabled: false, hours: [] },
    Tuesday: { enabled: false, hours: [] },
    Wednesday: { enabled: false, hours: [] },
    Thursday: { enabled: false, hours: [] },
    Friday: { enabled: false, hours: [] },
    Saturday: { enabled: false, hours: [] }
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!client) {
    logout();
    return;
  }

  useEffect(() => {
    if (client) {
      const workspaces = new SDK.Workspaces(client);
      workspaces
        .getWorkspaceById(client.getCurrentWorkspaceId())
        .then((workspace) => {
          setWorkspaceName(workspace.name);
          setHoursOfOperation(workspace.hoursOfOperation);
          setTimezone(workspace.timezone || "America/New_York");
          setShopifyStoreId(workspace.shopifyAccount?.storeId || "");
          setGtid(workspace.id || "");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      logout();
    }
  }, [client, logout]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (client) {
      const workspaces = new SDK.Workspaces(client);
      workspaces
        .updateWorkspace({
          id: client.getCurrentWorkspaceId(),
          name: workspaceName,
          hoursOfOperation: hoursOfOperation,
          timezone: timezone,
          shopifyAccount: {
            storeId: shopifyStoreId,
            accessToken: shopifyAccessToken
          }
        })
        .then(() => {
          setSuccessMessage("Saved!");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      logout();
    }
  };

  return (
    <div className="py-10 grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Workspace
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Stablish hours of operations, team members, and more.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
      >
        {errorMessage && (
          <div className="text-red-600 px-4 py-2" role="alert">
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="text-green-600 px-4 py-2" role="alert">
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}

        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="workspace-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Workspace Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="workspace-name"
                  id="workspace-name"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Workspace name"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="gtid"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                GTID
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="gtid"
                  id="gtid"
                  value={gtid}
                  readOnly
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <TimezoneSelect timezone={timezone} setTimezone={setTimezone} />
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="shopify-store-id"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Shopify Store ID
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="shopify-store-id"
                  id="shopify-store-id"
                  value={shopifyStoreId}
                  onChange={(e) => setShopifyStoreId(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Shopify Store ID"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="shopify-store-id"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Shopify Access Token
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  name="shopify-access-token"
                  id="shopify-access-token"
                  onChange={(e) => setShopifyAccessToken(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Shopify Access Token"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <HoursOfOperation
                hoursOfOperation={hoursOfOperation}
                setHoursOfOperation={setHoursOfOperation}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
