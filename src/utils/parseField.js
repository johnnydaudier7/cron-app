import { months, daysOfWeek } from "./timeDb";

export const parseField = ( field ) => {

    const letterExp = new RegExp(/[a-zA-Z]/);

    if(field.includes(",")){
       let currentValues = field.split(",");
       if(letterExp.test(field)){
            if( currentValues.some((currentItem) => daysOfWeek.some((day) => day.includes(currentItem)))){
                let weekDaysNewValues = currentValues.map((value) => {
                    let found = daysOfWeek.find(e => e.includes(value))
                    return found
                })
                return weekDaysNewValues;
            }else{
                let monthNewValues = currentValues.map((value) => {
                    let found = months.find(e => e.includes(value))
                    return found;
                })
                return monthNewValues
            }

       }else{
        return currentValues.map(el => Number(el));
       }

    }else if(field.includes("-")){

        return field.split("-")

    }else if(field.includes("/")){

        let splitted = field.split("/"); 
        return splitted[splitted.length -1] 

    }else if (field === "*" || field === "?"){

        return [];

    }else if(letterExp.test(field)){
        let isDay = daysOfWeek.some((day) => day.slice(0,3) === field)
        if(isDay){
            let dayFound = daysOfWeek.filter((day) => day.includes(field))
            return dayFound;
        }else{
            let monthFound = months.filter((month) => month.includes(field)) 
            return monthFound;
        }

    }else{
        return [field];
    }
}