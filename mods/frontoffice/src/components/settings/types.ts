export type UserSettings = {
  name: string;
  email: string;
  avatarUrl: string;
};

export type WorkspaceSettings = {
  name: string;
  timezone: string;
  shopifyStoreUrl: string;
  calendarUrl: string;
  schedule: {
    [day: string]: {
      from: string | boolean;
      to: string | boolean;
    };
  };
};
