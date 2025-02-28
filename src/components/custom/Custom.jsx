import { months, daysInMonth } from "../../utils/timeDb";
import CustomDisplay from "./CustomDisplay";

const Custom = ({ customData, setCustomData }) => {
  const {
    selectedMonth,
    selectedMonthDays,
    selectedWeekDays,
    selectedMinute,
    selectedHour,
  } = customData;
  const customMonths = months;
  const customDaysInMonth = daysInMonth.map((day) => String(day));

  const handleMonthDaySelection = (day) => {
    setCustomData((current) => {
      let { value } = current.selectedMonthDays;

      if (!Array.isArray(value)) {
        value = [value];
      }

      let newValue;
      if (value.includes(day)) {
        newValue = value.filter((d) => d !== day);
      } else {
        newValue = [...value, day].sort((a, b) => a - b);
      }

      return {
        ...current,
        selectedMonthDays: {
          ...current.selectedMonthDays,
          value: newValue,
        },
        selectedWeekDays: {
          type: "specific",
          value: {
            Monday: false,
            Tuesday: false,
            Wednesday: false,
            Thursday: false,
            Friday: false,
            Saturday: false,
            Sunday: false,
          },
        },
      };
    });
  };

  const handleMonthSelection = (month) => {
    setCustomData((current) => {
      const { value } = current.selectedMonth;

      if (value.includes(month)) {
        return {
          ...current,
          selectedMonth: {
            ...selectedMonth,
            value: value.filter((m) => m !== month),
          },
        };
      } else {
        return {
          ...current,
          selectedMonth: {
            ...selectedMonth,
            value: [...value, month].sort((a, b) => a - b),
          },
        };
      }
    });
  };
  const handleWeekDayChange = (day) => {
    setCustomData((current) => {
      const { value } = current.selectedWeekDays;
      const updatedWeekDays = {
        ...current,
        selectedWeekDays: {
          ...selectedWeekDays,
          value: {
            ...value,
            [day]: !value[day],
          },
        },
      };

      const isAnyDaySelected = Object.values(
        updatedWeekDays.selectedWeekDays.value
      ).some((isSelected) => isSelected);

      if (isAnyDaySelected) {
        customData.selectedMonthDays.value = [];
      }
      return updatedWeekDays;
    });
  };
  const handleTypeChange = (key, event) => {
    const type = event.target.value;

    setCustomData((current) => ({
      ...current,
      [key]: {
        ...current[key],
        type,
      },
    }));
  };

  const handleInputChange = (key, event) => {
    const letterExp = new RegExp(/[a-zA-Z]/);
    const { name, value } = event.target;

    if (letterExp.test(value)) {
      return;
    }

    setCustomData((current) => ({
      ...current,
      [key]: {
        ...current[key],
        [name]: value,
      },
    }));
  };

  return (
    <CustomDisplay
      selectedMonth={selectedMonth}
      selectedMonthDays={selectedMonthDays}
      selectedWeekDays={selectedWeekDays}
      selectedMinute={selectedMinute}
      selectedHour={selectedHour}
      customMonths={customMonths}
      customDaysInMonth={customDaysInMonth}
      customData={customData}
      handleMonthSelection={handleMonthSelection}
      handleMonthDaySelection={handleMonthDaySelection}
      handleWeekDayChange={handleWeekDayChange}
      handleTypeChange={handleTypeChange}
      handleInputChange={handleInputChange}
    />
  );
};

export default Custom;
