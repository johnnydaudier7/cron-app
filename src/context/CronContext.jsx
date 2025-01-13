import { useState, useContext, createContext } from "react";


const CronContext = createContext();

export const useCronContext = () => useContext(CronContext);

function CronContextProvider ({ children }) {    
    const [storedExpression, setStoredExpression] = useState([]);
       
    const addExpression = (exp) => {
        try{
            setStoredExpression((current) =>  {
                localStorage.setItem("cronExpressions", JSON.stringify(exp))                
                return [...current, {id: new Date(), expression: exp}]
            })
        }catch(err){
            console.error(err)
        }
    }
    const deleteExpression = (idToRemove) => {
        try{
            setStoredExpression((current) => {
                return current.filter((exp =>  exp.id !== idToRemove ))
            })
        }catch(err){
            console.error(err)
        }
    }
    
    return (
        <CronContext.Provider 
        value={{ 
            addExpression,
            deleteExpression,
            storedExpression, 
        }}>

            { children }
        </CronContext.Provider>
    )
}



export default CronContextProvider;