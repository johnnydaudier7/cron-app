import { hours, minutes } from "../../utils/timeDb";
import DailyDisplay from "./DailyDisplay";

const Daily = ({ dailyData, setDailyData }) => {
  const { selectedMinute, selectedHour } = dailyData;
  const dailyMinutes = minutes;
  const dailyHours = hours;

  const handleHourSelection = (event) => {
    const value = event.target.value;
    setDailyData((current) => ({
      ...current,
      selectedHour: value,
    }));
  };
  const handleMinuteSelection = (event) => {
    const value = event.target.value;
    setDailyData((current) => ({
      ...current,
      selectedMinute: value,
    }));
  };

  return (
    <DailyDisplay
      selectedHour={selectedHour}
      selectedMinute={selectedMinute}
      dailyHours={dailyHours}
      dailyMinutes={dailyMinutes}
      handleHourSelection={handleHourSelection}
      handleMinuteSelection={handleMinuteSelection}
    />
  );
};
export default Daily;
