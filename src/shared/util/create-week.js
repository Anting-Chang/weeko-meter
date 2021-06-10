let weekInfoObj = {}

let lastWeek;

const addWeek = (year, quarter) => {
    let weekCount = 1
    let maxMonth = (quarter*3) - 1
    let initialYear = lastWeek.getFullYear()
    // if last week does not reach next quarter, continue to add weeks
    while (lastWeek.getMonth() <= maxMonth && lastWeek.getFullYear() === initialYear) {
        let endDate = addDays(lastWeek)
        weekInfoObj.years[year].quarters[quarter-1].weeks.push({
            weekNum: weekCount,
            startDate: lastWeek,
            endDate: endDate,
            color: 1,
            text: '',

        })
        weekCount ++
        lastWeek = endDate
        // console.log(weekCount)
    }

    // console.log(lastWeek)
}


const addDays = (date) => {
    let result = new Date(date);
    result.setDate(result.getDate() + 7);
    return result;
}

export const createWeek = (numYears, startDate) => {
    startDate.setDate(startDate.getDate() - startDate.getDay())
    weekInfoObj = {
        startDate,
        years: []
    }
    let startYear = startDate.getFullYear()
    lastWeek = new Date(startDate)
    for (let i = 0; i < numYears; i++) {
        weekInfoObj.years.push({
            numYear: i,
            currentYear: startYear + i,
            quarters: []
        })
        for (let q = 1; q < 5; q++) {
            // console.log(weekInfoObj.years)
            weekInfoObj.years[i].quarters.push({
                numQuarter: q,
                quarterText: '',
                quarterColor: 2,
                weeks: []
            })
            addWeek(i, q)
        }
    }
    console.log(weekInfoObj)
    return weekInfoObj
}
