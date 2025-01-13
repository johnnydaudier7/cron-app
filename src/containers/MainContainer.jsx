import { useState } from "react";
import { useCronContext } from "../context/CronContext";
import { FaTrash } from "react-icons/fa"
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "../components/nav/Nav";
import Daily from "../components/daily/Daily";
import Weekly from "../components/weekly/Weekly";
import Monthly from "../components/monthly/Monthly";
import Custom from "../components/custom/Custom";
import { Cron } from "../utils/cron";
import { generateCronString } from "../utils/generateCronString";

export const MainContainer = () => {
    const { storedExpression, deleteExpression, addExpression } = useCronContext();
    const location = useLocation(); 
    const [weeklyData, setWeeklyData] = useState({
        selectedHour: "",
        selectedMinute: "",
        selectedDays: {
          Monday: false,
          Tuesday: false,
          Wednesday: false,
          Thursday: false,
          Friday: false,
          Saturday: false,
          Sunday: false,
        },
    });
    const [dailyData, setDailyData] = useState({
        selectedHour: "",
        selectedMinute: "",
    })
    const [monthlyData, setMonthlyData] = useState({
        selectedDays: [],
        selectedHour: "",
        selectedMinute: "",
    })
    const [customData, setCustomData] = useState({
        selectedMonth: {
            type: "specific",
            value: [],
        },
        selectedMonthDays: {
            type: "specific",
            value: [],
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
        selectedMinute: {
            type: "specific", 
            value: "", 
            start: "",
            end: "", 
            each: "", 
        },
        selectedHour: {
            type: "specific", 
            value: "", 
            start: "",
            end: "", 
            each: "", 
        }

    })
    
    const generateCustomCron = () => {

        const cron = new Cron()
        cron.setMinute(generateCronString(customData.selectedMinute))
        cron.setHour(generateCronString(customData.selectedHour))
        cron.setDayOfMonth(generateCronString(customData.selectedMonthDays))
        cron.setMonth(generateCronString(customData.selectedMonth))
        cron.setDayOfWeek(generateCronString(customData.selectedWeekDays))
        
        addExpression(cron.toString())

    }
    const generateMonthlyCron = () => {
        const cron = new Cron();
        cron.setMinute(monthlyData.selectedMinute);
        cron.setHour(monthlyData.selectedHour);
        const days = monthlyData.selectedDays.join(",")
        cron.setDayOfMonth(days)

        addExpression(cron.toString())
    }
    const generateWeeklyCron = () => {
        const cron = new Cron();
        cron.setMinute(weeklyData.selectedMinute);
        cron.setHour(weeklyData.selectedHour);
      
        const selectedDays = Object.keys(weeklyData.selectedDays)
          .filter((day) => weeklyData.selectedDays[day] === true)
          .map((day) => day.slice(0, 3).toUpperCase())
          .join(",");
        
        cron.setDayOfWeek(selectedDays);
      
        addExpression(cron.toString())
      };
    const generateDailyCron = () => {
        const cron = new Cron();
        cron.setMinute(dailyData.selectedMinute);
        cron.setHour(dailyData.selectedHour);
        
        addExpression(cron.toString())
      }
    const saveExpression = () => {
        
        let context = location.pathname.replace("/","").toLocaleLowerCase()       

        switch (context) {
            case "daily":                 
                generateDailyCron();
                break;
            case "weekly":
                generateWeeklyCron();
                break;
            case "monthly":
                generateMonthlyCron();
                break;
            case "custom":
                generateCustomCron();
                break;
            default:
                console.error(`NO context matched`)
        }
    }
    
    return (
        <>  
            <h1>Simple reminder as CRON </h1>            
            <Nav/>
            <Routes>
              <Route path='/' element={<Daily dailyData={dailyData} setDailyData={setDailyData}/>}/>
              <Route path='/Daily' element={<Daily dailyData={dailyData} setDailyData={setDailyData}/>}/>
              <Route path='/Weekly' element={<Weekly weeklyData={weeklyData} setWeeklyData={setWeeklyData}/>}/>
              <Route path='/Monthly' element={<Monthly monthlyData={monthlyData} setMonthlyData={setMonthlyData}/>}/>
              <Route path='Custom' element={<Custom customData={customData} setCustomData={setCustomData}/>}/>
              <Route path='/*' element={<Custom/>}/>
            </Routes> 
            <div className="mt-4 font-mono flex-col items-center">
            <div className="flex gap-8">
                <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >Load</button>
                <button
                onClick={saveExpression}
                type="submit"
                className="w-full bg-green-950 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
                >Save
                </button>
            </div>
                {storedExpression &&
                storedExpression.map((exp) => (
                    <div key={exp.id} className="flex items-center justify-between gap-5 mt-8 w-full border border-x-neutral-800">
                        <p className="font-medium">Generated expression</p> {exp.expression}
                        <div className="flex gap-8">
                            <span
                            style={{ cursor: "pointer", color: "red" }}
                            onClick={() => deleteExpression(exp.id)}
                            title="Delete"
                            >
                            <FaTrash />
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
export default MainContainer;