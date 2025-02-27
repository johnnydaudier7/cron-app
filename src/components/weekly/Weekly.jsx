import WeeklyDisplay from "./WeeklyDisplay";
import { hours, minutes } from "../../utils/timeDb";

const Weekly = ({ weeklyData, setWeeklyData }) => {
  const { selectedHour, selectedMinute, selectedDays } = weeklyData;
  const dailyHours = hours;
  const dailyMinutes = minutes;

  const handleHourSelection = (event) => {
    setWeeklyData((current) => ({
      ...current,
      selectedHour: event.target.value,
    }));
  };

  const handleMinuteSelection = (event) => {
    setWeeklyData((current) => ({
      ...current,
      selectedMinute: event.target.value,
    }));
  };

  const handleDayChange = (day) => {
    setWeeklyData((current) => ({
      ...current,
      selectedDays: {
        ...current.selectedDays,
        [day]: !current.selectedDays[day],
      },
    }));
  };

  return (
    <WeeklyDisplay
      selectedHour={selectedHour}
      selectedMinute={selectedMinute}
      selectedDays={selectedDays}
      dailyHours={dailyHours}
      dailyMinutes={dailyMinutes}
      handleHourSelection={handleHourSelection}
      handleMinuteSelection={handleMinuteSelection}
      handleDayChange={handleDayChange}
    />
  );
};

export default Weekly;
