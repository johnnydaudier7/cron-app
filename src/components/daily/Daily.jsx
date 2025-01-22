import { FiBell } from "react-icons/fi";
import { hours, minutes } from "../../utils/timeDb";


const Daily = ({dailyData, setDailyData}) => {
    const {selectedMinute, selectedHour} = dailyData;
    const dailyMinutes = minutes;
    const dailyHours = hours;

    const handleHourSelection = (event) => {
      const value = event.target.value;
      setDailyData((current) => ({
        ...current,
        selectedHour: value,
      }))
    }
    const handleMinuteSelection = (event) => {
      const value = event.target.value;
      setDailyData((current) => ({
        ...current,
        selectedMinute: value,
      }))
    }
 
    return (
              <div className=" bg-gray-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 space-y-6">
                  <div className="flex items-center space-x-2">
                    <FiBell className="text-blue-500 text-2xl" />
                    <h2 className="text-2xl font-bold text-gray-800">Set a daily task</h2>
                  </div>
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
                          <option value="">Select minute</option>
                          {dailyMinutes.map((min) => (
                            <option key={min} value={min}>
                              {min.toString()}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>                  
                  </div>      
                </div>
              </div>
            );
        }          
export default Daily;

            