let weekInfoObj = {}

let lastWeek;

const addWeek = (year, quarter) => {
    let weekCount = 0
    let maxMonth = (quarter*3) - 1
    let initialYear = lastWeek.getFullYear()
    // if last week does not reach next quarter, continue to add weeks
    while (lastWeek.getMonth() <= maxMonth && lastWeek.getFullYear() === initialYear) {
        let endDate = addDays(lastWeek)
        weekInfoObj.years[year].quarters[quarter-1].weeks.push({
            yearNum: year,
            quarter: quarter,
            weekNum: weekCount,
            startDate: lastWeek,
            endDate: endDate,
            color: '#ccc',
            jid: 0,

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
            yearNum: i,
            jid: 0,
            currentYear: startYear + i,
            color: '#e9ecef',
            quarters: []
        })
        for (let q = 1; q < 5; q++) {
            // console.log(weekInfoObj.years)
            weekInfoObj.years[i].quarters.push({
                yearNum: i,
                quarter: q,
                jid: 0,
                color: '#aaa',
                weeks: []
            })
            addWeek(i, q)
        }
    }
    console.log(weekInfoObj)
    return weekInfoObj
}

export const addJournalToCreatedWeek = (createdWeek, weekObj) => {
    if (weekObj.weekJournal.length > 0) {
        weekObj.weekJournal.map( week => {
            const { jid, yearNum, quarter, weekNum, color } = week
            console.log('add journal to created function week',week)
            createdWeek.years[yearNum].quarters[quarter-1].weeks[weekNum].jid = jid
            createdWeek.years[yearNum].quarters[quarter-1].weeks[weekNum].color = color
        })
    }
    if (weekObj.quarterJournal.length > 0) {
        weekObj.quarterJournal.map( singleQuarter => {
            const { jid, yearNum, quarter, color } = singleQuarter
            console.log('add journal to created function quarter',singleQuarter)
            createdWeek.years[yearNum].quarters[quarter-1].jid = jid
            createdWeek.years[yearNum].quarters[quarter-1].color = color
        })
    }
    if (weekObj.yearJournal.length > 0) {
        weekObj.yearJournal.map( year => {
            const { jid, yearNum, color } = year
            console.log('add journal to created function year',year)
            createdWeek.years[yearNum].jid = jid
            createdWeek.years[yearNum].color = color
        })
    }
    return createdWeek
}
