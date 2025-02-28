import { FiClock } from "react-icons/fi";

const CustomDisplay = ({
  selectedMonth,
  selectedMonthDays,
  selectedWeekDays,
  selectedMinute,
  selectedHour,
  customMonths,
  customDaysInMonth,
  customData,
  handleMonthSelection,
  handleMonthDaySelection,
  handleWeekDayChange,
  handleTypeChange,
  handleInputChange,
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-24">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <FiClock className="mr-2" />
          Customize your reminder
        </h2>
        <div className="space-y-6">
          {/* Month Selection */}
          <div>
            <label className="block text-gray-700 font-medium mb-4">
              Select Month
            </label>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {customMonths.map((month) => (
                <button
                  key={month}
                  onClick={() => handleMonthSelection(month)}
                  className={`p-2 rounded-lg transition-colors truncate text-sm font-medium text-center ${
                    customData.selectedMonth.value.includes(month)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>

          {/* Days of Month Selection */}
          <div>
            <div className="flex justify-between">
              <label className="block text-gray-700 font-medium mb-2">
                Select Days of Month
              </label>
              <div className="flex gap-4 items-center">
                <label htmlFor="type-selector">Select Type:</label>
                <select
                  id="month-day-type-selector"
                  value={selectedMonthDays.type}
                  onChange={(e) => handleTypeChange("selectedMonthDays", e)}
                >
                  <option value="specific">Specific</option>
                  <option value="range">Range</option>
                  <option value="frequency">Frequency</option>
                  <option value="list">List</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 md:grid-cols-10 lg:grid-cols-12">
              {customDaysInMonth.map((day) => (
                <button
                  key={day}
                  onClick={() => handleMonthDaySelection(day)}
                  className={`p-2 rounded-md transition-colors ${
                    customData.selectedMonthDays.value.includes(day)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Week Days Selection */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-gray-700 font-medium">
                Select Week Days
              </label>
              <div className="flex gap-4 items-center">
                <label htmlFor="type-selector">Select Type:</label>
                <select
                  id="month-day-type-selector"
                  value={selectedWeekDays.type}
                  onChange={(e) => handleTypeChange("selectedWeekDays", e)}
                >
                  <option value="specific">Specific</option>
                  <option value="range">Range</option>
                  <option value="frequency">Frequency</option>
                  <option value="list">List</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap md:grid-cols-4 gap-3">
              {Object.keys(customData.selectedWeekDays.value).map((day) => (
                <div key={day} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={customData.selectedWeekDays.value[day]}
                    id={day}
                    onChange={() => handleWeekDayChange(day)}
                    className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={day} className="text-gray-700">
                    {day}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="md:flex gap-36 space-y-2">
            {/* Hours */}
            <div>
              <div className="flex gap-8">
                <label htmlFor="type-selector">Select Type:</label>
                <select
                  id="hour-type-selector"
                  value={customData.selectedHour.type}
                  onChange={(e) => handleTypeChange("selectedHour", e)}
                >
                  <option value="specific">Specific</option>
                  <option value="range">Range</option>
                  <option value="frequency">Frequency</option>
                </select>
              </div>
              {selectedHour.type === "specific" && (
                <div className="flex items-center space-x-2">
                  <label htmlFor="value">Value:</label>
                  <input
                    type="text"
                    name="value"
                    onChange={(e) => handleInputChange("selectedHour", e)}
                    value={customData.selectedHour.value}
                    className="w-24 border border-black text-blue-500 border-black-300 rounded focus:ring-blue-500"
                  />
                </div>
              )}
              {selectedHour.type === "range" && (
                <div className="flex items-center space-x-2">
                  <label htmlFor="value">From:</label>
                  <input
                    type="text"
                    name="start"
                    onChange={(e) => handleInputChange("selectedHour", e)}
                    value={customData.selectedHour.start}
                    className="w-24 border border-black text-blue-500 border-black-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="value">to:</label>
                  <input
                    type="text"
                    name="end"
                    onChange={(e) => handleInputChange("selectedHour", e)}
                    value={customData.selectedHour.end}
                    className="w-24 border border-black text-blue-500 border-black-300 rounded focus:ring-blue-500"
                  />
                </div>
              )}
              {selectedHour.type === "frequency" && (
                <div className="flex items-center space-x-2">
                  <label htmlFor="value">Each:</label>
                  <input
                    type="text"
                    name="each"
                    onChange={(e) => handleInputChange("selectedHour", e)}
                    value={customData.selectedHour.each}
                    className="w-24 border border-black text-blue-500 border-black-300 rounded focus:ring-blue-500"
                  />
                </div>
              )}
              <p className="font-medium">Hours</p>
            </div>

            {/* Minutes */}
            <div>
              <div className="flex gap-8">
                <label htmlFor="type-selector">Select Type:</label>
                <select
                  id="hour-type-selector"
                  value={customData.selectedMinute.type}
                  onChange={(e) => handleTypeChange("selectedMinute", e)}
                >
                  <option value="specific">Specific</option>
                  <option value="range">Range</option>
                  <option value="frequency">Frequency</option>
                </select>
              </div>
              {selectedMinute.type === "specific" && (
                <div className="flex items-center space-x-2">
                  <label htmlFor="value">Value:</label>
                  <input
                    type="text"
                    name="value"
                    onChange={(e) => handleInputChange("selectedMinute", e)}
                    value={selectedMinute.value}
                    className="w-24 border border-black text-blue-500 border-black-300 rounded focus:ring-blue-500"
                  />
                </div>
              )}
              {selectedMinute.type === "range" && (
                <div className="flex items-center space-x-2">
                  <label htmlFor="value">From:</label>
                  <input
                    type="text"
                    name="start"
                    onChange={(e) => handleInputChange("selectedMinute", e)}
                    value={selectedMinute.start}
                    className="w-24 border border-black text-blue-500 border-black-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="value">to:</label>
                  <input
                    type="text"
                    name="end"
                    onChange={(e) => handleInputChange("selectedMinute", e)}
                    value={selectedMinute.end}
                    className="w-24 border border-black text-blue-500 border-black-300 rounded focus:ring-blue-500"
                  />
                </div>
              )}
              {selectedMinute.type === "frequency" && (
                <div className="flex items-center space-x-2">
                  <label htmlFor="value">Each:</label>
                  <input
                    type="text"
                    name="each"
                    onChange={(e) => handleInputChange("selectedMinute", e)}
                    value={selectedMinute.each}
                    className="w-24 border border-black text-blue-500 border-black-300 rounded focus:ring-blue-500"
                  />
                </div>
              )}
              <p className="font-medium">minutes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDisplay;
