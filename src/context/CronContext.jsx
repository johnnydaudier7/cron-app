import { useState, useContext, createContext, useEffect } from "react";


const CronContext = createContext();

export const useCronContext = () => useContext(CronContext);

function CronContextProvider ({ children }) { 
    const storage = JSON.parse(localStorage.getItem("cron-expressions"));
    
    const [storedExpression, setStoredExpression] = useState( storage  ? storage : []);    

    const addExpression = (exp) => {
        try{                   
            setStoredExpression((current) =>  {       
                                                               
                return [...current, {id: exp.id, type: exp.type, expression: exp.toString()}];                
            })
        }catch(err){
            console.error(err)
        }
    }
    const getExpressionToLoad = (idToLoad) => {
        try{
            const found = storedExpression.find((ex) => ex.id === idToLoad);
            if(found){
                return found;
            }else{
                throw new Error("Error while selecting expression to load.")
            }
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
    useEffect(() => {
        localStorage.setItem("cron-expressions", JSON.stringify(storedExpression))
    }, [storedExpression])
    
    return (
        <CronContext.Provider 
        value={{ 
            addExpression,            
            deleteExpression,
            storedExpression,
            getExpressionToLoad,
        }}>

            { children }
        </CronContext.Provider>
    )
}



export default CronContextProvider;