import * as SDK from "@goodtok/sdk";
import { useEffect, useState } from "react";
import { useAuth } from "../../../authentication";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import jwtDecode from "jwt-decode";

export default function UserSettings() {
  const { client, logout } = useAuth() as any;
  const [userName, setUserName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!client) {
    logout();
    return;
  }

  useEffect(() => {
    if (client) {
      const userInfo = jwtDecode(client.getToken()) as {
        [key: string]: string;
      };
      const users = new SDK.Users(client);
      users.getUserById(userInfo.sub).then((user) => {
        setUserName(user.name);
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
      const userInfo = jwtDecode(client.getToken()) as {
        [key: string]: string;
      };
      const userId = userInfo.sub;
      const username = userInfo.username;
      const users = new SDK.Users(client);

      try {
        const updatePayload: { id: string; name: string; password?: string } = {
          id: userId,
          name: userName
        };

        if (newPassword) {
          await client.login(username, currentPassword);
          updatePayload.password = newPassword;
        }

        await users.updateUser(updatePayload);

        setSuccessMessage("Saved!");
      } catch (error: any) {
        if (error.data?.code === "UNAUTHORIZED") {
          setErrorMessage("Incorrect password. Please try again.");
        } else {
          setErrorMessage("Failed to update user.");
        }
      }
    } else {
      logout();
    }
  };

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Personal
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Settings and personal information.
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
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Your name"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <div>
                <label
                  htmlFor="email"
                  className="mt-4 block text-sm font-medium leading-6 text-gray-900"
                >
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="mt-4 block text-sm font-medium leading-6 text-gray-900"
                >
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Use the strongest password possible.
              </p>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Photo (Not yet implemented)
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon
                  className="h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
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
