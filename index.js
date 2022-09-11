function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
}

function createEmployeeRecords(recordsArray) {
    return recordsArray.map(e => createEmployeeRecord(e));
}

function createTimeInEvent(record, timeInEvent){
    const [date, hour] = timeInEvent.split(' ');
    const timeIn = {
        type: 'TimeIn',
        date: date,
        hour: Number(hour)
    };
    record.timeInEvents.push(timeIn);

    return record;
}

function createTimeOutEvent(record, timeOutEvent) {
    const [date, hour] = timeOutEvent.split(' ');
    const timeOut = {
        type: 'TimeOut',
        date: date,
        hour: Number(hour),
    };
    record.timeOutEvents.push(timeOut);

    return record;
}

function hoursWorkedOnDate(record, date) {
    const timeIn = record.timeInEvents.find(e => e.date === date).hour;
    const timeOut = record.timeOutEvents.find(e => e.date === date).hour;

    return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(record, date) {
    const timeIn = record.timeInEvents.find(e => e.date === date).hour;
    const timeOut = record.timeOutEvents.find(e => e.date === date).hour;
    const wages = record.payPerHour;

    return (timeOut - timeIn) / 100 * wages;
}

function allWagesFor(record) {
    let hoursWorked = [];
    
    for(let i = 0; i < record.timeInEvents.length; i++){
        if(record.timeInEvents[i].date === record.timeOutEvents[i].date){
           hoursWorked.push((record.timeOutEvents[i].hour - record.timeInEvents[i].hour) / 100);
        }
    }

    let totalHours = hoursWorked.reduce((a, b) => {
        return a + b;
    })

    return totalHours * record.payPerHour;
}

function calculatePayroll(records) {
    let earns = [];
    records.forEach(e => earns.push(allWagesFor(e)));

    let totalCosts = earns.reduce((a, b) => {
        return a + b;
    })

    return totalCosts;
}