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
import { parseField } from "../utils/parseField";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"


export const MainContainer = () => {
    
    const { storedExpression, deleteExpression, addExpression, getExpressionToLoad } = useCronContext();

    const location = useLocation();

    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState(null);

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
        selectedMinute: "",
        selectedHour: "",
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
    
    const generateCustomCron = (type) => {
        const cron = new Cron();
        let newId = uuidv4();
        cron.setId(newId);
        cron.setType(type);
        cron.setMinute(generateCronString(customData.selectedMinute));
        cron.setHour(generateCronString(customData.selectedHour));
        cron.setDayOfMonth(generateCronString(customData.selectedMonthDays));
        cron.setMonth(generateCronString(customData.selectedMonth));
        cron.setDayOfWeek(generateCronString(customData.selectedWeekDays)) ;       
        addExpression(cron);
    }
    const generateMonthlyCron = (type) => {
        const cron = new Cron();
        let newId = uuidv4();
        cron.setId(newId)
        cron.setType(type)
        cron.setMinute(monthlyData.selectedMinute);
        cron.setHour(monthlyData.selectedHour);
        const days = monthlyData.selectedDays.join(",")
        cron.setDayOfMonth(days)

        addExpression(cron)
    }
    const generateWeeklyCron = (type) => {
        const cron = new Cron();
        let newId = uuidv4();
        cron.setId(newId);
        cron.setType(type);
        cron.setMinute(weeklyData.selectedMinute);
        cron.setHour(weeklyData.selectedHour);
      
        const selectedDays = Object.keys(weeklyData.selectedDays)
          .filter((day) => weeklyData.selectedDays[day] === true)
          .map((day) => day.slice(0, 3).toUpperCase())
          .join(",");
        
        cron.setDayOfWeek(selectedDays);
      
        addExpression(cron);
      };
    const generateDailyCron = (type) => {
        const cron = new Cron();
        let newId = uuidv4();
        cron.setId(newId);
        cron.setType(type);
        cron.setMinute(dailyData.selectedMinute);
        cron.setHour(dailyData.selectedHour);
        addExpression(cron);
    }
    const onLoadDaily = (formattedExpression) => {
        try{
            setDailyData({
                selectedHour: formattedExpression.selectedHour,
                selectedMinute: formattedExpression.selectedMinute,
            })
            navigate(`/${formattedExpression.type}`)
        }catch(err){
            console.error(`Error during onLoadDaily, ${err}`)
        }
    }
    const onLoadWeekly = (formattedExpression) => {
        const { selectedDays } = weeklyData;
        
        try{
            const updatedWeekDays = {                
                value: Object.keys(selectedDays).reduce((acc, day) => {
                  acc[day] = formattedExpression.selectedWeekDays.some(
                    (formattedDay) => formattedDay.toLowerCase() === day.toLowerCase()
                  );
                  return acc;
                }, {}),
              };
             
              setWeeklyData({
                ...weeklyData,
                selectedMinute: formattedExpression.selectedMinute,
                selectedHour: formattedExpression.selectedHour,
                selectedDays: updatedWeekDays.value,
              })
              navigate(`/${formattedExpression.type}`);
            
        }catch(err){
            console.error(`Error during onLoadWeekly, ${err}`)
        }
    }
    const onLoadMonthly = (formattedExpression) =>{        
        try{
            setMonthlyData({
                selectedMinute: formattedExpression.selectedMinute,
                selectedHour: formattedExpression.selectedHour,
                selectedDays: formattedExpression.selectedMonthDays.map(d => String(d)),
            })

            navigate(`/${formattedExpression.type}`);
        }catch(err){
            console.error(`Error during the OnEditMonthly, ${err}`);
        }
    }
    const onLoadCustom = (formattedExpression) => {
        try {            
        const { selectedMonth, selectedMonthDays, selectedWeekDays, selectedHour, selectedMinute } = customData;
                
        const updatedWeekDays = {
            type: "specific",
            value: Object.keys(selectedWeekDays.value).reduce((acc, day) => {
              acc[day] = formattedExpression.selectedWeekDays.some(
                (formattedDay) => formattedDay.toLowerCase() === day.toLowerCase()
              );
              return acc;
            }, {}),
          };
          
          setCustomData({
            ...customData,
            selectedMinute: {
                ...selectedMinute,
                value: formattedExpression.selectedMinute,
            },
            selectedHour: {
                ...selectedHour,
                value: formattedExpression.selectedHour,
            },
            selectedMonthDays: {
                ...selectedMonthDays,
                value: formattedExpression.selectedMonthDays.map(d => String(d)),
            },
            selectedMonth:{
                ...selectedMonth,
                value: formattedExpression.selectedMonth,
            },
            selectedWeekDays: updatedWeekDays,
          })
          
          navigate(`/${formattedExpression.type}`);
        } catch (err) {
          console.error(`Error during onLoadCustom func, ${err}`);
        }
    };
    const loadHandlers = {
        daily: onLoadDaily,
        weekly: onLoadWeekly,
        monthly: onLoadMonthly,
        custom: onLoadCustom,
    };
    const saveHandlers = {
        daily: generateDailyCron,
        weekly: generateWeeklyCron,
        monthly: generateMonthlyCron,
        custom: generateCustomCron,
    }

    const handleSaveExpression = () => {
        try{
            let context = location.pathname.replace("/","").toLocaleLowerCase()       
    
            const mySaveHandler = saveHandlers[context];
            if(mySaveHandler){
                mySaveHandler(context);
            }else{
                throw new Error("Problem selecting saveHandler.")
            }
        }catch(err){
            console.error(`Problem while saving, ${err} `)
        }
        
    }

    const handleLoadExpression = (id) => {
        const exp = getExpressionToLoad(id);
        
        try{
            let toArray = exp.expression.split(" ");            
            const formatted = {
                id: exp.id,
                type: exp.type,
                selectedMinute: parseField(toArray[0]).join(),
                selectedHour: parseField(toArray[1]).join(),
                selectedWeekDays: parseField(toArray[4]),
                selectedMonth: parseField(toArray[3]),
                selectedMonthDays: parseField(toArray[2])
            }

            const myLoadHandler = loadHandlers[formatted.type];
            if(myLoadHandler){
                myLoadHandler(formatted);
            }else{
                throw new Error("Problem selecting loadHandler.")
            }                      
        }catch(err){
            console.error(err)
        }
    }
    const handleSelect = (id) => {
        setSelectedId(id);
      };

    return (
        <>  
            <h1>Simple reminder as CRON </h1>            
            <Nav/>
            <Routes>
              <Route path='/' element={<Daily dailyData={dailyData} setDailyData={setDailyData}/>}/>
              <Route path='/daily' element={<Daily dailyData={dailyData} setDailyData={setDailyData}/>}/>
              <Route path='/weekly' element={<Weekly weeklyData={weeklyData} setWeeklyData={setWeeklyData}/>}/>
              <Route path='/monthly' element={<Monthly monthlyData={monthlyData} setMonthlyData={setMonthlyData}/>}/>
              <Route path='custom' element={<Custom customData={customData} setCustomData={setCustomData}/>}/>
              <Route path='/*' element={<Custom customData={customData} setCustomData={setCustomData}/>}/>
            </Routes> 
            <div className="mt-4 font-mono flex-col items-center">
                <div className="flex justify-center gap-4 mt-6">
                    
                    <button
                        disabled={selectedId === null || storedExpression.length === 0}
                        onClick={() => handleLoadExpression(selectedId)}
                        title="Load"
                        className="bg-blue-500 text-white px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 shadow-sm"
                        >
                        Load
                    </button>                
                    <button
                        onClick={handleSaveExpression}
                        type="submit"
                        className=" bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-950 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 shadow-sm"
                    >
                        Save
                    </button>
                </div>
                <div className="flex flex-col-reverse justify-center gap-4 mt-6">
                {storedExpression && storedExpression.map((exp) => (
                    <div
                    key={exp.id}
                    onClick={() => handleSelect(exp.id)}
                    className={`flex items-center justify-between gap-4 mt-6 w-full rounded-lg border p-4 shadow-sm transition-shadow cursor-pointer 
                        ${
                        selectedId === exp.id
                            ? "border-blue-500 bg-blue-50 shadow-md"
                            : "border-gray-300 bg-white hover:shadow-md"
                        }`}
                    >
                    <div className="flex-1">
                        <p className="text-gray-600 font-semibold text-sm">Generated Expression:</p>
                        <p className="text-gray-800 font-medium text-base">{exp.expression}</p>
                    </div>
                    <div className="flex gap-4 items-center">                        
                        <span
                        className="cursor-pointer text-red-500 hover:text-red-700"
                        onClick={(evt) => {
                            evt.stopPropagation();
                            deleteExpression(exp.id);
                        }}
                        title="Delete"
                        >
                        <FaTrash size={20} />
                        </span>
                    </div>                    
                    </div>
                ))}
                </div>
            </div>
        </>
    )
}
export default MainContainer;