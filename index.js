// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]){
    const detail = {
        firstName, familyName, title, payPerHour, timeInEvents : [], timeOutEvents : []
    }
    return detail
}
function createEmployeeRecords(employeeRecords){
    return employeeRecords.map(employeeRecord => createEmployeeRecord(employeeRecord))
}


function createTimeInEvent(employeeRecord, dateStamp){
   
    const [date, time] = dateStamp.split(" ")
    
    employeeRecord.timeInEvents.push({
        type : "TimeIn",
        hour : parseInt(time), 
        date, 
        
    }) 
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    
    const [date, time] = dateStamp.split(" ")
    
    employeeRecord.timeOutEvents.push({
        type : "TimeOut",
        hour : parseInt(time), 
        date, 
    }) 
    return employeeRecord
} 

function hoursWorkedOnDate(employeeRecord, date){
   
    const timeIn = employeeRecord.timeInEvents.find(timeInEvent => timeInEvent.date == date).hour
    const timeOut = employeeRecord.timeOutEvents.find(timeOutEvent => timeOutEvent.date == date).hour
    return (timeOut - timeIn)/100 
} 

function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date) 
    const payPerHour = employeeRecord.payPerHour 
    return hoursWorked * payPerHour
} 

function allWagesFor(employeeRecord) {
    
    const datesWorked = employeeRecord.timeInEvents.map(timeInEvent => timeInEvent.date)
    return datesWorked.map(dateWorked => wagesEarnedOnDate(employeeRecord, dateWorked)).reduce((accum, curr) => accum + curr)
   
} 

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(employeeRecord => employeeRecord.firstName == firstName)
}

function calculatePayroll(srcArray){
    console.log(allWagesFor(srcArray[0]))
    let payroll = 0;
    srcArray.forEach(employeeRecord => payroll += allWagesFor(employeeRecord))
    // return srcArray.reduce((e, momo) => allWagesFor(e) + allWagesFor(momo))
    return payroll
}
