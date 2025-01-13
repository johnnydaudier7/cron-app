
export const generateCronString = (obj) => {
    try {
        if (!obj) {
            return;
        } 
        if (obj.value && typeof obj.value === "object" && !Array.isArray(obj.value)) {
            const selectedDays = Object.keys(obj.value).filter(d => obj.value[d] === true) 
            const formattedDays = selectedDays.map((day) => day.slice(0,3).toUpperCase()); 
            
            switch (obj.type) {
                case "specific":                    
                    return formattedDays.length > 0 ? formattedDays.join(",") :"?" ; 
                case "list":
                    return formattedDays.length > 0 ? formattedDays.join(",") :"?" ; 
                case "frequency":
                    return `*/${formattedDays.length + 1}`; 
                case "range":
                    return formattedDays.join("-"); 
                default:
                    return "*";
            }
        }      
        if (Array.isArray(obj.value)) {
            
            switch (obj.type) {
                case "specific":
                    return obj.value.length === 0 ? "?" 
                    : obj.value[0].length > 3
                    ? obj.value.map(el => el.slice(0,3).toUpperCase()).join(",") 
                    : obj.value.map(el => el.length <= 2 ? String(el) : String(el).slice(0.3)).join(",")
                case "list":
                    return obj.value.length >= 1 
                    ? obj.value.map(el => el.length > 2 ? el.slice(0, 3).toUpperCase() : String(el)).join(",") 
                    : "?";
                case "frequency":
                    return `*/${obj.value.join()}`;
                case "range":
                    return obj.value.join("-");
                default:
                    return "*";
            }
        }

        switch (obj.type) {
            case "specific":
                return obj.value === "" ? "*" : obj.value;
            case "range":
                return `${obj.start}-${obj.end}`;
            case "frequency":
                return `*/${obj.each}`;
            case "list":
                return `${obj.time1},${obj.time2}`;
            default:
                return "*";
        }
    } catch (err) {
        console.log(`Error generating, ${err}`);
    }
    
}