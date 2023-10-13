import { TimezoneSelectProps } from "./types";

export function TimezoneSelect({ timezone, setTimezone }: TimezoneSelectProps) {
  const timezones = [
    { value: "Pacific/Pago_Pago", label: "(GMT-11:00) Pago Pago" },
    { value: "Pacific/Honolulu", label: "(GMT-10:00) Hawaii Time" },
    { value: "Pacific/Tahiti", label: "(GMT-10:00) Tahiti" },
    { value: "America/Anchorage", label: "(GMT-09:00) Alaska Time" },
    { value: "America/Los_Angeles", label: "(GMT-08:00) Pacific Time" },
    { value: "America/Denver", label: "(GMT-07:00) Mountain Time" },
    { value: "America/Chicago", label: "(GMT-06:00) Central Time" },
    { value: "America/New_York", label: "(GMT-05:00) Eastern Time" },
    { value: "America/Halifax", label: "(GMT-04:00) Atlantic Time - Halifax" },
    {
      value: "America/Argentina/Buenos_Aires",
      label: "(GMT-03:00) Buenos Aires"
    },
    { value: "America/Sao_Paulo", label: "(GMT-02:00) Sao Paulo" },
    { value: "Atlantic/Azores", label: "(GMT-01:00) Azores" },
    { value: "Europe/London", label: "(GMT+00:00) London" },
    { value: "Europe/Berlin", label: "(GMT+01:00) Berlin" },
    { value: "Europe/Helsinki", label: "(GMT+02:00) Helsinki" },
    { value: "Europe/Istanbul", label: "(GMT+03:00) Istanbul" },
    { value: "Asia/Dubai", label: "(GMT+04:00) Dubai" },
    { value: "Asia/Kabul", label: "(GMT+04:30) Kabul" },
    { value: "Indian/Maldives", label: "(GMT+05:00) Maldives" },
    { value: "Asia/Calcutta", label: "(GMT+05:30) India Standard Time" },
    { value: "Asia/Kathmandu", label: "(GMT+05:45) Kathmandu" },
    { value: "Asia/Dhaka", label: "(GMT+06:00) Dhaka" },
    { value: "Indian/Cocos", label: "(GMT+06:30) Cocos" },
    { value: "Asia/Bangkok", label: "(GMT+07:00) Bangkok" },
    { value: "Asia/Hong_Kong", label: "(GMT+08:00) Hong Kong" },
    { value: "Asia/Pyongyang", label: "(GMT+08:30) Pyongyang" },
    { value: "Asia/Tokyo", label: "(GMT+09:00) Tokyo" },
    { value: "Australia/Darwin", label: "(GMT+09:30) Central Time - Darwin" },
    {
      value: "Australia/Brisbane",
      label: "(GMT+10:00) Eastern Time - Brisbane"
    },
    {
      value: "Australia/Adelaide",
      label: "(GMT+10:30) Central Time - Adelaide"
    },
    {
      value: "Australia/Sydney",
      label: "(GMT+11:00) Eastern Time - Melbourne, Sydney"
    },
    { value: "Pacific/Nauru", label: "(GMT+12:00) Nauru" },
    { value: "Pacific/Auckland", label: "(GMT+13:00) Auckland" },
    { value: "Pacific/Kiritimati", label: "(GMT+14:00) Kiritimati" }
  ];

  return (
    <div className="py-2">
      <label
        htmlFor="timezone"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Timezone
      </label>
      <div className="mt-2">
        <select
          name="timezone"
          id="timezone"
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          {timezones.map((tz) => (
            <option key={tz.value} value={tz.value}>
              {tz.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
