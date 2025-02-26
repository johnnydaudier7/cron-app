import React from "react";
import { FiClock } from "react-icons/fi";
import { daysInMonth, hours, minutes } from "../../utils/timeDb";

const Monthly = ({ monthlyData, setMonthlyData }) => {
  const { selectedHour, selectedMinute } = monthlyData;

  const monthlyDays = daysInMonth.map((day) => String(day));
  const monthlyMinutes = minutes;
  const monthlyHours = hours;

  const handleDaySelection = (day) => {
    day.toString();
    setMonthlyData((current) => {
      const currentDays = current.selectedDays.includes(day)
        ? current.selectedDays.filter((d) => d !== day)
        : [...current.selectedDays, day].sort((a, b) => a - b);

      return {
        ...current,
        selectedDays: currentDays,
      };
    });
  };
  const handleMinuteSelection = (event) => {
    const value = event.target.value;
    setMonthlyData((current) => ({
      ...current,
      selectedMinute: value,
    }));
  };
  const handleHourSelection = (event) => {
    const value = event.target.value;
    setMonthlyData((current) => ({
      ...current,
      selectedHour: value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <FiClock className="mr-2" />
          Monthly Reminder Settings
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Select Days of Month
            </label>
            <div className="grid grid-cols-7 gap-2 md:grid-cols-10 lg:grid-cols-12">
              {monthlyDays.map((day) => (
                <button
                  key={day}
                  onClick={() => handleDaySelection(day)}
                  className={`p-2 rounded-md transition-colors ${
                    monthlyData.selectedDays.includes(day)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Hour
              </label>
              <select
                value={selectedHour}
                onChange={handleHourSelection}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Hour</option>
                {monthlyHours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour.toString()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Minute
              </label>
              <select
                value={selectedMinute}
                onChange={handleMinuteSelection}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Minute</option>
                {monthlyMinutes.map((minute) => (
                  <option key={minute} value={minute}>
                    {minute.toString()}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monthly;
