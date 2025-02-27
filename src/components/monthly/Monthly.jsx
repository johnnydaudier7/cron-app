import MonthlyDisplay from "./MonthlyDisplay";
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
    <MonthlyDisplay
      selectedHour={selectedHour}
      selectedMinute={selectedMinute}
      monthlyDays={monthlyDays}
      monthlyHours={monthlyHours}
      monthlyMinutes={monthlyMinutes}
      monthlyData={monthlyData}
      handleDaySelection={handleDaySelection}
      handleHourSelection={handleHourSelection}
      handleMinuteSelection={handleMinuteSelection}
    />
  );
};

export default Monthly;
