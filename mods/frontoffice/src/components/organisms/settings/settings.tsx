import UserSettings from "./user";
import WorkspaceSettings from "./workspace";

export default function Settings() {
  return (
    <div className="p-10">
      <h2 className="text-2xl font-semibold leading-8 text-gray-900">
        Personal & Workspace Settings
      </h2>
      <div className="py-20 space-y-10 divide-y divide-gray-900/10">
        <UserSettings />
        <WorkspaceSettings />
      </div>
    </div>
  );
}
