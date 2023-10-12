import * as SDK from "@goodtok/sdk";
import { useEffect, useState } from "react";
import { useAuth } from "../../../authentication";

export default function WorkspaceSettings() {
  const { client, logout } = useAuth() as any;
  const [workspaceName, setWorkspaceName] = useState("");
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
          name: workspaceName
        })
        .then(() => {
          setSuccessMessage("Workspace updated successfully!");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      logout();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-4 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 mb-4 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}

      <div className="space-y-12 w-96">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-semibold leading-8 text-gray-900">
            Workspace Settings
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Stablish hours of operations, team members, and more.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4 w-96">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
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
            </div>
          </div>
        </div>
      </div>

      <div className="w-96 mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
