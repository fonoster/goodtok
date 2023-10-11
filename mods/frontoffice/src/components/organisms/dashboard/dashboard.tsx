import { useState } from "react";
import {
  HomeIcon,
  ChartPieIcon,
  Cog6ToothIcon as CogIcon
} from "@heroicons/react/24/outline";
import { useAuth } from "../../../authentication";
import Queue from "../queue";
import GTLogoWhite from "components/atoms/logos/goodtok-white";
import Customer from "../customer";
import Video from "../video";
import Settings from "../settings";

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon },
  { name: "Team", href: "#", icon: ChartPieIcon },
  { name: "Settings", href: "#", icon: CogIcon }
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [inviteInfo, setInviteInfo] = useState(null);
  const [view, setView] = useState('dashboard');

  const { client, logout } = useAuth() as any;

  if (!client) {
    logout();
    return;
  }

  const renderView = () => {
    switch (view) {
      case 'settings':
        return <div className="w-1/4 px-12 py-8">
          <Settings />
        </div>;
      case 'customer-support':
      default:
        return (
          <div className="flex">
            <div className="w-1/4 min-w-fit border-r border-gray-200 px-2 py-2 h-screen">
              <h2 className="h-12 text-lg font-medium text-gray-600">
                Customer Queue
              </h2>
              <Queue
                onSelectCustomer={setSelectedCustomer}
                onSetInviteInfo={setInviteInfo}
              />
            </div>
            <div className="w-1/2 px-2 py-2">
              <Video inviteInfo={inviteInfo} />
              <Customer customer={selectedCustomer} />
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto lg:bg-gray-900 lg:pb-4">
        <div className="flex h-32 shrink-0 items-center justify-center">
          <GTLogoWhite />
        </div>
        <nav className="mt-8">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {navigation.map((item) => (
              <li key={item.name} onClick={() => {
                switch (item.name) {
                  case 'Settings':
                    setView('settings');
                    break;
                  case 'Dashboard':
                    setView('dashboard');
                    break;
                  case 'Team':
                    setView('team');
                    break;
                  default:
                    setView('dashboard');
                    break;
                }
              }}>
                <a
                  href={item.href}
                  className={classNames(
                    (view === 'settings' && item.name === 'Settings') ||
                      (view === 'dashboard' && item.name === 'Dashboard') ||
                      (view === 'team' && item.name === 'Team')
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-800",
                    "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold"
                  )}
                >
                  <item.icon
                    className="h-6 w-6 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <main className="lg:pl-20">
        <div>
          {renderView()}
        </div>
      </main>
    </div>
  );
}
