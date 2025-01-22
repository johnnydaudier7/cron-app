export class Cron {
    
  id;
  type;
  minute;
  hour;
  dayOfMonth;
  month;
  dayOfWeek;
  year;

  constructor() {
    this.id = ""; 
    this.type = "";  
    this.minute = "*";
    this.hour = "*";
    this.dayOfMonth = "*";
    this.month = "*";
    this.dayOfWeek = "*";      
  }

  setId(id){
    if(typeof id === "string"){
      this.id = id;
    }else{ 
      throw new Error("Invalid id type")
    }
  }
  getId(){
    return this.id;
  }
  setType(type){
    if(typeof type === "string")
    this.type =  type;
  }
  getType(){
    return this.type;
  }
  
  setMinute(minute) {
    if (typeof minute === "string") {
      this.minute = minute;
    } else {
      throw new Error("Inválid minute value");
    }
  }
  getMinute(){
      return this.minute
  }

  setHour(hour) {
    if (typeof hour === "string") {
      this.hour = hour;
    } else {
      throw new Error("Invalid hour value");
    }
  }
  getHour(){
      return this.hour
  }
  
  setDayOfMonth(day) {
    if (typeof day === "string") {
      this.dayOfMonth = day;
      
    } else {
      throw new Error("Invalid month day");
    }
  }
  getDayOfMonth(){
      return this.dayOfMonth;
  }

  setMonth(month) {
  
    if (typeof month === "string") {
      this.month = month;
    } else {
      throw new Error("Invalid month value");
    }
  }
  getMonth(){
      return this.month;
  }

  setDayOfWeek(day) {
    if(typeof day === "string"){
      this.dayOfWeek = day;
    }else {
      throw new Error("Invalid week day value");
    }
  }
  getDayOfWeek(){
      return this.dayOfWeek;
  }
  setYear(year) {
      if(year){
        this.year = year
      }else {
      throw new Error("Invalid year");
    }
  }
  getYear(){
      return this.year;
  }
  
  toString() {
    return `${this.minute} ${this.hour} ${this.dayOfMonth} ${this.month} ${this.dayOfWeek}`;
  }
}
  