import { FiBell } from "react-icons/fi";

const WeeklyDisplay = ({
  selectedHour,
  selectedMinute,
  selectedDays,
  dailyHours,
  dailyMinutes,
  handleHourSelection,
  handleMinuteSelection,
  handleDayChange,
}) => {
  return (
    <div className="bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div className="flex items-center space-x-2">
          <FiBell className="text-blue-500 text-2xl" />
          <h2 className="text-2xl font-bold text-gray-800">
            Set a weekly task
          </h2>
        </div>

        <form className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
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
                  {dailyHours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour.toString()}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Minutes
                </label>
                <select
                  value={selectedMinute}
                  onChange={handleMinuteSelection}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Minute</option>
                  {dailyMinutes.map((min) => (
                    <option key={min} value={min}>
                      {min.toString()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-gray-700 font-medium">Select Days</label>
            <div className="flex flex-wrap md:grid-cols-4 gap-3">
              {Object.keys(selectedDays).map((day) => (
                <div key={day} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedDays[day]}
                    id={day}
                    onChange={() => handleDayChange(day)}
                    className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={day} className="text-gray-700">
                    {day}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WeeklyDisplay;
