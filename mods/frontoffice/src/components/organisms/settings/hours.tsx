import React, { useState } from "react";
import { WeeklyHoursType } from "@goodtok/sdk";

// Fix duplicate code
export enum Days {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday"
}

const HoursOfOperation = ({
  hoursOfOperation,
  setHoursOfOperation
}: {
  hoursOfOperation: WeeklyHoursType;
  setHoursOfOperation: React.Dispatch<React.SetStateAction<WeeklyHoursType>>;
}) => {
  const [error, setError] = useState<string | null>(null);

  const toggleDay = (day: Days) => {
    const newData = { ...hoursOfOperation };
    newData[day].enabled = !newData[day].enabled;

    if (!newData[day].enabled) {
      newData[day].hours = [];
    }

    setHoursOfOperation(newData);
  };

  const addHour = (day: Days) => {
    const newData = { ...hoursOfOperation };
    newData[day].hours.push({ start: "", end: "" });
    setHoursOfOperation(newData);
  };

  const removeHour = (day: Days, index: number) => {
    const newData = { ...hoursOfOperation };
    newData[day].hours.splice(index, 1);
    setHoursOfOperation(newData);
  };

  const validateTime = (start: string, end: string): boolean => {
    if (end && (start === end || start > end)) {
      setError("End hour should be after the start hour.");
      return false;
    }
    setError(null);
    return true;
  };

  return (
    <div>
      <label
        htmlFor="gtid"
        className="py-4 block text-sm font-medium leading-6 text-gray-900"
      >
        Set your weekly hours
      </label>

      <datalist id="timeList">
        {[...Array(24)].map((_, hour) =>
          ["00", "15", "30", "45"].map((minute) => (
            <option
              key={`${hour}:${minute}`}
              value={`${String(hour).padStart(2, "0")}:${minute}`}
            />
          ))
        )}
      </datalist>

      {Object.keys(Days).map((dayKey) => {
        const day = Days[dayKey as keyof typeof Days];

        return (
          <div key={day} className="mb-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-4"
                checked={hoursOfOperation[day].enabled}
                onChange={() => toggleDay(day)}
              />
              <span className="capitalize">{day}</span>
              <div className="ml-auto">
                {hoursOfOperation[day].enabled ? (
                  <button onClick={() => addHour(day)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6 text-blue-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                ) : (
                  <span className="ml-4 text-gray-400">Unavailable</span>
                )}
              </div>
            </div>
            {hoursOfOperation[day].enabled &&
              hoursOfOperation[day].hours.map((hour, index) => (
                <div key={index} className="flex items-center mt-2 ml-8">
                  <input
                    type="time"
                    value={hour.start}
                    onChange={(e) => {
                      if (!validateTime(e.target.value, hour.end)) return;
                      const newData = { ...hoursOfOperation };
                      newData[day].hours[index].start = e.target.value;
                      setHoursOfOperation(newData);
                    }}
                    className="mr-2"
                    list="timeList"
                  />
                  <span className="mx-2">-</span>
                  <input
                    type="time"
                    value={hour.end}
                    onChange={(e) => {
                      if (!validateTime(hour.start, e.target.value)) return;
                      const newData = { ...hoursOfOperation };
                      newData[day].hours[index].end = e.target.value;
                      setHoursOfOperation(newData);
                    }}
                    className="ml-2"
                    list="timeList"
                  />
                  <button
                    className="ml-4"
                    onClick={() => removeHour(day, index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6 text-red-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
          </div>
        );
      })}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default HoursOfOperation;
