function convertDate(date) {
    "use strict";
    var dateSplit = date.split('-');
    return dateSplit.reverse();
}

function isYearAPossibleSpecialDate(year) {
    "use strict";
    var digits = year.split('');
    if (digits[0] === '0') {
        return 4;
    } else if (digits[1] === '0') {
        return 3;
    } else if (digits[2] === '0') {
        return 2;
    } else if (digits[1] === '0') {
        return 1;
    } else {
        return 0;
    }
}

function calculateNewYear(trialDate) {
    "use strict";
    var possibleYear = isYearAPossibleSpecialDate(trialDate[2]);
    if (possibleYear === 4) {
        //0 in thousands columns
        trialDate[2] = String(parseInt(trialDate[2]) + 1000);
    } else if (possibleYear === 3) {
        trialDate[2] = String(parseInt(trialDate[2]) + 100);
    } else if (possibleYear === 2) {
        trialDate[2] = String(parseInt(trialDate[2]) + 10);
    } else if (possibleYear === 1) {
        trialDate[2] = String(parseInt(trialDate[2]) + 1);
    }
    return possibleYear;
}

function isLeapYear (year) {
    "use strict";
    if (((year % 4 === 0) && (year % 100 != 0))
    || (year % 400 === 0)) {
        return true;
    }
    return false;
}

function areDigitsUnique(digits) {
    for (var i=0;i<digits.length-1;i++) {
        for (var j=i+1; j<digits.length;j++) {
            if (digits[i] === digits[j]) {
                return false;
            }
        }
    }
    return true;
}

function addDay(trialDate) {
    "use strict";
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var thisYearDaysInMonths = daysInMonth.slice();
    if (isLeapYear(parseInt(trialDate[2]))) {
        thisYearDaysInMonths[1] = 29;
    }
    var day = parseInt(trialDate[0]);
    var month = parseInt(trialDate[1]);
    var year = parseInt(trialDate[2]);
    if ((day + 1) > daysInMonth[month-1]) {
        trialDate[0] = '01';
        if ((month + 1) > 12) {
            trialDate[1] = '01';
            year += 1;
            trialDate[2] = String((year-year%1000)/1000);
            year -= (1000*(year%1000));
            trialDate[2] += String((year-year%100)/100);
            year -= (100*(year%100));
            trialDate[2] += String((year-year%10)/10);
            year -= (10*(year%10));
            trialDate[2] += String(year);
        } else {
            month += 1;
            trialDate[1] = String((month-month%10)/10);
            trialDate[1] += String(month%10);
        }
    } else {
        day += 1;
        trialDate[0] = String((day-day%10)/10);
        trialDate[0] += String(day%10);        
    }
}

function tryAllDaysOfYear(originalDate) {
    "use strict";
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
     var thisYearDaysInMonths = daysInMonth.slice();
    var trialDate = originalDate.slice();
    
    var months = parseInt(originalDate[1])-1;
    var originalMonth = months;
    var days = parseInt(originalDate[0])-1;
    if (isLeapYear(parseInt(originalDate[2]))) {
        daysInMonth[1] = 29;
    }
    
    for (; months < daysInMonth.length; months++) {
        if (months != originalMonth) {
            days = 0;
        }
        for (; days < thisYearDaysInMonths[months]; days ++) {
            var actualDay = days + 1;
            var trialDay = '';
            if (actualDay <= 9) {
                trialDay = '0' + String(actualDay);
            } else {
                trialDay = String(actualDay);
            }
            
            var actualMonth = months + 1;
            var trialMonth = '';
            if (actualMonth <= 9) {
                trialMonth = '0' + String(actualMonth);
            } else {
                trialMonth = String(actualMonth);
            }
            trialDate[0] = trialDay;
            trialDate[1] = trialMonth;
            var digits = trialDate[2].split('');
            var monthDigits = trialDate[1].split('');
            var dayDigits = trialDate[0].split('');
            for (var i=0; i<monthDigits.length; i++) {
                digits.push(monthDigits[i]);
            }
            for (i=0; i<dayDigits.length;i++) {
                digits.push(dayDigits[i]);
            }
            if (areDigitsUnique(digits)) {
                originalDate[0] = String(dayDigits[0]) + String(dayDigits[1]);
                originalDate[1] = String(monthDigits[0]) + String(monthDigits[1]);
                return true;
            }
            
        }        
    }
    return false;
}


function myFunction() {
    "use strict";
    var startDate = document.getElementById('bday').value;

    var dateSplit = convertDate(startDate);
    var trialDate = dateSplit.slice();
    var success = false;
    // yyyy is now in dateSplit[0], mm in dateSplit[1] and dd in dateSplit[2]
    var possibleYear = 0;
    var validDates = [];
    for (var i=0;i<5;i++) {
        do {
            do  {
                possibleYear = calculateNewYear(trialDate);
            } while (possibleYear > 0);

            success = tryAllDaysOfYear(trialDate);
            if (success === false) {
                trialDate[2] = String(parseInt(trialDate[2]) + 1);
                trialDate[0] = '01';
                trialDate[1] = '01';
            }
        } while (success === false);
        validDates.push(trialDate.slice());
        addDay(trialDate);
    }
    document.getElementById('date1').value = validDates[0];
    document.getElementById('date2').value = validDates[1];
    document.getElementById('date3').value = validDates[2];
    document.getElementById('date4').value = validDates[3];
    document.getElementById('date5').value = validDates[4];
}


